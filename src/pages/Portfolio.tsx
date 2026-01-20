import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProjectResult {
  label: string;
  value: string;
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Generate dynamic categories from projects
  const categories = useMemo(() => {
    if (!projects) return [{ id: "all", name: "All Projects" }];
    
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return [
      { id: "all", name: "All Projects" },
      ...uniqueCategories.map(cat => ({ 
        id: cat.toLowerCase(), 
        name: cat 
      }))
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeCategory === "all") return projects;
    return projects.filter(p => p.category.toLowerCase() === activeCategory);
  }, [projects, activeCategory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Work</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            Case <span className="text-primary">Studies</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Real results for real businesses. Explore how we've helped our clients 
            achieve their digital marketing goals.
          </p>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">
              Error loading portfolio projects. Please try again later.
            </div>
          ) : projects && projects.length > 0 ? (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16 px-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={`text-xs md:text-sm ${activeCategory === category.id ? "bg-primary" : ""}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredProjects.map((project) => {
                  const results = (project.results as unknown as ProjectResult[]) || [];
                  return (
                    <Card key={project.id} className="group overflow-hidden border-0 shadow-lg hover-lift">
                      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-muted">
                        {project.image_url ? (
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                          <Button size="sm" variant="secondary" className="gap-2 text-xs md:text-sm">
                            View Details <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4 md:p-6">
                        <span className="text-primary text-xs md:text-sm font-medium">{project.client}</span>
                        <h3 className="text-lg md:text-xl font-semibold mt-1 mb-2 md:mb-3">{project.title}</h3>
                        <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        {results.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 md:gap-4 pt-3 md:pt-4 border-t border-border">
                            {results.slice(0, 3).map((result, index) => (
                              <div key={index} className="text-center">
                                <div className="flex items-center justify-center gap-0.5 md:gap-1 text-success font-bold text-xs md:text-sm">
                                  <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                  {result.value}
                                </div>
                                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">{result.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No portfolio projects available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Let's discuss how we can help achieve similar results for your business.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;