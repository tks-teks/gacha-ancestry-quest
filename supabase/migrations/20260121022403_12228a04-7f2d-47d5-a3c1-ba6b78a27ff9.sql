-- Create guestbook_entries table for the digital guestbook
CREATE TABLE public.guestbook_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  object_id TEXT NOT NULL,
  visitor_name TEXT NOT NULL,
  message TEXT NOT NULL,
  emotion TEXT NOT NULL CHECK (emotion IN ('love', 'amazed', 'thoughtful', 'inspired', 'moved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view guestbook entries (public museum experience)
CREATE POLICY "Anyone can view guestbook entries" 
ON public.guestbook_entries 
FOR SELECT 
USING (true);

-- Allow anyone to add guestbook entries (anonymous visitors)
CREATE POLICY "Anyone can add guestbook entries" 
ON public.guestbook_entries 
FOR INSERT 
WITH CHECK (true);

-- Add index for faster queries by object
CREATE INDEX idx_guestbook_object_id ON public.guestbook_entries(object_id);

-- Add index for ordering by date
CREATE INDEX idx_guestbook_created_at ON public.guestbook_entries(created_at DESC);