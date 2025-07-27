import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import VendorAuth from './pages/VendorAuth';
import SupplierAuth from './pages/SupplierAuth';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Faq from './pages/Faq';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/vendor-auth" element={<VendorAuth />} />
          <Route path="/supplier-auth" element={<SupplierAuth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/order/:supplierId" element={<OrderPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;