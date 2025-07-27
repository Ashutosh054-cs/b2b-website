import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

const testimonials = [
  {
    text: "V2S helped me find reliable suppliers for my chaat stall. Now I serve hygienic food and my sales have grown!",
    name: "Ramesh, Pani Puri Vendor (Delhi)",
  },
  {
    text: "Earlier, I struggled to find trusted vendors for my masala supplies. With V2S, my business is booming!",
    name: "Sunita, Supplier (Mumbai)",
  },
  {
    text: "I never thought finding reliable products could be this easy. V2S is a game changer!",
    name: "Arjun, Vada Pav Vendor (Pune)",
  },
];

function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-[30px] flex justify-between items-center shadow-md bg-white relative z-20">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide">
            <span className="text-amber-500">V</span>2
            <span className="text-green-600">S</span>
          </h1>
          <span className="hidden md:inline-block text-sm font-semibold text-gray-500">
            Vendor to Supplier
          </span>
        </div>

        <div className="hidden md:block">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            ✅ Trusted Premium
          </span>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-30"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="w-6 h-0.5 bg-black mb-1 rounded origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-black mb-1 rounded"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="w-6 h-0.5 bg-black rounded origin-center"
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-[30px] flex flex-col space-y-3 md:hidden z-20"
            >
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full w-max">
                ✅ Trusted Premium
              </span>
              <Link to="/vendor" className="text-blue-700 font-semibold hover:underline">I’m a Vendor</Link>
              <Link to="/supplier" className="text-green-700 font-semibold hover:underline">I’m a Supplier</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto px-[30px] flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              Serving Samosas Shouldn’t Be a Gamble.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              V2S connects street food vendors to <strong>trusted</strong> suppliers — ensuring hygiene, affordability, and peace of mind.
            </p>
            <div className="flex gap-4">
              <Link to="/vendor" className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 font-semibold">
                I’m a Vendor
              </Link>
              <Link to="/supplier" className="px-6 py-3 bg-amber-400 text-gray-900 rounded-full shadow hover:bg-amber-500 font-semibold">
                I’m a Supplier
              </Link>
            </div>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Street food graphic"
            className="w-80 mt-12 md:mt-0 animate-float"
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white px-[30px] text-center">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">What People Are Saying</h3>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-700"
            >
              <p className="mb-2 italic">“{testimonials[testimonialIndex].text}”</p>
              <p className="font-semibold text-sm text-gray-600">
                — {testimonials[testimonialIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-100 py-10 px-[30px] text-sm text-gray-700 border-t border-gray-300"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 text-left">
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">V2S</h4>
            <p>Vendor to Supplier – bridging the gap between trusted sellers and local vendors.</p>
            <p className="mt-2 text-gray-500">📍 23-B, Street Vendor Lane, New Delhi, India</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Contact</h4>
            <p>📧 <a href="mailto:contact@v2s.in" className="hover:text-blue-600">contact@v2s.in</a></p>
            <p>📞 <a href="tel:+919876543210" className="hover:text-blue-600">+91 98765 43210</a></p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Our Partners</h4>
            <ul className="list-disc ml-4 text-gray-600 space-y-1">
              <li>SpiceRoute Distributors</li>
              <li>HygieneKart</li>
              <li>FreshFarm Logistics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Use</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Follow Us</h4>
            <div className="flex flex-col space-y-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">🐦 Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">💼 LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">📸 Instagram</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-500 border-t border-gray-300 pt-6">
          &copy; 2025 <strong className="text-gray-700">V2S Technologies Pvt. Ltd.</strong> | License: MIT
          <br /> Made with ❤️ for India's street food revolution.
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
