-- Create waitlist_leads table
CREATE TABLE public.waitlist_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (anyone can submit to waitlist)
CREATE POLICY "Anyone can insert waitlist leads"
ON public.waitlist_leads
FOR INSERT
WITH CHECK (true);

-- Create policy to prevent public reads (only service role can read)
CREATE POLICY "No public read access"
ON public.waitlist_leads
FOR SELECT
USING (false);

-- Add index on email for faster lookups
CREATE INDEX idx_waitlist_leads_email ON public.waitlist_leads(email);

-- Add index on created_at for ordering
CREATE INDEX idx_waitlist_leads_created_at ON public.waitlist_leads(created_at DESC);