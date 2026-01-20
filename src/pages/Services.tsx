import { Layout } from "@/components/layout/Layout";
import { 
  Search, Share2, Megaphone, Code, TrendingUp, FileText, CheckCircle, ArrowRight,
  Camera, Target, BarChart, Palette, Users, Globe, Mail, Smartphone, Monitor, 
  Zap, MessageSquare, Video, Image, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, Share2, Megaphone, Code, TrendingUp, FileText, Camera, Target, 
  BarChart, Palette, Users, Globe, Mail, Smartphone, Monitor, Zap,
  MessageSquare, Video, Image
};

const Services = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive digital marketing solutions designed to help your business 
            grow online and achieve measurable results.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">
              Error loading services. Please try again later.
            </div>
          ) : services && services.length > 0 ? (
            <div className="space-y-24">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Megaphone;
                return (
                  <div 
                    key={service.id}
                    id={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">{service.subtitle}</span>
                      <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{service.title}</h2>
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                        <Link to="/contact">
                          Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    <Card className={`border-0 shadow-xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <CardContent className="p-8">
                        <h3 className="font-semibold text-lg mb-6">What's Included</h3>
                        <ul className="space-y-4">
                          {service.features?.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-foreground/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No services available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation and we'll analyze your business needs to recommend 
            the best digital marketing strategy for you.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
            <Link to="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
