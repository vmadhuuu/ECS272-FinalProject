import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import "./App.css";
//import Sankey from "./Components/Sankey";
import BarChart from "./Components/Barchart";
import Home from "./Pages/Home";
import HeatMap from "./Components/heatmap";
import TreeMap from "./Components/Treemap";
import Sankey from "./Components/Sankey";
import SecondPage from "./Components/SecondPage";
import HomeNew from "./Pages/HomeNew";
import Barchart2 from "./Components/Barchart2";
import Slideshow from "./Components/Slideshow";

function App() {
  return (
    <>
      {/* <Sankey /> */}
      {/* <TreeMap /> */}
      {/* <BarChart /> */}
      {/* <HeatMap /> */}
      {/* <SecondPage /> */}
      {/* <Barchart2 /> */}
      <HomeNew />
    </>
  );
}

export default App;
