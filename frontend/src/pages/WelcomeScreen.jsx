import React from "react";
import "./WelcomeScreen.css";
import bg from "../assets/soil-sense2.png";

const WelcomeScreen = ({ goToLogin, goToSignup }) => {
  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay"></div>

      <div className="content">
        <h1 className="title"> </h1>
        <p className="tagline">Smart Soil Quality Analyzer</p>

        <div className="btn-group">
          <button className="btn login-btn" onClick={goToLogin}>Login</button>
          
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
