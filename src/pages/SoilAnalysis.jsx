// src/pages/SoilAnalysis.jsx

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Beaker,
  Camera,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Droplets,
  Leaf,
  ArrowRight,
  Download,
} from "lucide-react";
import "./SoilAnalysis.css";

const SoilAnalysis = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [manualData, setManualData] = useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    moisture: "",
    organicMatter: "",
    temperature: "",
  });
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate analysis after upload
      setTimeout(() => {
        setAnalysisResult({
          soilType: "Loamy Soil",
          ph: 6.8,
          nitrogen: "Medium",
          phosphorus: "High",
          potassium: "Low",
          organicMatter: "Good",
          recommendations: [
            "Add potassium-rich fertilizer",
            "Maintain current pH levels",
            "Consider crop rotation",
          ],
        });
      }, 2000);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        soilType: "Clay Loam",
        ph: parseFloat(manualData.ph) || 7.0,
        nitrogen: manualData.nitrogen || "Medium",
        phosphorus: manualData.phosphorus || "Medium",
        potassium: manualData.potassium || "Medium",
        organicMatter: "Fair",
        recommendations: [
          "Improve drainage",
          "Add organic compost",
          "Monitor pH levels regularly",
        ],
      });
    }, 1500);
  };

  const inputFields = [
    {
      key: "ph",
      label: "pH Level",
      type: "number",
      step: "0.1",
      min: "0",
      max: "14",
      unit: "",
    },
    {
      key: "nitrogen",
      label: "Nitrogen (N)",
      type: "number",
      step: "0.1",
      min: "0",
      unit: "mg/kg",
    },
    {
      key: "phosphorus",
      label: "Phosphorus (P)",
      type: "number",
      step: "0.1",
      min: "0",
      unit: "mg/kg",
    },
    {
      key: "potassium",
      label: "Potassium (K)",
      type: "number",
      step: "0.1",
      min: "0",
      unit: "mg/kg",
    },
    {
      key: "moisture",
      label: "Moisture Content",
      type: "number",
      step: "0.1",
      min: "0",
      max: "100",
      unit: "%",
    },
    {
      key: "organicMatter",
      label: "Organic Matter",
      type: "number",
      step: "0.1",
      min: "0",
      unit: "%",
    },
    {
      key: "temperature",
      label: "Soil Temperature",
      type: "number",
      step: "0.1",
      unit: "°C",
    },
  ];

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
            Upload your soil test reports or enter parameters manually to get
            detailed soil health analysis
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-container">
            <button
              onClick={() => setActiveTab("upload")}
              className={`tab-button ${
                activeTab === "upload" ? "tab-active" : "tab-inactive"
              }`}
            >
              <Upload className="tab-icon" />
              Upload Report
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`tab-button ${
                activeTab === "manual" ? "tab-active" : "tab-inactive"
              }`}
            >
              <FileText className="tab-icon" />
              Manual Entry
            </button>
          </div>
        </div>

        <div className="content-grid">
          {/* Input Section */}
          <div className="input-section">
            {activeTab === "upload" ? (
              <div className="upload-card">
                <h2 className="card-title">Upload Soil Test Report</h2>

                {!uploadedFile ? (
                  <div className="upload-area">
                    <Upload className="upload-icon" />
                    <h3 className="upload-title">
                      Upload your soil test report
                    </h3>
                    <p className="upload-description">
                      Supports PDF, Excel, or Image files (Max 10MB)
                    </p>

                    <label className="upload-button">
                      <Camera className="button-icon" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        className="file-input"
                        accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="upload-success-container">
                    <div className="success-message">
                      <div className="success-content">
                        <CheckCircle className="success-icon" />
                        <div>
                          <h3 className="success-title">
                            File Uploaded Successfully
                          </h3>
                          <p className="success-filename">
                            {uploadedFile.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {!analysisResult && (
                      <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">
                          Analyzing your soil report...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="manual-card">
                <h2 className="card-title">Manual Soil Parameter Entry</h2>

                <form onSubmit={handleManualSubmit} className="manual-form">
                  <div className="form-grid">
                    {inputFields.map((field) => (
                      <div key={field.key} className="form-field">
                        <label className="field-label">
                          {field.label}{" "}
                          {field.unit && (
                            <span className="field-unit">({field.unit})</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          step={field.step}
                          min={field.min}
                          max={field.max}
                          value={manualData[field.key]}
                          onChange={(e) =>
                            setManualData({
                              ...manualData,
                              [field.key]: e.target.value,
                            })
                          }
                          className="field-input"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="analyze-button">
                    <BarChart3 className="button-icon" />
                    <span>Analyze Soil</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="results-section">
            {analysisResult ? (
              <>
                <div className="results-card">
                  <h3 className="results-title">
                    <Leaf className="results-icon" />
                    Soil Analysis Results
                  </h3>

                  <div className="results-content">
                    <div className="soil-type">
                      <h4 className="soil-type-label">Soil Type</h4>
                      <p className="soil-type-value">
                        {analysisResult.soilType}
                      </p>
                    </div>

                    <div className="parameters-grid">
                      <div className="parameter-item parameter-ph">
                        <p className="parameter-label">pH Level</p>
                        <p className="parameter-value">{analysisResult.ph}</p>
                      </div>
                      <div className="parameter-item parameter-nitrogen">
                        <p className="parameter-label">Nitrogen</p>
                        <p className="parameter-value">
                          {analysisResult.nitrogen}
                        </p>
                      </div>
                      <div className="parameter-item parameter-phosphorus">
                        <p className="parameter-label">Phosphorus</p>
                        <p className="parameter-value">
                          {analysisResult.phosphorus}
                        </p>
                      </div>
                      <div className="parameter-item parameter-potassium">
                        <p className="parameter-label">Potassium</p>
                        <p className="parameter-value">
                          {analysisResult.potassium}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="recommendations-card">
                  <h3 className="recommendations-title">
                    <AlertCircle className="recommendations-icon" />
                    Recommendations
                  </h3>

                  <div className="recommendations-list">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="recommendation-item">
                        <div className="recommendation-bullet"></div>
                        <p className="recommendation-text">{rec}</p>
                      </div>
                    ))}
                  </div>

                  <button className="detailed-recommendations-button">
                    <ArrowRight className="button-icon" />
                    <span>Get Detailed Recommendations</span>
                  </button>
                </div>

                <div className="download-card">
                  <button className="download-button">
                    <Download className="button-icon" />
                    <span>Download Report</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="no-analysis-card">
                <div className="no-analysis-content">
                  <Droplets className="no-analysis-icon" />
                  <h3 className="no-analysis-title">No Analysis Yet</h3>
                  <p className="no-analysis-description">
                    Upload a report or enter soil parameters to see analysis
                    results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;
