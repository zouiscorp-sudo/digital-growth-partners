import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Zap, Users, Award, ArrowRight } from "lucide-react";

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

const team = [
  {
    name: "Team Leader",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Marketing Head",
    role: "Digital Marketing Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Creative Lead",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Tech Expert",
    role: "Web Development Lead",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            We Are <span className="text-primary">Attur Media Crew</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate team of digital marketing experts dedicated to helping 
            businesses thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                From Attur to the Digital World
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
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
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                <CardContent className="p-8 text-center">
                  <Users className="w-10 h-10 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <p className="text-primary-foreground/80">Happy Clients</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-accent text-accent-foreground">
                <CardContent className="p-8 text-center">
                  <Award className="w-10 h-10 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">200+</div>
                  <p className="text-accent-foreground/80">Projects Completed</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-success text-success-foreground col-span-2">
                <CardContent className="p-8 text-center">
                  <Target className="w-10 h-10 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <p className="text-success-foreground/80">Client Retention Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses of all sizes with cutting-edge digital marketing 
                  strategies that drive growth, build brand awareness, and deliver 
                  measurable results in the ever-evolving digital landscape.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Meet the Experts Behind Your Success
            </h2>
            <p className="text-muted-foreground">
              A dedicated team of professionals passionate about digital marketing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="border-0 shadow-lg overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business grow online.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
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
