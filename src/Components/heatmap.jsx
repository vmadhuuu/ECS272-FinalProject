import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function aggregateData(loadedData) {
  // Create a map to hold aggregated sales data
  const genreRegionSalesMap = new Map();

  // Iterate over each data record
  loadedData.forEach((d) => {
    const genres = [
      "Action",
      "Adventure",
      "Fighting",
      "Misc",
      "Platform",
      "Puzzle",
      "Racing",
      "Role-Playing",
      "Shooter",
      "Simulation",
      "Sports",
      "Strategy",
    ];

    genres.forEach((genre) => {
      ["NA_Sales", "EU_Sales", "JP_Sales"].forEach((region) => {
        if (d.Genre === genre) {
          const key = `${genre}#${region}`;
          // Initialize if the key doesn't exist
          if (!genreRegionSalesMap.has(key)) {
            genreRegionSalesMap.set(key, 0);
          }
          // Parse the sales as a float and add it to the current total
          genreRegionSalesMap.set(
            key,
            genreRegionSalesMap.get(key) + parseFloat(d[region] || 0)
          );
        }
      });
    });
  });

  // Convert the map to an array of objects for D3
  const aggregatedData = [];
  genreRegionSalesMap.forEach((value, key) => {
    const [genre, region] = key.split("#");
    aggregatedData.push({
      Genre: genre,
      Region: region,
      Sales: value,
    });
  });

  return aggregatedData;
}

