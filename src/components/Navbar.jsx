import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <Shield className="logo-icon" size={28} />
                    <span>Fraud<span>Shield</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-links">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/predict" className={`nav-link ${isActive('/predict') ? 'active' : ''}`}>
                        Analyze
                    </Link>
                    <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                        <LayoutDashboard size={18} style={{ marginRight: '6px' }} />
                        Dashboard
                    </Link>
                </div>

                <div className="navbar-actions">
                    <Link to="/predict" className="btn-primary">Get Started</Link>
                    <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu glass">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/') ? 'active' : ''}>Home</Link>
                    <Link to="/predict" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/predict') ? 'active' : ''}>Analyze</Link>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
                    <Link to="/predict" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Monitor Now</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
