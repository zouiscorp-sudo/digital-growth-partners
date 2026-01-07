import { Layout } from "@/components/layout/Layout";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    period: "/month",
    description: "Perfect for small businesses starting their digital journey",
    popular: false,
    features: [
      { name: "Social Media Management (2 platforms)", included: true },
      { name: "Basic SEO Setup", included: true },
      { name: "4 Social Media Posts/Week", included: true },
      { name: "Monthly Analytics Report", included: true },
      { name: "Email Support", included: true },
      { name: "Paid Advertising", included: false },
      { name: "Web Development", included: false },
      { name: "Content Marketing", included: false },
    ],
  },
  {
    name: "Growth",
    price: "₹35,000",
    period: "/month",
    description: "Ideal for growing businesses ready to scale their online presence",
    popular: true,
    features: [
      { name: "Social Media Management (4 platforms)", included: true },
      { name: "Complete SEO Package", included: true },
      { name: "Daily Social Media Posts", included: true },
      { name: "Weekly Analytics Report", included: true },
      { name: "Priority Email & Phone Support", included: true },
      { name: "Meta Ads Management (₹20K budget)", included: true },
      { name: "Landing Page Development", included: true },
      { name: "Blog Content (4 articles/month)", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-service solution for established businesses",
    popular: false,
    features: [
      { name: "All Social Platforms", included: true },
      { name: "Advanced SEO & Technical Audit", included: true },
      { name: "Unlimited Social Media Posts", included: true },
      { name: "Real-time Dashboard Access", included: true },
      { name: "Dedicated Account Manager", included: true },
      { name: "Full Paid Ads Management", included: true },
      { name: "Complete Website Development", included: true },
      { name: "Full Content Marketing Suite", included: true },
    ],
  },
];

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "SEO typically takes 3-6 months for significant results. Paid advertising can show results within weeks. Social media growth varies but you'll see engagement improvements within the first month.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can change your plan at any time. Changes take effect from the next billing cycle. We'll help ensure a smooth transition.",
  },
  {
    question: "What's included in the ad budget?",
    answer: "The ad budget mentioned is what we recommend for optimal results. This is separate from our management fee. We manage how this budget is spent across platforms.",
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes! We understand every business is unique. Contact us for a custom package tailored to your specific needs and budget.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with businesses across all industries including retail, healthcare, education, real estate, hospitality, and more. Our strategies are customized for each sector.",
  },
  {
    question: "Is there a minimum contract period?",
    answer: "We recommend a minimum of 3 months to see meaningful results, especially for SEO. However, we offer flexible monthly contracts with no long-term commitments.",
  },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a plan that fits your business needs. All plans include dedicated support 
            and transparent monthly reporting.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative border-2 ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'border-border shadow-lg'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/60'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link to="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-6">
              Every business is unique. Let's create a custom package tailored specifically to your goals and budget.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
