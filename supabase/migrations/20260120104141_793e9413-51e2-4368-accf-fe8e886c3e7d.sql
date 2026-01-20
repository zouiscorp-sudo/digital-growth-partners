-- Step 1: Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Step 2: Create user_roles table (separate from users for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Step 3: Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 5: RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Step 6: Create services table for dynamic service management
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Megaphone',
    color TEXT NOT NULL DEFAULT 'bg-primary/10',
    features TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Step 7: Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Step 8: RLS policies for services - public read, admin write
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all services"
ON public.services
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert services"
ON public.services
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
ON public.services
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
ON public.services
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 9: Update leads table - only admins can view/manage leads
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 10: Create trigger for updated_at on services
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Step 11: Insert default services from current hardcoded data
INSERT INTO public.services (title, subtitle, description, icon, color, features, display_order) VALUES
('Social Media Marketing', 'Build Your Digital Presence', 'Transform your social media presence with data-driven strategies that engage your audience and drive real business results.', 'Megaphone', 'bg-primary/10', ARRAY['Platform strategy & optimization', 'Content calendar planning', 'Engagement & community management', 'Analytics & reporting', 'Paid social campaigns'], 1),
('Content Creation', 'Visual Storytelling', 'Capture attention with stunning visual content that tells your brand story and resonates with your target audience.', 'Camera', 'bg-accent/10', ARRAY['Professional photography', 'Video production & editing', 'Motion graphics & animation', 'Brand visual identity', 'Product photography'], 2),
('Digital Advertising', 'Maximize Your ROI', 'Reach your ideal customers with precision-targeted advertising campaigns across Google, Facebook, Instagram, and more.', 'Target', 'bg-success/10', ARRAY['Google Ads management', 'Social media advertising', 'Display & remarketing', 'Landing page optimization', 'A/B testing & optimization'], 3),
('SEO & Analytics', 'Data-Driven Growth', 'Improve your search rankings and understand your audience with comprehensive SEO and analytics services.', 'BarChart', 'bg-secondary/10', ARRAY['Technical SEO audits', 'Keyword research & strategy', 'On-page optimization', 'Performance tracking', 'Competitor analysis'], 4),
('Branding & Design', 'Crafting Unique Identities', 'Create a memorable brand identity that stands out in the market and connects emotionally with your audience.', 'Palette', 'bg-primary/10', ARRAY['Logo design', 'Brand guidelines', 'Marketing collateral', 'Packaging design', 'Brand strategy'], 5),
('Influencer Marketing', 'Leverage Social Influence', 'Partner with the right influencers to amplify your brand message and reach new engaged audiences.', 'Users', 'bg-accent/10', ARRAY['Influencer identification', 'Campaign management', 'Content collaboration', 'Performance tracking', 'Relationship management'], 6);