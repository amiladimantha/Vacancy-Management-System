import "./sidebar.css";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileMarkdownOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserAddOutlined,  
  MenuFoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AdminSidebar() {
  const [path, setPath] = useState(window.location.pathname);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  function toggle() {
    setSidebarVisible(!sidebarVisible);
    const sidebar = document.querySelector('.sidebar');
  sidebar.style.width = !sidebarVisible ? '80px' : '250px';
  }

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      <div className="sidebarWrapper">
        {!sidebarVisible && (
          <button onClick={toggle} style={{ border: "none", background: "none", paddingLeft: 20 }}>
          <CloseOutlined style={{ fontSize: 24, color: "#414141" }} />
        </button>
        )}

        <div className="sidebarwrappersecondary">
          {sidebarVisible && (
            <button onClick={toggle} className="sidebarSecondaryButton">
              {
                <MenuFoldOutlined
                  style={{
                    fontSize: 24,
                    color: "#0097E6",
                    transform: "rotate(180deg)",
                    padding: 5,
                  }}
                />
              }
            </button>
          )}
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
          <NavLink to="/users/admin" className="link">
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <HomeOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Home</span>}
                </div>
                {sidebarVisible && <HomeOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/users"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <UserOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Users</span>}
                </div>
                {sidebarVisible && <UserOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/adduser"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <UserAddOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Add User</span>}
                </div>
                {sidebarVisible && <UserAddOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/jobs"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <ProfileOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Jobs</span>}
                </div>
                {sidebarVisible && <ProfileOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/addjob"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <ProfileOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Add Job</span>}
                </div>
                {sidebarVisible && <ProfileOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/applicants"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <FileAddOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Applicants</span>}
                </div>
                {sidebarVisible && <FileAddOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/approvedapplicants"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && (
                    <AppstoreAddOutlined className="iconStyle" />
                  )}
                  {!sidebarVisible && (
                    <span className="text">Approved Applicants</span>
                  )}
                </div>
                {sidebarVisible && (
                  <AppstoreAddOutlined className="iconStyle" />
                )}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/hiredapplicants"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && (
                    <FileMarkdownOutlined className="iconStyle" />
                  )}
                  {!sidebarVisible && <span className="text">Hired Applicants</span>}
                </div>
                {sidebarVisible && (
                  <FileMarkdownOutlined className="iconStyle" />
                )}
              </li>
            </NavLink>
            <NavLink
              to="/users/admin/edituser"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <SettingOutlined className="iconStyle" />}
                  {!sidebarVisible && (
                    <span className="text">Edit Profile</span>
                  )}
                </div>
                {sidebarVisible && <SettingOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink to="/" className="link">
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <LogoutOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Logout</span>}
                </div>
                {sidebarVisible && <LogoutOutlined className="iconStyle" />}
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
