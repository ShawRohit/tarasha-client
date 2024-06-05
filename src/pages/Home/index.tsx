import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import "./style.css";
import Element from "../../components/Element";
import ChairImage from "../../assets/chair.png";
import Work from "../../components/Work";
import FAQ from "../../components/FAQ";
import CallConsultancy from "../../components/CallConsultancy";
import useScreenSize from "../../hooks/useMediaQuery";
import Footer from "../../components/Footer";
import Element1 from "../../assets/element-1.png";
import Element2 from "../../assets/element-2.jpg";
import Element3 from "../../assets/element-3.jpg";
import Element4 from "../../assets/element-4.webp";
import Element5 from "../../assets/element-5.avif";
import HomeImage1 from "../../assets/Images/Home/1.jpg";
import HomeImage2 from "../../assets/Images/Home/2.jpg";
import HomeImage3 from "../../assets/Images/Home/3.jpg";
import HomeImage4 from "../../assets/Images/Home/4.jpg";
import FounderImage from "../../assets/founder.jpeg";
const Home: React.FC = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  return (
    <div id="home-container">
      <div>
        <Image src={HomeImage1} className="home-img first-image">
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
              <div
                className={`flex flex-col home-main-body-text ${
                  screenSize === "sm" ? "gap-1" : "gap-25px"
                }`}
              >
                <p className="text-styled">
                  Where Functionality Embraces Beauty :<br /> Your Ideal Space{" "}
                </p>
                <p className="bold light-white">
                  Our team of dedicated designers is here to transform your
                  vision into reality. Whether you're looking to revamp a single
                  room or undertake a complete home makeover, we have the
                  expertise and innovation to exceed your expectations.
                </p>
              </div>
              <button
                className={`button ${screenSize === "sm" ? "mx-auto" : "mb-8"}`}
                onClick={() => navigate("/services")}
              >
                Get started
              </button>
            </div>
          </div>
        </Image>
      </div>
      <div
        className={`flex flex-col items-center w-100 ${
          screenSize === "sm" ? "pt-4 gap-1" : "pt-8 mt-2 gap-4"
        }`}
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <p
          className={`text-styled-3 center ${screenSize === "sm" ? "" : ""}`}
          style={{ color: "#B87E1B !important" }}
        >
          About Us
        </p>
        <p
          className={`center ${
            screenSize === "sm"
              ? "ml-4 mr-4 pb-4 mb-2 justify"
              : "ml-8 mr-8 pb-4 mb-8 pr-8"
          }`}
        >
          At Tarasha Interiors, we believe that every space has the potential to
          become a masterpiece. Our passion for creativity and our commitment to
          excellence drive us to craft interiors that not only reflect your
          unique style but also elevate your lifestyle. With an experience in
          bulk volume of project management we have successfully handed over
          both Residential as well as Commercial spaces. Over the years, we have
          expanded slowly but surely due to our credibility, speed and quality
          of work. We believe our passion for innovation keeps us motivated to
          produce the finest of works.
        </p>
      </div>
      <Image src={HomeImage2} className="home-img"></Image>
      <div
        className="flex flex-col items-center w-full mt-8 pt-4 gap-2 pb-8"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <p
          className={`text-styled-3 center ${
            screenSize === "sm" ? "gap-3 pb-4 mt-2" : "pb-4 mt-8"
          }`}
        >
          Work Online With The Finest Interior Designers
        </p>
        <div
          className={`flex wrap space-around ml-4 mr-4 w-90 elements-home gap-3 mb-8 ${
            screenSize === "sm" ? "items-center" : ""
          }`}
        >
          <Element src={Element1} text={"Discovery & Consultation"} />
          <Element src={Element2} text={"Conceptualization"} />
          <Element src={Element3} text={"Detail Design & Planning"} />
          <Element src={Element4} text={"Implementation & Execution"} />
          <Element src={Element5} text={"Post Design Support"} />
        </div>
        <button
          className={`button button-dark ${
            screenSize === "sm" ? "mb-2" : "mb-8"
          } mt-8`}
          onClick={() => navigate("/services")}
        >
          Get started
        </button>
      </div>
      <Image src={HomeImage3} className="home-img"></Image>
      <div
        className="flex flex-col items-center w-100"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <p
          className={`text-styled-3 center ${
            screenSize === "sm" ? "mt-4 mb-4" : "mt-4 pt-8 pb-8"
          }`}
        >
          Our Approach
        </p>
        <p
          className={`center ${
            screenSize === "sm"
              ? "ml-4 mr-4 pb-4 justify"
              : "ml-8 mr-8 pb-4 mb-8"
          }`}
        >
          We approach every project with a blend of creativity, expertise, and
          dedication. Our commitment to crafting inspirational spaces is
          grounded in a well-defined process that ensures each design is a true
          reflection of our clients vision & lifestyle. Our approach is
          characterized by a blend of artistry and professionalism, resulting in
          interiors that resonate with emotion and purpose. Your journey is a
          partnership and our shared goal is to craft a space that is uniquely
          and beautifully yours.
        </p>
      </div>
      <Image src={HomeImage4} className="home-img"></Image>
      <div
        className="flex flex-col items-center w-100"
        style={{ maxWidth: "1450px", margin: "auto" }}
      >
        <p
          className={`text-styled-3 center ${
            screenSize === "sm" ? "mt-4 mb-4" : "mt-4 pt-8 pb-8"
          }`}
        >
          Our Principles
        </p>
        <p
          className={`center ${
            screenSize === "sm"
              ? "ml-4 mr-4 pb-4 justify"
              : "ml-8 mr-8 pb-4 mb-8"
          }`}
        >
          Your experience with us matters just as much as the final design.
          We’re committed to providing exceptional customer service, transparent
          communication, and a seamless design journey. Our goal is not just to
          meet your expectations but to exceed them, leaving you delighted and
          satisfied with the entire process.
        </p>
      </div>
      <div>
        <div
          id="client-perspective"
          className="flex justify-center items-center pt-8 pb-4"
        >
          <div id="client-perspective-main-container">
            <div style={{ maxWidth: "1450px", margin: "auto" }}>
              <div className="relative flex relative client-perspective-text">
                <div id="up-inverted-comma">“</div>
                <p className="relative justify mr-2">
                  Let us guide through a seamless journey where your vision
                  meets our creativity, resulting in a space that not only wows
                  the eyes but also warms the heart. Your space is a canvas and
                  we’re here to help you paint the masterpiece of your life upon
                  it.
                  {/* <div id='down-inverted-comma'>”</div> */}
                </p>
              </div>
              <div className="flex gap-2 items-center pl-4">
                <img
                  className="mt-4 mb-2 client-img ml-8"
                  src={FounderImage}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <p className="text-bold mt-2">Neha Gupta</p>
                  <p>Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` ${screenSize === "sm" ? "mt-4" : "mt-8 pt-4 mb-4"}`}>
          <Work />
          <br />
          <br />
          <Link className="link" to={"/our-works"}>
            <button className="button button-dark m-auto">More Projects</button>
          </Link>
        </div>
        <div
          className={` ${
            screenSize === "sm" ? "pt-4 mt-4 pb-4 mb-4" : "pt-8 mt-8 pb-8 mb-8"
          }`}
        >
          <p
            className={`center ml-8 mr-8 text-styled ${
              screenSize === "sm" ? "mb-2" : "mb-8"
            }`}
          >
            Frequently Asked Questions
          </p>
          <FAQ />
        </div>
        <CallConsultancy />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
