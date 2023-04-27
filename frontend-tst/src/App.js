import Component from "./Component/index";
import { useEffect, useState } from "react";
import "./app.css";
import Pages from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Main/Landing";

import { useNavigate } from "react-router";

function App() {
  useEffect(() => {
    setAccountType(localStorage.getItem("accountType"));
  }, []);
  // const navigate = useNavigate();


  // useEffect(() => {
  //   const unlisten = () => {
  //     if (window.location.pathname == "/") {
  //       navigate("/");
  //     }
  //   };
  
  //   window.addEventListener("popstate", unlisten);
  
  //   return () => {
  //     window.removeEventListener("popstate", unlisten);
  //   };
  // }, [navigate]);
  

  const [accountType, setAccountType] = useState();
  return (
    <>
      <Router>
        {/**************** topbar *****************/}

        {/* {accountType === 2 && (
          <Routes>
            <Route path="/users/staff/*" element={<Component.Topbar />} />
          </Routes>
        )}

        {accountType === 1 && (
          <Routes>
            <Route
              path="/users/manager/*"
              element={<Component.ManagerTopbar />}
            />
          </Routes>
        )}

        {accountType === 0 && (
          <Routes>
            <Route path="/users/admin/*" element={<Component.AdminTopbar />} />
          </Routes>
        )} */}
        <Routes>
          <Route
            path="/users/manager/*"
            element={<Component.ManagerTopbar />}
          />
        </Routes>
        <Routes>
          <Route path="/users/admin/*" element={<Component.AdminTopbar />} />
        </Routes>

        <div className="container">
          <div className="sdbar">
            {/* *************** sidebar ****************  */}
            {/* {accountType === 2 && (
            <Routes>
              <Route path="/users/staff/*" element={<Component.Sidebar />} />
            </Routes>
          )}

          {accountType === 1 && (
            <Routes>
              <Route
                path="/users/manager/*"
                element={<Component.ManagerSidebar />}
              />
            </Routes>
          )}

          {accountType === 0 && (
            <Routes>
              <Route
                path="/users/admin/*"
                element={<Component.AdminSidebar />}
              />
            </Routes>
          )} */}
            <Routes>
              <Route
                path="/users/manager/*"
                element={<Component.ManagerSidebar />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/*"
                element={<Component.AdminSidebar />}
              />
            </Routes>
          </div>

          <div className="others">
            {/**************** login and registration *****************/}
            <Routes>
              <Route path="/" element={<Component.Login />} />
            </Routes>
            <Routes>
              <Route path="/register" element={<Component.Register />} />
            </Routes>

            {/* *************** admin **************** */}
            <Routes>
              <Route path="/users/admin" element={<Pages.Home />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/users" element={<Pages.UserList />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/adduser" element={<Pages.AddUser />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/jobs" element={<Pages.JobsList />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/addjob" element={<Pages.AddJob />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/applicants" element={<Pages.ApplicantsList />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/approvedapplicants" element={<Pages.ApprovedApplicants />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/hiredapplicants" element={<Pages.HiredApplicants />} />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/edituser"
                element={<Pages.EditUser />}
              />
            </Routes>
            <Routes>
          <Route path="/home" element={<LandingPage />} />
        </Routes>

            {/* *************** manager **************** */}
            <Routes>
              <Route path="/users/manager" element={<Pages.Home />} />
            </Routes>
            <Routes>
              <Route path="/users/manager/users" element={<Pages.UserList />} />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/edituser"
                element={<Pages.EditUser />}
              />
            </Routes>

            
          </div>
        </div>
      </Router>
    </>
  );
  console.log(accountType);
}

export default App;


