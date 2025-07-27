/*
  # Create user profiles and authentication system

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `user_type` (text, either 'vendor' or 'supplier')
      - `phone` (text, optional)
      - `location` (text, optional)
      - `business_name` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `suppliers`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `business_name` (text)
      - `products` (text array)
      - `price_range` (text)
      - `delivery_time` (text)
      - `min_order` (text)
      - `payment_terms` (text)
      - `verified` (boolean)
      - `rating` (decimal)
      - `total_orders` (integer)
      - `created_at` (timestamp)

    - `vendors`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `business_name` (text)
      - `business_type` (text)
      - `daily_budget` (text)
      - `required_items` (text array)
      - `created_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, references vendors)
      - `supplier_id` (uuid, references suppliers)
      - `items` (jsonb)
      - `total_amount` (decimal)
      - `status` (text)
      - `order_type` (text)
      - `payment_terms` (text)
      - `delivery_date` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Add policies for vendors and suppliers to interact appropriately
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('vendor', 'supplier')),
  phone text,
  location text,
  business_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  products text[] DEFAULT '{}',
  price_range text DEFAULT '',
  delivery_time text DEFAULT '',
  min_order text DEFAULT '',
  payment_terms text DEFAULT 'NET 30',
  verified boolean DEFAULT false,
  rating decimal DEFAULT 0.0,
  total_orders integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text DEFAULT '',
  daily_budget text DEFAULT '',
  required_items text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE CASCADE,
  items jsonb DEFAULT '[]',
  total_amount decimal DEFAULT 0.0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  order_type text DEFAULT 'immediate' CHECK (order_type IN ('immediate', 'scheduled')),
  payment_terms text DEFAULT 'NET 30',
  delivery_date text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Suppliers policies
CREATE POLICY "Anyone can read suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Suppliers can manage own data"
  ON suppliers
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

-- Vendors policies
CREATE POLICY "Vendors can read own data"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Vendors can manage own data"
  ON vendors
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

-- Orders policies
CREATE POLICY "Users can read their orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (SELECT id FROM vendors WHERE profile_id = auth.uid()) OR
    supplier_id IN (SELECT id FROM suppliers WHERE profile_id = auth.uid())
  );

CREATE POLICY "Vendors can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE profile_id = auth.uid()));

CREATE POLICY "Users can update their orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    vendor_id IN (SELECT id FROM vendors WHERE profile_id = auth.uid()) OR
    supplier_id IN (SELECT id FROM suppliers WHERE profile_id = auth.uid())
  );

-- Function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'vendor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();