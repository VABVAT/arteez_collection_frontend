import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      
      <div className="space-y-4">
        <p>
          Have a question or need help with an order? We're here to help!
        </p>

        <h2 className="text-2xl font-semibold">Customer Support</h2>
        <p>
          For any questions regarding your order, please call us at 7009751782.
        </p>
        <p>
          Our customer support team is available Monday to Friday, from 10 AM to 6 PM IST.
        </p>

        <h2 className="text-2xl font-semibold">Our Address</h2>
        <p>
          arteez collection
        </p>
        <p>
          123 Fashion Street,
        </p>
        <p>
          Mumbai, Maharashtra 400001
        </p>
        <p>
          India
        </p>

        <h2 className="text-2xl font-semibold">WhatsApp</h2>
        <p>
          You can also chat with us on WhatsApp at <a href="https://wa.me/7009751782" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">+91 7009751782</a>.
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
