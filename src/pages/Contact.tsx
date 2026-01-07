import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Link } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const services = [
  "SEO Services",
  "Social Media Marketing",
  "Meta Ads (Facebook/Instagram)",
  "Google Ads",
  "Web Development",
  "Content Marketing",
  "Complete Digital Marketing",
  "Other",
];

const budgets = [
  "Under ₹15,000/month",
  "₹15,000 - ₹35,000/month",
  "₹35,000 - ₹75,000/month",
  "₹75,000+/month",
  "Not Sure Yet",
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    content: "Attur, Salem District, Tamil Nadu, India - 636102",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email",
    content: "hello@atturmediacrew.com",
    href: "mailto:hello@atturmediacrew.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        service: formData.service,
        budget: formData.budget || null,
        message: formData.message.trim(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="relative py-24 bg-background min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Thank You for Contacting Us!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                We've received your message and will get back to you within 24 hours. 
                In the meantime, feel free to explore our services.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Let's <span className="text-primary">Talk</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to grow your business online? Fill out the form below and we'll 
            get back to you within 24 hours with a free consultation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                          <SelectTrigger className={errors.service ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-destructive text-sm">{errors.service}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Monthly Budget (Optional)</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions? We'd love to hear from you. Reach out through any of the channels below.
              </p>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border-0 shadow-lg">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.href ? (
                          <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Card className="border-0 shadow-lg bg-success text-success-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Prefer WhatsApp?</h3>
                  <p className="text-success-foreground/80 text-sm mb-4">
                    Chat with us directly for quick responses
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <a 
                      href={`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I'm interested in your digital marketing services.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
