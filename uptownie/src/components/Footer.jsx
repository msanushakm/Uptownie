import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
import { FaPinterest, FaFacebook, FaInstagram, FaSnapchat, FaYoutube } from "react-icons/fa";

function Footer(){
    return(
        <>
        <div className="mainFooter">
            <div className="subFooter">
                <h3>Company</h3>
                    <Link className="nav-link" to="/about"><p>About Us</p></Link>
                    <Link className="nav-link" to="/size"><p>Size Chart</p></Link>
            </div>
            <div className="subFooter">
                <h3>Contact</h3>
                    <Link className="nav-link" to="/contact"><p>Contact Us</p></Link>     
            </div>
            <div className="subFooter">
                <h3>Get in touch</h3>
                    <p>080 6863 5857</p> 
                    <p>customerservice@uptownie101.com</p>
                    <div className="div-iconlink">
                    <div><Link ><p><FaPinterest/></p></Link></div>
                    <div><Link ><p><FaFacebook/></p></Link></div>
                    <div><Link ><p><FaInstagram/></p></Link></div>
                    <div><Link ><p><FaSnapchat/></p></Link></div>
                    <div><Link ><p><FaYoutube/></p></Link></div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Footer;