import React from 'react';

const CancellationRefundPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cancellation & Refund Policy</h1>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Cancellation Policy</h2>
        <p>
          Once an order is placed, it cannot be cancelled. We do not accept cancellation requests.
        </p>

        <h2 className="text-2xl font-semibold">Refund Policy</h2>
        <p>
          We do not offer refunds for any products. All sales are final.
        </p>
        <p>
          In the unlikely event that you receive a damaged or defective item, a replacement will be provided. To claim a replacement, a parcel opening video is mandatory. The video must be clear and show the package being opened and the damaged item. The video should be sent to us within 24 hours of receiving the package.
        </p>
        <p>
          Without a parcel opening video, no claims for damages will be entertained.
        </p>
        <p>
          All returns must be in their original packaging and in unused condition.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPage;
