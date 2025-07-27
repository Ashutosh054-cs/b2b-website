import { supabase } from '../supabaseClient';

export const supplierService = {
  // Get all suppliers
  async getAllSuppliers() {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          *,
          profiles (
            name,
            email,
            phone,
            location
          )
        `)
        .eq('verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get supplier by ID
  async getSupplierById(id) {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          *,
          profiles (
            name,
            email,
            phone,
            location
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Search suppliers
  async searchSuppliers(query) {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          *,
          profiles (
            name,
            email,
            phone,
            location
          )
        `)
        .or(`business_name.ilike.%${query}%,products.cs.{${query}}`)
        .eq('verified', true);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};