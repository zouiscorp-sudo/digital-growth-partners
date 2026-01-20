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
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden pt-16 md:pt-0">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in">
              Master Your{" "}
              <span className="text-primary">Digital</span>{" "}
              <br className="hidden sm:block" />
              Marketing Journey
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Unlock your business potential with premium digital marketing services 
              designed to transform your brand and accelerate your growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full" asChild>
                <Link to="/contact">
                  Discover More
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full" asChild>
                <Link to="/services">
                  View Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Visual Area */}
          <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[350px] lg:min-h-[500px] order-1 lg:order-2">
            {/* Large Background Circle */}
            <div className="absolute w-[180px] sm:w-[220px] lg:w-[380px] h-[180px] sm:h-[220px] lg:h-[380px] rounded-full bg-primary/10" />
            
            {/* Team Image inside circle */}
            <div className="relative w-[150px] sm:w-[180px] lg:w-[320px] h-[150px] sm:h-[180px] lg:h-[320px] rounded-full overflow-hidden bg-primary/5 z-10">
              <img 
                src={heroTeam} 
                alt="Digital Marketing Team" 
                className="w-full h-full object-cover object-center scale-110"
              />
            </div>

            {/* Floating Stat Cards - responsive positioning */}
            {/* Top Left Card */}
            <div className="absolute -left-2 sm:left-0 lg:-left-4 -top-2 sm:top-0 lg:top-8 z-20 scale-[0.65] sm:scale-75 lg:scale-100 origin-top-left">
              <StatCard 
                icon={Users} 
                value="50+" 
                label="Happy Clients" 
                colorClass="bg-info"
                delay={0}
              />
            </div>

            {/* Top Right Card */}
            <div className="absolute -right-2 sm:right-0 lg:-right-4 top-2 sm:top-4 lg:top-12 z-20 scale-[0.65] sm:scale-75 lg:scale-100 origin-top-right">
              <StatCard 
                icon={Briefcase} 
                value="200+" 
                label="Projects Done" 
                colorClass="bg-warning"
                delay={0.5}
              />
            </div>

            {/* Bottom Left Card */}
            <div className="absolute -left-2 sm:left-0 lg:left-0 bottom-2 sm:bottom-8 lg:bottom-16 z-20 scale-[0.65] sm:scale-75 lg:scale-100 origin-bottom-left">
              <StatCard 
                icon={Award} 
                value="3+" 
                label="Years Experience" 
                colorClass="bg-primary"
                delay={1}
              />
            </div>

            {/* Bottom Right Card */}
            <div className="absolute -right-2 sm:right-0 lg:right-0 bottom-10 sm:bottom-16 lg:bottom-24 z-20 scale-[0.65] sm:scale-75 lg:scale-100 origin-bottom-right">
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