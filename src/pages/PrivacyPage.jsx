import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      
      <div className="space-y-4">
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from arteezcollection.com (the “Site”).
        </p>

        <h2 className="text-2xl font-semibold">Personal Information We Collect</h2>
        <p>
          When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
        </p>
        <p>
          Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
        </p>
        <p>
          When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
        </p>

        <h2 className="text-2xl font-semibold">How Do We Use Your Personal Information?</h2>
        <p>
          We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
        </p>
        <p>
          Additionally, we use this Order Information to:
        </p>
        <ul className="list-disc list-inside">
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Sharing Your Personal Information</h2>
        <p>
          We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/.
        </p>
        <p>
          Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
        </p>

        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>
          If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
        </p>

        <h2 className="text-2xl font-semibold">Data Retention</h2>
        <p>
          When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
        </p>

        <h2 className="text-2xl font-semibold">Changes</h2>
        <p>
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
