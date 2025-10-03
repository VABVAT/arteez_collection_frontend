import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDresses from './admin/AdminDresses.jsx';
import AdminOrders from './admin/AdminOrders.jsx';
import AdminUsers from './admin/AdminUsers.jsx';
import CancellationRefundPage from './pages/CancellationRefundPage.jsx';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';

import AdminLoginPage from './admin/AdminLoginPage.jsx';

const App = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/cancellation-refund" element={<CancellationRefundPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDresses />} />
                <Route path="dresses" element={<AdminDresses />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
            </Route>
        </Routes>
    );
};

export default App;
