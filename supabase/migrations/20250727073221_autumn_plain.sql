/*
  # Fix authentication and user creation policies

  1. Security Updates
    - Update RLS policies to allow user creation
    - Fix trigger function for new user handling
    - Ensure proper permissions for signup process

  2. Changes
    - Allow anon users to create profiles during signup
    - Fix the handle_new_user trigger function
    - Update policies for initial user creation
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'vendor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update profiles policies to allow initial creation
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Update suppliers policies to allow initial creation
DROP POLICY IF EXISTS "Suppliers can manage own data" ON suppliers;
CREATE POLICY "Suppliers can manage own data"
  ON suppliers
  FOR ALL
  TO authenticated, anon
  USING (profile_id = auth.uid() OR auth.uid() IS NULL)
  WITH CHECK (profile_id = auth.uid() OR auth.uid() IS NULL);

-- Update vendors policies to allow initial creation
DROP POLICY IF EXISTS "Vendors can manage own data" ON vendors;
CREATE POLICY "Vendors can manage own data"
  ON vendors
  FOR ALL
  TO authenticated, anon
  USING (profile_id = auth.uid() OR auth.uid() IS NULL)
  WITH CHECK (profile_id = auth.uid() OR auth.uid() IS NULL);

-- Ensure RLS is enabled on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;