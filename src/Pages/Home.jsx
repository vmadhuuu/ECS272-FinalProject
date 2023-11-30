import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";

import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "../App.css";
import backgroundImg from "../Elements/firstslideimg.jpg";

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

  const options = {
    smooth: true,
  };

  return (
    <LocomotiveScrollProvider
      options={options}
      containerRef={containerRef}
      watch={[]}
    >
      <main data-scroll-container ref={containerRef}>
        <section
          className="container"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
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
          id="section1"
          className="contents"
          data-scroll-section
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h3
            className="op-class"
            data-scroll
            style={{ fontSize: 100, width: "100%", textAlign: "center" }}
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

        <section id="section2" className="contents" data-scroll-section>
          <img
            src="src/Elements/mario.png" // Replace with the actual path to your Mario image
            alt="Mariofunfact"
            className="mario1"
          />
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="vertical"
            data-scroll-speed="2"
          >
            Pioneers like "Spacewar!" laid the foundation for what was to become
            a cultural phenomenon.
          </h1>
        </section>

        <section
          id="section3"
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
              fontSize: 100,
              width: "100%",
              textAlign: "center",
              margintop: "5vh",
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
          id="section4"
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
            style={{ fontSize: 100, width: "100%", textAlign: "center" }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Home Console Revolution (1990s):
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
          id="section6"
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
            style={{ fontSize: 100, width: "100%", textAlign: "center" }}
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
            style={{ fontSize: 100, width: "100%", textAlign: "center" }}
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Age of Immersion and Innovation (2010s-Present):
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
          id="stick"
          className="contents"
          data-scroll-section
          style={{ height: "100vh" }}
        >
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

        <section id="section9" className="contents" data-scroll-section>
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

        <section id="section10" className="contents" data-scroll-section>
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
        <section className="contents" id="section11" data-scroll-section>
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
