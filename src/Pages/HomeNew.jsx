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
import "../App.css";

// components
import BarChart from "../Components/Sankey.jsx"; // Update the path to the actual location of your component

import firstslideimg from "../Elements/firstslideimg.jpg";
import pixelimg from "../Elements/pixelbg.jpeg";
import sky from "../Elements/darksky.jpeg";
import map from "../Elements/worldmap.jpeg";
import pixel2 from "../Elements/pixelbg2.jpeg";
import counterstrike from "../Elements/counterstrikebg.jpeg";

const ScrollApp = () => {
  const { scroll } = useContext(LocomotiveScrollContext);
  const [backgroundColor, setBackgroundColor] = useState("#00c0ff"); // Default color
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Array of colors for each section
  // light blue, purple, black, dark purple, orange, red, green, gold, dark blue, turqoise, dark green, babypink
  const sectionColors = [
    "#00c0ff", // lightblue
    "#00c0ff", // dark purple
    "#360a26", // dark red pink
    "#000000", // black nightsky
    "#000000", // black
    "#59113f", // dark purple pink
    "#041B15", // grey
    "#000000", // black
    "#080336", // dark blue
    "#000000", // black
    "#000000", //turquoise
    "#000000", // dark green
    "#b5919c", //babypink
  ];

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
            console.log(progress);
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
            backgroundImage: `url(${firstslideimg})`,
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
          {/* audio */}
          <audio ref={audioRef} src={mariojump} preload="auto" />

          {/* mario */}
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
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${pixel2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "20%",
              zIndex: -1,
            }}
          ></div>
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
          id="section1"
          className="contents"
          data-scroll-section
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${pixel2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "20%",
              zIndex: -1,
            }}
          ></div>

          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              width: "80%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Dawn of Pixels (1960s-1970s):
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1
              data-scroll
              style={{
                fontSize: 30,
                textAlign: "justify",
                width: "700px",
                marginLeft: "-15vw",
                fontFamily: "superhelio _regular, sans-serif",
              }}
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              In the 1960s, a galaxy far far away from our current gaming
              universe, the seeds of interactive electronic entertainment were
              sown. The earliest games were born in the hallowed halls of
              research institutions, rudimentary by today's standards but
              revolutionary for their time.
            </h1>
            <span
              data-scroll
              data-scroll-direction="vertical"
              data-scroll-speed="4"
              style={{
                textAlign: "center",
                marginRight: "-20vw", // Centers the image
              }}
            >
              <img
                src="src/assets/pixel.jpeg"
                alt="Cloud2"
                style={{ maxWidth: "90%", height: "auto" }}
              ></img>
            </span>
          </div>
        </section>

        <section ref={addSectionRef} className="contents" data-scroll-section>
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${sky})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "70%",
              zIndex: -1,
            }}
          ></div>
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
            display: "flex",
            flexDirection: "column",
            // backgroundImage: `url(${pixelimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${pixel2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "20%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              width: "80%",
              textAlign: "center",
              margintop: "8vh",
              fontFamily: "M04_FATAL FURY BLACK",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Arcade Explosion (1980s):
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0px",
            }}
          >
            <span
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="4"
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              <img
                src="src/assets/spacealien.jpeg"
                alt="Cloud2"
                style={{ maxWidth: "60%", height: "auto", marginLeft: "4vw" }}
              ></img>
            </span>
            <span
              data-scroll
              data-scroll-direction="vertical"
              data-scroll-speed="4"
              style={{ textAlign: "center" }}
            >
              <img
                src="src/Elements/pacman.gif"
                alt="Cloud2"
                style={{ width: "70%", height: "auto", marginRight: "20vw" }}
              />
            </span>
          </div>
          <h1
            data-scroll
            style={{
              fontSize: 32,
              textAlign: "justify",
              maxWidth: "800px",
              marginleft: "20vw",
            }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
          >
            Fast forward to the 1980s, when arcades became the epicenters of
            youth culture. The golden age of arcade games introduced icons like
            "Pac-Man" and "Space Invaders," whose influence is etched into the
            annals of gaming history. These coin-operated machines sparked a
            competitive spirit and brought about the high score chase.
          </h1>
        </section>

        <section
          ref={addSectionRef}
          className="contents"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          data-scroll-section
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${pixel2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "20%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              width: "80%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
              marginTop: "25vh",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Home Console Revolution
            <br />
            (1990s)
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1
              data-scroll
              style={{
                fontSize: 32,
                textAlign: "justify",
                maxWidth: "700px",
                marginLeft: "1vw",
                marginRight: "5vw",
              }}
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              The 1990s ushered in the era of home consoles, with the likes of
              Nintendo, Sega, and Sony battling for dominance in living rooms
              around the world. The Super Mario Bros., Sonic the Hedgehog, and
              the birth of PlayStation brought gaming to a personal level. This
              decade also saw the rise of 3D graphics, changing the visual
              landscape of gaming forever.
            </h1>
            <span
              data-scroll
              data-scroll-direction="vertical"
              data-scroll-speed="4"
              style={{ textAlign: "center" }}
            >
              <img
                src="src/Elements/supermario.gif"
                alt="Cloud2"
                style={{ width: "70%", height: "auto", marginRight: "20vw" }}
              ></img>
            </span>
          </div>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="4"
            style={{ textAlign: "center" }}
          >
            <img
              src="src/Elements/sonichedgehog.gif" // Replace with your image path
              alt="sonic"
              style={{ width: "130%", height: "auto" }}
            />
          </span>
        </section>

        <section
          ref={addSectionRef}
          id="section5"
          className="contents"
          data-scroll-section
          style={{
            display: "flex", // Enable flexbox
            flexDirection: "column", // Stack items vertically
            alignItems: "center", // Center-align items horizontally
            textAlign: "center", // Center-align text
          }}
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${map})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "25%",
              zIndex: -1,
            }}
          ></div>
          <h1
            data-scroll
            style={{
              fontSize: 32,
              marginBottom: "0px",
              marginTop: "35vh", // Reduce the bottom margin to bring text closer to the image
            }}
            data-scroll-direction="vertical"
            data-scroll-speed="2"
          >
            Gaming was no longer a solitary activity but a shared adventure
            across continents.
          </h1>
          <img
            src="src/Elements/globe.gif" // Replace with the actual path to your GIF
            alt="globe"
            style={{
              width: "45%",
              height: "auto",
              marginTop: "-50px", // You can also reduce the top margin of the image
            }}
          />
        </section>

        <section
          ref={addSectionRef}
          id="section6"
          className="contents"
          data-scroll-section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${counterstrike})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              width: "80%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            Online Gaming and the Expansion of Worlds (2000s):
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1
              data-scroll
              style={{
                fontSize: 32,
                textAlign: "justify",
                maxWidth: "800px",
                marginLeft: "1vw",
                marginRight: "15vw",
              }}
              data-scroll-direction="vertical"
              data-scroll-speed="2"
            >
              As the new millennium turned, online connectivity transformed
              gaming into a global community. The internet era gave rise to
              multiplayer experiences, with games like "World of Warcraft" and
              "Counter-Strike" leading the charge. Gaming was no longer a
              solitary activity but a shared adventure across continents.
            </h1>
            <span
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="4"
            >
              <img
                src="src/Elements/counterstrike.gif"
                alt="Cloud2"
                style={{ width: "200%", height: "auto" }}
              ></img>
            </span>
          </div>
          <span
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="4"
          >
            <img
              src="src/assets/worldofwar.jpeg"
              alt="Cloud2"
              style={{ maxWidth: "170%", height: "auto", margintop: "0vh" }}
            ></img>
          </span>
        </section>

        <section
          ref={addSectionRef}
          id="section7"
          className="contents"
          data-scroll-section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              width: "80%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Age of Immersion and Innovation
            <br />
            (2010s-Present):
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              data-scroll
              data-scroll-direction="vertical"
              data-scroll-speed="4"
            >
              <img
                src="src/assets/lastofus.jpeg"
                alt="Cloud2"
                style={{ maxWidth: "70%", height: "auto" }}
              ></img>
            </span>
            <h1
              data-scroll
              style={{
                fontSize: 32,
                textAlign: "justify",
                maxWidth: "750px",
                marginRight: "5vw",
              }}
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              The current gaming era is marked by immersive experiences, with
              virtual reality and augmented reality adding new dimensions to
              gameplay. Photorealistic graphics and deep storytelling define
              titles like "The Last of Us" and "Red Dead Redemption," which are
              akin to interactive cinema. The indie game movement continues to
              push creative boundaries, ensuring that the heart of gaming beats
              strong with innovation.
            </h1>
          </div>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="4"
          >
            <img
              src="src/Elements/reddead.gif"
              alt="Cloud2"
              style={{ width: "180%", height: "auto" }}
            ></img>
          </span>
        </section>

        <section
          ref={addSectionRef}
          id="stick"
          className="contents"
          data-scroll-section
          style={{ height: "100vh" }}
        >
          <h1
            data-scroll
            data-scroll-speed="5"
            data-scroll-sticky // Attribute that enables the sticky scroll
            data-scroll-target="#stick"
          >
            {/* Replace the placeholder text with your component */}
            hi hi
          </h1>

          <p>other contents</p>
          <p>other contents</p>
          <p>other contents</p>
        </section>

        <section
          ref={addSectionRef}
          id="section9"
          className="contents"
          data-scroll-section
        >
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
          >
            How Data Data Data Data Data?
          </h1>
        </section>

        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
        >
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
          >
            How Data Data Data Data Data?
          </h1>
        </section>

        <section
          ref={addSectionRef}
          className="contents"
          id="section11"
          data-scroll-section
        >
          <h1
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
          >
            <BarChart />
          </h1>
          <h2
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="9"
          >
            hihihi
          </h2>
          <h4>iuub</h4>
        </section>
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
