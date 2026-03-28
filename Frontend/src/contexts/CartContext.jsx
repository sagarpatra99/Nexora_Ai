import { createContext, useContext, useEffect, useState } from "react";
import { cartAPI } from "../app/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await cartAPI.getCart();
      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartAPI.addToCart({ productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await cartAPI.updateCartItem(productId, { quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};