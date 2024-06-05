import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../../components/UserProfile";
import BookingHistory from "../../components/BookingHistory";
import useScreenSize from "../../hooks/useMediaQuery";
import BlogWriting from "../../components/BlogWriting";
import "./style.css";
import Modal from "../../components/Modal";
const DashboardUser: React.FC = () => {
  const location = useLocation();
  const data = location.state;
  const [activeComponent, setActiveComponent] = useState<string>(
    data?.s ? "profile" : "profile"
  ); // Initially, no active component
  const screenSize = useScreenSize();
  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div id="dashboard-user" className="flex">
      <div
        className={`dashboard-sidebar ${screenSize === "sm" ? "w-full" : ""}`}
      >
        {/* Sidebar buttons */}
        <div className="sidebar-buttons">
          <button
            className={activeComponent === "profile" ? "active" : ""}
            onClick={() => handleComponentChange("profile")}
          >
            Profile
          </button>
          {/* <button
            className={activeComponent === 'bookingHistory' ? 'active' : ''}
            onClick={() => handleComponentChange('bookingHistory')}
          >
            Booking History
          </button> */}
          {/* <button
            className={activeComponent === 'blogEditor' ? 'active' : ''}
            onClick={() => handleComponentChange('blogEditor')}
          >
            Blog Editor
          </button> */}
          {/* Add more buttons as needed */}
        </div>
      </div>
      {screenSize !== "sm" && (
        <div className="dashboard-main-content">
          {activeComponent === "profile" && <UserProfile />}
          {activeComponent === "bookingHistory" && <BookingHistory />}
          {/* {activeComponent === 'blogEditor' && <BlogWriting />} */}
        </div>
      )}
      {screenSize === "sm" && (
        <Modal
          isOpen={activeComponent !== ""}
          onClose={() => handleComponentChange("")}
        >
          <div className="dashboard-main-content">
            {activeComponent === "profile" && <UserProfile />}
            {activeComponent === "bookingHistory" && <BookingHistory />}
            {/* {activeComponent === 'blogEditor' && <BlogWriting />} */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardUser;
