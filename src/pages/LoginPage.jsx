// src/pages/LoginPage.jsx
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add real authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", remember);

    // After successful login, redirect to Dashboard
    setIsLoggedIn(true);
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <h1 className="logo">🌱 SoilSense</h1>
        <h2>Smart Soil Quality Analyzer & Fertilizer Recommendation System</h2>
        <p>
          Helping farmers make data-driven decisions for sustainable agriculture
          through advanced soil analysis and personalized recommendations.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>Soil Analysis</h3>
            <p>
              Upload test reports or enter soil parameters for instant analysis
            </p>
          </div>
          <div className="feature-card">
            <h3>Smart Recommendations</h3>
            <p>Get AI-powered crop and fertilizer suggestions</p>
          </div>
          <div className="feature-card">
            <h3>Weather Insights</h3>
            <p>Access location-based weather data for better planning</p>
          </div>
          <div className="feature-card">
            <h3>Fertilizer Calculator</h3>
            <p>Calculate precise fertilizer quantities for your farm area</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-box">
          <h2>Login to Your Account</h2>
          <p>
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button className="google-btn">Google</button>
            <button className="facebook-btn">Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
