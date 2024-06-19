import React from "react";
import { useLocation } from "react-router-dom";
import useScreenSize from "../../hooks/useMediaQuery";
import FounderImage from "../../assets/founder.jpeg";
import "./style.css";

const MainBlog: React.FC = () => {
  const location = useLocation();
  const { tags, title, datePublished, imageUrl, content } = location.state;
  const screenSize = useScreenSize();
  return (
    <div className="flex mt-2 flex-col gap-3 main-blogg">
      {imageUrl && (
        <img
          src={imageUrl}
          className={`blog-main-image first-image ${
            screenSize === "sm" ? "h-40" : ""
          }`}
        />
      )}
      <div
        className={`flex flex-col gap-1 ${
          screenSize === "sm" ? "m-4 mt-2" : "m-4 p-4"
        }`}
      >
        <p className={`text-styled title-blog pt-2`}>{title}</p>

        <div className="flex items-center gap-1 blog-little-info">
          <div className="flex gap-1 items-center">
            <img className="" src={FounderImage} height={40} width={40} />{" "}
            <p>Neha Gupta</p>
          </div>
          <div>| {datePublished}</div>
        </div>
        <div className="info-blog-tags flex gap-1">
          {tags?.map((tag: string) => (
            <p>{tag}</p>
          ))}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="blog-item-content-main"
        />
      </div>
    </div>
  );
};

export default MainBlog;
