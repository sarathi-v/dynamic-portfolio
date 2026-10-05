import { useEffect, useRef, useState } from "react";
import TemplateRenderer from "./templates/TemplateRenderer";

// The template is drawn at this "desktop" width, then scaled down to fit
const DESIGN_WIDTH = 1100;

function TemplatePreviewFrame({ portfolio, height = 640 }) {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);

  const [scale, setScale] = useState(0.4);
  const [contentHeight, setContentHeight] = useState(1200);

  // Keep the scale correct when the panel is resized
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

  // Keep the scroll height correct when the content grows or shrinks
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateHeight = () => {
      setContentHeight(content.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height,
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "14px",
        border: "1px solid rgba(128, 128, 128, 0.25)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: contentHeight * scale,
          position: "relative",
        }}
      >
        <div
          ref={contentRef}
          style={{
            width: DESIGN_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <TemplateRenderer portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default TemplatePreviewFrame;