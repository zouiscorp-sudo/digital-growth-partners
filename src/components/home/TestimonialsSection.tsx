import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  company: string | null;
  position: string | null;
}

// Fallback testimonials for when no database reviews exist
const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Rajesh Kumar",
    position: "CEO",
    company: "TechStart Solutions",
    review: "Attur Media Crew transformed our online presence. Our website traffic increased by 300% within 6 months of working with them. Their SEO strategies are top-notch!",
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Priya Sharma",
    position: "Founder",
    company: "Bloom Boutique",
    review: "The social media marketing team is incredibly creative. They understand our brand voice perfectly and have helped us build a loyal community of followers.",
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Mohammed Ali",
    position: "Director",
    company: "Fresh Foods Ltd",
    review: "Our Meta Ads campaigns deliver exceptional ROI. The team's data-driven approach and constant optimization have significantly reduced our cost per acquisition.",
    rating: 5,
  },
  {
    id: "fallback-4",
    name: "Lakshmi Venkat",
    position: "Owner",
    company: "Heritage Crafts",
    review: "The e-commerce website they built for us is beautiful and converts visitors into customers. Our online sales have doubled since the launch.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['approved-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, name, rating, review, company, position')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as Review[];
    },
  });

  const testimonials = reviews && reviews.length > 0 ? reviews : fallbackTestimonials;

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2].map((i) => (
              <Card key={i} className="h-full border-0 shadow-lg bg-card">
                <CardContent className="p-8">
                  <Skeleton className="w-10 h-10 mb-4" />
                  <Skeleton className="h-24 mb-6" />
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <Card className="h-full border-0 shadow-lg bg-card">
                    <CardContent className="p-8">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-foreground/90 mb-6 leading-relaxed italic">
                        "{testimonial.review}"
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.position && testimonial.company 
                            ? `${testimonial.position}, ${testimonial.company}`
                            : testimonial.company || testimonial.position || ''}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        )}
      </div>
    </section>
  );
};