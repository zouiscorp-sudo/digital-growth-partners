import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';
import { z } from 'zod';

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  review: z.string().trim().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  position: z.string().trim().max(100, "Position must be less than 100 characters").optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export const ReviewForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: '',
    company: '',
    position: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hoveredRating, setHoveredRating] = useState(0);

  const submitMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const { error } = await supabase.from('reviews').insert({
        name: data.name,
        email: data.email,
        rating: data.rating,
        review: data.review,
        company: data.company || null,
        position: data.position || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', rating: 0, review: '', company: '', position: '' });
    },
    onError: (error) => {
      toast({
        title: 'Error submitting review',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse(formData);
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

    submitMutation.mutate(result.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-12">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You for Your Review!</h3>
              <p className="text-muted-foreground mb-6">
                Your review has been submitted and is pending approval. We appreciate your feedback!
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Share Your Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Leave a <span className="text-primary">Review</span>
          </h2>
          <p className="text-muted-foreground">
            Your feedback helps us improve and helps others make informed decisions.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
            <CardDescription>Share your experience working with us</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || formData.rating)
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-destructive text-sm">{errors.rating}</p>}
              </div>

              {/* Name and Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                </div>
              </div>

              {/* Company and Position (Optional) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={errors.company ? 'border-destructive' : ''}
                  />
                  {errors.company && <p className="text-destructive text-sm">{errors.company}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position (Optional)</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Your job title"
                    className={errors.position ? 'border-destructive' : ''}
                  />
                  {errors.position && <p className="text-destructive text-sm">{errors.position}</p>}
                </div>
              </div>

              {/* Review */}
              <div className="space-y-2">
                <Label htmlFor="review">Your Review *</Label>
                <Textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  className={errors.review ? 'border-destructive' : ''}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.review ? (
                    <p className="text-destructive">{errors.review}</p>
                  ) : (
                    <span>Minimum 10 characters</span>
                  )}
                  <span>{formData.review.length}/1000</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Your review will be visible after admin approval.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};