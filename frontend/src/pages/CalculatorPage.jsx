import React, { useState } from "react";
import {
  Calculator as CalcIcon,
  Sprout,
  Target,
  TrendingUp,
  BarChart3,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./CalculatorPage.css";

const CalculatorPage = () => {
  const [farmArea, setFarmArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("acres");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [targetYield, setTargetYield] = useState("");
  const [results, setResults] = useState(null);

  const crops = {
    wheat: { name: "Wheat", baseYield: 25 },
    rice: { name: "Rice", baseYield: 20 },
    maize: { name: "Maize", baseYield: 30 },
    cotton: { name: "Cotton", baseYield: 15 },
    sugarcane: { name: "Sugarcane", baseYield: 350 },
  };

  const fertilizers = {
    wheat: { urea: { rate: 130, price: 6.5 }, dap: { rate: 100, price: 27 }, mop: { rate: 50, price: 17 } },
    rice: { urea: { rate: 120, price: 6.5 }, ssp: { rate: 150, price: 8 }, mop: { rate: 40, price: 17 } },
    maize:{ urea:{ rate:140, price:6.5 }, dap:{ rate:120, price:27 }, mop:{ rate:60, price:17 } },
    cotton:{ urea:{ rate:100, price:6.5 }, dap:{ rate:80,  price:27 }, mop:{ rate:40, price:17 } },
    sugarcane:{ urea:{ rate:200, price:6.5 }, dap:{ rate:150, price:27 }, mop:{ rate:100, price:17 } },
  };

  const calculateFertilizer = () => {
    if (!farmArea || !selectedCrop) return;
    const area = parseFloat(farmArea);
    const areaInAcres = areaUnit === "hectares" ? area * 2.47 : area;
    const cropFerts = fertilizers[selectedCrop];

    const calculations = {};
    let totalCost = 0;

    Object.entries(cropFerts).forEach(([key, info]) => {
      const quantity = parseFloat((info.rate * areaInAcres).toFixed(1));
      const cost = parseFloat((quantity * info.price).toFixed(2));
      totalCost += cost;
      calculations[key] = { quantity, rate: info.rate, price: info.price, cost };
    });

    const expectedYield = targetYield
      ? parseFloat(targetYield) * areaInAcres
      : crops[selectedCrop].baseYield * areaInAcres;

    setResults({
      area: areaInAcres,
      fertilizers: calculations,
      totalCost: totalCost.toFixed(2),
      expectedYield: expectedYield.toFixed(1),
      costPerQuintal: (totalCost / expectedYield).toFixed(2),
    });
  };

  const getFertilizerName = (key) => {
    const names = {
      urea: "Urea (46% N)",
      dap: "DAP (18-46-0)",
      ssp: "SSP (16% P2O5)",
      mop: "MOP (60% K2O)",
    };
    return names[key] || key.toUpperCase();
  };

  return (
    <div className="calc-page">
      <div className="calc-container">
        {/* Header */}
        <div className="calc-header">
          <h1 className="calc-title">
            <CalcIcon className="calc-title-icon" />
            Fertilizer Calculator
          </h1>
          <p className="calc-subtitle">
            Calculate exact fertilizer quantities and costs for your farm based on crop type and area
          </p>
        </div>

        <div className="calc-grid">
          {/* Form column */}
          <div className="calc-form-col">
            <div className="card form-card">
              <h2 className="card-title">
                <Target className="card-title-icon purple" />
                Farm Details
              </h2>

              <div className="form-grid">
                {/* Farm Area */}
                <div className="form-field">
                  <label className="field-label">Farm Area</label>
                  <div className="field-inline">
                    <input
                      type="number"
                      value={farmArea}
                      onChange={(e) => setFarmArea(e.target.value)}
                      className="input"
                      placeholder="Enter area"
                      step="0.1"
                      min="0"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value)}
                      className="select"
                    >
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                    </select>
                  </div>
                </div>

                {/* Crop Type */}
                <div className="form-field">
                  <label className="field-label">Crop Type</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="select full"
                  >
                    {Object.entries(crops).map(([key, c]) => (
                      <option key={key} value={key}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Target Yield */}
                <div className="form-field">
                  <label className="field-label">Target Yield (quintals/acre) - Optional</label>
                  <input
                    type="number"
                    value={targetYield}
                    onChange={(e) => setTargetYield(e.target.value)}
                    className="input full"
                    placeholder={`Default: ${crops[selectedCrop]?.baseYield} quintals/acre`}
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>

              <button className="primary-btn" onClick={calculateFertilizer}>
                <CalcIcon className="btn-icon" />
                <span>Calculate Fertilizer Requirements</span>
              </button>
            </div>

            {/* Results */}
            {results && (
              <div className="card results-card">
                <h2 className="card-title">
                  <BarChart3 className="card-title-icon green" />
                  Fertilizer Requirements
                </h2>

                <div className="fert-grid">
                  {Object.entries(results.fertilizers).map(([key, d]) => (
                    <div key={key} className="fert-card">
                      <div className="fert-head">
                        <div className="fert-icon-wrap">
                          <Package className="fert-icon" />
                        </div>
                        <h3 className="fert-name">{getFertilizerName(key)}</h3>
                      </div>

                      <div className="fert-rows">
                        <div className="row">
                          <span className="row-label">Quantity:</span>
                          <span className="row-value">{d.quantity} kg</span>
                        </div>
                        <div className="row">
                          <span className="row-label">Rate:</span>
                          <span className="row-value">{d.rate} kg/acre</span>
                        </div>
                        <div className="row">
                          <span className="row-label">Price:</span>
                          <span className="row-value">₹{d.price}/kg</span>
                        </div>
                        <div className="row top">
                          <span className="row-label">Total Cost:</span>
                          <span className="row-value cost">₹{d.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-bar">
                  <h3 className="summary-title">Cost Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <p className="summary-label">Total Fertilizer Cost</p>
                      <p className="summary-value">₹{results.totalCost}</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-label">Expected Yield</p>
                      <p className="summary-value">{results.expectedYield} quintals</p>
                    </div>
                    <div className="summary-item">
                      <p className="summary-label">Cost per Quintal</p>
                      <p className="summary-value">₹{results.costPerQuintal}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="calc-sidebar">
            {/* Tips remain unchanged */}
            <div className="card tips-card">
              <h3 className="side-card-title">
                <Sprout className="side-card-icon green" />
                Fertilizer Tips
              </h3>

              <div className="tip-block tip-green">
                <div className="tip-row">
                  <CheckCircle className="tip-bullet green" />
                  <div>
                    <h4 className="tip-title green-t">Timing Matters</h4>
                    <p className="tip-text green-p">Apply fertilizers at the right growth stage for maximum efficiency.</p>
                  </div>
                </div>
              </div>

              <div className="tip-block tip-blue">
                <div className="tip-row">
                  <CheckCircle className="tip-bullet blue" />
                  <div>
                    <h4 className="tip-title blue-t">Soil Testing</h4>
                    <p className="tip-text blue-p">Regular soil testing helps optimize fertilizer usage and reduce costs.</p>
                  </div>
                </div>
              </div>

              <div className="tip-block tip-yellow">
                <div className="tip-row">
                  <AlertCircle className="tip-bullet yellow" />
                  <div>
                    <h4 className="tip-title yellow-t">Weather Check</h4>
                    <p className="tip-text yellow-p">Avoid fertilizer application before heavy rains to prevent nutrient loss.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Fertilizers Sidebar */}
            {results && (
              <div className="card prices-card">
                <h3 className="side-card-title">
                  <TrendingUp className="side-card-icon blue" />
                  Recommended Fertilizers
                </h3>

                {Object.entries(results.fertilizers).map(([key, d]) => (
                  <div className="price-row" key={key}>
                    <span className="price-name">{getFertilizerName(key)} (50kg)</span>
                    <span className="price-value">₹{d.cost}</span>
                  </div>
                ))}

                <p className="price-note">*Total fertilizer cost for your farm based on area and crop.</p>
              </div>
            )}

            {/* Organic block remains unchanged */}
            <div className="organic-card">
              <h3 className="organic-title">Organic Alternatives</h3>
              <p className="organic-text">
                Consider organic fertilizers like compost, vermicompost, and bio-fertilizers for sustainable farming.
              </p>
              <button className="organic-btn">
                <Sprout className="organic-btn-icon" />
                <span>Explore Organic Options</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;

