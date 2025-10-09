import React, { useState } from "react";
import {
  Target,
  Wheat,
  Sprout,
  Sun,
  TrendingUp,
  AlertTriangle,
  Star,
  ArrowRight,
  Leaf
} from "lucide-react";
import "./Recommendations.css";

const RecommendationsPage = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");

  const cropRecommendations = {
    wheat: {
      name: "Wheat",
      icon: Wheat,
      suitability: 95,
      season: "Rabi (Winter)",
      duration: "120-150 days",
      expectedYield: "25-30 quintals/acre",
      waterRequirement: "Medium (450-650mm)",
      soilType: "Loamy, Well-drained",
      fertilizers: [
        { name: "Urea", quantity: "130 kg/acre", timing: "Basal + Top dressing" },
        { name: "DAP", quantity: "100 kg/acre", timing: "At sowing" },
        { name: "MOP", quantity: "50 kg/acre", timing: "At sowing" }
      ]
    },
    rice: {
      name: "Rice",
      icon: Leaf,
      suitability: 88,
      season: "Kharif (Monsoon)",
      duration: "90-120 days",
      expectedYield: "20-25 quintals/acre",
      waterRequirement: "High (1200-1500mm)",
      soilType: "Clay, Water-logged",
      fertilizers: [
        { name: "Urea", quantity: "120 kg/acre", timing: "Split application" },
        { name: "SSP", quantity: "150 kg/acre", timing: "At transplanting" },
        { name: "MOP", quantity: "40 kg/acre", timing: "At transplanting" }
      ]
    }
  };

  const currentCrop = cropRecommendations[selectedCrop];
  const CropIcon = currentCrop.icon;

  const getSuitabilityClass = (score) => {
    if (score >= 90) return "suitability-high";
    if (score >= 80) return "suitability-medium";
    return "suitability-low";
  };

  return (
    <div className="recommendations-page">
      <div className="page-container">
        {/* Plain header (no card) */}
        <header className="recommendations-header">
          <h1 className="recommendations-title">
            <Target className="header-icon" />
            AI-Powered Recommendations
          </h1>
          <p className="recommendations-subtitle">
            Get personalized crop and fertilizer recommendations based on your soil analysis and local conditions
          </p>
        </header>

        {/* Crop Selection card */}
        <section className="card crops-card">
          <h2 className="section-title">Recommended Crops for Your Soil</h2>
          <div className="crop-buttons">
            {Object.entries(cropRecommendations).map(([key, crop]) => {
              const Icon = crop.icon;
              return (
                <button
                  key={key}
                  className={`crop-button ${selectedCrop === key ? "selected" : ""}`}
                  onClick={() => setSelectedCrop(key)}
                >
                  <div className="crop-icon-container">
                    <Icon className="crop-icon" />
                  </div>
                  <div className="crop-info">
                    <h3 className="crop-name">{crop.name}</h3>
                    <div className="crop-rating">
                      <span className={`crop-suitability ${getSuitabilityClass(crop.suitability)}`}>
                        {crop.suitability}% Match
                      </span>
                      <div className="star-rating">
                        <Star className="star-filled" size={16} />
                        <Star className="star-filled" size={16} />
                        <Star className="star-filled" size={16} />
                        <Star className="star-filled" size={16} />
                        <Star className="star-empty" size={16} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main grid */}
        <div className="recommendations-grid">
          {/* Left column */}
          <div className="card details-card">
            <div className="crop-basic-info">
              <div className="crop-icon-box">
                <CropIcon className="crop-main-icon" />
              </div>
              <div className="crop-text-info">
                <h2 className="crop-name-main">{currentCrop.name}</h2>
                <p className="crop-recommended">Highly Recommended for Your Soil</p>
              </div>
            </div>

            <div className="crop-parameters">
              <div className="param-box">
                <span className="param-label">Season</span>
                <span className="param-value">{currentCrop.season}</span>
              </div>
              <div className="param-box">
                <span className="param-label">Duration</span>
                <span className="param-value">{currentCrop.duration}</span>
              </div>
              <div className="param-box">
                <span className="param-label">Expected Yield</span>
                <span className="param-value">{currentCrop.expectedYield}</span>
              </div>
              <div className="param-box">
                <span className="param-label">Water Requirement</span>
                <span className="param-value">{currentCrop.waterRequirement}</span>
              </div>
            </div>

            <div className="fertilizer-section">
              <h3 className="section-subtitle">
                <Sprout className="section-icon" /> Fertilizer Recommendations
              </h3>

              {currentCrop.fertilizers.map((fertilizer, idx) => (
                <div key={idx} className="fertilizer-card">
                  <div className="fertilizer-info">
                    <h4 className="fertilizer-name">{fertilizer.name}</h4>
                    <p className="fertilizer-timing">{fertilizer.timing}</p>
                  </div>
                  <div className="fertilizer-quantity">
                    <p className="quantity">{fertilizer.quantity}</p>
                    <p className="per-acre">per acre</p>
                  </div>
                </div>
              ))}

              <div className="important-note">
                <AlertTriangle className="note-icon" />
                <p>
                  These recommendations are based on your soil analysis. Always consult with local agricultural experts and consider current market prices before making final decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="recommendations-sidebar">
            <div className="card sidebar-card quick-actions">
              <h3 className="sidebar-title">Quick Actions</h3>
              <button className="action-button">
                <Target className="action-icon" />
                Calculate Fertilizer Quantity
              </button>
              <button className="action-button">
                <Sun className="action-icon" />
                Check Weather Forecast
              </button>
              <button className="action-button">
                <TrendingUp className="action-icon" />
                View Market Prices
              </button>
            </div>

            <div className="card sidebar-card soil-compatibility">
              <h3 className="sidebar-title">Soil Compatibility</h3>
              <div className="compatibility-item">
                <span>pH Level</span>
                <span className="compatibility-value">Excellent</span>
              </div>
              <div className="compatibility-item">
                <span>Drainage</span>
                <span className="compatibility-value">Good</span>
              </div>
              <div className="compatibility-item">
                <span>Organic Matter</span>
                <span className="compatibility-value">Fair</span>
              </div>
              <div className="compatibility-item">
                <span>Nutrient Level</span>
                <span className="compatibility-value">Good</span>
              </div>

              <div className="compatibility-note">
                Your soil is well-suited for {currentCrop.name} cultivation with minimal amendments needed.
              </div>
            </div>

            <div className="expert-consultation">
              <h3 className="sidebar-title">Need Expert Advice?</h3>
              <p>Connect with agricultural experts for personalized guidance on your farming decisions.</p>
              <button className="consult-button">
                <ArrowRight className="action-icon" />
                Consult Expert
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
