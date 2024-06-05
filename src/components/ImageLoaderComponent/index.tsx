import React, { useState, useEffect } from 'react';
import './style.css';

interface ImageLoaderComponentProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  children?: any;
}

const ImageLoaderComponent: React.FC<ImageLoaderComponentProps> = ({ src, children, ...rest }) => {
  const [loadedsrc, setLoadedsrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async (src: string) => {
      try {
        const response = await fetch(src);
        if (response.ok) {
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          setLoadedsrc(objectURL);
        } else {
          console.error('Error loading image');
        }
      } catch (error) {
        console.error(`Error loading image: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadImage(src);
  }, [src]);

  if (loading) {
    // Display a shimmer effect while loading
    return (
      <div className={`skeleton ${rest.className || ''}`}>
        <div className="shimmer-line"></div>
      </div>
    );
  }

  if (loadedsrc) {
    return (
      <img
        src={loadedsrc}
        alt="Loaded"
        {...rest}
      />
    );
  }

  return (
    <div
      {...rest}
      className={`skeleton ${rest.className || ''}`}
    >
      {children}
    </div>
  );
};

export default ImageLoaderComponent;
