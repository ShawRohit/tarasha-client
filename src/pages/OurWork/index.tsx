import React from "react";
import Image from "../../components/Image";
import Work from "../../components/Work";
import CallConsultancy from "../../components/CallConsultancy";
import "./style.css";
import useScreenSize from "../../hooks/useMediaQuery";
import Banner from "../../assets/Images/work-banner.jpg";

const OurWork: React.FC = () => {
  const screenSize = useScreenSize();
  return (
    <div id="home-container">
      <div>
        <Image src={Banner} className="home-img first-image">
          <div
            className={`text-image-background flex justify-between items-center absolute bottom  right left sizing-border  flex wrap ${
              screenSize === "sm" ? "gap-1 p-4" : "gap-3 p-8"
            }`}
          >
            <div
              className={` flex justify-between items-center absolute bottom  right left sizing-border  flex wrap ${
                screenSize === "sm" ? "gap-1 p-4" : "gap-3 p-8"
              }`}
              style={{ maxWidth: "1500px", margin: "auto" }}
            >
              <div className="flex flex-col home-main-body-text">
                <p className="text-styled">Our Work</p>
              </div>
            </div>
          </div>
        </Image>
        <br />
        <div className="mb-8 pt-8 pb-8">
          <Work />
        </div>
        <CallConsultancy />
      </div>
    </div>
  );
};

export default OurWork;
