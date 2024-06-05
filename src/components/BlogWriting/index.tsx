import React, { useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageUploader from "quill-image-uploader";
import Cookies from 'js-cookie';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import { API_ENDPOINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

Quill.register("modules/imageUploader", ImageUploader);

const Font = Quill.import('formats/font');
Font.whitelist = ['10px', '12px', '16px', '18px', '24px'];
Quill.register(Font, true);

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '16px', '18px', '24px'];
Quill.register(Size, true);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  ['link'],
  [{'align': []}],
  ['image'],
  ['clean']                                         // remove formatting button
];

const imageUploader = (file : any) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch(
        API_ENDPOINT.IMAGE_UPLOAD,
        {
          method: "POST",
          body: formData,
          headers: {
          // method: "POST",
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          resolve(result.url);
        })
        .catch((error) => {
          reject("Upload failed");
          console.error("Error:", error);
        });
    });
  }


  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot"
  ];

const BlogWriting: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedImage(file);
  }
};

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", topic);
    formData.append("html", content);
    if (selectedImage) {
        formData.append("titleImage", selectedImage);
    }
    const response = await fetch(API_ENDPOINT.CREATE_BLOG, {
        method: "POST",
        body: formData,
        headers: {
          // method: "POST",
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
  });
  const data = await response.json();
  if(data.success){
    navigate(`/blog/${data.newBlog?._id}`, {state:{_id: data.newBlog?._id,title: data.newBlog?.title, imageUrl: data.newBlog?.title_img_url, tags: data.newBlog?.topics, content: data.newBlog?.html}})
  }else{

  }
   
  };

  return (
    <div className="blog-writing flex flex-col justify-center gap-2 p-2">
      <h2>Write a Blog</h2>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your blog here..."
        modules={{
            toolbar: toolbarOptions,
            imageUploader: {
                upload: imageUploader
            }
        }}
        formats={formats}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BlogWriting;
