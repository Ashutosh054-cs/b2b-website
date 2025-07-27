import { supabase } from '../supabaseClient';

export const authService = {
  // Sign up new user
  async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            user_type: userData.user_type
          }
        }
      });

      if (error) throw error;

      // Create additional profile data if needed
      if (data.user && userData.user_type === 'supplier') {
        await this.createSupplierProfile(data.user.id, userData);
      } else if (data.user && userData.user_type === 'vendor') {
        await this.createVendorProfile(data.user.id, userData);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create supplier profile
  async createSupplierProfile(userId, userData) {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert({
          profile_id: userId,
          business_name: userData.business_name || userData.name,
          products: userData.products || [],
          price_range: userData.price_range || '',
          delivery_time: userData.delivery_time || 'Same Day',
          verified: false
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create vendor profile
  async createVendorProfile(userId, userData) {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .insert({
          profile_id: userId,
          business_name: userData.business_name || userData.name,
          business_type: userData.business_type || 'Street Food',
          daily_budget: userData.daily_budget || '',
          required_items: userData.required_items || []
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update profile
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};