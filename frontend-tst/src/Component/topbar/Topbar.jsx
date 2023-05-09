import React from "react";
import "./topbar.css";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="topRight">
          <div className="topbarLinksWrapper">
            <ul className="topbarLinks">
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
