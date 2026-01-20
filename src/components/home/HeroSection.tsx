import { Link } from "react-router-dom";
import { ArrowRight, Users, Briefcase, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeam from "@/assets/hero-team.png";

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  colorClass,
  delay = 0 
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
  colorClass: string;
  delay?: number;
}) => (
  <div 
    className="flex items-center gap-3 bg-card px-4 py-3 rounded-full shadow-lg border border-border animate-float"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
              Master Your{" "}
              <span className="text-primary">Digital</span>{" "}
              <br />
              Marketing Journey
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Unlock your business potential with premium digital marketing services 
              designed to transform your brand and accelerate your growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base rounded-full" asChild>
                <Link to="/contact">
                  Discover More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-base rounded-full" asChild>
                <Link to="/services">
                  View Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Visual Area */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
            {/* Large Background Circle */}
            <div className="absolute w-[380px] h-[380px] rounded-full bg-primary/10" />
            
            {/* Team Image inside circle */}
            <div className="relative w-[320px] h-[320px] rounded-full overflow-hidden bg-primary/5 z-10">
              <img 
                src={heroTeam} 
                alt="Digital Marketing Team" 
                className="w-full h-full object-cover object-center scale-110"
              />
            </div>

            {/* Floating Stat Cards - positioned outside the circle */}
            {/* Top Left Card */}
            <div className="absolute -left-4 top-8 z-20">
              <StatCard 
                icon={Users} 
                value="50+" 
                label="Happy Clients" 
                colorClass="bg-info"
                delay={0}
              />
            </div>

            {/* Top Right Card */}
            <div className="absolute -right-4 top-12 z-20">
              <StatCard 
                icon={Briefcase} 
                value="200+" 
                label="Projects Done" 
                colorClass="bg-warning"
                delay={0.5}
              />
            </div>

            {/* Bottom Left Card */}
            <div className="absolute left-0 bottom-16 z-20">
              <StatCard 
                icon={Award} 
                value="3+" 
                label="Years Experience" 
                colorClass="bg-primary"
                delay={1}
              />
            </div>

            {/* Bottom Right Card */}
            <div className="absolute right-0 bottom-24 z-20">
              <StatCard 
                icon={TrendingUp} 
                value="100%" 
                label="Client Satisfaction" 
                colorClass="bg-success"
                delay={1.5}
              />
            </div>
          </div>
        </div>

        {/* Mobile Stats - Visible on smaller screens */}
        <div className="grid grid-cols-2 gap-4 mt-12 lg:hidden opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">50+</p>
              <p className="text-xs text-muted-foreground">Clients</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">200+</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">3+</p>
              <p className="text-xs text-muted-foreground">Years</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">100%</p>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};