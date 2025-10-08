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
      district: "",
      soilColor: "",
      temperature: "",
    });
    const [analysisResult, setAnalysisResult] = useState(null);

    // Hardcoded data based on your spreadsheet
    const soilDatabase = {
      "kolhapur-black": {
        nitrogen: "75",
        phosphorus: "50",
        potassium: "100",
        ph: "6.5",
        soilMoisture: "60-80%",
        rainfall: "1000",
        soilType: "Loamy",
        recommendations: [
          "Add balanced NPK fertilizer with emphasis on potassium",
          "Maintain soil moisture between 60-80%",
          "Ideal for sugarcane cultivation",
          "Monitor pH levels regularly to maintain optimal range"
        ]
      },
      "kolhapur-red": {
        nitrogen: "85",
        phosphorus: "60",
        potassium: "110",
        ph: "7.0",
        soilMoisture: "50-70%",
        rainfall: "1100",
        soilType: "Loamy",
        recommendations: [
          "Increase organic matter content",
          "Apply phosphorus-rich fertilizers",
          "Suitable for various crops with proper irrigation",
          "Consider crop rotation to maintain soil health"
        ]
      },
      "satara-black": {
        nitrogen: "80",
        phosphorus: "55",
        potassium: "105",
        ph: "6.8",
        soilMoisture: "55-75%",
        rainfall: "1200",
        soilType: "Loamy",
        recommendations: [
          "Maintain adequate moisture levels",
          "Add potassium supplements during dry seasons",
          "Good for cotton and soybean cultivation",
          "Regular soil testing recommended"
        ]
      },
      "sangli-black": {
        nitrogen: "90",
        phosphorus: "50",
        potassium: "100",
        ph: "6.5",
        soilMoisture: "50-70%",
        rainfall: "1000",
        soilType: "Loamy",
        recommendations: [
          "Excellent for sugarcane production",
          "Maintain pH around 6.5 for optimal yield",
          "Add nitrogen-based fertilizers during growing season",
          "Ensure proper drainage to prevent waterlogging"
        ]
      },
      "default": {
        nitrogen: "80",
        phosphorus: "55",
        potassium: "105",
        ph: "6.7",
        soilMoisture: "55-75%",
        rainfall: "1100",
        soilType: "Loamy",
        recommendations: [
          "Conduct detailed soil test for accurate analysis",
          "Maintain balanced NPK ratio",
          "Monitor moisture levels regularly",
          "Consider local crop patterns for best results"
        ]
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedFile(file);
        // Simulate analysis after upload
        setTimeout(() => {
          const sampleData = soilDatabase["kolhapur-black"];
          setAnalysisResult({
            district: "Kolhapur",
            soilColor: "Black",
            temperature: "22°C",
            ...sampleData
          });
        }, 2000);
      }
    };

    const handleManualSubmit = (e) => {
      e.preventDefault();
      
      // Validate inputs
      if (!manualData.district || !manualData.soilColor || !manualData.temperature) {
        alert("Please fill in all fields");
        return;
      }

      // Simulate analysis
      setTimeout(() => {
        // Create key for database lookup
        const key = `${manualData.district.toLowerCase()}-${manualData.soilColor.toLowerCase()}`;
        const soilData = soilDatabase[key] || soilDatabase["default"];
        
        setAnalysisResult({
          district: manualData.district,
          soilColor: manualData.soilColor,
          temperature: `${manualData.temperature}°C`,
          ...soilData
        });
      }, 1500);
    };

    const districts = ["Kolhapur", "Satara", "Sangli", "Pune", "Solapur"];
    const soilColors = ["Black", "Red", "Brown", "Alluvial"];

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
                      {/* District Dropdown */}
                      <div className="form-field">
                        <label className="field-label">
                          District <span className="required">*</span>
                        </label>
                        <select
                          value={manualData.district}
                          onChange={(e) =>
                            setManualData({
                              ...manualData,
                              district: e.target.value,
                            })
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

                      {/* Soil Color Dropdown */}
                      <div className="form-field">
                        <label className="field-label">
                          Soil Color <span className="required">*</span>
                        </label>
                        <select
                          value={manualData.soilColor}
                          onChange={(e) =>
                            setManualData({
                              ...manualData,
                              soilColor: e.target.value,
                            })
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

                      {/* Temperature Input */}
                      <div className="form-field">
                        <label className="field-label">
                          Temperature <span className="field-unit">(°C)</span> <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={manualData.temperature}
                          onChange={(e) =>
                            setManualData({
                              ...manualData,
                              temperature: e.target.value,
                            })
                          }
                          className="field-input"
                          placeholder="Enter temperature (e.g., 22)"
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


{analysisResult && (
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
                      {/* Input Summary */}
                      <div className="input-summary">
                        <div className="summary-item">
                          <span className="summary-label">District:</span>
                          <span className="summary-value">{analysisResult.district}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Soil Color:</span>
                          <span className="summary-value">{analysisResult.soilColor}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Temperature:</span>
                          <span className="summary-value">{analysisResult.temperature}</span>
                        </div>
                      </div>

                      {/* Soil Type */}
                      <div className="soil-type">
                        <h4 className="soil-type-label">Soil Type</h4>
                        <p className="soil-type-value">
                          {analysisResult.soilType} Soil
                        </p>
                      </div>

                      {/* NPK Values */}
                      <div className="parameters-grid">
                        <div className="parameter-item parameter-nitrogen">
                          <p className="parameter-label">Nitrogen (N)</p>
                          <p className="parameter-value">{analysisResult.nitrogen}</p>
                          <p className="parameter-unit">kg/ha</p>
                        </div>
                        <div className="parameter-item parameter-phosphorus">
                          <p className="parameter-label">Phosphorus (P)</p>
                          <p className="parameter-value">{analysisResult.phosphorus}</p>
                          <p className="parameter-unit">kg/ha</p>
                        </div>
                        <div className="parameter-item parameter-potassium">
                          <p className="parameter-label">Potassium (K)</p>
                          <p className="parameter-value">{analysisResult.potassium}</p>
                          <p className="parameter-unit">kg/ha</p>
                        </div>
                        <div className="parameter-item parameter-ph">
                          <p className="parameter-label">pH Level</p>
                          <p className="parameter-value">{analysisResult.ph}</p>
                          <p className="parameter-unit">pH</p>
                        </div>
                      </div>

                      {/* Additional Parameters */}
                      <div className="additional-params">
                        <div className="param-row">
                          <Droplets className="param-icon" />
                          <span className="param-label">Soil Moisture</span>
                          <span className="param-value">{analysisResult.soilMoisture}</span>
                        </div>
                        <div className="param-row">
                          <Droplets className="param-icon" />
                          <span className="param-label">Rainfall</span>
                          <span className="param-value">{analysisResult.rainfall} mm</span>
                        </div>
                      </div>
                    </div>
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