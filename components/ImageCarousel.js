"use client";
import { useState } from "react";

export default function ImageCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState({});

  if (!images || images.length === 0) {
    return <span style={{ fontSize: "2.5rem" }}>🎨</span>;
  }

  const safeIndex = Math.min(index, images.length - 1);
  const current = images[safeIndex];
  const isBroken = broken[safeIndex];

  function prev(e) {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next(e) {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="carousel">
      {isBroken || !current ? (
        <span style={{ fontSize: "2.5rem" }}>🎨</span>
      ) : (
        <img src={current} alt={alt} onError={() => setBroken((b) => ({ ...b, [safeIndex]: true }))} />
      )}

      {images.length > 1 && (
        <>
          <button type="button" className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous image">‹</button>
          <button type="button" className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next image">›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot ${i === safeIndex ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
