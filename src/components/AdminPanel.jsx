import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc, serverTimestamp ,getDoc} from 'firebase/firestore';
import { db } from '../FireBase'; // Adjust path to your firebase config
import { Modal, Button, Row, Col } from "react-bootstrap";
import ProdcutList from "./ProdcutList"
import { auth } from '../FireBase'; // Adjust path to your firebase config
import { signOut ,onAuthStateChanged} from 'firebase/auth';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // You'll need react-icons package
import { FaUser, FaSignOutAlt } from 'react-icons/fa';


function AdminPanel() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Users');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);
const [orderLoading, setOrderLoading] = useState(true);
const [selectedOrder, setSelectedOrder] = useState(null);
const [feedback, setFeedback] = useState([]);
const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);



// cuurent user 

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  });
  return () => unsubscribe();
}, []);

const handleSignOut = async () => {
  try {
    await signOut(auth);
    navigate('/login');
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

  
useEffect(() => {
  const fetchFeedback = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const feedbackData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firebase Timestamp to readable date
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || 'N/A'
      }));
      setFeedback(feedbackData);
      setFeedbackLoading(false);
    } catch (error) {
      console.error("Error fetching feedback: ", error);
      setFeedbackLoading(false);
    }
  };

  if (activeTab === 'UserFeedback') {
    fetchFeedback();
  }
}, [activeTab]);


