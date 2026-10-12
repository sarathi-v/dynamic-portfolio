import { useEffect, useRef, useState } from "react";

// The portfolio page is shown at this "desktop" size, then scaled down.
// Only the top part (the hero) is visible, like a website screenshot.
const DESIGN_WIDTH = 1100;
const DESIGN_HEIGHT = 780;

function TemplateThumbnail({ portfolio }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const updateScale = () => {
      setScale(wrap.clientWidth / DESIGN_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, []);

  // The real public page, in "preview" + "embed" mode (no banner, no scrollbars)
  const src = `/portfolio/${portfolio.id}?preview=true&embed=true`;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: DESIGN_HEIGHT * scale,
        overflow: "hidden",
      }}
    >
      <iframe
        key={portfolio.updatedAt || portfolio.id}
        title={`Preview of ${portfolio.name || "portfolio"}`}
        src={src}
        loading="lazy"
        tabIndex={-1}
        scrolling="no"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}

export default TemplateThumbnail;