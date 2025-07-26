import React from "react";

function Privacy() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Your privacy is important to us. Here’s how we handle your data:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>We collect only essential data required to operate V2S effectively.</li>
        <li>Your information is never sold or shared with third parties.</li>
        <li>All payment and communication data is encrypted.</li>
        <li>You can request deletion of your data at any time.</li>
      </ul>
    </div>
  );
}

export default Privacy;
