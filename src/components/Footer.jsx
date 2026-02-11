import React from 'react';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="logo">
                        <Shield className="logo-icon" />
                        <span>Fraud<span>Shield</span></span>
                    </div>
                    <p>Protecting the future of digital finance with intelligent security solutions.</p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Product</h4>
                        <a href="#">API Documentation</a>
                        <a href="#">Security</a>
                        <a href="#">Pricing</a>
                    </div>
                    <div className="link-group">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Blog</a>
                        <a href="#">Careers</a>
                    </div>
                    <div className="link-group">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Status</a>
                    </div>
                </div>

                <div className="footer-social">
                    <a href="#"><Github size={20} /></a>
                    <a href="#"><Twitter size={20} /></a>
                    <a href="#"><Linkedin size={20} /></a>
                </div>
            </div>
            <div className="footer-bottom container">
                <p>&copy; 2026 FraudShield AI Inc. All rights reserved.</p>
                <div className="bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