const HeatMap = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);
  //console.log(data, "data");

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    d3.csv("../data/vgsales.csv").then((loadedData) => {
      const salesData = aggregateData(loadedData);
      setData(salesData); // Update state with the loaded data
      //console.log(salesData, "heatmap data");
      // code for heatmap
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      //const svg = d3.select(svgRef.current);
      //svg.selectAll("*").remove(); // Clear the SVG

      const margin = { top: 30, right: 130, bottom: 80, left: 160 };
      const svgWidth = 800;
      const svgHeight = 650;
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom - 20;

      //adding a tooltip
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

      // Create the SVG container
      const svg = d3
        .select(svgRef.current)
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Define the scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.Region))
        .range([0, width]);
      //.padding(0.05);

      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.Genre))
        .range([height, 0]);
      //.padding(0.05);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([0, d3.max(data, (d) => d.Sales)]);

      // Add the X-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("font-size", "13px")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add the Y-axis
      svg.append("g").call(d3.axisLeft(yScale)).style("font-size", "13px");

      // Draw the rectangles
      const rect = svg
        .selectAll()
        .data(data, function (d) {
          return d.Genre + ":" + d.Region;
        })
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.Region))
        .attr("y", (d) => yScale(d.Genre))
        .attr("width", 0)
        .attr("height", 0)
        .style("fill", (d) => colorScale(d.Sales))
        .on("mouseover", function (event, d) {
          d3.select(this)
            .style("stroke", "black") // Add a stroke to highlight
            .style("stroke-width", 4); // Increase stroke width
          tooltip.transition().duration(200).style("opacity", 2);
          tooltip
            .html(
              "Sales: " +
                d.Sales +
                "<br/>Region: " +
                d.Region +
                "<br/>Genre: " +
                d.Genre
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .style("stroke", null) // Remove stroke
            .style("stroke-width", 0); // Reset stroke width
          tooltip.transition().duration(500).style("opacity", 0);
        });

      rect
        .transition()
        .duration(30000) // Duration of the animation in milliseconds
        .attr("width", xScale.bandwidth()) // Animate to final width
        .attr("height", yScale.bandwidth()) // Animate to final height
        .end() // This waits for the transition to complete
        .then(() => {
          texts
            .transition()
            .duration(500) // Control the speed of text appearance
            .style("opacity", 1); // Make the text visible
        });

      // Define a helper function to calculate luminance of an RGB color
      function calculateLuminance(color) {
        const rgb = d3.rgb(color);
        const luminance =
          0.2126 * Math.pow(rgb.r / 255, 2.2) +
          0.7152 * Math.pow(rgb.g / 255, 2.2) +
          0.0722 * Math.pow(rgb.b / 255, 2.2);
        return luminance;
      }

      // Draw the text on each cell
      const texts = svg
        .selectAll()
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.Sales.toFixed(2)) // Assuming you want to display the sales value
        .attr("x", (d) => xScale(d.Region) + xScale.bandwidth() / 2) // Center the text in the cell
        .attr("y", (d) => yScale(d.Genre) + yScale.bandwidth() / 2) // Center the text in the cell
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("alignment-baseline", "central") // Center the text vertically
        .style("fill", (d) => {
          // Use the helper function to calculate luminance
          const luminance = calculateLuminance(colorScale(d.Sales));
          return luminance > 0.179 ? "black" : "white";
        })
        .style("font-size", "12px") // Adjust the font size as needed
        .style("opacity", 0);

      // Define legend dimensions and position
      const legendWidth = 30;
      const legendHeight = height + 5;
      const legendPosition = svgWidth - margin.right - legendWidth - 80;

      // Append legend container
      const legend = svg
        .append("g")
        .attr("transform", `translate(${legendPosition},${0})`);

      // Define a linear gradient for the legend
      const linearGradient = legend
        .append("defs")
        .append("linearGradient")
        .attr("id", "linear-gradient")
        .attr("gradientUnits", "userSpaceOnUse") // Use the exact coordinates for gradient
        .attr("x1", 0)
        .attr("y1", legendHeight)
        .attr("x2", 0)
        .attr("y2", 0);

      // Define the gradient colors
      linearGradient
        .selectAll("stop")
        .data(
          colorScale.ticks().map((t, i, n) => ({
            offset: `${(100 * i) / n.length}%`,
            color: colorScale(t),
          }))
        )
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color);

      // Append the color scale rect
      legend
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)");

      // Adjust the domain of the legend axis scale
      const legendAxisScale = d3
        .scaleLinear()
        .domain([0, 1000]) // Use extent to get min and max
        .range([legendHeight, 0]);

      // Append the legend axis with the inverted scale
      const legendAxis = d3
        .axisRight(legendAxisScale)
        .tickSize(0)
        .tickValues(legendAxisScale.ticks(8).concat(legendAxisScale.domain())) // Adjust the number of ticks as needed
        .tickFormat((d) => d.toFixed(0)); // Format the tick labels as needed

      legend
        .append("g")
        .attr("class", "legend-axis")
        .attr("transform", `translate(0, 0)`)
        .call(legendAxis);

      // Optionally, you can add extra text labels at specific points
      const legendValues = [0, 500, 1000];
      legend
        .selectAll("text")
        .data(legendValues)
        .enter()
        .append("text")
        .attr("class", "legend-text")
        .attr("x", legendWidth + 5) // Offset from the right edge of the legend
        .attr("y", (d) => legendAxisScale(d)) // Use the legend scale to position
        .attr("dy", "0.32em") // Vertically center text
        .text((d) => d3.format(".2s")(d)); // Format the label

      //text to scale
      legend
        .selectAll(".legend-axis text")
        .style("fill", "white")
        .style("font-size", "8px");

      // // Append title to the SVG
      // svg
      //   .append("text")
      //   .attr("class", "heatmap-title") // Class for styling
      //   .attr("x", width / 2) // Position at half the width of the heatmap
      //   .attr("y", 0 - margin.top / 2) // Position above the heatmap by half the top margin
      //   .attr("text-anchor", "middle")
      //   .style("font-size", "20px")
      //   .style("text-decoration", "underline")
      //   .style("fill", "white")
      //   .text("Genre Popularity by Region");

      //zooming and panning
      const zoom = d3
        .zoom()
        .scaleExtent([1, 5]) // Limit the scale to 1x - 5x
        .translateExtent([
          [0, 0],
          [width, height],
        ]) // Limit the pan to the size of the heatmap
        .on("zoom", (event) => {
          svg.attr("transform", event.transform);
        });
      svg.call(zoom);

      // Add X-axis label
      svg
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2 + 20)
        .attr("y", height + margin.bottom) // Adjust the position as needed
        .style("text-anchor", "middle")
        .style("font-size", "18px") // Adjust font size as needed
        .style("fill", "white")
        .text("Regional Sales ($m)"); // Replace with your label text

      // Add Y-axis label
      svg
        .append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)") // Rotate the text for vertical alignment
        .attr("y", 0 - margin.left + 50) // Adjust the position as needed
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "18px") // Adjust font size as needed
        .style("fill", "white")
        .text("Genres"); // Replace with your label text
    }
  }, [data]);

  return (
    <>
      <div className="heatmap-container" style={{ marginLeft: "-10vw" }}>
        <svg ref={svgRef} width={600} height={900}></svg>
      </div>
    </>
  );
};

export default HeatMap;
