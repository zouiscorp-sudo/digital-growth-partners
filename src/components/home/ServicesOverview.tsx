import { Link } from "react-router-dom";
import { Search, Share2, Megaphone, Code, TrendingUp, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Search,
    title: "SEO Services",
    description: "Dominate search rankings with our proven SEO strategies. On-page, off-page, and technical SEO.",
    color: "bg-primary/10 text-primary",
    href: "/services#seo",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build your brand presence across platforms with engaging content and community management.",
    color: "bg-success/10 text-success",
    href: "/services#smm",
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    description: "Reach your ideal customers on Facebook & Instagram with targeted advertising campaigns.",
    color: "bg-accent/10 text-accent",
    href: "/services#meta",
  },
  {
    icon: TrendingUp,
    title: "Google Ads",
    description: "Drive instant traffic with strategic Google Search, Display, and YouTube advertising.",
    color: "bg-primary/10 text-primary",
    href: "/services#google",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites, e-commerce stores, and landing pages that convert visitors into customers.",
    color: "bg-success/10 text-success",
    href: "/services#web",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    description: "Compelling blog posts, videos, and graphics that engage your audience and build authority.",
    color: "bg-accent/10 text-accent",
    href: "/services#content",
  },
];

export const ServicesOverview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Complete Digital Marketing{" "}
            <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From SEO to social media, we offer comprehensive digital marketing services 
            tailored to grow your business online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover-lift border-0 shadow-lg bg-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link 
                  to={service.href}
                  className="inline-flex items-center text-primary font-medium hover:gap-3 gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
