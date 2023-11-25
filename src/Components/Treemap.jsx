import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TreeMap = () => {
  const [data, setData] = useState(null); // Change to null to signify no data initially
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1600; // Declare width and height before use
    const height = 500;

    d3.csv("../data/vgsales.csv").then((loadedData) => {
      loadedData.forEach((d) => {
        d.Global_Sales = +d.Global_Sales; // Convert to numeric value
      });

      // Aggregate the data by platform and genre
      const root = d3.rollup(
        loadedData,
        (v) => d3.sum(v, (leaf) => leaf.Global_Sales), // summing up the global sales
        (d) => d.Platform, // first level of the hierarchy
        (d) => d.Genre // second level of the hierarchy
      );

      // Transform rollupData into a hierarchical structure
      const hierarchyData = Array.from(root, ([platform, genres]) => ({
        name: platform,
        children: Array.from(genres, ([genre, value]) => ({
          name: genre,
          value: value,
        })),
      }));

      // console.log(hierarchyData, "hierarchyData")

      // Create the root of the hierarchy
      const hierarchyRoot = d3
        .hierarchy({ name: "Platforms", children: hierarchyData })
        .sum((d) => d.value) // Compute the 'value' of each level
        .sort((a, b) => b.value - a.value); // Sort the nodes

      const treemap = d3.treemap().size([width, height]).paddingInner(1);
      treemap(hierarchyRoot); // Apply the treemap layout

      setData(hierarchyRoot);

      //console.log(hierarchyRoot, "TreeMap Data");

      // setData(hierarchyRoot);
      console.log(hierarchyRoot);
    });
  }, []);

  useEffect(() => {
    // console.log(data, "data 1")
    if (data) {
      // Only run if data is set
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous SVG elements

      // Create a color scale for platforms
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      // Create groups for each node
      const nodes = svg
        .selectAll("g")
        .data(data.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      // // // Append rectangles to the node groups
      nodes
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => (d.depth === 1 ? colorScale(d.data.name) : "none"))
        .attr("stroke", "white");

      // // Append text to the node groups
      nodes
        .filter((d) => d.depth === 2) // Only add text to genre nodes
        .append("text")
        .selectAll("tspan")
        .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g)) // Split the name at camelCase
        .enter()
        .append("tspan")
        .text((d) => d)
        .attr("x", 4)
        .attr("y", (d, i) => 13 + i * 10) // Offset each tspan element
        .attr("fill", "black")
        .attr("font-size", "10px");
    }
  }, [data]);

  return (
    <>
      TreeMap
      <svg ref={svgRef} width={800} height={500}></svg>
    </>
  );
};

export default TreeMap;
