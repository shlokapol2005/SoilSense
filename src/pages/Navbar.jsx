import React, { useState } from "react";
import "./Navbar.css";
import { Sprout, User, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Dashboard",
    "Soil Analysis",
    "Recommendations",
    "Weather",
    "Calculator",
    "History",
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="logo-container">
            <div className="logo-icon">
              <Sprout />
            </div>
            <span className="logo-text">SoilSense</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-items-desktop">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`nav-btn ${activeTab === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* User Profile & Mobile Menu */}
        <div className="navbar-right">
          <div className="user-profile-desktop">
            <div className="user-info">
              <p className="user-name">John Farmer</p>
              <p className="user-role">Farmer</p>
            </div>
            <div className="user-icon">
              <User />
            </div>
          </div>

          <button className="logout-btn-desktop">
            <LogOut />
            <span>Logout</span>
          </button>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-items">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setIsMenuOpen(false);
                }}
                className={`mobile-nav-btn ${
                  activeTab === item ? "active" : ""
                }`}
              >
                {item}
              </button>
            ))}

            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="mobile-user-icon">
                  <User />
                </div>
                <div>
                  <p className="user-name">John Farmer</p>
                  <p className="user-role">Farmer</p>
                </div>
              </div>
              <button className="mobile-logout-btn">
                <LogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
