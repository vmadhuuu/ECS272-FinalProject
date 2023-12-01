import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../App.css";

const TreeMap = () => {
  const [data, setData] = useState(null); // Change to null to signify no data initially
  const svgRef = useRef(null);
  const OFFSET = 3;

  // Function to handle mouseover
  const handleMouseOver = (d, element) => {
    // The 'd' parameter is the bound data object for the element being hovered.
    d3.select(element)
      .attr("stroke", "black") // Set the stroke to black on hover
      .attr("stroke-width", 3);
  };
  // Function to handle mouseout
  const handleMouseOut = (d, element) => {
    // The 'd' parameter is the bound data object for the element being hovered.
    d3.select(element)
      .attr("stroke", d.depth === 1 ? "none" : "white") // Reset the stroke color
      .attr("stroke-width", 1); // Reset the stroke width
    // Hide the tooltip code could go here
  };

  function adjustTextFontSize(selection, padding) {
    selection.each(function (d) {
      const self = d3.select(this);
      let fontSize = parseInt(self.style("font-size"));
      const rectWidth = d.x1 - d.x0 - padding * 2; // Calculate the available width in the rectangle

      // While the text's width is greater than the space available, reduce the font size
      while (self.node().getComputedTextLength() > rectWidth && fontSize > 0) {
        fontSize -= 1; // Decrease the font size by 1
        self.style("font-size", `${fontSize}px`); // Set the new font size
      }
    });
  }

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

      console.log(hierarchyData, "hierarchyData");

      // Create the root of the hierarchy
      const hierarchyRoot = d3
        .hierarchy({ name: "Platforms", children: hierarchyData })
        .sum((d) => d.value) // Compute the 'value' of each level
        .sort((a, b) => b.value - a.value); // Sort the nodes

      const treemap = d3
        .treemap()
        .size([width, height])
        .paddingInner(6)
        .paddingOuter(10);
      treemap(hierarchyRoot); // Apply the treemap layout

      setData(hierarchyRoot);

      //console.log(hierarchyRoot, "TreeMap Data");
    });
  }, []);

  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous SVG elements

      //custom colors
      const customColorScale = [
        "#66c2a5",
        "#fc8d62",
        "#8da0cb",
        "#e78ac3",
        "#a6d854",
        "#ffd92f",
        "#e5c494",
        "#b3b3b3",
        "#1f78b4",
        "#33a02c",
        "#e31a1c",
        "#ff7f00",
        "#6a3d9a",
        "#b15928",
        "#ffff99",
        "#b2df8a",
        "#fb9a99",
        "#fdbf6f",
        "#cab2d6",
        "#ffffb3",
        "#8dd3c7",
        "#bebada",
        "#fb8072",
        "#80b1d3",
        "#fdb462",
        "#b3de69",
        "#fccde5",
        "#d9d9d9",
        "#bc80bd",
        "#ccebc5",
        "#ffed6f",
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

      nodes.each(function (d) {
        const node = d3.select(this);

        if (d.depth === 2) {
          // Replace 2 with the correct depth of your small boxes
          const nodeGroup = d3.select(this);

          // Move the group down by OFFSET
          nodeGroup.attr("transform", `translate(${d.x0},${d.y0 + OFFSET})`);

          // Select and move the rectangle down by OFFSET
          nodeGroup.select("rect").attr("y", (d) => d.y0 + OFFSET); // Update this only if needed

          // If you have text or other elements inside that need to be moved down as well:
          nodeGroup
            .select("text")
            .attr(
              "y",
              (d) => /* your calculation for text's y position */ +OFFSET
            );
        }
      });

      nodes
        .filter((d) => d.children)
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", "none") // Make these transparent or set a background color
        .attr("stroke", "black") // Set the color of the border for the group
        .attr("stroke-width", 3) // Adjust the stroke width as needed
        .on("mouseover", function (event, d) {
          d3.select(this).classed("highlighted", true); // Add a class to the hovered rect
          if (d.depth === 1) {
            // Check if it's a parent node
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              true
            ); // Highlight all rects with the same ID
          }
        })
        .on("mouseout", function (event, d) {
          d3.select(this).classed("highlighted", false); // Remove the class from the rect
          if (d.depth === 1) {
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              false
            ); // Remove highlighting from all rects with the same ID
          }
        });

      // Now append the child rectangles
      nodes
        .filter((d) => !d.children)
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => colorScale(d.parent.data.name)) // Fill with color based on the parent node
        .on("mouseover", function (event, d) {
          d3.select(this).classed("highlighted", true); // Add a class to the hovered rect
          if (d.depth === 1) {
            // Check if it's a parent node
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              true
            ); // Highlight all rects with the same ID
          }
        })
        .on("mouseout", function (event, d) {
          d3.select(this).classed("highlighted", false); // Remove the class from the rect
          if (d.depth === 1) {
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              false
            ); // Remove highlighting from all rects with the same ID
          }
        });

      var tooltip = d3
        .select("body")
        .append("div")
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
      const format = d3.format(".2f");
      nodes
        .append("rect")
        .attr("id", (d) => "rect-" + d.data.name)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => (d.depth === 1 ? colorScale(d.data.name) : "none"))
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        // Add mouseover event
        .on("mouseover", function (event, d) {
          tooltip
            .transition()
            .duration(200) // Transition for smooth appearance
            .style("opacity", 0.9); // Make tooltip visible

          tooltip
            .html(
              `Platform: ${d.data.name}<br>Global Sales: ${format(d.value)}`
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function () {
          tooltip
            .transition()
            .duration(500) // Transition for smooth disappearance
            .style("opacity", 0); // Hide tooltip
        });

      nodes
        .filter((d) => d.depth === 1)
        .append("text")
        .attr("x", 5) // Adjust for padding
        .attr("y", (d) => d.y0 + OFFSET + 10) // Adjust for padding and OFFSET
        .text((d) => d.data.name)
        .attr("y", 3) // A small top padding from the edge of the parent box
        .attr("dominant-baseline", "hanging") // This ensures the text hangs from the top y position
        .attr("text-anchor", "start") // This ensures text starts at the given x position
        .attr("fill", "black")
        .attr("font-size", "6px") // Adjust font size as needed
        .style("pointer-events", "none")
        .call(adjustTextFontSize, 5);
      nodes
        .filter((d) => d.depth === 2)
        .append("text")
        .attr("x", 5) // Adjust for padding
        .attr("y", (d) => d.y0 + OFFSET + 10) // Adjust for padding and OFFSET
        .text((d) => d.data.name)
        .attr("y", 3) // A small top padding from the edge of the parent box
        .attr("dominant-baseline", "hanging") // This ensures the text hangs from the top y position
        .attr("text-anchor", "start") // This ensures text starts at the given x position
        .attr("fill", "black")
        .attr("font-size", "6px") // Adjust font size as needed
        .style("pointer-events", "none")
        .call(adjustTextFontSize, 5);
    }
  }, [data]);

  return (
    <>
      <span
        style={{
          fontFamily: "text-anchor, sans-serif",
          textDecoration: "underline",
          fontSize: "20px",
        }}
      >
        Platform Power
      </span>
      <svg ref={svgRef} width={4200} height={1000}></svg>
    </>
  );
};

export default TreeMap;
