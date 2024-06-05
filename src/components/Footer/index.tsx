import React from "react";
import IconImage from "../../assets/icon.png";
import FBSocialIcon from "../../assets/fb.png";
import InstaSocialIcon from "../../assets/insta.png";
import EmailLogo from "../../assets/email-logo.jpg";
import TwitterSocialIcon from "../../assets/twitter.png";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useAnalyticsEventTracker from "../../hooks/useAnalyticsEventTracker";
import useScreenSize from "../../hooks/useMediaQuery";
const Footer: React.FC = () => {
  const navigate = useNavigate();
  const gaEventTracker = useAnalyticsEventTracker("Initial Page");
  const screenSize = useScreenSize();
  return (
    <div className="footer-container justify-between">
      <div
        style={{ maxWidth: "1570", margin: "auto" }}
        className="flex wrap  p-8 justify-between"
      >
        <div className="flex flex-col gap-1">
          <img src={IconImage} alt="tarasha interiors" />
          <p className="pl-4 mt-4">
            Designs that reflect your style, brought to life by
            {screenSize === "sm" ? "" : <br />} Tarasha Interiors
          </p>
          <div className="flex flex-row gap-2 pl-4 mt-4">
            {/* <a href=''><img  src={FBSocialIcon} /></a> */}
            <a
              href="https://www.instagram.com/tarasha_interiors?igsh=MXFvZnU1NWtpcXR5ZA=="
              target="_blank"
            >
              <img src={InstaSocialIcon} />
            </a>
            {/* <img  src={TwitterSocialIcon} /> */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tarashainteriors.com"
              target="_blank"
            >
              <img src={EmailLogo} style={{ width: "32px", height: "28px" }} />
            </a>
          </div>
        </div>
        <div
          className={`flex wrap  justify-between info ml-8 mr-8 pl-8 tandom m-f ml-4 pl-4`}
        >
          <div className="flex flex-col mt-4 pl-4">
            <h2 className={`pb-2 ${screenSize === "sm" ? "mt-8" : ""}`}>
              About
            </h2>
            <p
              onClick={() => {
                navigate("/");
                gaEventTracker("Home", "Navigating to home page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Home page
            </p>
            <p
              onClick={() => {
                navigate("/services");
                gaEventTracker("Services", "Navigating to services page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Services
            </p>
            <p
              onClick={() => {
                navigate("/our-works");
                gaEventTracker("Works", "Navigating to work page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Before and After
            </p>
          </div>
          <div className="flex flex-col mt-4  pl-4">
            <h2 className={`pb-2 ${screenSize === "sm" ? "mt-2" : ""}`}>
              Customer Support
            </h2>
            {/* <p onClick={() => {navigate('/#faq'); gaEventTracker('FAQ', 'Checking frequently asked question')}} style={{color: 'white !important', marginBottom: '1px'}}>FAQ</p> */}
            <p
              onClick={() => {
                gaEventTracker("Questionare", "Checking questionare page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Contact us :
            </p>
            <p style={{ fontSize: "10px !important" }}>
              info@tarashainteriors.com
            </p>
            <p style={{ fontSize: "10px !important" }}>
              tarashainterior@gmail.com
            </p>
          </div>
          <div className="flex flex-col mt-4  pl-4">
            <h2 className={`pb-2 ${screenSize === "sm" ? "mt-2" : ""}`}>
              Explore
            </h2>
            <p
              onClick={() => {
                navigate("/packages");
                gaEventTracker("Packages", "Navigating to packages page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Packages
            </p>
            <p
              onClick={() => {
                navigate("/blogs");
                gaEventTracker("Blogs", "Navigating to blog page");
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Interior Design Blogs
            </p>
          </div>
          <div className="flex flex-col mt-4  pl-4">
            <h2 className={`pb-2 ${screenSize === "sm" ? "mt-2" : ""}`}>
              Agreements
            </h2>
            <p
              onClick={() => {
                navigate("/terms-and-conditions");
                gaEventTracker(
                  "Terms and Conditions",
                  "Navigating to terms and conditions page"
                );
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Terms and Condition
            </p>
            {/* <p style={{color: 'white !important', marginBottom: '1px'}}>Privacy Policy</p> */}
            <p
              onClick={() => {
                navigate("/privacy-policy");
                gaEventTracker(
                  "Privacy and Policy",
                  "Navigating to privacy and policy"
                );
              }}
              style={{ color: "white !important", marginBottom: "1px" }}
            >
              Privacy and Policy
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="footer">
    //       <p>Tarasha Interiors &copy;&nbsp; All Rights Reserved</p>
    //   </div>
  );
};

export default Footer;
