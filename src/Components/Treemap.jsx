import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TreeMap = () => {
  const [data, setData] = useState(null); // Change to null to signify no data initially
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1200; // Declare width and height before use
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
      
      // //Transform rollupData into a hierarchical structure
      // const hierarchyData = {
      //   name: "all",
      //   children: Array.from(root, ([platform, genres]) => ({
      //     name: platform,
      //     children: Array.from(genres, ([genre, value]) => ({
      //       name: genre,
      //       value: value,
      //     })),
      //   })),
      // };
      console.log(hierarchyData, "hierarchyData")

      // Create the root of the hierarchy
      const hierarchyRoot = d3
        .hierarchy({ name: "Platforms", children: hierarchyData })
        .sum((d) => d.value) // Compute the 'value' of each level
        .sort((a, b) => b.value - a.value); // Sort the nodes

      // // Create the root of the hierarchy
      // const hierarchyRoot = d3
      // .hierarchy(hierarchyData)
      // .sum((d) => d.value) // Compute the 'value' of each level
      // .sort((a, b) => b.value - a.value); // Sort the nodes

      const treemap = d3.treemap().size([width, height]).paddingInner(1);
      treemap(hierarchyRoot); // Apply the treemap layout

      setData(hierarchyRoot);

      //console.log(hierarchyRoot, "TreeMap Data");
    });
  }, []);

  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous SVG elements

      // //custom colorscale
      // const extendedSchemeSet2 = [
      //   "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", 
      //   "#e5c494", "#b3b3b3", // Original schemeSet2 colors
      //   "#f46d43", "#d53e4f", "#9e0142", "#5e4fa2", // Some colors from schemeSet3
      //   "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#fee08b", "#fdae61",
      //   "#f46d43", "#d53e4f", // Additional colors inspired by spectral schemes
      //   "#9e0142", "#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598",
      //   "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", // More pastel-like tones
      //   "#ffed6f", "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", // Light and distinct colors
      //   "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd",
      //   "#ccebc5", "#ffed6f", "#8dd3c7", "#ffffb3", "#bebada", // Repeating with variation
      //   "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"
      // ];

      //custom colors
      const customColorScale = [
        "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3",
        "#1f78b4", "#33a02c", "#e31a1c", "#ff7f00", "#6a3d9a", "#b15928", "#ffff99", "#b2df8a",
        "#fb9a99", "#fdbf6f", "#cab2d6", "#ffffb3", "#8dd3c7", "#bebada", "#fb8072", "#80b1d3",
        "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"
    ];
    

      // Create a color scale for platforms
      const colorScale = d3.scaleOrdinal(customColorScale);

      // Create groups for each node
      const nodes = svg
        .selectAll("g")
        .data(data.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("text-align", "center")
        .style("color", "white")
        .style("padding", "8px")
        .style("font", "12px sans-serif")
        .style("background", "black")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none"); // Tooltip should not interfere with other mouse events


      // Append rectangles to the node groups
      nodes
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => (d.depth === 1 ? colorScale(d.data.name) : "none"))
        .attr("stroke", "white")
        // Add mouseover event
        .on("mouseover", function(event, d) {
          tooltip.transition()
            .duration(200) // Transition for smooth appearance
            .style("opacity", 0.9); // Make tooltip visible
          tooltip.html(`Platform: ${d.data.name}<br>Global Sales: ${d.value}`) // Content of the tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function() {
          tooltip.transition()
            .duration(500) // Transition for smooth disappearance
            .style("opacity", 0); // Hide tooltip
        });

     // Append text to the node groups for platform names
     nodes
     .filter((d) => d.depth === 1) // Filter for platform nodes
     .append("text")
     .attr("x", (d) => (d.x1 - d.x0) / 2) // Position at the horizontal center of the rectangle
     .attr("y", (d) => (d.y1 - d.y0) / 2) // Position at the vertical center of the rectangle
     .attr("text-anchor", "middle") // Center the text horizontally
     .attr("alignment-baseline", "central") // Center the text vertically
     .text((d) => d.data.name) // Set the text to the platform name
     .attr("fill", "white") // Adjust the text color for visibility
     .attr("font-size", (d) => {
       // Calculate font size based on the rectangle's size
       const rectWidth = d.x1 - d.x0;
       const rectHeight = d.y1 - d.y0;
       const minDimension = Math.min(rectWidth, rectHeight);
       return Math.max(10, minDimension / 8) + "px"; // Modify as needed
     });
     
      // Append text to the node groups
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
        //.attr("font-size", '10px');
        .attr("font-size", (d, i, nodes) => {
          const parentNode = d3.select(nodes[i].parentNode.parentNode).datum();
          const rectWidth = parentNode.x1 - parentNode.x0;
          const rectHeight = parentNode.y1 - parentNode.y0;
          const minDimension = Math.min(rectWidth, rectHeight);
          return Math.max(4, minDimension / 15) + "px"; // Modify as needed
        });

        // // Append title to the SVG container
        // svg.append("text")
        // .attr("x", 4000 / 2) // Position at the center of the SVG
        // .attr("y", 20) // Position at the top, accounting for margin
        // .attr("text-anchor", "middle") // Center the text horizontally
        // .style("font-size", "20px") // Set font size
        // .text("Your Treemap Title") // Set the title text
        // .style("fill", "white")
    }
  }, [data]);

  return (
    <>
      <span style={{ fontFamily: "text-anchor, sans-serif", textDecoration: "underline" , fontSize: "20px"}}>Platform Power</span>
      <svg ref={svgRef} width={4000} height={500}></svg>
    </>
  );
};

export default TreeMap;
