import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import React, { useRef, useCallback, useContext, useEffect } from "react";
import "../App.css";
import backgroundImg from "../Elements/classic-world-video-game-background-free-vector.jpg";
import SecondPage from "../Components/SecondPage";
import mariojump from "../Elements/mariojump.mp3";

function App() {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const { scroll } = useContext(LocomotiveScrollContext);
  // Function to play sound after a delay
  const playSoundWithDelay = useCallback((delay) => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, delay);
  }, []);

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

  useEffect(() => {
    // Calculate delay for 50% of the animation
    const animationDuration = 8000; // 8 seconds
    const startAt = 0.5; // Corresponding to 50% of the animation
    const delay = animationDuration * startAt;

    // Call the function with the calculated delay
    playSoundWithDelay(delay);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(playSoundWithDelay);
    };
  }, [playSoundWithDelay]);

  {
    /* music sound effect */
  }

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
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="first-slide"
          data-scroll-speed="4"
          data-scroll-section
        >
          <h1 data-scroll>text</h1>
          {/* rotating suns */}
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

          {/* mario */}
          <img src="src/Elements/mario.png" alt="Mario" className="mario" />

          {/* speechbubble */}
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
            <span className="title-text">Let's Play Pixel Pulse!</span>
          </div>

          {/* clouds */}
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

          <button onClick={() => scrollToSection("#second-slide")}>
            Go to Second Slide
          </button>
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
