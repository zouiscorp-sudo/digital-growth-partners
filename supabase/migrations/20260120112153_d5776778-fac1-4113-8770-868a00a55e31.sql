-- Drop the existing constraint first
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;

-- Update any existing 'note' statuses to 'done'
UPDATE public.leads SET status = 'done' WHERE status = 'note';

-- Add new constraint with 'done' instead of 'note'
ALTER TABLE public.leads ADD CONSTRAINT leads_status_check CHECK (status IN ('pending', 'done', 'process', 'approve', 'decline'));