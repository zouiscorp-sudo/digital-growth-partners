import { Layout } from "@/components/layout/Layout";
import { Check, X, ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlanFeature {
  name: string;
  included: boolean;
}

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
  const { data: plans, isLoading, error } = useQuery({
    queryKey: ['pricing-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">Pricing</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Choose a plan that fits your business needs. All plans include dedicated support 
            and transparent monthly reporting.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-background -mt-8 md:-mt-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">
              Error loading pricing plans. Please try again later.
            </div>
          ) : plans && plans.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const features = (plan.features as unknown as PlanFeature[]) || [];
                return (
                  <Card 
                    key={plan.id}
                    className={`relative border-2 ${plan.is_popular ? 'border-primary shadow-2xl sm:scale-105' : 'border-border shadow-lg'}`}
                  >
                    {plan.is_popular && (
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
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
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
                        className={`w-full ${plan.is_popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        variant={plan.is_popular ? 'default' : 'outline'}
                        size="lg"
                        asChild
                      >
                        <Link to="/contact">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No pricing plans available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 px-2">
              Every business is unique. Let's create a custom package tailored specifically to your goals and budget.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Got questions? We've got answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium">
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