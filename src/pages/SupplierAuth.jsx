import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SupplierAuth() {
  const { signUp, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    business_name: '',
    products: '',
    phone: '',
    location: '',
    price_range: '',
    delivery_time: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignup && !form.name) {
      setError('Name is required for sign up.');
      return;
    }
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      if (isSignup) {
        const { data, error } = await signUp(form.email, form.password, {
          name: form.name,
          user_type: 'supplier',
          business_name: form.business_name,
          products: form.products.split(',').map(p => p.trim()).filter(p => p),
          phone: form.phone,
          location: form.location,
          price_range: form.price_range,
          delivery_time: form.delivery_time
        });

        if (error) {
          setError(error.message);
        } else {
          setSuccess('Sign up successful! Please check your email to verify your account.');
          setForm({ 
            name: '', 
            email: '', 
            password: '',
            business_name: '',
            products: '',
            phone: '',
            location: '',
            price_range: '',
            delivery_time: ''
          });
        }
      } else {
        const { data, error } = await signIn(form.email, form.password);
        
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Sign in successful!');
          navigate('/supplier');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? 'Supplier Sign Up' : 'Supplier Sign In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Business Name</label>
                <input
                  type="text"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Business Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Products (comma separated)</label>
                <input
                  type="text"
                  name="products"
                  value={form.products}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Pani Puri, Sev, Masala Powder, Chutneys"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price Range</label>
                <input
                  type="text"
                  name="price_range"
                  value={form.price_range}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="₹25-80/kg"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Delivery Time</label>
                <select
                  name="delivery_time"
                  value={form.delivery_time}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Delivery Time</option>
                  <option value="Same Day">Same Day</option>
                  <option value="4-6 hours">4-6 hours</option>
                  <option value="Next Day">Next Day</option>
                  <option value="1-2 days">1-2 days</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Password"
              required
              minLength="6"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-green-600 hover:underline text-sm"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setSuccess('');
            }}
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierAuth;