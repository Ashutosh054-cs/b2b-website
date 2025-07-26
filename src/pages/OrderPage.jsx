import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

function OrderPage() {
  const location = useLocation();
  const { supplierId } = useParams();
  const supplier = location.state?.supplier;
  const [quantities, setQuantities] = useState({});
  const [orderType, setOrderType] = useState('immediate');
  const [notifications, setNotifications] = useState([]);

  if (!supplier) {
    return (
      <div className="text-center text-red-500 p-6">
        ⚠️ No supplier data received. Please go back and try again.
      </div>
    );
  }

  const showNotification = (type, title, message) => {
    const id = Date.now();
    const notification = { id, type, title, message };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleQuantityChange = (product, qty) => {
    setQuantities(prev => ({ ...prev, [product]: parseInt(qty) || 0 }));
  };

  const calculateTotal = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + (qty * supplier.unitPrice || 0), 0);
  };

  const handleSubmitOrder = () => {
    const orderData = {
      supplierId,
      supplier: supplier.name,
      items: Object.entries(quantities).filter(([_, qty]) => qty > 0),
      total: calculateTotal(),
      orderType,
      paymentTerms: supplier.paymentTerms || 'NET 30',
      deliveryDate: orderType === 'scheduled' ? '2-3 weeks' : '5-7 days'
    };
    console.log('Order submitted:', orderData);
    showNotification('success', 'Order Submitted!', `Your order request for ${calculateTotal().toLocaleString()} has been sent to ${supplier.name}. You'll receive confirmation within 24 hours.`);
  };

  const handleRequestQuote = () => {
    const selectedProducts = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    if (selectedProducts.length === 0) {
      showNotification('warning', 'No Products Selected', 'Please select at least one product to request a quote.');
      return;
    }
    showNotification('info', 'Quote Requested', `Quote request sent for ${selectedProducts.length} products. ${supplier.name} will respond within 2 business days.`);
  };

  const handleSaveForLater = () => {
    const orderData = {
      supplierId,
      quantities,
      orderType,
      savedAt: new Date().toISOString()
    };
    // In real app, you'd save to localStorage or backend
    console.log('Saved order:', orderData);
    showNotification('success', 'Order Saved', 'Your order has been saved to drafts. You can access it from your dashboard.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Modern Notifications */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`
              max-w-sm p-4 rounded-lg shadow-lg border-l-4 bg-white transform transition-all duration-300 ease-in-out
              ${notification.type === 'success' ? 'border-green-500' : ''}
              ${notification.type === 'info' ? 'border-blue-500' : ''}
              ${notification.type === 'warning' ? 'border-yellow-500' : ''}
              animate-slide-in
            `}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <span className="text-green-500 text-xl">✅</span>}
                {notification.type === 'info' && <span className="text-blue-500 text-xl">ℹ️</span>}
                {notification.type === 'warning' && <span className="text-yellow-500 text-xl">⚠️</span>}
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Supplier Info */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">{supplier.name}</h1>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p>📍 {supplier.location}</p>
            <p>📞 {supplier.phone}</p>
          </div>
          <div>
            <p>💳 Payment: {supplier.paymentTerms || 'NET 30'}</p>
            <p>🚚 Min Order: {supplier.minOrder || '$500'}</p>
          </div>
        </div>
      </div>

      {/* Order Type */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Type</h3>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="immediate"
              checked={orderType === 'immediate'}
              onChange={(e) => setOrderType(e.target.value)}
              className="mr-2"
            />
            Immediate (5-7 days)
          </label>
          <label>
            <input
              type="radio"
              value="scheduled"
              checked={orderType === 'scheduled'}
              onChange={(e) => setOrderType(e.target.value)}
              className="mr-2"
            />
            Scheduled (2-3 weeks)
          </label>
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Products</h3>
        <div className="space-y-3">
          {supplier.products.map((product, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded">
              <div className="flex-1">
                <span className="font-medium">{product}</span>
                <p className="text-sm text-gray-600">${supplier.unitPrice || 25}/unit</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Qty:</label>
                <input
                  type="number"
                  min="0"
                  className="w-20 px-2 py-1 border rounded"
                  value={quantities[product] || ''}
                  onChange={(e) => handleQuantityChange(product, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="text-sm space-y-1">
          <p>Total Items: {Object.values(quantities).reduce((sum, qty) => sum + qty, 0)}</p>
          <p>Subtotal: ${calculateTotal().toLocaleString()}</p>
          <p>Payment Terms: {supplier.paymentTerms || 'NET 30'}</p>
          <p>Expected Delivery: {orderType === 'scheduled' ? '2-3 weeks' : '5-7 days'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmitOrder}
          disabled={Object.values(quantities).every(qty => qty === 0)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          Submit Order Request
        </button>
        <button
          onClick={handleRequestQuote}
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
        >
          Request Quote
        </button>
        <button 
          onClick={handleSaveForLater}
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
        >
          Save for Later
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default OrderPage;