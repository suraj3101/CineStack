import React, { useState, useRef, useEffect } from "react";
import "./LazyImage.css";

function LazyImage({ src, alt, className }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const element = placeholderRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      // 3. Check if the element is *now* intersecting (on screen)
      if (entry.isIntersecting) {
        setHasLoaded(true);
        observer.unobserve(element);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return hasLoaded ? (
    <img src={src} alt={alt} className={`${className} lazy-image-fade-in`} />
  ) : (
    <div
      ref={placeholderRef}
      className={`${className} lazy-image-placeholder`}
    />
  );
}

export default LazyImage;
