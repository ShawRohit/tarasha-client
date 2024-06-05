import { useEffect, useState } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg';

function getScreenSize(): ScreenSize {
  if (window.matchMedia('(max-width: 576px)').matches) {
    return 'sm';
  } else if (window.matchMedia('(max-width: 992px)').matches) {
    return 'md';
  } else {
    return 'lg';
  }
}

export default function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => getScreenSize());

  useEffect(() => {
    function handleResize() {
      const newSize = getScreenSize();
      if (newSize !== screenSize) {
        setScreenSize(newSize);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize]);

  return screenSize;
}
