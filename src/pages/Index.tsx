import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ReviewForm } from "@/components/home/ReviewForm";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <TestimonialsSection />
      <ReviewForm />
      <CTASection />
    </Layout>
  );
};

export default Index;
