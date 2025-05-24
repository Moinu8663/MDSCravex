'use client';

import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-[#333]">
      <h1 className="text-4xl font-bold text-center text-[#6e3d73] mb-6">Terms of Service</h1>

      <p className="mb-4">Effective Date: May 24, 2025</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">1. Acceptance of Terms</h2>
        <p>
          By using MDSCravex, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may not use the application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">2. Services</h2>
        <p>
          MDSCravex provides tools for encryption, API testing, and JSON formatting. These services are intended for personal or educational use only.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You agree not to misuse the tools for malicious or illegal purposes.</li>
          <li>You are responsible for any data you input into the application.</li>
          <li>Do not upload sensitive personal information unless necessary and secure.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">4. Limitation of Liability</h2>
        <p>
          MDSCravex is provided "as is" without warranties. We are not liable for any damages resulting from your use of the application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">5. Intellectual Property</h2>
        <p>
          All content, including code, UI elements, and branding, is the intellectual property of MDSCravex or its respective owners.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">6. Termination</h2>
        <p>
          We may suspend or terminate your access to MDSCravex at any time if you violate these terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">7. Changes to Terms</h2>
        <p>
          These terms may be updated. Continued use of the service after changes means you accept the updated terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">8. Contact</h2>
        <p>
          For any questions, please contact us at <a href="mailto:support@mdscravex.com" className="text-blue-600 underline">support@mdscravex.com</a>.
        </p>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
