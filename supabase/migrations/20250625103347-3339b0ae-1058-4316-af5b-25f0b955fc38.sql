
-- Create a table to track successful logins
CREATE TABLE public.login_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  login_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.login_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own login logs
CREATE POLICY "Users can view their own login logs" 
  ON public.login_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for inserting login logs (service role only)
CREATE POLICY "Service role can insert login logs" 
  ON public.login_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_login_logs_user_id ON public.login_logs(user_id);
CREATE INDEX idx_login_logs_timestamp ON public.login_logs(login_timestamp DESC);
