import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import React, { useRef, useCallback, useContext } from "react";
import "../App.css";

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
        <section className="container" id="first-slide" data-scroll-section>
          <button onClick={() => scrollToSection("#second-slide")}>
            Go to Second Slide
          </button>

          <h1>Madhumitha and Apoorva present</h1>
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
