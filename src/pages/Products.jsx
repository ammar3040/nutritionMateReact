import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      title: "Protein Powder 2kg",
      description: "High quality protein",
      price: 45,
      image: "/assets/img/p-1.png"
    },
    {
      id: 2,
      title: "M2 Muscletech Nitro",
      description: "Ultimate strength booster",
      price: 60,
      image: "/assets/img/p-2.png"
    },
    // Add other products...
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="shop-container">
      <h2 className="section-title">Shop Products</h2>
      
      <div className="shop-content">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
          />
        ))}
      </div>

      <div className={`cart ${isCartOpen ? 'active' : ''}`}>
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-content">
          {cart.map(item => (
            <div key={item.id} className="cart-box">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="detail-box">
                <div className="cart-product-title">{item.title}</div>
                <div className="cart-price">${item.price}</div>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="cart-quantity"
                />
              </div>
              <button 
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="total">
          <div className="total-title">Total</div>
          <div className="total-price">${totalPrice.toFixed(2)}</div>
        </div>
        <button className="btn-buy">Buy Now</button>
        <button className="close-cart" onClick={() => setIsCartOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Products;
