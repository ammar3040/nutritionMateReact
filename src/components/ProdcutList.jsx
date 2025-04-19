import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../FireBase';
import "../../assets/css/addtocartcss.css";
import "../../assets/css/style.css";

import { useNavigate } from 'react-router-dom';
import   {FaBoxOpen}   from "react-icons/fa"

const ProductShop = () => {
  const navigate = useNavigate();


  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
    // Add these new states
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

  const auth = getAuth();
  
  const products = [
    {
      id: 1,
      img: './assets/img/p-1.png',
      title: 'Protein Powder 2kg',
      desc: 'High quality protein',
      price: '$45'
    },
    {
      id: 2,
      img: './assets/img/p-2.png',
      title: 'Mass Gainer Max',
      desc: 'Perfect for bulking fast',
      price: '$55'
    },
    {
      id: 3,
      img: './assets/img/p-3.png',
      title: 'gainer',
      desc: 'Perfect for bulking fast',
      price: '$55',
    },
    {
      id: 4,
      title: "Amino Energy 4b00",
      img: "./assets/img/p-4.png",
      desc: "Boost your workout energy",
      price: '$30'
    },
    {
      id: 5,
      title: "Amino Energy 2b00",
      img: "./assets/img/p-4.png",
      desc: "Boost your workout energy",
      price: '$29'
    },
    {
      id: 6,
      title: "Protein Powder 1kg",
      img: "./assets/img/product-6.png",
      desc: "Great taste & blendability",
      price: '$35'
    },
    {
      id: 7,
      title: "Protein Powder 1kg",
      img: "./assets/img/product-6.png",
      desc: "Great taste & blendability in combo",
      price: '$60'
    },
    {
      id: 8,
      title: "Protein Powder 2kg",
      img: "./assets/img/p-6.png",
      desc: "Premium protein, high quality",
      price: '$50'
    }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthChecked(true);
      if (!user) {
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      const user = auth.currentUser;
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const address = userDoc.data().address || 'No address saved';
            setUserAddress(address);
            setNewAddress(address);
          } else {
            setUserAddress('No address saved');
            setNewAddress('No address saved');
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setUserAddress('Error loading address');
          setNewAddress('Error loading address');
        } finally {
          setLoadingAddress(false);
        }
      } else {
        setUserAddress('Please login to see your address');
        setNewAddress('Please login to see your address');
        setLoadingAddress(false);
      }
    };

    if (showCheckoutModal) {
      fetchUserAddress();
    }
  }, [showCheckoutModal]);

  const countTotal = () => {
    return cart.reduce((total, product) => {
      const price = Number(product.price.replace('$', ''));
      return total + (product.quantity * price);
    }, 0).toFixed(2);
  };

  const addToCart = (product) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const existingProduct = cart.find(item => item.title === product.title);
    
    if (existingProduct) {
      const updatedCart = cart.map(item => 
        item.title === product.title 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleCheckout = () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    setShowCheckoutModal(true);
    setIsCartOpen(false);
  };

  const handleSaveAddress = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        address: newAddress
      });
      setUserAddress(newAddress);
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
      alert('Failed to update address');
    }
  };

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }
  
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
  
    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email || '',
        items: cart.map(item => ({
          productId: item.id,
          productName: item.title,
          quantity: item.quantity,
          price: parsePrice(item.price),
          image: item.img
        })),
        total: parseFloat(countTotal()),
        status: 'pending',
        createdAt: serverTimestamp(),
        shippingAddress: userAddress
      };
  
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Clear the cart after successful order
      setCart([]);
      localStorage.removeItem("cart");
      
      setShowCheckoutModal(false);
      alert(`Order placed successfully! Order ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.message}`);
    }
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const numericValue = parseFloat(price.replace(/[^0-9.-]/g, ''));
      return isNaN(numericValue) ? 0 : numericValue;
    }
    return 0;
  };

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  const fetchUserOrders = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoadingOrders(true);
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || null
      }));
      
      // Sort by date (newest first)
      orders.sort((a, b) => b.createdAt - a.createdAt);
      setUserOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Open orders modal and fetch data
  const handleOpenOrders = () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    setShowOrdersModal(true);
    fetchUserOrders();
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'Date not available';
    return date.toLocaleString();
  };


  return (
    
    <div className="product-shop-container">


      
      {/* Cart Icon Floating on Right */}
      <div className="floating-cart-icon" onClick={() => {
        if (!auth.currentUser) {
          navigate('/login');
          return;
        }
        setIsCartOpen(!isCartOpen);
      }}>
        <i className="fas fa-shopping-cart"></i>
        {cart.length > 0 && (
          <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        )}
      </div>
      <div 
        className="floating-cart-icon"
        onClick={handleOpenOrders}
        style={{
          top:"38%"
        }}
      >
        <FaBoxOpen />
        {userOrders.length > 0 && (
          <span className="orders-badge">{userOrders.length}</span>
        )}
      </div>
      

      {/* Cart Side Panel */}
      <div className={`cart-side-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="close-cart" 
            onClick={() => setIsCartOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            cart.map((product, index) => (
              <div className="cart-item" key={index}>
                <img src={product.img} alt={product.title} className="cart-item-img"  />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(index, product.quantity - 1)}
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => updateQuantity(index, product.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(index)}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${countTotal()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      )}

      {/* Checkout Modal */}
      <Modal 
        show={showCheckoutModal} 
        onHide={() => setShowCheckoutModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="checkout-products">
            <h4>Your Items:</h4>
            {cart.map((product, index) => {
              const priceValue = typeof product.price === 'string' 
                ? parseFloat(product.price.replace(/[^0-9.-]/g, '')) 
                : Number(product.price);
              
              const formattedPrice = isNaN(priceValue) ? '0.00' : priceValue.toFixed(2);
              const itemTotal = (priceValue * product.quantity).toFixed(2);

              return (
                <div key={`${product.id}-${index}`} className="d-flex justify-content-between mb-3 align-items-center">
                  <div className="d-flex align-items-center">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="me-3" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-1">{product.title}</h5>
                      <p className="mb-0 text-muted small">
                        {product.quantity} × ${formattedPrice}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">${itemTotal}</div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="btn btn-sm btn-outline-danger mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <h4>Total:</h4>
              <h4>${countTotal()}</h4>
            </div>
            
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Shipping Address:</h4>
              {!isEditingAddress && auth.currentUser && (
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setIsEditingAddress(true)}
                >
                  Edit
                </button>
              )}
            </div>
            
            {loadingAddress ? (
              <p>Loading address...</p>
            ) : isEditingAddress ? (
              <div className="address-edit-container">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="mb-2"
                />
                <div className="d-flex justify-content-end">
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setIsEditingAddress(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={handleSaveAddress}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            ) : (
              <div className="address-box p-3 mt-2 mb-3 bg-light rounded">
                {userAddress || 'No address provided'}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handlePlaceOrder}
            disabled={!userAddress || userAddress === 'No address saved' || userAddress === 'Please login to see your address'}
          >
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal 
        show={showOrdersModal} 
        onHide={() => setShowOrdersModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingOrders ? (
            <div className="text-center py-4">Loading your orders...</div>
          ) : userOrders.length === 0 ? (
            <div className="text-center py-4">You haven't placed any orders yet</div>
          ) : (
            <div className="orders-list">
              {userOrders.map(order => (
                <div key={order.id} className="order-item mb-4 p-3 border rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <strong>Order ID:</strong> {order.id.substring(0, 8)}...
                    </div>
                    <div className="text-muted small">
                      {order.createdAt ? formatDate(order.createdAt) : 'Date not available'}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Status:</strong> 
                    <span className={`ms-2 badge ${
                      order.status === 'completed' ? 'bg-success' :
                      order.status === 'cancelled' ? 'bg-danger' :
                      'bg-warning text-dark'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Shipping to:</strong>
                    <div className="text-muted small">{order.shippingAddress}</div>
                  </div>
                  
                  <div>
                    <strong>Items:</strong>
                    {order.items.map((item, index) => (
                      <div key={index} className="d-flex align-items-center mt-2">
                        <img 
                          src={item.image} 
                          alt={item.productName} 
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            marginRight: '10px'
                          }}
                        />
                        <div>
                          {item.productName} (Qty: {item.quantity})
                          <div className="text-muted small">${item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrdersModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <marquee
        behavior="scroll"
        direction="left"
        scrollAmount="5"
        className="display-7 fw-bolder"
        style={{
          font: '20px bolder',
          fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
          color: '#9dca00',
        }}
      >
        20% off on code using nutrition20
      </marquee>

      <section className="shop">
        <h2 className="section-title">Shop Products</h2>
        <div className="shop-content">
          {products.map(product => (
            <div className="card" key={product.id}>
              <div className="imgBx">
                <img src={product.img} alt={product.title} className="product-img" />
              </div>
              <div className="contentBx">
                <h2 className="product-title">{product.title}</h2>
                <span className="subfont">{product.desc}</span>
                <span className="price color">{product.price}</span>
                <div className="add-cart size">
                  <button 
                    className="button type--C"
                    onClick={() => addToCart(product)}
                  >
                    <div className="button__line"></div>
                    <div className="button__line"></div>
                    <span className="button__text">Add to Cart</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .product-shop-container {
          
        }
        
        .floating-cart-icon {
          position: fixed;
          right: 17px;
          top: 50%;
          transform: translateY(-50%);
          background: #9dca00;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .floating-cart-icon:hover {
          background: #b8222e;
          transform: translateY(-50%) scale(1.05);
        }
        
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: white;
          color: #9dca00;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }
        
        .cart-side-panel {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          z-index: 1002;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .cart-side-panel.open {
          right: 0;
        }
        
        .cart-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .close-cart {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        
        .cart-item {
          display: flex;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .cart-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin-right: 15px;
        }
        
        .cart-item-details {
          flex: 1;
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        
        .quantity-control button {
          width: 25px;
          height: 25px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }
        
        .quantity-control span {
          margin: 0 10px;
        }
        
        .remove-item {
          background: none;
          border: none;
          color: #9dca00;
          font-size: 20px;
          cursor: pointer;
        }
        
        .cart-footer {
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .cart-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 18px;
        }
        
        .checkout-btn {
          width: 100%;
          padding: 12px;
          background: #9dca00;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .checkout-btn:hover {
          background: #b8222e;
        }
        
        .empty-cart {
          text-align: center;
          padding: 40px 0;
          color: #888;
        }
        
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1001;
        }

        .address-box {
          white-space: pre-line;
        }

        .address-edit-container {
          margin-top: 10px;
        }

        floating-orders-icon {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          background: #9dca00;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .floating-orders-icon:hover {
          background: #9dca00;
          transform: translateY(-50%) scale(1.05);
        }
        
        .orders-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: white;
          color: #b8222e;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }
        
        .order-item {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default ProductShop;