import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";




function Footer() {
    return (
        <div id="footer">
            <div className="footerContent">
            <div className="footerBoxL">
                <p className="connectFooter pt-3">Connect With Us: 
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaSquareFacebook className="connectLogo ms-2 me-1 mb-1"/></a>
                    <a href="https://www.x.com" target="_blank" rel="noreferrer"><FaSquareXTwitter className="connectLogo mx-1 mb-1"/></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaSquareInstagram className="connectLogo mx-1 mb-1"/></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className="connectLogo mx-1 mb-1"/></a>
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><FaSquareYoutube className="connectLogo mx-1 mb-1"/></a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noreferrer"><FaTiktok className="connectLogo mx-1 mb-1"/></a>
                </p>
                <p className="copyrightFooter">Copyright © {new Date().getFullYear()}. Build My Finance. All Rights Reserved.</p>
                <p className="footerBrand" style={{textAlign: "center"}}><a href="/">Build My Finance.</a></p>
            </div>

            <div className="footerBoxR">
                {/* <p className="navigateFooter">Navigate:</p> */}
                <p><a href="/">Home</a></p>
                <p><a href="/financemanagement">Finance Management</a></p>
                <p><a href="/contact">Contact</a></p>
                <p><a href="/about">About</a></p>
                <p><a href="/account">Account</a></p>
            </div>
            </div>
        </div>
    )
}

export default Footer;