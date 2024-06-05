import React from "react";
import Image from "../../components/Image";
import CallConsultancy from "../../components/CallConsultancy";
import FAQ from "../../components/FAQ";
import Element from "../../components/Element";
import Chair from "../../assets/chair.png";
import "./style.css";
import Service from "../../components/Service";
import ScopeOfWork from "../../components/ScopeOfWork";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useMediaQuery";
import Banner from "../../assets/Images/service-banner.jpg";
import Image1 from "../../assets/Images/service8/1.jpg";
import Image2 from "../../assets/Images/service8/2.jpg";
import Image3 from "../../assets/Images/service8/3.jpg";
import Image4 from "../../assets/Images/service8/4.jpg";
import Image5 from "../../assets/Images/service8/5.jpg";
import Image6 from "../../assets/Images/service8/6.jpg";
import Image7 from "../../assets/Images/service8/7.jpg";
import Image8 from "../../assets/Images/service8/8.jpg";
import Image9 from "../../assets/Images/Office-image-1.jpg";
const Services: React.FC = () => {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  return (
    <div id="home-container">
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
              <p className="text-styled">Our Services</p>
            </div>
          </div>
        </div>
      </Image>
      <div
        id="elements-container"
        className="mb-2 pb-2 pt-8"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <div className="flex flex-col pt-2 elements items-center mb-4 w-h100">
          <p className="text-styled-3 mb-8">Elements</p>
          <div
            className="flex flex-row gap-3 wrap justify-center w-90 mb-8"
            style={{ maxWidth: "700px", margin: "auto" }}
          >
            <Element
              key="Space"
              src={
                "https://img.freepik.com/premium-vector/black-white-round-frame-with-space-text-photo-leaves-frame-design-flyer-banner-postcard-vector-illustration_623474-228.jpg?w=2000"
              }
              text="Space"
            />
            <Element
              key="Color"
              src={
                "https://w7.pngwing.com/pngs/360/577/png-transparent-assorted-color-of-circles-illustration-circle-euclidean-computer-file-colorful-round-color-splash-color-pencil-fashion.png"
              }
              text="Colour"
            />
            <Element
              key="Texture"
              src={
                "https://previews.123rf.com/images/str33tcat/str33tcat1707/str33tcat170700043/82265251-grunge-circles-seamless-pattern-hand-drawn-round-shapes-background-black-white-brush-stroke-texture.jpg"
              }
              text="Texture"
            />
            <Element
              key="Form"
              src={
                "https://img.freepik.com/premium-vector/doodle-circle-scalloped-frame-hand-drawn-scalloped-edge-ellipse-shape-simple-round-label-form-flower-silhouette-lace-frame-vector-illustration-isolated-white-background_192280-1475.jpg"
              }
              text="Form"
            />
            <Element
              key="Light"
              src={
                "https://images.unsplash.com/photo-1601574117431-e5430fccfae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGxpZ2h0fGVufDB8fDB8fHww&w=1000&q=80"
              }
              text="Light"
            />

            <Element
              key="Pattern"
              src={
                "https://cdn.pixabay.com/photo/2017/10/06/11/54/circle-2822849_1280.jpg"
              }
              text="Pattern"
            />
            <Element
              key="Scale"
              src={
                "https://previews.123rf.com/images/svitlananiko/svitlananiko1805/svitlananiko180500008/100980659-protractor-360-degrees-measuring-circle-scale-measuring-round-scale.jpg"
              }
              text="Scale"
            />
            <Element
              key="Balance"
              src={"https://cdn-icons-png.flaticon.com/512/232/232585.png"}
              text="Balance"
            />
            <Element
              key="Emphasis"
              src={
                "https://i.pinimg.com/474x/b3/12/23/b31223e97ca79420c0c831e6c8380ae8.jpg"
              }
              text="Emphasis"
            />
            <Element
              key="Rhythm"
              src={
                "https://static.vecteezy.com/system/resources/previews/007/037/632/non_2x/pulse-graph-heart-beat-cardiogram-rhythm-graphic-ecg-echocardiogram-icon-in-circle-round-black-color-illustration-image-solid-outline-style-vector.jpg"
              }
              text="Rhythm"
            />
          </div>
          <button
            className="button button-dark mt-8 mb-2"
            onClick={() => navigate("/services")}
          >
            Get Started
          </button>
        </div>
        <br />
      </div>
      <Image src={Image9} className="home-img"></Image>
      <div
        id="services-container"
        className="flex flex-col items-center w-100 pt-8"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <div className="flex flex-col gap-1 items-center justify-center w-100">
          <p className="text-styled-3 pb-8">Services</p>
          <div className="flex flex-row gap-3 wrap justify-center w-100">
            {[
              {
                text: "Interior Consultation",
                src: Image1,
              },
              {
                text: "3D visualisation",
                src: Image2,
              },
              {
                text: "Renovation & Remodelling",
                src: Image3,
              },
              {
                text: "Space Planning & Design",
                src: Image4,
              },
              {
                text: "Execution & Project Management",
                src: Image5,
              },
              {
                text: "Residential Interior Projects",
                src: Image6,
              },
              {
                text: "Commercial Interiors Projects",
                src: Image7,
              },
              {
                text: "Vaastu Compliant Layouts",
                src: Image8,
              },
            ].map((curr: { text: string; src: string }) => (
              <Service key={curr.text} src={curr.src} text={curr.text} />
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <ScopeOfWork />
      <div
        className="mb-8 mt-8 pt-8 pb-8"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <p
          className={`center ml-8 mr-8 text-styled-3 ${
            screenSize === "sm" ? "" : "mt-8 mb-4"
          }`}
        >
          Frequently Asked Questions
        </p>
        <FAQ />
        <br />
      </div>
      <CallConsultancy />
    </div>
  );
};

export default Services;
