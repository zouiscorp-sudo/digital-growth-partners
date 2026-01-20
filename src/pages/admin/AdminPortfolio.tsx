import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, LayoutDashboard, Loader2, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProjectResult {
  label: string;
  value: string;
}

interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  image_url: string | null;
  description: string;
  results: ProjectResult[];
  display_order: number;
  is_active: boolean;
}

const categories = ['seo', 'social', 'ads', 'web'];

export default function AdminPortfolio() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'seo',
    image_url: '',
    description: '',
    results: [] as ProjectResult[],
    display_order: 0,
    is_active: true,
  });
  const [newResult, setNewResult] = useState({ label: '', value: '' });

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data.map(project => ({
        ...project,
        results: (Array.isArray(project.results) ? project.results : []) as unknown as ProjectResult[]
      }));
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (projectData: Partial<PortfolioProject>) => {
      const dbData = {
        title: projectData.title,
        client: projectData.client,
        category: projectData.category,
        image_url: projectData.image_url,
        description: projectData.description,
        results: JSON.parse(JSON.stringify(projectData.results)),
        display_order: projectData.display_order,
        is_active: projectData.is_active,
      };
      if (editingProject) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(dbData)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_projects').insert([dbData as { title: string; client: string; category: string; description: string }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast.success(editingProject ? 'Project updated!' : 'Project added!');
      handleCloseDialog();
    },
    onError: () => toast.error('Error saving project'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast.success('Project deleted!');
    },
    onError: () => toast.error('Error deleting project'),
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleOpenDialog = (project?: PortfolioProject) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        client: project.client,
        category: project.category,
        image_url: project.image_url || '',
        description: project.description,
        results: project.results,
        display_order: project.display_order,
        is_active: project.is_active,
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', client: '', category: 'seo', image_url: '', description: '', results: [], display_order: 0, is_active: true });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const addResult = () => {
    if (newResult.label.trim() && newResult.value.trim()) {
      setFormData({ ...formData, results: [...formData.results, { ...newResult }] });
      setNewResult({ label: '', value: '' });
    }
  };

  const removeResult = (index: number) => {
    setFormData({ ...formData, results: formData.results.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading portfolio projects</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Portfolio Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Projects</CardTitle>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No projects yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell className="capitalize">{project.category}</TableCell>
                      <TableCell>{project.results.length} results</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${project.is_active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                          {project.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(project)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(project.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Results</Label>
              <div className="space-y-2 mt-2">
                {formData.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="font-medium">{result.value}</span>
                    <span className="text-muted-foreground">{result.label}</span>
                    <Button type="button" variant="ghost" size="sm" className="ml-auto" onClick={() => removeResult(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newResult.label}
                    onChange={(e) => setNewResult({ ...newResult, label: e.target.value })}
                    placeholder="Label (e.g., Traffic)"
                    className="flex-1"
                  />
                  <Input
                    value={newResult.value}
                    onChange={(e) => setNewResult({ ...newResult, value: e.target.value })}
                    placeholder="Value (e.g., +320%)"
                    className="w-28"
                  />
                  <Button type="button" variant="outline" onClick={addResult}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}