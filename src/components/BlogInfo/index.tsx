import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useMediaQuery";
import "./style.css";
import FounderImage from "../../assets/founder.jpeg";
interface BlogProps {
  _id: string | number;
  tags: string[];
  title: string;
  datePublished: string;
  imageUrl: string;
  content: string;
  index?: number;
}

const BlogInfo: React.FC<BlogProps> = (props) => {
  const {
    _id,
    tags,
    title,
    datePublished,
    imageUrl,
    content,
    index = 0,
  } = props;
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  return (
    <div className="blog-item-container max-width-1300">
      <div className={`bc-ch ${index % 2 === 0 ? "flex-reverse" : ""}`}>
        <div className={`left-mini-blog ${screenSize === "lg" ? "" : "w-100"}`}>
          <div className="blog-info flex flex-col gap-2">
            {tags.length > 0 && (
              <div className="info-blog-tags flex gap-1">
                {/* {tags.map((tag: string) => <p>{tag}</p>)} */}
              </div>
            )}
            <p className="text-styled">{title}</p>
            <div className="flex items-center gap-1 blog-little-info">
              <div className="flex gap-1 items-center">
                <img className="" src={FounderImage} height={40} width={40} />
                <p>Neha Gupta</p>
              </div>
              <div>| {datePublished}</div>
            </div>
          </div>
          {/* {screenSize === 'sm' &&  <div className=' w-100 h-25 blog-item-image relative blog-mini-image'>
          <img src={'https://cdn.ttgtmedia.com/rms/onlineimages/what_is_a_blog_used_for-f_mobile.png'}/>
          <div className='blog-image-shadow'></div>
        </div>} */}
          <div className="flex blog-main-content gap-3">
            <div
              dangerouslySetInnerHTML={{
                __html: content.split("</p>")[0] + content.split("</p>")[1],
              }}
              className="blog-item-content pt-2 pl-1"
            />
          </div>
          <div
            className="flex items-center gap-2 text-styled read-more-button"
            onClick={() => {
              navigate(`/blog/${_id}`, { state: props });
            }}
          >
            <p className="read-more">Read More</p>
            <div className="mt-2 bs-ar-ur">
              <BsArrowUpRight className="bs-ar-ur" />
            </div>
          </div>
        </div>
        {screenSize === "lg" && (
          <div className="blog-item-image relative blog-mini-image">
            <img src={imageUrl} />
            <div className="blog-image-shadow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogInfo;
