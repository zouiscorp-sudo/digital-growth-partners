import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Digital Marketing Agency in Attur
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Grow Your Business with{" "}
            <span className="text-primary">Strategic</span>{" "}
            Digital Marketing
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            We help businesses scale with data-driven SEO, powerful social media strategies, 
            targeted Meta & Google Ads, and stunning web development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg" asChild>
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg" asChild>
              <Link to="/portfolio">
                <Play className="mr-2 h-5 w-5" />
                View Our Work
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-border opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <p className="text-muted-foreground text-sm mb-6">Trusted by businesses across India</p>
            <div className="flex flex-wrap justify-center gap-8 items-center text-foreground/60">
              <span className="text-2xl font-bold">50+ Clients</span>
              <span className="hidden sm:block w-px h-8 bg-border" />
              <span className="text-2xl font-bold">200+ Projects</span>
              <span className="hidden sm:block w-px h-8 bg-border" />
              <span className="text-2xl font-bold">3+ Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
