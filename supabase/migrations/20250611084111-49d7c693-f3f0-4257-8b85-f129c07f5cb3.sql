
-- Create user profiles table to store additional user information
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  department text,
  employee_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Enable RLS on existing tables
ALTER TABLE public.playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raci_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for playbooks (public read access)
CREATE POLICY "Anyone can view playbooks" 
  ON public.playbooks 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for process_steps (public read access)
CREATE POLICY "Anyone can view process steps" 
  ON public.process_steps 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for process_map (public read access)
CREATE POLICY "Anyone can view process map" 
  ON public.process_map 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for raci_matrix (public read access)
CREATE POLICY "Anyone can view raci matrix" 
  ON public.raci_matrix 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for certification_scores (users can view/insert their own scores)
CREATE POLICY "Users can view their own certification scores" 
  ON public.certification_scores 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can insert their own certification scores" 
  ON public.certification_scores 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, department, employee_id)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'department',
    new.raw_user_meta_data ->> 'employee_id'
  );
  RETURN new;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
