import React, { useState } from "react";
import {
  Upload,
  FileText,
  Beaker,
  Camera,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Leaf,
  Droplet,
  ArrowRight
} from "lucide-react";
import "./SoilAnalysis.css";

const SoilAnalysis = ({ setActiveTab, setAnalysisData }) => {
  const [activeTabLocal, setActiveTabLocal] = useState("manual");
  const [manualData, setManualData] = useState({
    district: "",
    soilColor: "",
    temperature: "",
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const districts = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai_City", "Mumbai_Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];
  const soilColors = ["Black", "Red", "Medium Brown", "Dark Brown", "Light Brown", "Grey", "Brown", "Reddish Brown"];

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    if (!manualData.district || !manualData.soilColor || !manualData.temperature) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          district: manualData.district,
          soil: manualData.soilColor,
          temperature: manualData.temperature,
        }),
      });

      const data = await res.json();
      
      console.log("API Response:", data); 
      
      if (res.ok) {
        setAnalysisResult(data);
     
        if (setAnalysisData) {
          setAnalysisData(data);
        }
      } else {
        alert(data.error || "Failed to fetch prediction");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Failed to fetch prediction. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecommendations = () => {
    if (setActiveTab) {
      setActiveTab("Recommendations");
    }
  };

  return (
    <div className="soil-analysis-container">
      <div className="soil-analysis-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">
            <Beaker className="header-icon" />
            Soil Analysis
          </h1>
          <p className="header-description">
            Enter soil parameters to get detailed nutrient analysis and crop recommendations.
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-navigation">
          <div className="tab-container">
            <button
              onClick={() => setActiveTabLocal("manual")}
              className={`tab-button ${
                activeTabLocal === "manual" ? "tab-active" : "tab-inactive"
              }`}
            >
              <FileText className="tab-icon" />
              Manual Entry
            </button>
          </div>
        </div>

        {/* Manual Entry */}
        {activeTabLocal === "manual" && (
          <div className="manual-card">
            <h2 className="card-title">Manual Soil Parameter Entry</h2>
            <form onSubmit={handleManualSubmit} className="manual-form">
              <div className="form-grid">
                {/* District */}
                <div className="form-field">
                  <label className="field-label">
                    District <span className="required">*</span>
                  </label>
                  <select
                    value={manualData.district}
                    onChange={(e) =>
                      setManualData({ ...manualData, district: e.target.value })
                    }
                    className="field-input"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Soil Color */}
                <div className="form-field">
                  <label className="field-label">
                    Soil Color <span className="required">*</span>
                  </label>
                  <select
                    value={manualData.soilColor}
                    onChange={(e) =>
                      setManualData({ ...manualData, soilColor: e.target.value })
                    }
                    className="field-input"
                    required
                  >
                    <option value="">Select Soil Color</option>
                    {soilColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Temperature */}
                <div className="form-field">
                  <label className="field-label">
                    Temperature (°C) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualData.temperature}
                    onChange={(e) =>
                      setManualData({ ...manualData, temperature: e.target.value })
                    }
                    className="field-input"
                    placeholder="Enter temperature (e.g. 26)"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="analyze-button">
                <BarChart3 className="button-icon" />
                <span>Analyze Soil</span>
              </button>
            </form>
          </div>
        )}

        {/* Loader */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Analyzing your soil data...</p>
          </div>
        )}

        {/* Results */}
        {analysisResult && !loading && (
          <div className="results-card">
            <h3 className="results-title">
              <AlertCircle className="results-icon" />
              Analysis Results
            </h3>

            {/* Input Summary */}
            <div className="results-section">
              <h4 className="section-title">Input Parameters</h4>
              <div className="results-grid">
                <p><strong>District:</strong> {analysisResult.District}</p>
                <p><strong>Soil Color:</strong> {analysisResult.Soil}</p>
                <p><strong>Entered Temperature:</strong> {analysisResult.Entered_Temperature}°C</p>
                <p><strong>Nearest Temperature Used:</strong> {analysisResult.Nearest_Temperature_Used}°C</p>
                {analysisResult.Temperature_Difference > 0 && (
                  <p><strong>Temperature Difference:</strong> {analysisResult.Temperature_Difference}°C</p>
                )}
              </div>
            </div>

               {/* Data Summary - FIXED */}
            <div className="results-section">
              <h4 className="section-title">
                <BarChart3 size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Data Summary
              </h4>
              <p className="info-text">
                Found {analysisResult.Records_Found} matching records for {analysisResult.District} district 
                with {analysisResult.Soil} soil at {analysisResult.Nearest_Temperature_Used}°C
              </p>
              <p className="info-text">
                <strong>Records analyzed:</strong> {analysisResult.Records_Found}
              </p>
            </div>

            {/* Nutrient Analysis */}
            <div className="results-section">
              <h4 className="section-title">
                <Droplet size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Average Nutrient Levels
              </h4>
              <div className="results-grid">
                <p><strong>Nitrogen (N):</strong> {analysisResult.Average_Nitrogen}</p>
                <p><strong>Phosphorus (P):</strong> {analysisResult.Average_Phosphorus}</p>
                <p><strong>Potassium (K):</strong> {analysisResult.Average_Potassium}</p>
                <p><strong>pH Level:</strong> {analysisResult.Average_pH}</p>
              </div>
            </div>

            {/* Available Crops */}
            <div className="results-section">
              <h4 className="section-title">
                <Leaf size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Suitable Crops
              </h4>
              <div className="crops-container">
                {analysisResult.Available_Crops.map((crop, index) => (
                  <span key={index} className="crop-badge">
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Fertilizers */}
            <div className="results-section">
              <h4 className="section-title">
                <Beaker size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Recommended Fertilizers
              </h4>
              <div className="fertilizers-container">
                {analysisResult.Recommended_Fertilizers.map((fertilizer, index) => (
                  <span key={index} className="fertilizer-badge">
                    {fertilizer}
                  </span>
                ))}
              </div>
            </div>

            {/* View Recommendations Button */}
            <div className="recommendations-cta">
              <button 
                className="view-recommendations-button"
                onClick={handleViewRecommendations}
              >
                <span>View Detailed Recommendations</span>
                <ArrowRight className="button-icon" />
              </button>
            </div>

            <div className="success-note">
              <CheckCircle className="success-icon" />
              <span>Analysis complete!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;