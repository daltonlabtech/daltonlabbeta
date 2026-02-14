CREATE POLICY "Allow anonymous waitlist signups"
ON public.waitlist_leads FOR INSERT
TO anon
WITH CHECK (
  email IS NOT NULL AND
  name IS NOT NULL AND
  phone IS NOT NULL AND
  product IS NOT NULL AND
  source IS NOT NULL
);