useEffect(() => {
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firebase Timestamp to readable date
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || 'N/A'
      }));
      setOrders(ordersData);
      setOrderLoading(false);
    } catch (error) {
      console.error("Error fetching orders: ", error);
      setOrderLoading(false);
    }
  };

  if (activeTab === 'Orders') {
    fetchOrders();
  }
}, [activeTab]);

  // Fetch users from Firebase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    if (activeTab === 'Users') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleViewUser = (user) => {
    setSelectedUser(user); // Set user data in modal
  };
  const  handleViewOrder=(order)=>{
    setSelectedOrder(order); // Set order data in modal
  }
  

  // Fetch users from Firebase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    if (activeTab === 'Users') {
      fetchUsers();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
 
      case 'Users':
        return (
          <div style={contentBoxStyle}>
            <h2>User Management</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div style={tableContainerStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={trStyle}>
                        <td style={tdStyle}>{user.id.substring(0, 6)}...</td>
                        <td style={tdStyle}>{user.name || 'N/A'}</td>
                        <td style={tdStyle}>{user.email}</td>
                        <td style={tdStyle}>
                        <button 
  style={actionButtonStyle}
  onClick={() => handleViewUser(user)}
>
  View
</button>

                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
        case 'Orders':
          return (
            <div style={contentBoxStyle}>
              <h2>Order Management</h2>
              {orderLoading ? (
                <p>Loading orders...</p>
              ) : (
                <div style={tableContainerStyle}>
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Order ID</th>
                        <th style={thStyle}>User Email</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Total</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} style={trStyle}>
                          <td style={tdStyle}>{order.id.substring(0, 6)}...</td>
                          <td style={tdStyle}>{order.userEmail}</td>
                          <td style={tdStyle}>{order.createdAt}</td>
                          <td style={tdStyle}>${order.total}</td>
                          <td style={tdStyle}>
                            <span style={{
                              color: order.status === 'completed' ? '#2ecc71' : 
                                    order.status === 'pending' ? '#f39c12' : 
                                    order.status === 'cancelled' ? '#e74c3c' : '#3498db',
                              fontWeight: 'bold'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <button 
                              style={actionButtonStyle}
                              onClick={() => handleViewOrder(order)}
                            >
                              View
                            </button>
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
          case 'Products':
            return <ProdcutList />;
            case 'UserFeedback':
  return (
    <div style={contentBoxStyle}>
      <h2>User Feedback</h2>
      {feedbackLoading ? (
        <p>Loading feedback...</p>
      ) : feedback.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <div style={feedbackContainerStyle}>
          {feedback.map(item => (
            <div key={item.id} style={feedbackCardStyle}>
              <div style={feedbackHeaderStyle}>
                <span style={feedbackEmailStyle}>{item.email}</span>
                <span style={feedbackDateStyle}>{item.createdAt}</span>
              </div>
              <div style={feedbackBodyStyle}>
                <p style={feedbackMessageStyle}>{item.message}</p>
              </div>
              <div style={feedbackFooterStyle}>
                <span style={feedbackUserIdStyle}>User ID: {item.userId}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
      default:
        return (
          <div style={contentBoxStyle}>
            <h2>{activeTab}</h2>
            <p>Content for {activeTab} will be displayed here.</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <aside style={asideStyle}>
        <ul style={asideListStyle}>
          {['Users', 'Orders', 'Products', 'UserFeedback', 'Settings'].map((item) => (
            <li key={item} style={asideListItemStyle}>
              <button 
                style={{
                  ...asideButtonStyle,
                  backgroundColor: activeTab === item ? '#3498db' : '#34495e'
                }}
                onClick={() => setActiveTab(item)}
                onMouseEnter={(e) => activeTab !== item && (e.currentTarget.style.backgroundColor = '#3d566e')}
                onMouseLeave={(e) => activeTab !== item && (e.currentTarget.style.backgroundColor = '#34495e')}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Header */}
     {/* Main Header */}
<nav style={navStyle}>
  <div style={navContainerStyle}>
    <div style={logoStyle}>
      <img 
        src={"../../public/assets/image/addtocart banner.png"} 
        alt="Logo"  
        style={logoImageStyle}
      />
    </div>
    
    

    <div style={{ marginLeft: 'auto', paddingRight: '20px' }}>
      <div 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => setShowProfileModal(true)}
      >
        <FaUserCircle style={{ fontSize: '28px', color: 'white' }} />
        <span style={{ marginLeft: '8px', color: 'white' }}>
          {currentUser?.email?.split('@')[0] || 'Profile'}
        </span>
      </div>
    </div>
  </div>
</nav>

{/* Profile dropdown - Modified version */}
<div style={{ marginLeft: 'auto', paddingRight: '20px', position: 'relative' }}>
  <div 
    style={{ 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }}
    onClick={() => setShowProfileModal(true)}
  >
    <FaUserCircle style={{ fontSize: '28px', color: 'white' }} />
    <span style={{ marginLeft: '8px', color: 'white' }}>
      {currentUser?.email?.split('@')[0] || 'Profile'}
    </span>
  </div>

  {/* Simple dropdown menu without Bootstrap Dropdown */}
  {showProfileModal && (
    <div style={{
      position: 'absolute',
      right: 0,
      top: '100%',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 1000,
      minWidth: '150px'
    }}>
      <div 
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
        onClick={() => setShowProfileModal(true)}
      >
        Profile
      </div>
      <div 
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
        onClick={handleSignOut}
      >
        Sign Out
      </div>
    </div>
  )}
</div>

      {/* Main Content Area */}
      <main style={mainStyle}>
        {renderContent()}
    

      
        {selectedUser && (
  <Modal 
    show={!!selectedUser} 
    onHide={() => setSelectedUser(null)}
    centered
    size="lg"
  >
    <Modal.Header closeButton>
      <Modal.Title>User Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col md={6}>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Password:</strong> ********</p>
          <p><strong>Confirm Password:</strong> ********</p>
          <p><strong>Age:</strong> {selectedUser.age}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <p><strong>Height:</strong> {selectedUser.height}</p>
          <p><strong>Weight:</strong> {selectedUser.weight}</p>
        </Col>
        <Col md={6}>
          <p><strong>Lifestyle:</strong> {selectedUser.lifestyle}</p>
          <p><strong>Gender:</strong> {selectedUser.gender}</p>
          <p><strong>Goal:</strong> {selectedUser.goal}</p>
          <p><strong>Activity Level:</strong> {selectedUser.activityLevel}</p>
          <p><strong>Meal Preference:</strong> {selectedUser.mealPreference}</p>
          <p><strong>Medical Conditions:</strong> {selectedUser.medicalConditions}</p>
          <p><strong>Wake Time:</strong> {selectedUser.wakeTime}</p>
          <p><strong>Sleep Time:</strong> {selectedUser.sleepTime}</p>
          <p><strong>Water Goal:</strong> {selectedUser.waterGoal}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setSelectedUser(null)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}
{selectedOrder && (
  <Modal 
    show={!!selectedOrder} 
    onHide={() => setSelectedOrder(null)}
    centered
    size="lg"
  >
    <Modal.Header closeButton>
      <Modal.Title>
        Order Details - #{selectedOrder.id.substring(0, 8)}
        <span style={{
          float: 'right',
          fontSize: '0.8em',
          color: selectedOrder.status === 'completed' ? '#2ecc71' : 
                selectedOrder.status === 'pending' ? '#f39c12' : 
                selectedOrder.status === 'cancelled' ? '#e74c3c' : '#3498db',
          fontWeight: 'bold'
        }}>
          {selectedOrder.status.toUpperCase()}
        </span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col md={6}>
          <div style={{ marginBottom: '20px' }}>
            <h5>Order Information</h5>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Created At:</strong> {selectedOrder.createdAt}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.total.toFixed(2)}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h5>Customer Information</h5>
            <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
            <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
          </div>
        </Col>

        <Col md={6}>
          <div style={{ marginBottom: '20px' }}>
            <h5>Shipping Information</h5>
            <p><strong>Shipping Address:</strong></p>
            <p style={{ whiteSpace: 'pre-line' }}>
              {selectedOrder.shippingAddress || 'No address provided'}
            </p>
          </div>
        </Col>
      </Row>
      
      <h5>Order Items ({selectedOrder.items.length})</h5>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.items.map((item, index) => (
              <tr key={index} style={trStyle}>
                <td style={tdStyle}>
                  <img 
                    src={item.image} 
                    alt={item.productName} 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                </td>
                <td style={tdStyle}>{item.productName}</td>
                <td style={tdStyle}>{item.productId}</td>
                <td style={tdStyle}>${item.price.toFixed(2)}</td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        textAlign: 'right'
      }}>
        <h5>
          Order Total: <span style={{ color: '#d32936' }}>
            ${selectedOrder.total.toFixed(2)}
          </span>
        </h5>
      </div>
    </Modal.Body>
    <Modal.Footer>
  <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
    Close
  </Button>
  <div style={{ flex: 1 }}>
    <select 
      className="form-select"
      value={selectedOrder.status}
      onChange={(e) => {
        const newStatus = e.target.value;
        setSelectedOrder({...selectedOrder, status: newStatus});
      }}
      style={{
        width: '200px',
        display: 'inline-block',
        marginRight: '10px'
      }}
    >
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
    <Button 
      variant="primary"
      onClick={async () => {
        try {
          // Create a reference to the specific order document
          const orderRef = doc(db, "orders", selectedOrder.id);
          
          // Update the document in Firebase
          await updateDoc(orderRef, {
            status: selectedOrder.status,
            updatedAt: serverTimestamp() // Optional: add update timestamp
          });
          
          // Update local state to reflect the change
          setOrders(orders.map(order => 
            order.id === selectedOrder.id 
              ? {...order, status: selectedOrder.status} 
              : order
          ));
          
          // Show success feedback (you could use a toast notification instead)
          alert("Order status updated successfully!");
          
          // Close the modal
          setSelectedOrder(null);
        } catch (error) {
          console.error("Error updating order status: ", error);
          alert("Failed to update order status");
        }
      }}
    >
      Save Changes
    </Button>
  </div>
</Modal.Footer>
  </Modal>
)}
  {user && userData && (
        <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ maxWidth: '500px' ,margin: '0 auto' }}>
              <div className="modal-header" style={{ backgroundColor: '#9dca00', color: 'white' }}>
                <h5 className="modal-title" id="profileModalLabel">User Profile</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  style={{ filter: 'brightness(0) invert(1)' }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Name:</strong> {userData.role}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Gender:</strong> {userData.gender || 'Not specified'}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Height:</strong> {userData.height} cm</p>
                    <p><strong>Weight:</strong> {userData.weight} kg</p>
                    <p><strong>BMI:</strong> {calculateBMI(userData.weight, userData.height)}</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <p><strong>Address:</strong> {userData.address}</p>
                    <p><strong>Lifestyle:</strong> {userData.lifestyle}</p>
                    <p><strong>Meal Preference:</strong> {userData.mealPreference || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-danger" 
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt /> Sign Out
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  data-bs-dismiss="modal"
                  style={{ 
                    backgroundColor: '#9dca00',
                    borderColor: '#9dca00',
                    color: 'white'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
</main>
     

    </>
  );
}

// Styles
const asideStyle = {
  position: 'fixed',
  left: "0",
  top: "70px",
  width: "200px",
  height: "calc(100vh - 70px)",
  backgroundColor: "#2c3e50",
  zIndex: "100",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  padding: "20px 0",
  overflowY: "auto"
};

const asideListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0
};

const asideListItemStyle = {
  margin: "5px 10px",
  borderRadius: "5px",
  overflow: "hidden"
};

const asideButtonStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "none",
  backgroundColor: "#34495e",
  color: "#ecf0f1",
  fontSize: "16px",
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const navStyle = {
  position: 'fixed',
  top: "0",
  left: "0",
  width: "100%",
  height: "70px",
  zIndex: "1002",
  backgroundColor: "#d32936",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  padding: "0 20px"
};

const navContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
};

const logoStyle = {
  height: "50px",
  width: "180px"
};

const logoImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain"
};

const navMenuStyle = {
  width: "70%",
  maxWidth: "800px"
};

const navListStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  height: "100%"
};

const navListItemStyle = {
  position: "relative"
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "500",
  padding: "5px 10px",
  borderRadius: "4px",
  transition: "all 0.3s ease"
};

const mainStyle = {
  marginLeft: "200px",
  marginTop: "70px",
  padding: "20px",
  minHeight: "calc(100vh - 70px)",
  backgroundColor: "#f5f5f5",
  position:"relative"
};

const contentBoxStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

const tableContainerStyle = {
  overflowX: "auto"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  backgroundColor: "#34495e",
  color: "white",
  padding: "12px",
  textAlign: "left"
};

const trStyle = {
  borderBottom: "1px solid #ddd",
  '&:hover': {
    backgroundColor: "#f5f5f5"
  }
};

const tdStyle = {
  padding: "12px",
  verticalAlign: "middle"
};

const actionButtonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
  transition: "background-color 0.3s",
  '&:hover': {
    backgroundColor: "#2980b9"
  }
};
const feedbackContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const feedbackCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '15px',
  borderLeft: '4px solid #3498db',
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

const feedbackHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee'
};

const feedbackEmailStyle = {
  fontWeight: 'bold',
  color: '#3498db'
};

const feedbackDateStyle = {
  fontSize: '0.8em',
  color: '#777'
};

const feedbackBodyStyle = {
  flexGrow: 1,
  marginBottom: '10px'
};

const feedbackMessageStyle = {
  margin: 0,
  lineHeight: '1.5',
  color: '#333'
};

const feedbackFooterStyle = {
  fontSize: '0.8em',
  color: '#777',
  textAlign: 'right'
};

const feedbackUserIdStyle = {
  fontStyle: 'italic'
};
const profileDropdownStyle = {
  marginLeft: 'auto',
  paddingRight: '20px',
  display: 'flex',
  alignItems: 'center'
};

const profileIconStyle = {
  fontSize: '28px',
  color: 'white',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)'
  }
};
export default AdminPanel;