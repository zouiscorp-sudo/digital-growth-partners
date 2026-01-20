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
          <div className="relative flex items-center justify-center min-h-[350px] lg:min-h-[500px] mt-8 lg:mt-0">
            {/* Large Background Circle */}
            <div className="absolute w-[220px] h-[220px] lg:w-[380px] lg:h-[380px] rounded-full bg-primary/10" />
            
            {/* Team Image inside circle */}
            <div className="relative w-[180px] h-[180px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden bg-primary/5 z-10">
              <img 
                src={heroTeam} 
                alt="Digital Marketing Team" 
                className="w-full h-full object-cover object-center scale-110"
              />
            </div>

            {/* Floating Stat Cards - responsive positioning */}
            {/* Top Left Card */}
            <div className="absolute -left-2 lg:-left-4 top-0 lg:top-8 z-20 scale-75 lg:scale-100 origin-top-left">
              <StatCard 
                icon={Users} 
                value="50+" 
                label="Happy Clients" 
                colorClass="bg-info"
                delay={0}
              />
            </div>

            {/* Top Right Card */}
            <div className="absolute -right-2 lg:-right-4 top-4 lg:top-12 z-20 scale-75 lg:scale-100 origin-top-right">
              <StatCard 
                icon={Briefcase} 
                value="200+" 
                label="Projects Done" 
                colorClass="bg-warning"
                delay={0.5}
              />
            </div>

            {/* Bottom Left Card */}
            <div className="absolute -left-2 lg:left-0 bottom-8 lg:bottom-16 z-20 scale-75 lg:scale-100 origin-bottom-left">
              <StatCard 
                icon={Award} 
                value="3+" 
                label="Years Experience" 
                colorClass="bg-primary"
                delay={1}
              />
            </div>

            {/* Bottom Right Card */}
            <div className="absolute -right-2 lg:right-0 bottom-16 lg:bottom-24 z-20 scale-75 lg:scale-100 origin-bottom-right">
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

      </div>
    </section>
  );
};