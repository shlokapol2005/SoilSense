import React, { useState } from "react";
import {
  History as HistoryIcon,
  Calendar,
  TrendingUp,
  BarChart3,
  Download,
  Eye,
  Search,
  Beaker,
  Target,
} from "lucide-react";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("soil-tests");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const soilTestHistory = [
    { id: 1, date: "2024-01-15", location: "Field A - North Section", soilType: "Loamy Soil", ph: 6.8, nitrogen: "Medium", phosphorus: "High", potassium: "Low", organicMatter: "Good", status: "completed" },
    { id: 2, date: "2023-12-10", location: "Field B - South Section", soilType: "Clay Loam", ph: 7.2, nitrogen: "High", phosphorus: "Medium", potassium: "Medium", organicMatter: "Fair", status: "completed" },
    { id: 3, date: "2023-11-05", location: "Field C - East Section", soilType: "Sandy Loam", ph: 6.5, nitrogen: "Low", phosphorus: "Low", potassium: "High", organicMatter: "Poor", status: "completed" },
  ];

  const recommendationHistory = [
    { id: 1, date: "2024-01-16", crop: "Wheat", soilType: "Loamy Soil", recommendations: ["Add potassium-rich fertilizer", "Maintain current pH levels"], fertilizers: ["Urea: 130 kg/acre", "DAP: 100 kg/acre", "MOP: 50 kg/acre"], status: "implemented" },
    { id: 2, date: "2023-12-11", crop: "Rice", soilType: "Clay Loam", recommendations: ["Improve drainage", "Add organic compost"], fertilizers: ["Urea: 120 kg/acre", "SSP: 150 kg/acre", "MOP: 40 kg/acre"], status: "pending" },
  ];

  const yieldHistory = [
    { id: 1, season: "Rabi 2023-24", crop: "Wheat", area: "12.5 acres", expectedYield: "312.5 quintals", actualYield: "295 quintals", efficiency: "94.4%", revenue: "₹1,47,500" },
    { id: 2, season: "Kharif 2023", crop: "Rice", area: "10 acres", expectedYield: "200 quintals", actualYield: "185 quintals", efficiency: "92.5%", revenue: "₹92,500" },
  ];

  const getStatusPillClass = (status) => {
    switch (status) {
      case "completed":
      case "implemented":
        return "pill pill-green";
      case "pending":
        return "pill pill-yellow";
      case "in-progress":
        return "pill pill-blue";
      default:
        return "pill pill-gray";
    }
  };

  const getNutrientClass = (level) => {
    const v = String(level).toLowerCase();
    if (v === "high") return "nut nut-green";
    if (v === "medium") return "nut nut-yellow";
    if (v === "low") return "nut nut-red";
    return "nut nut-gray";
  };

  return (
    <div className="history-page">
      <div className="history-container">
        {/* Header */}
        <div className="history-header">
          <h1 className="history-title">
            <HistoryIcon className="history-title-icon" />
            Farm History & Analytics
          </h1>
          <p className="history-subtitle">
            Track your farming progress, analyze trends, and make data-driven decisions
          </p>
        </div>

        {/* Filters/Search */}
        <div className="card filters-card">
          <div className="filters-row">
            <div className="filters-left">
              <div className="search-wrap">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="period-select"
              >
                <option value="all">All Time</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>

            <button className="export-btn">
              <Download className="export-icon" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-wrap">
          <div className="tabs-card">
            <button
              onClick={() => setActiveTab("soil-tests")}
              className={`tab-btn ${activeTab === "soil-tests" ? "active" : ""}`}
            >
              <Beaker className="tab-icon" />
              <span>Soil Tests</span>
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`tab-btn ${activeTab === "recommendations" ? "active" : ""}`}
            >
              <Target className="tab-icon" />
              <span>Recommendations</span>
            </button>
            <button
              onClick={() => setActiveTab("yield-data")}
              className={`tab-btn ${activeTab === "yield-data" ? "active" : ""}`}
            >
              <BarChart3 className="tab-icon" />
              <span>Yield Data</span>
            </button>
          </div>
        </div>

        {/* Soil Tests */}
        {activeTab === "soil-tests" && (
          <div className="section">
            <h2 className="section-title">Soil Test History</h2>

            {soilTestHistory.map((test) => (
              <div key={test.id} className="card record-card">
                <div className="record-head">
                  <div className="record-head-left">
                    <div className="record-icon-box blue">
                      <Beaker className="record-icon blue" />
                    </div>
                    <div>
                      <h3 className="record-title">{test.location}</h3>
                      <p className="record-date">
                        <Calendar className="date-icon" />
                        {new Date(test.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="record-actions">
                    <span className={getStatusPillClass(test.status)}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                    <button className="icon-btn">
                      <Eye className="icon" />
                    </button>
                    <button className="icon-btn">
                      <Download className="icon" />
                    </button>
                  </div>
                </div>

                <div className="nut-grid">
                  <div className="nut-box soil">
                    <p className="nut-label green">Soil Type</p>
                    <p className="nut-value green-dark">{test.soilType}</p>
                  </div>
                  <div className="nut-box ph">
                    <p className="nut-label blue">pH Level</p>
                    <p className="nut-value blue-dark">{test.ph}</p>
                  </div>
                  <div className={`nut-box ${getNutrientClass(test.nitrogen)}`}>
                    <p className="nut-label">Nitrogen</p>
                    <p className="nut-value">{test.nitrogen}</p>
                  </div>
                  <div className={`nut-box ${getNutrientClass(test.phosphorus)}`}>
                    <p className="nut-label">Phosphorus</p>
                    <p className="nut-value">{test.phosphorus}</p>
                  </div>
                  <div className={`nut-box ${getNutrientClass(test.potassium)}`}>
                    <p className="nut-label">Potassium</p>
                    <p className="nut-value">{test.potassium}</p>
                  </div>
                  <div className={`nut-box ${getNutrientClass(test.organicMatter)}`}>
                    <p className="nut-label">Organic Matter</p>
                    <p className="nut-value">{test.organicMatter}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {activeTab === "recommendations" && (
          <div className="section">
            <h2 className="section-title">Recommendation History</h2>

            {recommendationHistory.map((rec) => (
              <div key={rec.id} className="card record-card">
                <div className="record-head">
                  <div className="record-head-left">
                    <div className="record-icon-box green">
                      <Target className="record-icon green" />
                    </div>
                    <div>
                      <h3 className="record-title">{rec.crop} Recommendations</h3>
                      <p className="record-date">
                        <Calendar className="date-icon" />
                        {new Date(rec.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span className={getStatusPillClass(rec.status)}>
                    {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                  </span>
                </div>

                <div className="rec-grid">
                  <div>
                    <h4 className="rec-subtitle">Soil Recommendations</h4>
                    <div className="dot-list">
                      {rec.recommendations.map((item, idx) => (
                        <div key={idx} className="dot-row">
                          <span className="dot green"></span>
                          <p className="dot-text">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="rec-subtitle">Fertilizer Plan</h4>
                    <div className="pill-list">
                      {rec.fertilizers.map((f, idx) => (
                        <div key={idx} className="pill-blue">
                          <p className="pill-text">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yield */}
        {activeTab === "yield-data" && (
          <div className="section">
            <h2 className="section-title">Yield Performance</h2>

            {yieldHistory.map((yd) => (
              <div key={yd.id} className="card record-card">
                <div className="record-head yield">
                  <div className="record-head-left">
                    <div className="record-icon-box purple">
                      <BarChart3 className="record-icon purple" />
                    </div>
                    <div>
                      <h3 className="record-title">{yd.season}</h3>
                      <p className="record-sub">{yd.crop} - {yd.area}</p>
                    </div>
                  </div>

                  <div className="yield-right">
                    <p className="yield-number">{yd.efficiency}</p>
                    <p className="yield-label">Efficiency</p>
                  </div>
                </div>

                <div className="yield-grid">
                  <div className="yield-box blue">
                    <p className="yield-label-sm blue">Expected Yield</p>
                    <p className="yield-value blue-dark">{yd.expectedYield}</p>
                  </div>
                  <div className="yield-box green">
                    <p className="yield-label-sm green">Actual Yield</p>
                    <p className="yield-value green-dark">{yd.actualYield}</p>
                  </div>
                  <div className="yield-box purple">
                    <p className="yield-label-sm purple">Efficiency</p>
                    <p className="yield-value purple-dark">{yd.efficiency}</p>
                  </div>
                  <div className="yield-box yellow">
                    <p className="yield-label-sm yellow">Revenue</p>
                    <p className="yield-value yellow-dark">{yd.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
