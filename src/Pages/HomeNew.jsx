import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";
import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import backgroundImg from "../Elements/classic-world-video-game-background-free-vector.jpg";

const ScrollApp = () => {
  const { scroll } = useContext(LocomotiveScrollContext);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Default color
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Array of colors for each section
  const sectionColors = ["#FF5733", "#33D1FF", "#8D33FF", "#FF5733", "#33FFD1"];

  const audioRef = useRef(null);

  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Function to play sound after a delay
  const playSoundWithDelay = useCallback((delay) => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, delay);
  }, []);

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

  const options = {
    smooth: true,
  };

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
          transition: "background-color 0.3s ease",
          backgroundColor: backgroundColor,
        }}
      >
        <section
          className="container"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="first-slide"
          data-scroll-speed="4"
          data-scroll-section
        >
          <h1 data-scroll>Section 1</h1>
          <img
            src="src/Elements/sun.png"
            alt="Rotating Sun"
            class="rotating-sun sun1"
          />
          <img
            src="src/Elements/sun.png"
            alt="Rotating Sun"
            class="rotating-sun sun2"
          />
          <img
            src="src/Elements/sun.png"
            alt="Rotating Sun"
            class="rotating-sun sun3"
          />
          <img src="src/Elements/mario.png" alt="Mario" className="mario" />
          <img
            src="src/Elements/speechbubble1.png"
            alt="textbox"
            className="speechbubble"
          />
          <div className="title-textbox">
            <p className="title-subtitle">
              👾 Hi there! It's time to dive into a dynamic journey through the
              vibrant universe of video games. From the pixelated realms of
              retro classics to the immersive universes of modern blockbusters,
              our dashboard offers a unique lens to view the ever-evolving world
              of video games. Get ready to level up your understanding with
              engaging analytics and fun facts! Embark on this adventure with
              us, and discover the hidden gems in the gaming galaxy! 👾
            </p>

            <div className="title-text">Let's Play Pixel Pulse!</div>
          </div>
          <img
            src="src/Elements/cloud.png"
            alt="Cloud"
            className="moving-cloud"
          />
          <img
            src="src/Elements/cloud.png"
            alt="Cloud2"
            className="cloud-right-to-left"
          />
          <audio
            ref={audioRef}
            src="src/Elements/mariojump.mp3"
            preload="auto"
          />
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          className="contents"
          data-scroll-section
        >
          <h1
            className="op-class"
            data-scroll
            style={{ fontSize: 172 }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            How Data Data Data Data Data?
          </h1>
        </section>
        <section
          ref={addSectionRef}
          style={{
            height: "100vh",
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-scroll-section
          className="contents"
        >
          <h3
            className="op-class"
            data-scroll
            style={{ fontSize: 100 }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Dawn of Pixels (1960s-1970s):
          </h3>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          className="contents"
          data-scroll-section
        >
          <h1
            data-scroll
            style={{ height: "100vh" }}
            // style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
          >
            In the 1960s, a galaxy far far away from our current gaming
            universe, the seeds of interactive electronic entertainment were
            sown. The earliest games were born in the hallowed halls of research
            institutions, rudimentary by today's standards but revolutionary for
            their time.
          </h1>
          <span
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="4"
          >
            <img src="src/assets/image1.jpeg" alt="Cloud2"></img>
          </span>
        </section>
        <section
          ref={addSectionRef}
          style={{ height: "100vh" }}
          className="contents"
          data-scroll-section
        >
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
          >
            Pioneers like "Spacewar!" laid the foundation for what was to become
            a cultural phenomenon.
          </h1>
        </section>
        <section
          ref={addSectionRef}
          className="contents"
          data-scroll-section
          style={{
            height: "100vh",
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Home Console Revolution (1990s):
          </h1>
        </section>
        <section
          ref={addSectionRef}
          className="contents"
          style={{ height: "100vh" }}
          data-scroll-section
        >
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="4"
          >
            <img src="src/assets/image1.jpeg" alt="Cloud2"></img>
          </span>
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="vertical"
            data-scroll-speed="2"
          >
            The 1990s ushered in the era of home consoles, with the likes of
            Nintendo, Sega, and Sony battling for dominance in living rooms
            around the world. The Super Mario Bros., Sonic the Hedgehog, and the
            birth of PlayStation brought gaming to a personal level. This decade
            also saw the rise of 3D graphics, changing the visual landscape of
            gaming forever.
          </h1>
        </section>
        {/* Add more sections as needed */}
      </main>
    </LocomotiveScrollProvider>
  );
};

function HomeNew() {
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

export default HomeNew;
