
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const processPayment = async ({ order, user }) => {
        setLoading(true);
        try {
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount, // Amount in paise
                currency: order.currency,
                name: "arteez collection",
                description: "Test Transaction",
                order_id: order.razorpayOrderId,
                handler: async (response) => {
                    try {
                        const verifyResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/payment/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            }),
                        });
                        const verifyData = await verifyResponse.json();
                        if (verifyData.status === "success") {
                            toast.success("Payment successful!");
                            clearCart();
                            navigate("/orders");
                        } else {
                            toast.error("Payment failed. Please try again.");
                        }
                    } catch (err) {
                        console.error("Verification failed", err);
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "An error occurred during payment processing.");
        } finally {
            setLoading(false);
        }
    };

    return { processPayment, loading };
};

export default useRazorpay;
