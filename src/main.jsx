import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
);
