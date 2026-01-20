import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Zap, Users, Award, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on metrics that matter. Every strategy is designed to deliver measurable business outcomes.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We treat every client's business as if it were our own.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead of digital trends to give you a competitive edge in the ever-evolving online landscape.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "No hidden agendas. We provide clear reporting and open communication at every step.",
  },
];

const About = () => {
  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
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
      <section className="relative py-16 md:py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            We Are <span className="text-primary">Attur Media Crew</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            A passionate team of digital marketing experts dedicated to helping 
            businesses thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
                From Attur to the Digital World
              </h2>
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  Founded in the heart of Attur, Salem District, we started with a simple mission: 
                  to help local businesses compete in the digital age. What began as a small team 
                  with big dreams has grown into a full-service digital marketing agency.
                </p>
                <p>
                  We understand the unique challenges businesses face in today's competitive 
                  landscape. That's why we combine data-driven strategies with creative excellence 
                  to deliver results that matter.
                </p>
                <p>
                  Our approach is simple – we treat every client's business as our own. We don't 
                  believe in one-size-fits-all solutions. Instead, we craft customized strategies 
                  that align with your specific goals and budget.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                <CardContent className="p-6 md:p-8 text-center">
                  <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">50+</div>
                  <p className="text-primary-foreground/80 text-sm">Happy Clients</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-accent text-accent-foreground">
                <CardContent className="p-6 md:p-8 text-center">
                  <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">200+</div>
                  <p className="text-accent-foreground/80 text-sm">Projects Completed</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-success text-success-foreground col-span-2">
                <CardContent className="p-6 md:p-8 text-center">
                  <Target className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4" />
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">95%</div>
                  <p className="text-success-foreground/80 text-sm">Client Retention Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <Target className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Mission</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  To empower businesses of all sizes with cutting-edge digital marketing 
                  strategies that drive growth, build brand awareness, and deliver 
                  measurable results in the ever-evolving digital landscape.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 md:mb-6">
                  <Eye className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Vision</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  To become the most trusted digital marketing partner for businesses 
                  across India, known for our integrity, innovation, and commitment 
                  to delivering exceptional value to our clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-lg hover-lift">
                <CardContent className="p-4 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 mx-auto">
                    <value.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
              Meet the Experts Behind Your Success
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              A dedicated team of professionals passionate about digital marketing.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">
              Error loading team members. Please try again later.
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg overflow-hidden group">
                  <div className="aspect-square overflow-hidden bg-muted">
                    {member.photo_url ? (
                      <img 
                        src={member.photo_url} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Users className="w-12 h-12 md:w-16 md:h-16" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 md:p-6 text-center">
                    <h3 className="font-semibold text-sm md:text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{member.position}</p>
                    {member.bio && (
                      <p className="text-muted-foreground text-xs mt-2 line-clamp-2 hidden md:block">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No team members available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Let's discuss how we can help your business grow online.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8" asChild>
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;