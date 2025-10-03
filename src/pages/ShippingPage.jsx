import React from 'react';

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      
      <div className="space-y-4">
        <p>
          We are committed to delivering your order accurately, in good condition, and always on time.
        </p>
        <p>
          We currently ship to all major cities in India. For other locations, please contact us to confirm availability.
        </p>

        <h2 className="text-2xl font-semibold">Shipping Times</h2>
        <p>
          Orders are dispatched within 3-5 working days. Most orders are delivered within 7-10 working days from the date of dispatch.
        </p>
        <p>
          Delivery of all orders will be duly done to the address as mentioned by you at the time of placing the order.
        </p>

        <h2 className="text-2xl font-semibold">Shipping Charges</h2>
        <p>
          We offer free shipping on all orders within India.
        </p>

        <h2 className="text-2xl font-semibold">International Shipping</h2>
        <p>
          We do not offer international shipping at this time. Please check back later for updates.
        </p>
      </div>
    </div>
  );
};

export default ShippingPage;
