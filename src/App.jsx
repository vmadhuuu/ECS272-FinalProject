import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
//import Sankey from "./Components/Sankey";
import BarChart from "./Components/Barchart";
import Home from "./Pages/Home";
import HeatMap from "./Components/heatmap";
import TreeMap from "./Components/Treemap";

function App() {
  return (
    <>
      {/* <Sankey /> */}
      <TreeMap/>
      <BarChart/>
      <HeatMap/>

      {/* <Home /> */}
    </>
  );
}

export default App;
