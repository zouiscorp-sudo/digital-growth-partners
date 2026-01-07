import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

type Category = "all" | "seo" | "social" | "ads" | "web";

const categories = [
  { id: "all" as Category, name: "All Projects" },
  { id: "seo" as Category, name: "SEO" },
  { id: "social" as Category, name: "Social Media" },
  { id: "ads" as Category, name: "Paid Ads" },
  { id: "web" as Category, name: "Web Development" },
];

const projects = [
  {
    id: 1,
    title: "E-commerce SEO Success",
    client: "Fashion Hub India",
    category: "seo",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    results: [
      { label: "Organic Traffic", value: "+320%" },
      { label: "Keyword Rankings", value: "50+ Top 10" },
      { label: "Revenue Growth", value: "+180%" },
    ],
    description: "Complete SEO overhaul for a fashion e-commerce store, resulting in dramatic organic traffic increase and revenue growth.",
  },
  {
    id: 2,
    title: "Restaurant Social Media",
    client: "Spice Garden",
    category: "social",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    results: [
      { label: "Followers", value: "+15K" },
      { label: "Engagement Rate", value: "8.5%" },
      { label: "Walk-ins", value: "+45%" },
    ],
    description: "Built a strong social media presence that drove real-world foot traffic and established the restaurant as a local favorite.",
  },
  {
    id: 3,
    title: "B2B Lead Generation",
    client: "Tech Solutions Co",
    category: "ads",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    results: [
      { label: "Leads Generated", value: "500+" },
      { label: "Cost Per Lead", value: "-60%" },
      { label: "Conversion Rate", value: "12%" },
    ],
    description: "Strategic Google and LinkedIn ad campaigns targeting decision-makers, delivering high-quality leads at reduced costs.",
  },
  {
    id: 4,
    title: "Healthcare Website",
    client: "Wellness Clinic",
    category: "web",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    results: [
      { label: "Appointments", value: "+200%" },
      { label: "Page Load Time", value: "1.2s" },
      { label: "Mobile Traffic", value: "+85%" },
    ],
    description: "Modern, accessible website with online booking system that transformed patient acquisition for the clinic.",
  },
  {
    id: 5,
    title: "Real Estate Meta Ads",
    client: "Prime Properties",
    category: "ads",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    results: [
      { label: "Inquiries", value: "800+" },
      { label: "ROAS", value: "5.2x" },
      { label: "Cost Per Inquiry", value: "₹85" },
    ],
    description: "Targeted Meta advertising campaign for premium properties, generating high-quality buyer inquiries.",
  },
  {
    id: 6,
    title: "Local Business SEO",
    client: "AutoCare Center",
    category: "seo",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=600&h=400&fit=crop",
    results: [
      { label: "Local Pack", value: "#1 Position" },
      { label: "Calls", value: "+150%" },
      { label: "Reviews", value: "4.9★" },
    ],
    description: "Dominated local search results and Google Maps, driving consistent phone calls and service bookings.",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <span className="text-secondary-foreground/80 font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mt-4 mb-6">
            Case <span className="text-accent">Studies</span>
          </h1>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Real results for real businesses. Explore how we've helped our clients 
            achieve their digital marketing goals.
          </p>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id ? "bg-primary" : ""}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden border-0 shadow-lg hover-lift">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button size="sm" variant="secondary" className="gap-2">
                      View Details <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <span className="text-primary text-sm font-medium">{project.client}</span>
                  <h3 className="text-xl font-semibold mt-1 mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {project.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <div className="flex items-center justify-center gap-1 text-success font-bold">
                          <TrendingUp className="w-3 h-3" />
                          {result.value}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
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
