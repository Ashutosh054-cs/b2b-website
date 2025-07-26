import React from "react";

function Faq() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Q: Who can use V2S?</h3>
        <p className="text-gray-600">A: Any vendor or supplier dealing with raw food materials in India.</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Q: How do I register?</h3>
        <p className="text-gray-600">A: Click on "I’m a Vendor" or "I’m a Supplier" on the homepage to begin the registration process.</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Q: Is it safe to transact on V2S?</h3>
        <p className="text-gray-600">A: Yes, we verify all suppliers and use encrypted channels for communication.</p>
      </div>
    </div>
  );
}

export default Faq;
