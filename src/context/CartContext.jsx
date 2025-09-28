import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existingProduct) {
        toast.error(<span><b>{product.name} ({product.selectedSize})</b> is already in your cart.</span>);
        return prevCart;
      } else {
        toast.success(<span>Added <b>{product.name} ({product.selectedSize})</b> to cart! <Link to="/cart" className="font-bold">View Cart</Link></span>);
        return [...prevCart, { ...product, cartQuantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    const removedItem = cart.find(item => item.id === productId && item.selectedSize === size);
    const newCart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
    setCart(newCart);
    toast(t => (
      <span>
        Removed <b>{removedItem.name} ({removedItem.selectedSize})</b> from cart.
        <button onClick={() => {
          setCart(cart);
          toast.dismiss(t.id);
        }} className="ml-2 font-bold">Undo</button>
      </span>
    ));
  };

  const updateQuantity = (productId, size, newCartQuantity) => {
    if (newCartQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId && item.selectedSize === size) {
          if (newCartQuantity > item.quantity) {
            toast.error(`Only ${item.quantity} items in stock`);
            return item;
          }
          toast.success('Quantity updated');
          return { ...item, cartQuantity: newCartQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    const oldCart = cart;
    setCart([]);
    toast(t => (
      <span>
        Cart cleared.
        <button onClick={() => {
          setCart(oldCart);
          toast.dismiss(t.id);
        }} className="ml-2 font-bold">Undo</button>
      </span>
    ));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
