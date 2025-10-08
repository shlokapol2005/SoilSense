
// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignUpPage = ({ setIsLoggedIn, switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sign Up Data:", formData);
    setIsLoggedIn(true);
  };

  return (
    <div className="auth-container">
      {/* Left Features Section */}
      <div className="auth-left">
        <h1 className="auth-logo">🌱 SoilSense</h1>
        <h2>Smart Soil Quality Analyzer & Fertilizer Recommendation System</h2>
        <p>
          Helping farmers make data-driven decisions for sustainable agriculture through advanced soil analysis and personalized recommendations.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>Soil Analysis</h3>
            <p>Upload test reports or enter soil parameters for instant analysis</p>
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

      {/* Right Sign Up Form */}
      <div className="auth-right">
        <div className="form-box">
          <h2>Create Account</h2>
          <p>
            Already have an account?{" "}
            <button onClick={switchToLogin} className="switch-btn">
              Log in
            </button>
          </p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="show-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <label>Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Create Account
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

export default SignUpPage;
