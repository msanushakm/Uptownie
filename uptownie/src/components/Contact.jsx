import React from "react";
import "./Contact.css";
import { FaPinterestP, FaFacebookF, FaInstagram, FaSnapchatGhost, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
    <h1>Contact us</h1>
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
          <Link to="https://in.pinterest.com/uptownie101/"><FaPinterestP /></Link>
          <Link to="https://www.facebook.com/uptownie"><FaFacebookF /></Link>
          <Link to="https://www.instagram.com/uptownie101/"><FaInstagram /></Link>
          <Link to="https://www.snapchat.com/@uptownie.101"><FaSnapchatGhost /></Link>
          <Link to="https://www.youtube.com/channel/UCAf6wFHps2YHEJcXKVrRy_Q"><FaYoutube /></Link>
        </div>
      </div>

    </div>
    </>
  );
}

export default Contact;