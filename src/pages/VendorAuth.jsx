
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function VendorAuth() {
  const { signUp, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    business_name: '',
    business_type: '',
    phone: '',
    location: ''
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
          user_type: 'vendor',
          business_name: form.business_name,
          business_type: form.business_type,
          phone: form.phone,
          location: form.location
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
            business_type: '',
            phone: '',
            location: ''
          });
        }
      } else {
        const { data, error } = await signIn(form.email, form.password);
        
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Sign in successful!');
          navigate('/vendor');
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
          {isSignup ? 'Vendor Sign Up' : 'Vendor Sign In'}
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
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Business Type</label>
                <select
                  name="business_type"
                  value={form.business_type}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Business Type</option>
                  <option value="Street Food">Street Food</option>
                  <option value="Snack Vendor">Snack Vendor</option>
                  <option value="South Indian">South Indian</option>
                  <option value="North Indian">North Indian</option>
                  <option value="Mixed Chaat">Mixed Chaat</option>
                  <option value="Other">Other</option>
                </select>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline text-sm"
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

export default VendorAuth;