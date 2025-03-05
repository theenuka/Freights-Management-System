import React from "react";
import { HiArrowSmallUp, HiArrowLongDown } from "react-icons/hi2";
import { FiUsers, FiPackage, FiClock } from "react-icons/fi";
import { PieChart } from "@mui/x-charts/PieChart";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-row">
        <div className="stat-card users-card">
          <div className="card-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h2 className="stat-title">Total Users</h2>
              <div className="trend-indicator positive">
                <HiArrowSmallUp />
                <span>12%</span>
              </div>
            </div>
            <span className="stat-value">200</span>
            <div className="stat-footer">
              <span>+22 this week</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card delivered-card">
          <div className="card-icon">
            <FiPackage />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h2 className="stat-title">Delivered Parcels</h2>
              <div className="trend-indicator positive">
                <HiArrowSmallUp />
                <span>8%</span>
              </div>
            </div>
            <span className="stat-value">2,000</span>
            <div className="stat-footer">
              <span>+145 this month</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card pending-card">
          <div className="card-icon">
            <FiClock />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h2 className="stat-title">Pending Parcels</h2>
              <div className="trend-indicator negative">
                <HiArrowLongDown />
                <span>3%</span>
              </div>
            </div>
            <span className="stat-value">500</span>
            <div className="stat-footer">
              <span>-15 since yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;