import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import React, { useRef, useCallback, useContext } from "react";
import "../App.css";
import backgroundImg from "../Elements/classic-world-video-game-background-free-vector.jpg";

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

  return (
    <LocomotiveScrollProvider containerRef={containerRef} watch={[]}>
      <main data-scroll-container ref={containerRef}>
        <section
          className="container"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="first-slide"
          data-scroll-section
        >
          <img src="src/Elements/mario.png" alt="Mario" className="mario" />
          <img
            src="src/Elements/speechbubble1.png"
            alt="textbox"
            className="speechbubble"
          />
          {/* <div className="title-text">
            <p> Let's Play Pixel Pulse! </p>
          </div> */}

          <button onClick={() => scrollToSection("#second-slide")}>
            Go to Second Slide
          </button>
        </section>

        <section className="content" id="second-slide" data-scroll-section>
          <p>Video Game Dashboard</p>
        </section>

        <section id="character" data-scroll-section>
          <h1> insert character here</h1>
        </section>
        {/* The character's sprite will be displayed here */}

        <section className="footer" data-scroll-section>
          <h1>Let's end the application with this Footer</h1>
        </section>
      </main>
    </LocomotiveScrollProvider>
  );
}

export default App;
