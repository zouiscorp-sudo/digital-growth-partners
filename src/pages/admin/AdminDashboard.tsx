import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Briefcase, LogOut, LayoutDashboard, Star, UserCircle, CreditCard, FolderOpen } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const cards = [
    { title: 'Lead Management', description: 'View and manage customer inquiries and leads', icon: Users, color: 'primary', path: '/admin/leads' },
    { title: 'Service Management', description: 'Add, edit, or remove services displayed on the website', icon: Briefcase, color: 'success', path: '/admin/services' },
    { title: 'Review Management', description: 'Approve, feature, or remove customer reviews', icon: Star, color: 'warning', path: '/admin/reviews' },
    { title: 'Team Management', description: 'Manage team members on the About page', icon: UserCircle, color: 'accent', path: '/admin/team' },
    { title: 'Pricing Management', description: 'Update pricing plans and features', icon: CreditCard, color: 'primary', path: '/admin/pricing' },
    { title: 'Portfolio Management', description: 'Manage portfolio projects and case studies', icon: FolderOpen, color: 'success', path: '/admin/portfolio' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.path} className="hover-lift cursor-pointer" onClick={() => navigate(card.path)}>
              <CardHeader>
                <div className={`w-12 h-12 bg-${card.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                  <card.icon className={`h-6 w-6 text-${card.color}`} />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={card.path}>Manage</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
