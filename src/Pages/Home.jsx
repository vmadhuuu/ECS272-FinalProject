import {
  LocomotiveScrollProvider,
  LocomotiveScrollContext,
} from "react-locomotive-scroll";
import React, { useRef, useCallback, useContext } from "react";
import "../App.css";
import backgroundImg from "../Elements/classic-world-video-game-background-free-vector.jpg";

function App() {
  const containerRef = useRef(null);

  const { scroll } = useContext(LocomotiveScrollContext);

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

            <div className="title-text">Let's Play Pixel Pulse!</div>
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
        <section className="contents" data-scroll-section>
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

        <section className="contents" data-scroll-section>
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            font
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
        <section className="contents" data-scroll-section>
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            font
          >
            Pioneers like "Spacewar!" laid the foundation for what was to become
            a cultural phenomenon.
          </h1>
        </section>

        <section className="contents" data-scroll-section>
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
        <section className="contents" data-scroll-section>
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
            font
          >
            The 1990s ushered in the era of home consoles, with the likes of
            Nintendo, Sega, and Sony battling for dominance in living rooms
            around the world. The Super Mario Bros., Sonic the Hedgehog, and the
            birth of PlayStation brought gaming to a personal level. This decade
            also saw the rise of 3D graphics, changing the visual landscape of
            gaming forever.
          </h1>
        </section>

        <section className="contents" data-scroll-section>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            Online Gaming and the Expansion of Worlds (2000s):
          </h1>
        </section>
        <section className="contents" data-scroll-section>
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            font
          >
            As the new millennium turned, online connectivity transformed gaming
            into a global community. The internet era gave rise to multiplayer
            experiences, with games like "World of Warcraft" and
            "Counter-Strike" leading the charge.
          </h1>
          <span
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="4"
          >
            <img src="src/assets/image1.jpeg" alt="Cloud2"></img>
          </span>
        </section>
        <section className="contents" data-scroll-section>
          <h1
            data-scroll
            style={{ fontSize: 32, textAlign: "justify" }}
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            font
          >
            Gaming was no longer a solitary activity but a shared adventure
            across continents.
          </h1>
        </section>
        <section className="contents" data-scroll-section>
          <h1
            className="op-class"
            data-scroll
            data-scroll-class="fadeInFast"
            data-scroll-repeat="true"
            data-scroll-speed="1"
          >
            The Age of Immersion and Innovation (2010s-Present):
          </h1>
        </section>
        <section className="contents" data-scroll-section>
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
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            font
          >
            The current gaming era is marked by immersive experiences, with
            virtual reality and augmented reality adding new dimensions to
            gameplay. Photorealistic graphics and deep storytelling define
            titles like "The Last of Us" and "Red Dead Redemption," which are
            akin to interactive cinema. The indie game movement continues to
            push creative boundaries, ensuring that the heart of gaming beats
            strong with innovation.
          </h1>
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
        <section className="contents" data-scroll-section>
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
