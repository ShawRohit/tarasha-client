// ImageLoaderWorker.js

self.addEventListener('message', (event) => {
    const { imageUrl } = event.data;
  
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        self.postMessage({ imageUrl, blob });
      })
      .catch((error) => {
        console.error('Error loading image:', error);
      });
  });
  