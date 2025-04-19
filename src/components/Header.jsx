import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import "../../public/assets/css/Header.css";
import logo from "/assets/image/HeaderLogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../FireBase";
import { doc, getDoc } from 'firebase/firestore';
// Import Bootstrap JS (important!)

import { Modal } from 'bootstrap'; // import this at the top


const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsNavOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchUserData = async () => {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        };
        fetchUserData();
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleSignOut = async () => {
    try {
      
      await signOut(auth);
      setUser(null);
      setUserData(null);
  
      // Close the modal
      const modalEl = document.getElementById('profileModal');
      const modalInstance = Modal.getInstance(modalEl);
      modalInstance?.hide(); // hide the modal
  
      alert("You have signed out successfully.");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const calculateBMI = (weight, height) => {
    const h = height / 100;
    return (weight / (h * h)).toFixed(2);
  };

  return (
    <>
    <header>
      {/* Top Banner */}
      <div className="banner">
        <span className="section-left">
          <a href="mailto:ammar15102004@email.com">ammar15102004@email.com</a>
          <a href="tel:+919898326125">+(91)-98983-26125</a>
        </span>
        <span className="section-right">
          <a href="#" title="Facebook"><FaFacebook /></a>
          <a href="#" title="Instagram"><FaInstagram /></a>
          <a href="#" title="Twitter"><FaTwitter /></a>
        </span>
      </div>

      <div className="fixxed">
        <div className="logo parallelogram">
          <span className="skew-fix">
            <img src={logo} alt="" />
          </span>
        </div>

        <div className={`topnav ${isNavOpen ? 'responsive' : ''}`} id="myTopnav">
          <a href="#" className="active" id="home">
            <Link to={"/"} style={{ margin: "0", padding: "0" }}>HOME</Link>
          </a>
          <Link to="/mealplanner">DAILY PLAN</Link>
         <Link to={"/bmi"}>BMI</Link>
         <Link to="/productcard">PRODUCT</Link>
          <a href="/#service">SERVICES</a>
        
          <a href="/#contact">CONTACT</a>

          {!user ? (
            <a title="SignIn" style={{ float: 'right' }}>
              <Link to="/login"><FaUser /></Link>
            </a>
          ) : (
            <a
              title="User Profile"
              style={{ float: 'right', cursor: 'pointer' }}
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
            >
              <FaUser />
            </a>
          )}

          {isMobile && (
            <button
              className="icon"
              onClick={toggleNav}
              style={{ fontSize: '15px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <GiHamburgerMenu />
            </button>
          )}
        </div>
      </div>

      {/* Bootstrap Modal - Centered */}
      {user && userData && (
        <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
                    <p><strong>Role:</strong> {userData.role}</p>
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
    </header>

    <div>
      <a href="#">
    <button class="Topbutton" style={{
      position: 'fixed',
     bottom:"30px",
      right:"30px",
      zIndex:"100000000"
    }}>
  <svg class="svgIcon" viewBox="0 0 384 512">
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
    ></path>
  </svg>
</button>
</a>

    </div>
    </>
  );
};

export default Header;