import React from "react";
import "../App.css";

function App() {
  return (
    <div className="container">
      <header>
        <h1>Madhumitha and Apoorva present</h1>
      </header>
      <section className="content">
        <p className="intro-text">Video Game Dashboard</p>
        <div className="scroll-instruction">Scroll to Continue</div>
      </section>
      <div
        className="character"
        style={{ backgroundImage: "src/data/Elements/mario.png" }}
      >
        {/* The character's sprite will be displayed here */}
      </div>
    </div>
  );
}

export default App;
