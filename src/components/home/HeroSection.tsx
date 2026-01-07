import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground/90 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Digital Marketing Agency in Attur
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Grow Your Business with{" "}
            <span className="text-accent">Strategic</span>{" "}
            Digital Marketing
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            We help businesses scale with data-driven SEO, powerful social media strategies, 
            targeted Meta & Google Ads, and stunning web development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg" asChild>
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg" asChild>
              <Link to="/portfolio">
                <Play className="mr-2 h-5 w-5" />
                View Our Work
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <p className="text-primary-foreground/60 text-sm mb-6">Trusted by businesses across India</p>
            <div className="flex flex-wrap justify-center gap-8 items-center text-primary-foreground/40">
              <span className="text-2xl font-bold">50+ Clients</span>
              <span className="hidden sm:block w-px h-8 bg-primary-foreground/20" />
              <span className="text-2xl font-bold">200+ Projects</span>
              <span className="hidden sm:block w-px h-8 bg-primary-foreground/20" />
              <span className="text-2xl font-bold">3+ Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
