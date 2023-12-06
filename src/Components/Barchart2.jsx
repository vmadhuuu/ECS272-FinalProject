import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


function Barchart2() {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    d3.csv("../data/vgsales.csv").then((data) => {

      // Convert Global_Sales to number
      data.forEach(d => {
        d.Global_Sales = +d.Global_Sales;
        d.Year = +d.Year;
      });

      // Group by 'Year' and 'Genre' and sum 'Global_Sales'
      let salesSumByYearAndGenre = d3.rollups(data, 
        v => d3.sum(v, d => d.Global_Sales), // Summing function
        d => d.Year, 
        d => d.Genre
      ).map(([year, genres]) => {
        return genres.map(([genre, sum]) => ({
          Year: year,
          Genre: genre,
          Global_Sales: sum
        }));
      }).flat();

      // Determine the maximum 'Global_Sales' for each 'Year'
      let maxSalesByYear = d3.rollup(salesSumByYearAndGenre, 
        v => d3.max(v, d => d.Global_Sales), 
        d => d.Year
      );

      // Filter to retain only entries that match the max 'Global_Sales' for their year
      let maxSalesData = salesSumByYearAndGenre.filter(d => 
        maxSalesByYear.get(d.Year) === d.Global_Sales
      );

      // Ensure unique year-genre combinations
      maxSalesData = d3.rollups(maxSalesData, 
        v => v[0], // In case of ties, keep one record
        d => `${d.Year}-${d.Genre}`
      ).map(([key, value]) => value);

      // Step 4: Extract the 'Genre' of these entries
      let genresOfMaxSales = maxSalesData.map(d => d.Genre); //not needed??

      // Filter out entries with 'NaN' values in 'Year'
      maxSalesData = maxSalesData.filter(d => !isNaN(d.Year));
      
      // Sort in ascending order
      maxSalesData.sort((a, b) => a.Year - b.Year);

      maxSalesData = maxSalesData.filter(d => d.Year !== 2017 && d.Year !== 2020);


      // Now you can use genresOfMaxSales for your visualization or further processing
      console.log(maxSalesData, "maxSalesData");

      setData(maxSalesData);

    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Set the dimensions and margins of the graph
      const margin = { top: 100, right: 100, bottom: 70, left: 90 };
      const width = 1000 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Clear any previous SVG content
      d3.select(svgRef.current).selectAll("*").remove();

      // Create SVG element
      const svg = d3.select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Color scale
      const colors22 = [
        "#8CB369", // olivine
        "#F4E285", // flax yellow
        "#F4A259", // sandy brown
        "#5B8E7D", // viridian
        "#BC4B51", //bittersweet shimmer red
        "#E3D0D8", // pale purple
        "#BCAC9B", // khakhi
        "#D4EAC8", // light green
        "#C94277", //pink
        "#9CF6F6", // ice blue
        "#09BC8A", //mint green
        "#A599B5", //rose quartz
      ];
      const colorScale = d3.scaleOrdinal(colors22);

      // Define the filter
      var defs = svg.append("defs");

      var filter = defs.append("filter").attr("id", "glow");

      filter
        .append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "coloredBlur");

      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "coloredBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      // X axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Year))
        .padding(0.3);

      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis
      const y = d3.scaleLinear()
        .domain([0, 150])
        .range([height, 0]);

      svg.append("g")
        .call(d3.axisLeft(y));

      // Bars
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.Global_Sales))
        .attr("height", d => height - y(d.Global_Sales))
        .attr("fill", (d, i) => colorScale(i))
        .each(function (d) {
          // Store the original color
          d.originalColor = d3.select(this).attr("fill");
        })
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "blue") // Highlight color
            .attr("width", xScale.bandwidth() + 5)
            .attr("x", xScale(d.genre) - 2.5);
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", d.originalColor) // Restore original color
            .attr("width", xScale.bandwidth())
            .attr("x", xScale(d.genre));
        })
        .style("filter", "url(#glow)");

      // X axis label
      svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom / 2 + 20) // Adjust the position based on your bottom margin
      .style("font-size", "12px")
      .style("fill", "white")
      .text("Year");

      // Y axis label
      svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -(height / 2))
      .attr("y", -margin.left / 2 - 20) // Adjust the position based on your left margin
      .style("font-size", "12px")
      .style("fill", "white")
      .text("Global Sales");

      // Legend
      const legendSpacing = 20;
      const legend = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(90, ${i * legendSpacing - 30})`);

      legend
        .append("rect")
        .attr("x", width - 30)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => colorScale(i));

      legend
        .append("text")
        .attr("x", width - 40)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .style("fill", "white")
        .text((d) => d.Year);


      
      // // Add text labels for the Genre
      // svg.selectAll(".text-genre")
      //   .data(data)
      //   .enter()
      //   .append("text")
      //   .attr("class", "label-genre")
      //   // Subtract more from y position to move the text further above the bar
      //   .attr("y", d => y(d.Global_Sales) - 20) // Adjusted space for Genre
      //   // Center the text by setting the x position to the middle of the bar
      //   .attr("x", d => x(d.Year) + x.bandwidth() / 2)
      //   // Rotate the text by -90 degrees around the x, y position
      //   .attr("transform", d => `rotate(-90) translate(${-y(d.Global_Sales) - 10}, ${x(d.Year) + x.bandwidth() / 2})`)
      //   .attr("text-anchor", "end")
      //   .text(d => d.Genre)
      //   .style("font-size", "10px") // Set the font size
      //   .style("fill", "white"); // Set the text color

      // // Add text labels for the Global Sales
      // svg.selectAll(".text-sales")
      //   .data(data)
      //   .enter()
      //   .append("text")
      //   .attr("class", "label-sales")
      //   // Subtract even more from the y position to stack the text above the genre
      //   .attr("y", d => y(d.Global_Sales) - 35) // Adjusted space for Sales
      //   // Center the text by setting the x position to the middle of the bar
      //   .attr("x", d => x(d.Year) + x.bandwidth() / 2)
      //   // Rotate the text by -90 degrees around the x, y position
      //   .attr("transform", d => `rotate(-90, ${x(d.Year) + x.bandwidth() / 2}, ${y(d.Global_Sales)- 35})`)
      //   .attr("text-anchor", "end")
      //   .text(d => d.Global_Sales)
      //   .style("font-size", "10px") // Set the font size
      //   .style("fill", "white"); // Set the text color
    }
  }, [setData]);

  return (
    <div>
      <svg ref={svgRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
}

export default Barchart2;
