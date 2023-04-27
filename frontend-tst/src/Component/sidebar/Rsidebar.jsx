import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./sidebar.css";
import {Link} from "react-router-dom";

function ResponsiveSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <div>
      {isVisible ? (
        <div style={{ display: "flex" }}>
        <div
          style={{
            width: "20%",
            height: "90vh",
            backgroundColor: "#154360",
            position: "fixed",
            right: isVisible ? 0 : "-20%",
            bottom: 0,
            transition: "right 0.5s",
            overflow: 'auto',
          }}
        >
          <button
            style={{ display: "block", marginTop: "0px" }}
            onClick={() => setIsVisible(!isVisible)}
          >
            <CloseOutlined />
          </button>

          <Link to="/users/admin/leaves" className={`link ${path === "/users/admin/leaves" && "active"}`}>
            <div className="parent-container-top">
            <div
             style={{
              width: 'auto',
              height: 'auto',           
            
          }}
            >
              <h3>About Tips</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.</p>
            </div>
          </div>
            </Link>
          
  
          <div className="parent-container" >
            <div
                style={{
                  width: 'auto',
                  height: 'auto',
              }}
            >
              <h3>Tip 1</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.</p>
            </div>
          </div>
  
          <div className="parent-container">          
          <div
                style={{
                  width: 'auto',
                  height: 'auto',
              }}
            >
              <h3>Tip 2</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.</p>
            </div>
          </div>
  
          <div className="parent-container"
          
          >
            <div
                style={{
                  width: 'auto',
                  height: 'auto',
              }}
            >
              <h3>Tip 3</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.</p>
            </div>
          </div>
          
        </div>
      </div>
      ) : (
        <button onClick={() => setIsVisible(true)} style={{position: 'fixed', bottom: '20px', right: '20px'}}>
          !
        </button>
      )}
    </div>
  );
}

export default ResponsiveSidebar;

