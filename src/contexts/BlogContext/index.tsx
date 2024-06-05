import { createContext, useContext, useState } from 'react';

const BlogContext = createContext([]);

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState({blogs: [], prevblogs: []});
  
  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};
