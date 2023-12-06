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
import Sankey from "../Components/Sankey.jsx"; // Update the path to the actual location of your component
import BarChart from "../Components/Barchart";
import HeatMap from "../Components/heatmap";
import TreeMap from "../Components/Treemap";
import Barchart2 from "../Components/Barchart2";
import Slideshow from "../Components/Slideshow";

import firstslideimg from "../Elements/firstslideimg.jpg";
import pixelimg from "../Elements/pixelbg.jpeg";
import sky from "../Elements/darksky.jpeg";
import map from "../Elements/worldmap.jpeg";
import pixel2 from "../Elements/pixelbg2.jpeg";
import counterstrike from "../Elements/counterstrikebg.jpeg";
import dawn from "../Elements/dawn.jpeg";
import fire from "../Elements/fire.jpeg";
import barchartspeech from "../Elements/barchartspeech.png";
import heatmapbg from "../Elements/heatmapbg.jpeg";
import movingclouds from "../Elements/movingclouds.gif";
import Barchart2 from "../Components/Barchart2.jsx";
import treemapbg from "../Elements/treemapbg.jpeg";
import thunder from "../Elements/thunder.gif";
import moon2 from "../Elements/moon2.gif";
import mariorunning from "../Elements/mariorunning.gif";

import { color } from "d3";
// import gameconsole from "../Elements/gameconsole.png";

