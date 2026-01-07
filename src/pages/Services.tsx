import { Layout } from "@/components/layout/Layout";
import { Search, Share2, Megaphone, Code, TrendingUp, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: "seo",
    icon: Search,
    title: "SEO Services",
    subtitle: "Dominate Search Rankings",
    description: "Our comprehensive SEO strategies help you rank higher on Google and drive organic traffic that converts. We focus on sustainable, white-hat techniques that deliver long-term results.",
    features: [
      "Keyword Research & Strategy",
      "On-Page SEO Optimization",
      "Technical SEO Audit & Fixes",
      "Link Building & Off-Page SEO",
      "Local SEO for Business",
      "Monthly Analytics & Reporting",
    ],
    color: "bg-primary",
  },
  {
    id: "smm",
    icon: Share2,
    title: "Social Media Marketing",
    subtitle: "Build Your Brand Community",
    description: "Engage your audience and build a loyal community across social platforms. We create compelling content that resonates with your target audience and drives meaningful engagement.",
    features: [
      "Social Media Strategy Development",
      "Content Creation & Curation",
      "Community Management",
      "Influencer Partnerships",
      "Social Media Analytics",
      "Brand Voice Development",
    ],
    color: "bg-success",
  },
  {
    id: "meta",
    icon: Megaphone,
    title: "Meta Ads (Facebook & Instagram)",
    subtitle: "Reach Your Ideal Customers",
    description: "Leverage the power of Meta's advertising platform to reach your target audience with precision. We create high-converting campaigns that maximize your ROI.",
    features: [
      "Campaign Strategy & Planning",
      "Audience Research & Targeting",
      "Ad Creative Design",
      "A/B Testing & Optimization",
      "Retargeting Campaigns",
      "Conversion Tracking Setup",
    ],
    color: "bg-accent",
  },
  {
    id: "google",
    icon: TrendingUp,
    title: "Google Ads",
    subtitle: "Instant Traffic & Leads",
    description: "Drive immediate traffic and leads with strategically crafted Google Ads campaigns. From Search to Display to YouTube, we cover all channels.",
    features: [
      "Search Campaign Management",
      "Display Network Advertising",
      "YouTube Video Ads",
      "Shopping Campaigns",
      "Remarketing Strategies",
      "Bid Management & Optimization",
    ],
    color: "bg-primary",
  },
  {
    id: "web",
    icon: Code,
    title: "Web Development",
    subtitle: "Websites That Convert",
    description: "Custom-built websites that not only look stunning but are optimized for conversions. From simple landing pages to complex e-commerce stores.",
    features: [
      "Custom Website Design",
      "Responsive Development",
      "E-commerce Solutions",
      "Landing Page Creation",
      "Website Speed Optimization",
      "Maintenance & Support",
    ],
    color: "bg-success",
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Marketing",
    subtitle: "Content That Engages",
    description: "High-quality content that educates, entertains, and converts. We create compelling narratives that establish your brand as an industry authority.",
    features: [
      "Blog & Article Writing",
      "Video Content Production",
      "Infographic Design",
      "Email Marketing Campaigns",
      "Case Study Development",
      "Content Strategy Planning",
    ],
    color: "bg-accent",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <span className="text-secondary-foreground/80 font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mt-4 mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Comprehensive digital marketing solutions designed to help your business 
            grow online and achieve measurable results.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">{service.subtitle}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link to="/contact">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <Card className={`border-0 shadow-xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-lg mb-6">What's Included</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation and we'll analyze your business needs to recommend 
            the best digital marketing strategy for you.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8" asChild>
            <Link to="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
