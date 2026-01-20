import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Loader2, Mail, Phone, Calendar, LogOut, LayoutDashboard, Download } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

type LeadStatus = 'pending' | 'done' | 'process' | 'approve' | 'decline';

const statusConfig: Record<LeadStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  done: { label: 'Done', variant: 'outline' },
  process: { label: 'In Process', variant: 'default' },
  approve: { label: 'Approved', variant: 'default' },
  decline: { label: 'Declined', variant: 'destructive' },
};

export default function AdminLeads() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: leads, isLoading, error } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast({ title: 'Lead deleted successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting lead',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteMutation.mutateAsync(id);
    setDeletingId(null);
  };

  const handleStatusChange = (id: string, status: LeadStatus) => {
    statusMutation.mutate({ id, status });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const exportToCSV = () => {
    if (!leads || leads.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no leads to export.',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Service', 'Budget', 'Message', 'Date'];
    const csvRows = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.email.replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${lead.service.replace(/"/g, '""')}"`,
        `"${(lead.budget || '').replace(/"/g, '""')}"`,
        `"${lead.message.replace(/"/g, '""')}"`,
        `"${format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm:ss')}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Export successful',
      description: `Exported ${leads.length} leads to CSV.`,
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading leads: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Lead Management</h1>
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
            <CardTitle>Customer Leads</CardTitle>
            <Button 
              variant="outline" 
              onClick={exportToCSV}
              disabled={!leads || leads.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : leads && leads.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              <a href={`mailto:${lead.email}`} className="hover:text-primary">
                                {lead.email}
                              </a>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{lead.service}</Badge>
                        </TableCell>
                        <TableCell>{lead.budget || 'Not specified'}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={lead.message}>
                          {lead.message}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={lead.status}
                            onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue>
                                <Badge variant={statusConfig[lead.status as LeadStatus]?.variant || 'secondary'}>
                                  {statusConfig[lead.status as LeadStatus]?.label || lead.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                              <SelectItem value="process">In Process</SelectItem>
                              <SelectItem value="approve">Approved</SelectItem>
                              <SelectItem value="decline">Declined</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(lead.created_at), 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                disabled={deletingId === lead.id}
                              >
                                {deletingId === lead.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this lead from {lead.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(lead.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No leads found. Leads will appear here when customers submit the contact form.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
