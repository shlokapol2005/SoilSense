import React, { useState, useEffect } from "react";
import {
  Target,
  Wheat,
  Sprout,
  Sun,
  TrendingUp,
  AlertTriangle,
  Star,
  ArrowRight,
  Leaf,
  ArrowLeft
} from "lucide-react";
import "./Recommendations.css";

const RecommendationsPage = ({ analysisData, setActiveTab }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Build crop recommendations from analysis data
  const getCropRecommendations = () => {
    if (!analysisData || !analysisData.Available_Crops) {
      return {};
    }

    const recommendations = {};
    
    analysisData.Available_Crops.forEach((cropName, index) => {
      const cropKey = cropName.toLowerCase().replace(/\s+/g, '_');
      recommendations[cropKey] = {
        name: cropName,
        icon: index % 2 === 0 ? Wheat : Leaf,
        suitability: 95 - (index * 5), // Decreasing suitability
        season: "Based on local climate",
        duration: "Varies by variety",
        expectedYield: "Consult local experts",
        waterRequirement: analysisData.Average_pH > 7 ? "Medium" : "Medium-High",
        soilType: analysisData.Soil,
        fertilizers: analysisData.Recommended_Fertilizers.map(fert => ({
          name: fert,
          quantity: "",
          timing: ""
        })),
        nutrients: {
          nitrogen: analysisData.Average_Nitrogen,
          phosphorus: analysisData.Average_Phosphorus,
          potassium: analysisData.Average_Potassium,
          pH: analysisData.Average_pH
        }
      };
    });

    return recommendations;
  };

  const cropRecommendations = analysisData ? getCropRecommendations() : {};

  // Set initial selected crop
  useEffect(() => {
    if (Object.keys(cropRecommendations).length > 0 && !selectedCrop) {
      setSelectedCrop(Object.keys(cropRecommendations)[0]);
    }
  }, [cropRecommendations, selectedCrop]);

  // If no data, show message
  if (!analysisData) {
    return (
      <div className="recommendations-page">
        <div className="page-container">
          <div className="no-data-card">
            <AlertTriangle size={48} color="#f59e0b" />
            <h2>No Analysis Data Found</h2>
            <p>Please complete the soil analysis first to get personalized recommendations.</p>
            <button 
              className="back-button"
              onClick={() => setActiveTab && setActiveTab('Soil Analysis')}
            >
              <ArrowLeft size={20} />
              Go to Soil Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCrop = cropRecommendations[selectedCrop];
  if (!currentCrop) return null;
  
  const CropIcon = currentCrop.icon;

  const getSuitabilityClass = (score) => {
    if (score >= 90) return "suitability-high";
    if (score >= 80) return "suitability-medium";
    return "suitability-low";
  };

  const getStarRating = (score) => {
    const stars = Math.round((score / 100) * 5);
    return { filled: stars, empty: 5 - stars };
  };

  return (
    <div className="recommendations-page">
      <div className="page-container">
        {/* Header */}
        <header className="recommendations-header">
          <h1 className="recommendations-title">
            <Target className="header-icon" />
            AI-Powered Recommendations
          </h1>
          <p className="recommendations-subtitle">
            Personalized crop and fertilizer recommendations based on your soil analysis from {analysisData.District}
          </p>
        </header>

        {/* Analysis Summary Card */}
        <section className="card analysis-summary-card">
          <h3 className="section-title">Your Soil Analysis Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">District</span>
              <span className="summary-value">{analysisData.District}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Soil Type</span>
              <span className="summary-value">{analysisData.Soil}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Temperature</span>
              <span className="summary-value">{analysisData.Nearest_Temperature_Used}°C</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">pH Level</span>
              <span className="summary-value">{analysisData.Average_pH}</span>
            </div>
          </div>
        </section>

        {/* Crop Selection */}
        <section className="card crops-card">
          <h2 className="section-title">Recommended Crops for Your Soil</h2>
          <div className="crop-buttons">
            {Object.entries(cropRecommendations).map(([key, crop]) => {
              const Icon = crop.icon;
              const rating = getStarRating(crop.suitability);
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
                        {[...Array(rating.filled)].map((_, i) => (
                          <Star key={`filled-${i}`} className="star-filled" size={16} />
                        ))}
                        {[...Array(rating.empty)].map((_, i) => (
                          <Star key={`empty-${i}`} className="star-empty" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Grid */}
        <div className="recommendations-grid">
          {/* Left Column */}
          <div className="card details-card">
            <div className="crop-basic-info">
              <div className="crop-icon-box">
                <CropIcon className="crop-main-icon" />
              </div>
              <div className="crop-text-info">
                <h2 className="crop-name-main">{currentCrop.name}</h2>
                <p className="crop-recommended">Recommended Based on Your Soil Analysis</p>
              </div>
            </div>

            {/* Soil Nutrient Parameters */}
            <div className="crop-parameters">
              <div className="param-box">
                <span className="param-label">Nitrogen (N)</span>
                <span className="param-value">{currentCrop.nutrients.nitrogen}</span>
              </div>
              <div className="param-box">
                <span className="param-label">Phosphorus (P)</span>
                <span className="param-value">{currentCrop.nutrients.phosphorus}</span>
              </div>
              <div className="param-box">
                <span className="param-label">Potassium (K)</span>
                <span className="param-value">{currentCrop.nutrients.potassium}</span>
              </div>
              <div className="param-box">
                <span className="param-label">pH Level</span>
                <span className="param-value">{currentCrop.nutrients.pH}</span>
              </div>
            </div>

            {/* Fertilizer Section */}
            <div className="fertilizer-section">
              <h3 className="section-subtitle">
                <Sprout className="section-icon" /> Recommended Fertilizers
              </h3>

              {currentCrop.fertilizers.map((fertilizer, idx) => (
                <div key={idx} className="fertilizer-card">
                  <div className="fertilizer-info">
                    <h4 className="fertilizer-name">{fertilizer.name}</h4>
                    <p className="fertilizer-timing">{fertilizer.timing}</p>
                  </div>
                  <div className="fertilizer-quantity">
                    <p className="quantity">{fertilizer.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="important-note">
                <AlertTriangle className="note-icon" />
                <p>
                  These recommendations are based on your soil analysis from {analysisData.District} district with {analysisData.Soil} soil. 
                  Analysis used {analysisData.Number_of_Records} historical records. Always consult with local agricultural experts before making final decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="recommendations-sidebar">
            <div className="card sidebar-card quick-actions">
              <h3 className="sidebar-title">Quick Actions</h3>
              <button className="action-button" onClick={() => setActiveTab && setActiveTab('Soil Analysis')}>
                <Target className="action-icon" />
                New Soil Analysis
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
                <span className="compatibility-value">
                  {analysisData.Average_pH >= 6.5 && analysisData.Average_pH <= 7.5 ? "Excellent" : "Good"}
                </span>
              </div>
              <div className="compatibility-item">
                <span>Nitrogen</span>
                <span className="compatibility-value">
                  {analysisData.Average_Nitrogen > 250 ? "Good" : "Fair"}
                </span>
              </div>
              <div className="compatibility-item">
                <span>Phosphorus</span>
                <span className="compatibility-value">
                  {analysisData.Average_Phosphorus > 40 ? "Good" : "Fair"}
                </span>
              </div>
              <div className="compatibility-item">
                <span>Potassium</span>
                <span className="compatibility-value">
                  {analysisData.Average_Potassium > 300 ? "Good" : "Fair"}
                </span>
              </div>

              <div className="compatibility-note">
                Your {analysisData.Soil} soil from {analysisData.District} is well-suited for {currentCrop.name} cultivation.
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