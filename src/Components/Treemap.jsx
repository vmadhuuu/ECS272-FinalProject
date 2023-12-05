import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../App.css";

const TreeMap = () => {
  const [data, setData] = useState(null); // Change to null to signify no data initially
  const svgRef = useRef(null);
  const OFFSET = 3;

  // to handle mouseover
  const handleMouseOver = (d, element) => {
    // The 'd' parameter is the bound data object for the element being hovered.
    d3.select(element)
      .attr("stroke", "black") // Set the stroke to black on hover
      .attr("stroke-width", 3);
  };
  // to handle mouseout
  const handleMouseOut = (d, element) => {
    d3.select(element)
      .attr("stroke", d.depth === 1 ? "none" : "white") // Reset the stroke color
      .attr("stroke-width", 1); // Reset the stroke width
  };

  // to handle text adjustment
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
    const height = 600;

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

      //console.log(root, "root")

      // Transform rollupData into a hierarchical structure
      const hierarchyData = Array.from(root, ([platform, genres]) => ({
        name: platform,
        children: Array.from(genres, ([genre, value]) => ({
          name: genre,
          value: value,
        })),
      }));

      //console.log(hierarchyData, "hierarchyData");

      // Create the root of the hierarchy
      const hierarchyRoot = d3
        .hierarchy({ name: "Platforms", children: hierarchyData })
        .sum((d) => d.value) // Compute the 'value' of each level
        .sort((a, b) => b.value - a.value); // Sort the nodes

      //console.log(hierarchyRoot, "hierarchyRoot")

      // Apply the treemap layout
      const treemap = d3
        .treemap()
        .size([width, height])
        .paddingInner(6)
        .paddingOuter(10);
      treemap(hierarchyRoot);

      setData(hierarchyRoot);

      //console.log(hierarchyRoot, "TreeMap Data");
    });
  }, []);

  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current).attr("width", 2000);
      svg.selectAll("*").remove(); // Clear previous SVG elements

      //custom colors
      const customColorScale = [
        "#63768D", // slate grey
        "#8AC6D0", // nonphoto blue
        "#8da0cb", // vista blue
        "#C5D86D", // non photo blue
        "#E2A3C7", // light pink
        "#828489", // dark green
        "#e5c494", // sunset yellow
        "#F7A9A8", // silver
        "#9FB1BC", //cadet grey
        "#73AB84", // moss green
        "#C97D60", // bright red
        "#F2A541", // gamboge orange yellow
        "#B9C6AE", // purple
        "#CECECE", // silver
        "#ffff99", // mindaro yellow
        "#b2df8a", //pistachio green
        "#FF9B71", //salmon pink
        "#fdbf6f", // earth yellow
        "#cab2d6", //thistle
        "#ffffb3", // cream yellow
        "#8dd3c7", // tiffany blue
        "#bebada", // periwinkle purple
        "#2EC4B6", // light seagreen
        "#80b1d3", //carolina blue
        "#fdb462", //earth yellow
        "#b3de69", //yellow green
        "#fccde5", // fairytale
        "#d9d9d9", // platinum
        "#bc80bd", //african violet
        "#ccebc5", //tea green
        "#ffed6f", //maize
      ];

      // Create a color scale for platforms
      const colorScale = d3.scaleOrdinal(customColorScale);

      const treemapGroup = svg.append("g"); //append to treemap group instead of directly to svg

      // Create groups for each node and append to treemapGroup
      const nodes = treemapGroup
        .selectAll("g")
        .data(data.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      nodes.each(function (d) {
        const node = d3.select(this);

        if (d.depth === 2) {
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
        })
        .style("opacity", 0) // start with opacity 0
        .transition() // apply transition
        .duration(2000) // duration of fade-in in milliseconds
        .style("opacity", 1); // end with opacity 1

      // Now append the child rectangles
      nodes
        .filter((d) => !d.children)
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => colorScale(d.parent.data.name)) // Fill with color based on the parent node
        .on("mouseover", function (event, d) {
          // Capture the fill color of the current rectangle
          const rectColor = d3.select(this).style("fill");
          d3.select(this).classed("highlighted", true); // Add a class to the hovered rect
          if (d.depth === 1) {
            // Check if it's a parent node
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              true
            ); // Highlight all rects with the same ID
          }
          tooltip1
            .transition()
            .duration(500) // Transition for smooth appearance
            .style("opacity", 1); // Make tooltip visible

          tooltip1.style("background", rectColor);

          let tooltipContent = `Genre: ${d.data.name}`;
          if (d.value) {
            tooltipContent += `<br> Sales: ${format(d.value)}`;
          }
          tooltip1
            .html(tooltipContent)
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).classed("highlighted", false); // Remove the class from the rect
          if (d.depth === 1) {
            d3.selectAll("#rect-" + d.data.name).classed(
              "parent-highlighted",
              false
            ); // Remove highlighting from all rects with the same ID
          }
          tooltip1
            .transition()
            .duration(500) // Transition for smooth disappearance
            .style("opacity", 0); // Hide tooltip
        });

      var tooltip1 = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip1")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("text-align", "center")
        .style("color", "black")
        .style("padding", "8px")
        .style("font", "12px sans-serif")
        .style("background", "black")
        .style("border", "2px solid white")
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
          tooltip1
            .transition()
            .duration(500) // Transition for smooth appearance
            .style("opacity", 0.9); // Make tooltip visible

          tooltip1
            .html(
              `Platform: ${d.data.name}<br>Global Sales: ${format(d.value)}`
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function () {
          tooltip1
            .transition()
            .duration(500) // Transition for smooth disappearance
            .style("opacity", 0); // Hide tooltip
        })
        .style("opacity", 0) // start with opacity 0
        .transition() // apply transition
        .duration(2000) // duration of fade-in in milliseconds
        .style("opacity", 1); // end with opacity 1

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
        .call(adjustTextFontSize, 5)
        .style("opacity", 0) // start with opacity 0
        .transition() // apply transition
        .duration(2000) // duration of fade-in in milliseconds
        .style("opacity", 1); // end with opacity 1

      //zoom in and out
      // const zoom = d3
      //   .zoom()
      //   .scaleExtent([1, 5]) // Set the minimum and maximum scale
      //   .on("zoom", (event) => {
      //     treemapGroup.attr("transform", event.transform); // Apply the current zoom transform to the treemap group
      //   });

      // svg.call(zoom);

      // Define legend data based on colorScale domain
      const legendData = colorScale.domain().map((platform) => {
        return { name: platform, color: colorScale(platform) };
      });

      // Create a legend group
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(1250, ${height + 50})"); // Replace x, y with desired position

      const legendSpacing = 100;

      // Draw legend items
      const legendItem = legend
        .selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(1250, ${i * 20})`); // Adjust spacing

      // Draw rectangles for color
      legendItem
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d) => d.color);

      // Add text labels
      legendItem
        .append("text")
        .attr("x", 15) // Adjust the position
        .attr("y", 10)
        .text((d) => d.name)
        .style("fill", "white")
        .attr("font-size", "10px");
    }
  }, [data]);

  return (
    <>
      <div style={{ marginLeft: "38vw", marginTop: "0vh" }}>
        <svg ref={svgRef} width={4000} height={700}></svg>
      </div>
    </>
  );
};

export default TreeMap;
