import { supabase } from '../supabaseClient';

export const orderService = {
  // Create new order
  async createOrder(orderData) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get orders for vendor
  async getVendorOrders(vendorId) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          suppliers (
            business_name,
            profiles (
              name,
              phone
            )
          )
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get orders for supplier
  async getSupplierOrders(supplierId) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          vendors (
            business_name,
            profiles (
              name,
              phone
            )
          )
        `)
        .eq('supplier_id', supplierId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};