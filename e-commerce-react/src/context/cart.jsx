import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    let existingCartIem = localStorage.getItem('cart')
    if(existingCartIem) setCart(JSON.parse(existingCartIem))
  },[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// creating custom hook for useContext

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
