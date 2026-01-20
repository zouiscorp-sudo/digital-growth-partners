-- Remove the public SELECT policy that exposes customer lead data
DROP POLICY IF EXISTS "Public can view leads for now" ON public.leads;

-- Note: The INSERT policy "Anyone can submit leads" is intentional for a public contact form
-- Leads should be managed through a backend admin interface, not directly queryable