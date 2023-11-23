import React from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import "../App.css";

function App() {
  const ref = useRef(null);

  const options = {
    smooth: true,
  };
  return (
    <LocomotiveScrollProvider options={options} containerRef={ref}>
      <main data-scroll-container ref={ref}>
        <section className="container" data-scroll-section>
          <h1>Madhumitha and Apoorva present</h1>
        </section>

        <section className="content" data-scroll-section>
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
