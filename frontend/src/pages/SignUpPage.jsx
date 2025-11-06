
// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignUpPage = ({ setIsLoggedIn, switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const response =  await axios.post("http://localhost:5001/api/auth/signup",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        console.log("✅ User created successfully:", response.data);
        alert(response.data.message);
        // Store user info
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("❌ Error creating user:", error);
      
      
      if (error.response) {
        // Server responded with error
        console.error("Server Error:", error.response.data);
        alert(error.response.data.message || "Server error!");
      } else if (error.request) {
        // Request made but no response
        console.error("No response from server. Is backend running?");
        alert("Cannot connect to server! Make sure backend is running on http://localhost:5000");
      } else {
       
        console.error("Error:", error.message);
        alert("Error creating account!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="auth-logo">🌱 SoilSense</h1>
        <h2>Smart Soil Quality Analyzer & Fertilizer Recommendation System</h2>
        <p>
          Helping farmers make data-driven decisions for sustainable
          agriculture through advanced soil analysis and personalized
          recommendations.
        </p>
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
                placeholder="Your Name"
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
                minLength={6}
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

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;