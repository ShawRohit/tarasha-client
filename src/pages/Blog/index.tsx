import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import CallConsultancy from "../../components/CallConsultancy";
import BlogInfo from "../../components/BlogInfo";
import useScreenSize from "../../hooks/useMediaQuery";
import { useBlogContext } from "../../contexts/BlogContext";
import "./style.css";
import { API_ENDPOINT } from "../../utils/constant";
import Banner from "../../assets/Images/Office-Image-2.jpg";
const Blog: React.FC = () => {
  const { blogData, setBlogData } = useBlogContext();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  React.useEffect(() => {
    // if(blogData || blogData?.blogs || blogData?.blogs?.length === 0){
    getBlogData(currentPage);
    // }
  }, []);
  const handleNav = async (next: boolean) => {
    if (next) {
      await getBlogData(currentPage + 1);
      setCurrentPage(currentPage + 1);
    } else if (!next && currentPage > 1) {
      await getBlogData(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  const getBlogData = async (page: number) => {
    const response = await fetch(API_ENDPOINT.GET_BLOG_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
        maxcount: 5,
      }),
    });
    const data = await response.json();
    if (data.success) {
      const updatedData = {
        ...data,
        blogs: data.current?.map((blog: any) => {
          return {
            ...blog,
            tags: blog.topics,
            content: blog.html,
            imageUrl: blog.title_img_url,
            datePublished: new Date(blog.updatedAt).getFullYear(),
          };
        }),
        prevblogs: data.previous?.map((blog: any) => {
          return {
            ...blog,
            tags: blog.topics,
            content: blog.html,
            imageUrl: blog.title_img_url,
            datePublished: new Date(blog.updatedAt).getFullYear(),
          };
        }),
      };
      setBlogData((prevBlogData: any) => updatedData);
    }
  };
  return (
    <div id="home-container" className="blogss">
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
                <p className="text-styled">Our Blog</p>
              </div>
            </div>
          </div>
        </Image>
        <div
          className={`flex gap-1 ${
            screenSize !== "lg" ? "flex-col mb-4 p-4 m-2" : "mb-8 p-8 m-8"
          }`}
          style={{ maxWidth: "1450px", margin: "auto" }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 blog-items-container">
              {blogData?.blogs?.map((blog: any, index: number) => {
                return <BlogInfo {...blog} key={blog._id} index={index} />;
              })}
              <div className={`flex gap-3 ${screenSize === "sm" ? "" : ""}`}>
                <p
                  onClick={() => handleNav(false)}
                  className={currentPage === 1 ? "disable" : ""}
                >
                  Prev
                </p>
                <p onClick={() => handleNav(true)}>Next</p>
              </div>
            </div>
          </div>
          {blogData?.prevblogs?.length > 0 && (
            <div className="blog-item-container flex flex-col gap-3 prev-posts-container">
              <p className="text-styled">Previous Posts</p>
              {blogData?.prevblogs?.map((blog: any, index: number) => {
                return (
                  <div
                    className={`flex gap-1 ${
                      index % 2 === 0 ? "flex-reverse" : ""
                    }`}
                    key={blog._id}
                  >
                    {/* blog.imageUrl || */}
                    {blog?.imageUrl && (
                      <img src={blog.imageUrl} style={{ objectFit: "cover" }} />
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="info-blog-tags flex gap-1">
                        {blog.tags?.map((tag: string) => (
                          <p>{tag}</p>
                        ))}
                      </div>
                      <p
                        className="text-styled prev-post"
                        onClick={() => {
                          navigate(`/blog/${blog._id}`, { state: blog });
                        }}
                      >
                        {blog.title}
                      </p>
                      <div className="flex items-center gap-1 blog-little-info">
                        <div className="flex gap-1 items-center">
                          <img
                            className=""
                            src={
                              "data:image/jpeg;base64,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"
                            }
                            height={40}
                            width={40}
                          />
                          <p>Neha Gupta</p>
                        </div>
                        <div>| {blog.datePublished}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <CallConsultancy />
      </div>
    </div>
  );
};

export default Blog;
