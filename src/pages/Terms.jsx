import React from "react";

function Terms() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">Welcome to V2S. By using our platform, you agree to the following terms:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You must be a registered vendor or supplier to transact.</li>
        <li>All communication and deals must be ethical and transparent.</li>
        <li>Illegal or fraudulent activities will lead to suspension of your account.</li>
        <li>V2S holds the right to modify these terms at any time.</li>
      </ul>
    </div>
  );
}

export default Terms;
