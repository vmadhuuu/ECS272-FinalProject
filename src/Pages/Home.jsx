import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import React, { useRef, useCallback, useContext } from "react";
import "../App.css";
import backgroundImg from "../Elements/classic-world-video-game-background-free-vector.jpg";
import SecondPage from "../Components/SecondPage";

function App() {
  const containerRef = useRef(null);
  // const scrollRef = useRef(null);
  //scrolling
  const { scroll } = useContext(LocomotiveScrollContext);

  const scrollToSection = useCallback(
    (sectionId) => {
      const section = document.querySelector(sectionId);
      console.log("section", section);
      console.log("scroll", scroll);
      if (section && scroll) {
        scroll.scrollTo(section);
      }
    },
    [scroll]
  );
  // const scrollToSection = useCallback((sectionId) => {
  //   // console.log(sectionId);
  //   const section = document.querySelector(sectionId);
  //   console.log("sec", section);
  //   console.log("scroll", scrollRef);

  //   // scrollRef.current.scrollTo(section);
  // }, []);
  const options = {
    smooth: true,
  };

  return (
    <LocomotiveScrollProvider
      options={options}
      containerRef={containerRef}
      watch={[]}
    >
      <main data-scroll-container options={options} ref={containerRef}>
        <section
          className="container"
          // style={{
          //   backgroundImage: `url(${backgroundImg})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
          id="first-slide"
          data-scroll-speed="4"
          data-scroll-section
        >
          <h1 data-scroll>hu</h1>
          {/* <img src="src/Elements/mario.png" alt="Mario" className="mario" />
          <img
            src="src/Elements/speechbubble1.png"
            alt="textbox"
            className="speechbubble"
          />
          <div className="title-textbox">
            <p className="title-subtitle">
              👾 Dive into a dynamic journey through the vibrant universe of
              video games. Explore captivating visuals and intriguing data as we
              unravel the trends, patterns, and secrets that define today's
              gaming landscape. From the pixelated realms of retro classics to
              the immersive universes of modern blockbusters, our dashboard
              offers a unique lens to view the ever-evolving world of video
              games. Get ready to level up your understanding with engaging
              analytics and fun facts! Embark on this adventure with us, and
              discover the hidden gems in the gaming galaxy! 👾
            </p>
            <span className="title-text">Let's Play Pixel Pulse!</span>
          </div>

          <img
            src="src/Elements/cloud.png"
            alt="Cloud"
            className="moving-cloud"
          />

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
          /> */}

          {/* <button onClick={() => scrollToSection("#second-slide")}>
            Go to Second Slide
          </button> */}
        </section>
        <section className="contents" data-scroll-section>
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

        <section className="contents" id="second-slide" data-scroll-section>
          <h1
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
          >
            Content for something here
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

        <section id="stick" className="contents" data-scroll-section>
          <h1
            data-scroll
            data-scroll-speed="5"
            data-scroll-sticky // Attibute that enables the sticky scroll
            data-scroll-target="#stick"
          >
            Bar Chart content here
          </h1>

          <p>other contents</p>
          <p>other contents</p>
          <p>other contents</p>
        </section>

        <section className="contents" data-scroll-section>
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

        <section className="contents" data-scroll-section>
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
        <section className="contents" id="second-slide" data-scroll-section>
          <h1
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="9"
          >
            Content for something here
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
        {/* The character's sprite will be displayed here */}
      </main>
    </LocomotiveScrollProvider>
  );
}

export default App;
