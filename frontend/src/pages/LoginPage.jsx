// src/pages/LoginPage.jsx
// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = ({ setIsLoggedIn, switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        alert(res.data.message);
        
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Something went wrong. Try again!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container auth-container">
      {/* Left side */}
      <div className="left-section auth-left">
        <h1 className="logo auth-logo">🌱 SoilSense</h1>
        <h2>Smart Soil Quality Analyzer & Fertilizer Recommendation System</h2>
        <p>Helping farmers make data-driven decisions for sustainable agriculture.</p>
        <div className="features">
          <div className="feature-card">
            <h3>Soil Analysis</h3>
            <p>Upload test reports or enter soil parameters for instant analysis</p>
          </div>
          <div className="feature-card">
            <h3>Recommendations</h3>
            <p>AI-powered crop and fertilizer suggestions</p>
          </div>
          <div className="feature-card">
            <h3>Weather Insights</h3>
            <p>Location-based weather for better planning</p>
          </div>
          <div className="feature-card">
            <h3>Fertilizer Calculator</h3>
            <p>Precise fertilizer quantities for farm area</p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="right-section auth-right">
        <div className="form-box">
          <h2>Welcome Back</h2>
          <p>
            Don't have an account?
            <button onClick={switchToSignUp} className="switch-btn">Sign up</button>
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="show-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="options">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="checkbox-text">Remember me</span>
              </label>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="divider"></div>
          <div className="social-buttons">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;