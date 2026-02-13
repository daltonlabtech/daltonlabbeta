
-- Explicitly deny all INSERT, UPDATE, DELETE for public/anon users
CREATE POLICY "No public insert access"
ON public.waitlist_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "No public update access"
ON public.waitlist_leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public delete access"
ON public.waitlist_leads
FOR DELETE
TO anon, authenticated
USING (false);
