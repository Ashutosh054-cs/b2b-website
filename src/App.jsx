import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VendorAuth from './pages/VendorAuth';
import SupplierAuth from './pages/SupplierAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor" element={<VendorAuth />} />
        <Route path="/supplier" element={<SupplierAuth />} />
      </Routes>
    </Router>
  );
}

export default App;