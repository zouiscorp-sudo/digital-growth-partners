import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechStart Solutions",
    content: "Attur Media Crew transformed our online presence. Our website traffic increased by 300% within 6 months of working with them. Their SEO strategies are top-notch!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder, Bloom Boutique",
    content: "The social media marketing team is incredibly creative. They understand our brand voice perfectly and have helped us build a loyal community of followers.",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    role: "Director, Fresh Foods Ltd",
    content: "Our Meta Ads campaigns deliver exceptional ROI. The team's data-driven approach and constant optimization have significantly reduced our cost per acquisition.",
    rating: 5,
  },
  {
    name: "Lakshmi Venkat",
    role: "Owner, Heritage Crafts",
    content: "The e-commerce website they built for us is beautiful and converts visitors into customers. Our online sales have doubled since the launch.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <Card className="h-full border-0 shadow-lg bg-card">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-foreground/90 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};
