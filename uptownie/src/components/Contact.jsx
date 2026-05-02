import React from "react";
import "./Contact.css";
import { FaPinterestP, FaFacebookF, FaInstagram, FaSnapchatGhost, FaYoutube } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-container">
      
      <div className="contact-section">
        <h3>Office Address</h3>
        <p>
          6, Alipore Avenue, Kala Bagan, Alipore, Kolkata, West Bengal 700027
        </p>
      </div>

      <div className="contact-section">
        <h3>Information</h3>
        <p>+91 97118 87220</p>
      </div>

      <div className="contact-section">
        <h3>Social Media</h3>
        <div className="social-icons">
          <FaPinterestP />
          <FaFacebookF />
          <FaInstagram />
          <FaSnapchatGhost />
          <FaYoutube />
        </div>
      </div>

    </div>
  );
}

export default Contact;