import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  History as HistoryIcon,
  Calendar,
  Thermometer,
  Leaf,
  Droplet,
  Eye,
  Download,
  Search,
} from "lucide-react";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("predictions");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/history")
      .then((res) => {
        setHistory(res.data.history || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-[#0c1117]">
        <Loader2 className="animate-spin mr-3" size={28} />
        <span className="text-xl">Loading prediction history...</span>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-container">
        {/* Header */}
        <div className="history-header">
          <h1 className="history-title">
            <HistoryIcon className="history-title-icon" />
            Prediction History
          </h1>
          <p className="history-subtitle">
            All your soil, crop, and fertilizer predictions in one place
          </p>
        </div>

        {/* Search */}
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
            </div>
            <button className="export-btn">
              <Download className="export-icon" />
              
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-wrap">
          <div className="tabs-card">
            <button
              onClick={() => setActiveTab("predictions")}
              className={`tab-btn ${activeTab === "predictions" ? "active" : ""}`}
            >
              <Calendar className="tab-icon" />
              Your Farming History
            </button>
          </div>
        </div>

        {/* Prediction Cards */}
        {activeTab === "predictions" && (
          <div className="section">
            {history.length === 0 ? (
              <p className="text-center text-gray-400 mt-16">
                No predictions made yet.
              </p>
            ) : (
              <div className="space-y-6">
                {history
                  .filter(
                    (item) =>
                      item.District?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.Soil?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <div key={index} className="card record-card">
                      {/* Record Head */}
                      <div className="record-head">
                        <div className="record-head-left">
                          <div className="record-icon-box blue">
                            <Calendar className="record-icon blue" />
                          </div>
                          <div>
                            <h3 className="record-title">
                              {item.District} — {item.Soil}
                            </h3>
                            <p className="record-date">
                              <Calendar className="date-icon" />
                              {item.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="record-actions">
                          <span className={getStatusPillClass(item.status || "completed")}>
                            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Completed"}
                          </span>
                          <button className="icon-btn">
                            <Eye className="icon" />
                          </button>
                          <button className="icon-btn">
                            <Download className="icon" />
                          </button>
                        </div>
                      </div>

                      {/* Nutrients Grid */}
                      <div className="nutrient-grid">
                        <div className="nutrient-box nitrogen">
                          <p className="nutrient-label">N</p>
                          <p className="nutrient-value">{item.Average_Nitrogen}</p>
                        </div>
                        <div className="nutrient-box phosphorus">
                          <p className="nutrient-label">P</p>
                          <p className="nutrient-value">{item.Average_Phosphorus}</p>
                        </div>
                        <div className="nutrient-box potassium">
                          <p className="nutrient-label">K</p>
                          <p className="nutrient-value">{item.Average_Potassium}</p>
                        </div>
                        <div className="nutrient-box ph">
                          <p className="nutrient-label">pH</p>
                          <p className="nutrient-value">{item.Average_pH}</p>
                        </div>
                        <div className="nutrient-box temperature">
                          <p className="nutrient-label">Temp (°C)</p>
                          <p className="nutrient-value">{item.Entered_Temperature}</p>
                        </div>
                      </div>

                      {/* Crops & Fertilizers */}
                      <div className="list-row mt-4">
                        {item.Available_Crops?.map((crop, i) => (
                          <div key={i} className="pill pill-crop">
                            <Leaf className="pill-icon" /> {crop}
                          </div>
                        ))}
                      </div>
                      <div className="list-row mt-2">
                        {item.Recommended_Fertilizers?.map((fert, i) => (
                          <div key={i} className="pill pill-fertilizer">
                            <Droplet className="pill-icon" /> {fert}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