const ScrollApp = () => {
  const { scroll } = useContext(LocomotiveScrollContext);
  const [backgroundColor, setBackgroundColor] = useState("#00c0ff"); // Default color
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Array of colors for each section
  // light blue, purple, black, dark purple, orange, red, green, gold, dark blue, turqoise, dark green, babypink
  const sectionColors = [
    "#0ba1f4", // lightblue
    "#00c0ff", // dark purple - dawn
    "#360a26", // dark red pink
    "#000000", // black nightsky
    "#000000", // black
    "#2e0820", // dark purple pink - arcade explosion
    "#041B15", // grey - home console revolution
    "#000000", // black - globe
    "#000000", // black - shooting
    "#000000", // black - fire
    "#000000", // black - genre dominance
    "#002642", //prussian blue - genre dominance
    "#002642", //prussian blue 1
    "#002642", //prussian blue- 2
    "#002642", //prussian blue 3 - text
    "#002642", //prussian blue 4
    "#002642", //prussian blue - barchart
    "#002642", //prussian blue - heatmap
    "#002642", // dark red pink - platform power slideshow
    "#360a26", // dark red pink - treemap
    "#000000", // black
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
          </div>
          <div className="titlebox">
            <img
              src="src/Elements/button.png"
              alt="button"
              className="title-text"
              style={{ width: "25vw" }}
            />
            <div className="button-textbox">
              <p className="button-text">PRESS START</p>
            </div>
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
          // style={{ height: "100vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 80,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#111B5D",
              maxWidth: "90vw",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            Ever wondered how gaming evolved from pixelated screens to immersive
            universes?
          </h3>

          <h3
            style={{
              fontFamily: "superhelio _regular, sans-serif",
              fontSize: 30,
            }}
          >
            <br />
            Scroll down to travel through the decades of gaming history
          </h3>
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
              backgroundImage: `url(${dawn})`,
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
              width: "70%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#e36d30",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Dawn of Pixels{" "}
          </h3>
          <h3 style={{ fontFamily: "DePixel, sans-serif", fontSize: 40 }}>
            (1960s-1970s)
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
                fontSize: 28,
                textAlign: "justify",
                width: "32vw",
                marginLeft: "-15vw",
                fontFamily: "superhelio _regular, sans-serif",
              }}
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              In the 1960s, at the dawn of the digital age, the foundations of
              what we now know as video gaming were quietly laid. TThese tiny
              dots, called pixels, fundamental yet groundbreaking, were the
              building blocks of the video game revolution, transforming screens
              into gateways of interactive entertainment.
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
                style={{ maxWidth: "75%", height: "auto" }}
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
            style={{
              fontSize: 28,
              textAlign: "justify",
              fontFamily: "superhelio _regular, sans-serif",
            }}
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
              margintop: "15vh",
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#fbfb00",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Arcade Explosion{" "}
          </h3>
          <h3 style={{ fontFamily: "DePixel, sans-serif", fontSize: 40 }}>
            (1980s)
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
              data-scroll-speed="2"
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              <img
                src="src/assets/spacealien.jpeg"
                alt="Cloud2"
                style={{ maxWidth: "50%", height: "auto", marginLeft: "4vw" }}
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
                style={{ width: "50%", height: "auto", marginRight: "30vw" }}
              />
            </span>
          </div>
          <h1
            data-scroll
            style={{
              fontSize: 28,
              textAlign: "justify",
              maxWidth: "40vw",
              marginleft: "20vw",
              fontFamily: "superhelio _regular, sans-serif",
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
              marginTop: "15vh",
              color: "#A5C882",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Home Console Revolution
          </h3>
          <h3 style={{ fontFamily: "DePixel, sans-serif", fontSize: 40 }}>
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
                fontSize: 27,
                textAlign: "justify",
                maxWidth: "35vw",
                marginLeft: "1vw",
                marginRight: "10vw",
                fontFamily: "superhelio _regular, sans-serif",
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
                style={{
                  height: "60%",
                  width: "auto",

                  marginbottom: "50vh",
                }}
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
              style={{ height: "100%", width: "auto" }}
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
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif", // Reduce the bottom margin to bring text closer to the image
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
              fontSize: 68,
              width: "73%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
              // color: "#AFBE8F",
              color: "#FFFBBD",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            Online Gaming and the Expansion of Worlds{" "}
          </h3>
          <h3 style={{ fontFamily: "DePixel, sans-serif", fontSize: 40 }}>
            (2000s)
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
                fontSize: 28,
                textAlign: "justify",
                maxWidth: "35vw",
                marginLeft: "1vw",
                marginRight: "10vw",
                fontFamily: "superhelio _regular, sans-serif",
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
              style={{ maxWidth: "auto", height: "90%", margintop: "0vh" }}
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
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${fire})`,
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
              fontSize: 67,
              width: "80%",
              textAlign: "center",
              fontFamily: "M04_FATAL FURY BLACK",
              marginTop: "25vh",
              color: "#A56415 ",
            }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Age of Immersion and Innovation
          </h3>
          <h3 style={{ fontFamily: "DePixel, sans-serif", fontSize: 40 }}>
            (2010s-Present)
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
                style={{ maxWidth: "60%", height: "auto", marginLeft: "15vw" }}
              ></img>
            </span>
            <h1
              // data-scroll
              style={{
                fontSize: 26,
                textAlign: "justify",
                maxWidth: "35vw",
                marginRight: "15vw",
                fontFamily: "superhelio _regular, sans-serif",
              }}
              // data-scroll-direction="horizontal"
              // data-scroll-speed="4"
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
              style={{ width: "150%", height: "auto" }}
            ></img>
          </span>
        </section>

        {/* GENRE DOMINANCE SECTIONS */}
        <section
          ref={addSectionRef}
          // style={{ height: "100vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 70,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#F72585",
              maxWidth: "90vw",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            Genre Dominance
          </h3>

          <h3
            style={{
              fontFamily: "superhelio _regular, sans-serif",
              fontSize: 30,
            }}
          >
            <br />
            Put some text here
          </h3>
        </section>

        {/* FLYING GENRES SECTIONS */}
        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
          style={{ height: "30vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Action 🥊
          </h1>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="vertical"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Sports ⚽️
          </h1>
        </section>
        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
          style={{ height: "40vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="-9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Shooter 🔫
          </h1>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="vertical"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Role-Playing 👩🏼‍🎤
          </h1>
        </section>

        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
          style={{ height: "40vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="-9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Racing 🏎️
          </h1>
          <h1
            style={{
              maxWidth: "40vw",
              fontFamily: "superhelio _regular, sans-serif",
            }}
          >
            There are numerous popular game genres but how did they all perform
            in sales?{" "}
          </h1>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Fighting 👊🏼
          </h1>
        </section>

        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
          style={{ height: "40vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="-9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Simulation 🌎
          </h1>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="vertical"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Puzzle 🧩
          </h1>
        </section>

        <section
          ref={addSectionRef}
          id="section10"
          className="contents"
          data-scroll-section
          style={{ height: "40vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Adventure 🪂
          </h1>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeIn"
            data-scroll-direction="vertical"
            data-scroll-speed="9"
            style={{
              fontSize: 35,
              maxWidth: "80vw",
              marginBottom: "0px",
              marginTop: "30vh",
              fontFamily: "superhelio _regular, sans-serif",
              color: "#F72585",
            }}
          >
            Strategy 🔎
          </h1>
        </section>

        {/* BARCHART */}
        <section
          ref={addSectionRef}
          // style={{ height: "100vh" }}
          id="stick"
          className="contents"
          data-scroll-section
          style={{ display: "flex", flexDirection: "column", height: "110vh" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>

          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 30,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#FFFFFF",
              maxWidth: "90vw",
              marginRight: "12vw",
              marginTop: "-5vh",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            <br />
            Genre Dominance
          </h3>
          <BarChart />
          {/* Textbox under the chart */}
          <div
            className="chart-description"
            data-scroll
            style={{
              color: "#FFFFFF",
              margin: "0",
              maxWidth: "30vw",
              marginBottom: "0vh",
              marginLeft: "0vw",
              marginRight: "10vw",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
            }}
            data-scroll-class="fadeIn"
            data-scroll-speed="1"
          >
            <p
              style={{
                fontFamily: "superhelio _regular, sans-serif",
                width: "35vw",
                marginRight: "75vw",
                fontStyle: "italic",
                color: "#9cf6f6",
              }}
            >
              This bar chart displays the all-time sales of video game genres,
              with data spanning from 1960 to 2015.
              <br /> Use the dropdown menu to choose a specific region which
              will reflect the sales data!
            </p>
          </div>
          <div
            data-scroll
            data-scroll-speed="5"
            data-scroll-sticky // Attribute that enables the sticky scroll
            data-scroll-target="#stick"
          >
            <img
              src="src/Elements/marioflip.png"
              className="genremario"
              alt="Mario"
            />
          </div>

          <img
            src="src/Elements/barchartspeech.png"
            alt="speechbubble"
            className="speechbubble2"
          />
        </section>

        {/* HEATMAP */}
        <section
          ref={addSectionRef}
          style={{ height: "130vh", display: "flex", flexDirection: "column" }}
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
              opacity: "30%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 30,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#fdcfbb",
              maxWidth: "90vw",
              marginRight: "27vw",
              marginTop: "-5vh",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            <br />
            Genre Popularity
          </h3>
          <HeatMap />
          {/* Textbox under the chart */}
          <div
            className="chart-description"
            data-scroll
            style={{
              color: "#FFFFFF",
              margin: "0",
              maxWidth: "30vw",
              marginBottom: "0vh",
              marginLeft: "0vw",
              marginRight: "20vw",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
            }}
            data-scroll-class="fadeIn"
            data-scroll-speed="1"
          >
            <p
              style={{
                fontFamily: "superhelio _regular, sans-serif",
                width: "40vw",
                marginLeft: "-5vw",
                marginRight: "210vw",
                fontStyle: "italic",
                color: "#9cf6f6",
              }}
            >
              This heatmap visualizes the sales data for various video game
              genres across three major regions: North America (NA), Europe
              (EU), and Japan (JP). <br />
              Move your cursor over any cell to display a tooltip with detailed
              sales information for that genre and region. Use the zoom feature
              to focus on specific areas of the heatmap to get a closer look.
            </p>
          </div>
          <div
            data-scroll
            data-scroll-speed="5"
            data-scroll-sticky // Attribute that enables the sticky scroll
            data-scroll-target="#stick"
          >
            {/* <img src="src/Elements/marioflip.png" alt="Mario" /> */}
          </div>

          <img
            src="src/Elements/speechbubble2.png"
            alt="speechbubble"
            className="speechbubble2"
          />
          {/* <h3 className="small-bubbletext" style={{ marginLeft: "65vw" }}>
            Hi there! hwyyyyyyyyyyyyyy
          </h3> */}
        </section>

        {/* PLATFORM POWER SLIDESHOW */}
        <section
          ref={addSectionRef}
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
          className="contents"
          data-scroll-section
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${mariorunning})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "25%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 30,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#fdcfbb",
              maxWidth: "90vw",
              marginRight: "45vw",
              marginBottom: "60vh",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            <br />
            Who Rules the Game World?
          </h3>
          <div className="slideshow">
            <Slideshow />
          </div>

          {/* <img
            src="src/Elements/speechbubble2.png"
            alt="speechbubble"
            className="speechbubble2"
          /> */}
          {/* <h3 className="small-bubbletext" style={{ marginLeft: "65vw" }}>
            Hi there! hwyyyyyyyyyyyyyy
          </h3> */}
        </section>

        {/* TREEMAP */}
        <section
          ref={addSectionRef}
          style={{ height: "120vh", display: "flex", flexDirection: "column" }}
          className="contents"
          data-scroll-section
        >
          <div
            className="background-image-container"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${treemapbg})`,
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
              fontSize: 30,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#F7B538",
              maxWidth: "90vw",
              marginRight: "0vw",
              marginTop: "-10vh",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            <br />
            Platform Power
          </h3>
          <TreeMap />
          {/* Textbox under the chart */}
          <div
            className="chart-description"
            data-scroll
            style={{
              color: "#FFFFFF",
              margin: "0",
              maxWidth: "30vw",
              marginBottom: "0vh",
              marginLeft: "0vw",
              marginRight: "18vw",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
            }}
            data-scroll-class="fadeIn"
            data-scroll-speed="1"
          >
            <p
              style={{
                fontFamily: "superhelio _regular, sans-serif",
                width: "50vw",
                marginRight: "5vw",
                marginTop: "-5vh",
                fontStyle: "italic",
                color: "#EFD9CE",
              }}
            >
              This heatmap provides a visual comparison of video game sales
              across various gaming platforms and genres. Move your cursor over
              any segment to see a pop-up with detailed sales information for
              that genre on the specified platform. Use the zoom function to
              focus on a particular section for a closer look, or zoom out to
              get an overview of all platforms and genres.
            </p>
          </div>
        </section>

        {/* SANKEY */}
        <section
          ref={addSectionRef}
          // style={{ height: "100vh" }}
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
              backgroundImage: `url(${sky})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "40%",
              zIndex: -1,
            }}
          ></div>
          <h3
            className="op-class"
            data-scroll
            style={{
              fontSize: 30,
              fontFamily: "M04_FATAL FURY BLACK",
              color: "#FFFFFF",
              maxWidth: "90vw",
              marginRight: "7vw",
              marginTop: "-5vh",
            }}
            data-scroll-class="fadeIn"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            <br />
            Publisher Popularity
          </h3>
          <Sankey />
          {/* Textbox under the chart */}
          <div
            className="chart-description"
            data-scroll
            style={{
              color: "#FFFFFF",
              margin: "0",
              maxWidth: "30vw",
              marginBottom: "0vh",
              marginLeft: "0vw",
              marginRight: "10vw",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
            }}
            data-scroll-class="fadeIn"
            data-scroll-speed="1"
          >
            <p
              style={{
                fontFamily: "superhelio _regular, sans-serif",
                width: "50vw",
                marginLeft: "-5vw",
                fontStyle: "italic",
                color: "#FAF2A1",
              }}
            >
              This Sankey diagram illustrates the relationship between video
              game publishers, platforms, and genres. The width of the bands is
              proportional to the sales volume, creating a visual representation
              of market share and sales flow from publishers to platforms, and
              then to the genres they support. By clicking on any of the boxes
              (nodes) representing publishers, platforms, or genres, you can
              highlight all the connecting flows (links) to easily trace the
              distribution of sales from that specific category. Positioning
              your cursor over any of the nodes will reveal detailed sales
              values, providing an in-depth look at the sales figures associated
              with that flow.
            </p>
          </div>
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
          className="sankey-chart"
          data-scroll-section
          ref={addSectionRef}
          data-scroll-class="fadeIn"
          data-scroll-repeat="true"
          data-scroll-speed="1"
        >
          {/* <Sankey />
          Sankey component is now outside of the `data-scroll-section` */}
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
