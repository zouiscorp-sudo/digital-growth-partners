-- Add status column to leads table
ALTER TABLE public.leads 
ADD COLUMN status text NOT NULL DEFAULT 'pending';

-- Add check constraint for valid status values
ALTER TABLE public.leads 
ADD CONSTRAINT leads_status_check CHECK (status IN ('pending', 'note', 'process', 'approve', 'decline'));