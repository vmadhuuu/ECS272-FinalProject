import React, { useRef, useEffect, useContext, useState } from "react";
import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollApp = () => {
  const { scroll } = useContext(LocomotiveScrollContext);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Default color
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Array of colors for each section
  const sectionColors = ["#FF5733", "#33D1FF", "#8D33FF", "#FF5733", "#33FFD1"];

  // Add section refs to the sectionRefs array
  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (scroll) {
      scroll.on("scroll", (instance) => {
        let progress = 0;
        for (let i = 0; i < sectionRefs.current.length - 1; i++) {
          const current = sectionRefs.current[i];
          const next = sectionRefs.current[i + 1];
          const currentTop =
            current.getBoundingClientRect().top + window.scrollY;
          const nextTop = next.getBoundingClientRect().top + window.scrollY;

          if (instance.scroll.y >= currentTop && instance.scroll.y < nextTop) {
            progress =
              (instance.scroll.y - currentTop) / (nextTop - currentTop);
            setBackgroundColor(
              interpolateColors(
                sectionColors[i],
                sectionColors[i + 1],
                progress
              )
            );
            break;
          }
        }
      });
    }

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, [scroll]);

  const interpolateColors = (color1, color2, factor) => {
    const color1RGB = hexToRgb(color1);
    const color2RGB = hexToRgb(color2);

    const resultRGB = {
      r: Math.round(color1RGB.r + factor * (color2RGB.r - color1RGB.r)),
      g: Math.round(color1RGB.g + factor * (color2RGB.g - color1RGB.g)),
      b: Math.round(color1RGB.b + factor * (color2RGB.b - color1RGB.b)),
    };

    return `rgb(${resultRGB.r}, ${resultRGB.g}, ${resultRGB.b})`;
  };

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const options = {
    smooth: true,
  };

  return (
    <LocomotiveScrollProvider
      options={options}
      containerRef={containerRef}
      watch={[]}
    >
      <main
        data-scroll-container
        ref={containerRef}
        style={{
          transition: "background-color 0.05s ease",
          backgroundColor,
        }}
      >
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 1</h1>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 2</h1>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 3</h1>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 3</h1>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 3</h1>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <h1 data-scroll>Section 3</h1>
        </section>
        {/* Add more sections as needed */}
      </main>
    </LocomotiveScrollProvider>
  );
};

function App() {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        // ... other options you might want to use
      }}
      containerRef={containerRef}
      watch={[]}
    >
      <ScrollApp />
    </LocomotiveScrollProvider>
  );
}

export default App;
