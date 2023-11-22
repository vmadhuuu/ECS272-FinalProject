import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // code for barchart
  }, [data]);

  return (
    <>
      barchart here
      {/* <svg ref={svgRef}></svg> */}
    </>
  );
};

export default BarChart;
