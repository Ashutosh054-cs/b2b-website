import React, { useState } from "react";
import {
  Search, Star, MapPin, Phone, Package, Heart, Award
} from "lucide-react";

function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const suppliers = [
    {
      id: 1,
      name: "Mumbai Pani Puri Masala Co.",
      rating: 4.9,
      location: "Mumbai, Maharashtra",
      phone: "+91 98765 43210",
      products: ["Pani Puri", "Sev", "Masala Powder", "Chutneys"],
      price: "₹25-80/kg",
      delivery: "Same Day",
      verified: true,
      image: "🫓"
    },
    {
      id: 2,
      name: "Delhi Bread & Pav Suppliers",
      rating: 4.7,
      location: "Delhi NCR",
      phone: "+91 87654 32109",
      products: ["Pav Bread", "Bun", "Roti", "Naan"],
      price: "₹15-45/dozen",
      delivery: "4-6 hours",
      verified: true,
      image: "🍞"
    },
    {
      id: 3,
      name: "Kolkata Golgappa House",
      rating: 4.8,
      location: "Kolkata, West Bengal",
      phone: "+91 76543 21098",
      products: ["Golgappa", "Phuchka", "Tamarind Water", "Spices"],
      price: "₹30-60/100pcs",
      delivery: "Next Day",
      verified: true,
      image: "🥟"
    },
    {
      id: 4,
      name: "Chennai Dosa Batter Co.",
      rating: 4.6,
      location: "Chennai, Tamil Nadu",
      phone: "+91 65432 10987",
      products: ["Dosa Batter", "Idli Batter", "Coconut Chutney", "Sambar Mix"],
      price: "₹40-120/kg",
      delivery: "Same Day",
      verified: true,
      image: "🥞"
    },
    {
      id: 5,
      name: "Pune Vada Pav Essentials",
      rating: 4.5,
      location: "Pune, Maharashtra",
      phone: "+91 54321 09876",
      products: ["Vada Mix", "Pav", "Green Chutney", "Fried Chilli"],
      price: "₹20-70/kg",
      delivery: "6-8 hours",
      verified: true,
      image: "🍔"
    },
    {
      id: 6,
      name: "Rajasthan Kachori Co.",
      rating: 4.4,
      location: "Jaipur, Rajasthan",
      phone: "+91 43210 98765",
      products: ["Kachori", "Dal Kachori", "Aloo Kachori", "Spice Mix"],
      price: "₹35-90/dozen",
      delivery: "1-2 days",
      verified: true,
      image: "🥙"
    }
  ];

  const orders = [
    { id: "ORD-001", supplier: "Mumbai Pani Puri Masala Co.", product: "Pani Puri - 500pcs", status: "Delivered", amount: "₹1,250" },
    { id: "ORD-002", supplier: "Delhi Bread & Pav Suppliers", product: "Pav Bread - 200pcs", status: "In Transit", amount: "₹600" }
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide">
              <span className="text-amber-500">V</span>2
              <span className="text-green-600">S</span>
            </h1>
            <span className="hidden md:inline-block text-sm font-semibold text-gray-500">
              Vendor to Supplier
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✓ Verified Vendor</span>
            <button className="text-gray-600">👤 Profile</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Namaste, Vendor! 🙏</h2>
          <p className="text-gray-600">Find trusted Indian street food suppliers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600">Active Orders</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">₹45K</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <div className="text-sm text-gray-600">Suppliers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">4.8⭐</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers or products (golgappa, pav, dosa...)"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{supplier.image}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{supplier.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{supplier.rating}</span>
                      {supplier.verified && <Award className="h-3 w-3 text-green-500 ml-1" />}
                    </div>
                  </div>
                </div>
                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>

              <div className="space-y-2 text-xs mb-3">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {supplier.location}
                </div>
                <div className="flex flex-wrap gap-1">
                  {supplier.products.slice(0, 2).map(product => (
                    <span key={product} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      {product}
                    </span>
                  ))}
                  {supplier.products.length > 2 && (
                                        <span className="text-orange-600 text-xs">+{supplier.products.length - 2}</span>
                                    )}
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Price: {supplier.price}</span>
                                    <span className="text-green-600 font-medium">🚚 {supplier.delivery}</span>
                                  </div>
                                </div>
                  
                                <div className="flex gap-2">
                                  <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700">
                                    Order Now
                                  </button>
                                  <button className="p-2 border rounded hover:bg-gray-50">
                                    <Phone className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                  
                          {/* Recent Orders */}
                          <div className="bg-white rounded-lg shadow-sm p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              Recent Orders
                            </h3>
                            <div className="space-y-2">
                              {orders.map(order => (
                                <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                                  <div>
                                    <span className="font-medium">{order.id}</span> - {order.product}
                                    <div className="text-xs text-gray-600">{order.supplier}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-green-600">{order.amount}</div>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {order.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  export default VendorDashboard;
                  