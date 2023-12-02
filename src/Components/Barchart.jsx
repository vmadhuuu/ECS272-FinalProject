import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    d3.csv("../data/vgsales.csv").then(loadedData => {
     // Group and sum the data by genre
     const genreSales = loadedData.reduce((acc, row) => {
      const genre = row.Genre;
      const sales = parseFloat(row.Global_Sales) || 0; // Parse the Global Sales as a number
      acc[genre] = (acc[genre] || 0) + sales; // Sum up the sales for this genre
      return acc;
    }, {});

    // Convert to array and sort by sales in descending order
    const sortedGenreSales = Object.entries(genreSales).map(([genre, sales]) => ({
      genre,
      sales
    })).sort((a, b) => b.sales - a.sales);

    setData(sortedGenreSales);  // Update state with the loaded data
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear the SVG
      // code for barchart using the loaded data
      const svgWidth = svg.node().getBoundingClientRect().width;
      const svgHeight = svg.node().getBoundingClientRect().height;
      const margin = { top: 40, right: 30, bottom: 60, left: 50 };
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;
      
      // Color scale
      const colorScale = d3.scaleOrdinal(d3.schemeSet2);
      // Set up scales
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.genre))
        .rangeRound([0, width])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, 1800])
        .range([height, 0]);

      // Set up axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Define the filter
      var defs = svg.append("defs");

      var filter = defs.append("filter")
          .attr("id", "glow");

      filter.append("feGaussianBlur")
          .attr("stdDeviation", "3.5")
          .attr("result", "coloredBlur");

      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
          .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
          .attr("in", "SourceGraphic");

      // Append group element and transform it to leave space for axes
      const plotArea = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Draw the bars
      const bars = plotArea.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.genre))
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", (d, i) => colorScale(i))
        .each(function(d) { // Store the original color
          d.originalColor = d3.select(this).attr("fill");
      })
      .on("mouseover", function (event, d) {
          d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "blue")  // Highlight color
              .attr("width", xScale.bandwidth() + 5)
              .attr("x", xScale(d.genre) - 2.5);
      })
      .on("mouseout", function (event, d) {
          d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", d.originalColor)  // Restore original color
              .attr("width", xScale.bandwidth())
              .attr("x", xScale(d.genre));
      })
      .style("filter", "url(#glow)");

      // Apply the transition to grow the bars
      bars.transition()
      .duration(2000) // Duration of the animation in milliseconds
      .delay((d, i) => i * 100)  // Delay for each bar to create a staggered appearance
      .attr("y", d => yScale(d.sales))
      .attr("height", d => height - yScale(d.sales))
      .on("end", function(d) { // After the transition completes
        // Append text for sales value
        d3.select(this.parentNode).append("text")
          .attr("class", "bar-label")
          .attr("x", xScale(d.genre) + xScale.bandwidth() / 2)
          .attr("y", yScale(d.sales) - 5) // Position the text slightly above the top of the bar
          .attr("text-anchor", "middle")
          .style("fill", "white")
          .style("font-size", "10px")
          .text(d.sales.toFixed(2)); // Display the sales value; adjust formatting as needed
      });

      // Append axes
      const xAxisGroup = plotArea.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

      // Rotate the text of x-axis labels
      xAxisGroup.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)"); // Rotate labels by -45 degrees

      plotArea.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
      
      // Append title to the SVG
      svg.append("text")
      .attr("x", (svgWidth / 2))             
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")  
      .style("font-size", "20px") 
      .style("text-decoration", "underline")
      .style("fill", "white")  
      .text("Genre Dominance");

    // Legend
    const legendSpacing = 25;
    const legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", (d, i) => `translate(50,${i * legendSpacing})`);

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", (d, i) => colorScale(i));

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("fill", "white")
      .text(d => d.genre);
    
    //xaxis label
    xAxisGroup.append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10) // Adjust this value to position the label correctly
      .style("text-anchor", "middle")
      .style("fill", "white") // Adjust the color as needed
      .text("Genres"); // Replace with your actual label

    //y axis label
    plotArea.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em") // Adjust this value to position the label correctly
      .style("text-anchor", "middle")
      .style("fill", "white") // Adjust the color as needed
      .style("font-size", "10px")
      .text("Gobal Sales in Miliions"); // Replace with your actual label
    
    }
  }, [data]);

  return (
    <>
       
      <svg ref={svgRef} width={600} height={500}></svg>
    </>
  );
};

export default BarChart;
