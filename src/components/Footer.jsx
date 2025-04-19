import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from "/assets/image/footerLogo.png"

const Footer = () => {
  return (
    <footer>
      <div className="up-section">
        <a href="#" className="f-logo">
        <img 
  src={logo} 
  alt="Company Logo"
  style={{ width: '30%' }}
/>
        </a>

        <ul>
          <h1>Nutrition mate</h1>
          <li><a href="#">Teams</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Support</a></li>
        </ul>

        <ul>
          <h1>About</h1>
          <li><a href="#">Company</a></li>
          <li><a href="#">Location</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Our Services</a></li>
        </ul>

        <ul>
          <h1>Contact us</h1>
          <li><p>+91-9898326125</p></li>
          <li><p>surat,gujrat</p></li>
          <li><p>india</p></li>
        </ul>
      </div>

      <div className="down-section">
        <ul>
          <h1>Explore</h1>
          <li><a href="#prodcut">Product</a></li>
          <li><a href="#">Item Detail</a></li>
          <li><a href="#">Collectibles</a></li>
          <li><a href="#">Community</a></li>
        </ul>

        <ul>
          <h1>Support</h1>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#">Blog</a></li>
        </ul>

        <div className="social">
          <h1>Social</h1>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;