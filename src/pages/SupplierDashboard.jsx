import React, { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Phone,
  TrendingUp,
  Package,
  Users,
  DollarSign
} from "lucide-react";

function SupplierDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  // Profile modal state
  const [showProfile, setShowProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState('');

  const vendors = [
    {
      id: 1,
      name: "Pani Puri Vendor",
      type: "Street Food",
      location: "Dadar, Mumbai",
      phone: "+91 98765 43210",
      needs: ["Puris", "Sev", "Mint Chutney", "Tamarind Water"],
      budget: "₹500-1500/day",
      orders: 45,
      rating: 4.8,
      image: "🧑‍🍳"
    },
    {
      id: 2,
      name: "Vada Pav Corner",
      type: "Snack Vendor",
      location: "Andheri, Mumbai",
      phone: "+91 87654 32109",
      needs: ["Pav Bread", "Potato", "Green Chutney", "Oil"],
      budget: "₹800-2000/day",
      orders: 62,
      rating: 4.6,
      image: "👨‍🍳"
    },
    {
      id: 3,
      name: "Dosa Cart",
      type: "South Indian",
      location: "T Nagar, Chennai",
      phone: "+91 99887 11223",
      needs: ["Dosa Batter", "Coconut", "Sambar Dal", "Masala Spices"],
      budget: "₹1000-3000/day",
      orders: 78,
      rating: 4.7,
      image: "🍛"
    },
    {
      id: 4,
      name: "Chole Bhature Stand",
      type: "North Indian",
      location: "Karol Bagh, Delhi",
      phone: "+91 90123 45678",
      needs: ["Chole", "Bhature Dough", "Pickle", "Onions"],
      budget: "₹800-2200/day",
      orders: 54,
      rating: 4.5,
      image: "🍲"
    },
    {
      id: 5,
      name: "Kathi Roll Kiosk",
      type: "Kolkata Style",
      location: "Park Street, Kolkata",
      phone: "+91 70000 11122",
      needs: ["Paratha", "Eggs", "Chicken", "Green Chutney"],
      budget: "₹900-2500/day",
      orders: 39,
      rating: 4.4,
      image: "🌯"
    },
    {
      id: 6,
      name: "Idli Vada Center",
      type: "South Indian",
      location: "Basavanagudi, Bangalore",
      phone: "+91 93333 99887",
      needs: ["Idli Batter", "Vada Mix", "Coconut", "Curry Leaves"],
      budget: "₹700-1900/day",
      orders: 68,
      rating: 4.6,
      image: "🍥"
    },
    {
      id: 7,
      name: "Samosa Junction",
      type: "North Indian Snacks",
      location: "Lal Chowk, Srinagar",
      phone: "+91 94455 12345",
      needs: ["Maida", "Potatoes", "Peas", "Spices"],
      budget: "₹500-1300/day",
      orders: 33,
      rating: 4.3,
      image: "🥟"
    },
    {
      id: 8,
      name: "Chaat Express",
      type: "Mixed Chaat",
      location: "SG Highway, Ahmedabad",
      phone: "+91 95566 11234",
      needs: ["Papdi", "Curd", "Boiled Potatoes", "Chutneys"],
      budget: "₹600-1600/day",
      orders: 59,
      rating: 4.5,
      image: "🍽️"
    }
  ];
  
  const myStats = {
    activeVendors: 23,
    monthlyRevenue: "₹1.2L",
    avgRating: 4.6,
    deliveries: 156
  };

  const handleContact = (vendor) => {
    setSelectedVendor(vendor);
    setModalType('contact');
    setShowModal(true);
  };

  const handleQuote = (vendor) => {
    setSelectedVendor(vendor);
    setModalType('quote');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.needs.some(need => need.toLowerCase().includes(searchQuery.toLowerCase())) ||
    vendor.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowProfile(false)}>&times;</button>
            {!isAuthenticated ? (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (isSignup && !authForm.name) {
                    setAuthError('Name is required for sign up.');
                    return;
                  }
                  if (!authForm.email || !authForm.password) {
                    setAuthError('Email and password are required.');
                    return;
                  }
                  setAuthError('');
                  setIsAuthenticated(true);
                  setProfile({ name: authForm.name || 'Supplier', email: authForm.email });
                  setShowProfile(false);
                }} className="space-y-4">
                  {isSignup && (
                    <div>
                      <label className="block mb-1 font-medium">Name</label>
                      <input type="text" name="name" value={authForm.name} onChange={e => setAuthForm(f => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Your Name" />
                    </div>
                  )}
                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input type="email" name="email" value={authForm.email} onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input type="password" name="password" value={authForm.password} onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Password" />
                  </div>
                  {authError && <div className="text-red-500 text-sm">{authError}</div>}
                  <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>
                <div className="mt-4 text-center">
                  <button className="text-orange-600 hover:underline text-sm" onClick={() => { setIsSignup(s => !s); setAuthError(''); }}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Profile</h2>
                <div className="mb-4">
                  <div className="font-semibold text-lg">{profile.name}</div>
                  <div className="text-gray-600">{profile.email}</div>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => { setIsAuthenticated(false); setProfile({ name: '', email: '' }); setAuthForm({ name: '', email: '', password: '' }); setShowProfile(false); }}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
              <span className="text-amber-500">V</span>2
              <span className="text-green-600">S</span>
            </h1>
            <span className="hidden md:inline-block text-sm font-semibold text-gray-500">
              Vendor to Supplier
            </span>
          </div>

          {/* Help line + profile */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">📞 Help Line: 1800-V2S</span>
            <button className="text-orange-600 font-medium hover:underline" onClick={() => setShowProfile(true)}>👤 Profile</button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto p-6">

        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, User! 🙌</h2>
          <p className="text-gray-600 text-lg">Street food vendors looking for quality supplies at the best prices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{myStats.activeVendors}</div>
                <div className="text-sm text-gray-600">Active Vendors</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{myStats.monthlyRevenue}</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{myStats.avgRating}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{myStats.deliveries}</div>
                <div className="text-sm text-gray-600">Deliveries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors by name, location or required items..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{vendor.image}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-orange-600 font-medium">{vendor.type}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                      <span>•</span>
                      <span>{vendor.orders} orders</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Daily Budget</div>
                  <div className="font-bold text-green-600">{vendor.budget}</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Required Items:</div>
                  <div className="flex flex-wrap gap-2">
                    {vendor.needs.map(need => (
                      <span key={need} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleContact(vendor)}
                  className="flex-1 bg-orange-600 text-white py-2.5 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  📞 Contact Now
                </button>
                <button 
                  onClick={() => handleQuote(vendor)}
                  className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  💰 Send Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm font-medium">Add New Product</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center">
              <div className="text-2xl mb-2">💵</div>
              <div className="text-sm font-medium">Update Prices</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">View Analytics</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium">Marketing Tools</div>
            </button>
          </div>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-white/10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {modalType === 'contact' ? '📞 Contact Vendor' : '💰 Send Quote'}
            </h3>
            
            {selectedVendor && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{selectedVendor.image}</span>
                  <div>
                    <h4 className="font-semibold">{selectedVendor.name}</h4>
                    <p className="text-sm text-gray-600">{selectedVendor.location}</p>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'contact' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{selectedVendor?.phone}</span>
                </div>
                <button 
                  onClick={() => window.open(`tel:${selectedVendor?.phone}`)}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
                >
                  Call Now
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/${selectedVendor?.phone.replace(/[^0-9]/g, '')}`)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  WhatsApp
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  placeholder="Enter your quote details..."
                  className="w-full h-24 p-3 border rounded-lg resize-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Price (e.g., ₹100 per kg)"
                  className="w-full p-3 border rounded-lg text-sm"
                />
                <button 
                  onClick={() => {
                    alert('Quote sent successfully!');
                    closeModal();
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Send Quote
                </button>
              </div>
            )}

            <button 
              onClick={closeModal}
              className="w-full mt-3 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierDashboard;