import React, { useEffect, useState } from "react";
import PrevIcon from "../../assets/prev.png";
import NextIcon from "../../assets/next.png";
import { useSiteData } from "../../contexts/DataContext";
import "./style.css";
import { Waveform } from "@uiball/loaders";
const Work: React.FC = () => {
  const { data } = useSiteData();
  const works = data?.works || [];
  const [currWorkIndex, setCurrWorkIndex] = useState<number>(-1);
  const [currState, setCurrState] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    const src =
      currState === 0 ? works[currWorkIndex]?.prev : works[currWorkIndex]?.next;
    image.src = src + "";
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [currWorkIndex, currState]);
  useEffect(() => {
    if (data && !data?.works) {
      data.works = [];
    } else if (data?.works?.length > 0) {
      setCurrWorkIndex(0);
    }
  }, [data]);
  const handleNext = () => {
    if (currState === 1) {
      setCurrWorkIndex((setCurrWorkIndex) => setCurrWorkIndex + 1);
    }
    setCurrState((currState + 1) % 2);
  };
  const handlePrev = () => {
    if (currState === 0) {
      setCurrWorkIndex((setCurrWorkIndex) => setCurrWorkIndex - 1);
    }
    setCurrState((currState + 1) % 2);
  };

  return (
    <>
      {currWorkIndex >= 0 && (
        <div
          id="work-container"
          className=""
          style={{ maxWidth: "1450px", margin: "auto" }}
        >
          <p className="text-styled ml-8 work-name w-90">Our Work</p>
          <div className="flex gap-2 ml-8 work-name">
            {/* <p
              className={`${currState === 0 ? "active-nav" : ""}`}
              // onClick={() => setCurrState(0)}
            >
              Before
            </p>
            <p
              className={`${currState === 1 ? "active-nav" : ""}`}
              // onClick={() => setCurrState(1)}
            >
              After
            </p> */}
          </div>
          <div
            className="background-image relative"
            style={{
              backgroundImage: imageLoaded
                ? `url(${
                    currState === 0
                      ? works[currWorkIndex]?.prev
                      : works[currWorkIndex]?.next
                  })`
                : "",
              width: "100vw !important",
              maxWidth: "100vw !important",
              objectFit: "contain",
            }}
          >
            <div
              className={`absolute ${
                currWorkIndex === 0 && currState === 0 ? "disabled" : ""
              } prev-button`}
              onClick={handlePrev}
            >
              <img src={PrevIcon} alt="Previous Icon" />
            </div>
            {!imageLoaded && (
              <div
                className="flex justify-center items-center"
                style={{ width: "100%", height: "100%" }}
              >
                <Waveform />
              </div>
            )}
            <div
              className={`absolute ${
                currWorkIndex === works.length - 1 && currState === 1
                  ? "disabled"
                  : ""
              } next-button`}
              onClick={handleNext}
            >
              <img src={NextIcon} alt="Next Icon" />
            </div>
          </div>
          {/* <div className="text-work flex justify-between p-2 ml-8 mr-8 pr-8 pl-8 wrap mb-8 pt-8">
            <div className="challenge mt-4">
              <p className="text-bold text-styled mb-2">Challenges</p>
              <p>{works[currWorkIndex]?.challange}</p>
            </div>
            <div className="solution mt-4">
              <p className="text-bold text-styled mb-2">Solution</p>
              <p>{works[currWorkIndex]?.solution}</p>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Work;
