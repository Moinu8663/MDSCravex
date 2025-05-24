'use client';

import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-[#333]">
      <h1 className="text-4xl font-bold text-center text-[#6e3d73] mb-6">Privacy Policy</h1>

      <p className="mb-4">Effective Date: May 24, 2025</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">1. Introduction</h2>
        <p>
          MDSCravex is committed to protecting your privacy. This policy explains how we collect, use,
          and safeguard your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">2. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Log Data:</strong> We may collect basic technical data like your IP address, browser type, and usage patterns.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies for performance and analytics.
          </li>
          <li>
            <strong>User Data:</strong> Data you submit for encryption or formatting is processed on your device and not stored.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">3. How We Use Your Data</h2>
        <p>
          Your data is used to improve user experience, monitor system performance, and troubleshoot issues.
          Sensitive data is not retained or shared.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">4. Data Security</h2>
        <p>
          We follow best practices to secure your information using HTTPS and client-side processing for sensitive operations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">5. Third-Party Services</h2>
        <p>
          We may use third-party services (e.g., analytics or hosting) that may collect anonymized data under their own policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">6. Your Rights</h2>
        <p>
          You may request access or deletion of personal data, but we typically do not store it unless necessary.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">7. Changes</h2>
        <p>
          This Privacy Policy may be updated. We'll post updates with a new effective date on this page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#a931a2] mb-2">8. Contact</h2>
        <p>
          Questions? Reach out at <a className="text-blue-600 underline" href="mailto:support@mdscravex.com">support@mdscravex.com</a>.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
