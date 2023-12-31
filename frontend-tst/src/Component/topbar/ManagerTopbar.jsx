import React, { useState, useEffect } from "react";
import "./topbar.css";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
import { BellFilled, SettingFilled } from "@ant-design/icons";

export default function ManagerTopbar() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");  
  const [image, setImage] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setImage(localStorage.getItem("image"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
                    <BellFilled />
                    <span className='topIconBadge'>2</span>
                </div>
                <div className="topbarIconContainer">
                    <SettingFilled />
                </div> */}
          <div className="topbarIconContainer">
            <label>Manager : {username}</label>
          </div>

          <img src={`data:image/png;base64,${image}`} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
