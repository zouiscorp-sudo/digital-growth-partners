-- Create storage bucket for team member photos
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);

-- Storage policies for team photos
CREATE POLICY "Team photos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'team-photos');
CREATE POLICY "Admins can upload team photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update team photos" ON storage.objects FOR UPDATE USING (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete team photos" ON storage.objects FOR DELETE USING (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));