import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import Sankey from "./Components/Sankey";
import BarChart from "./Components/Barchart";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Sankey />
      {/* <BarChart /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
