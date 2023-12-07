import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const [data, setData] = useState([]);
  const [maxSalesValue, setMaxSalesValue] = useState(0);
  const [salesType, setSalesType] = useState("Global_Sales"); // State to track the selected sales type
  const svgRef = useRef(null);

  const processData = (loadedData, salesType) => {
    const genreSales = loadedData.reduce((acc, row) => {
      const genre = row.Genre;
      const sales = parseFloat(row[salesType]) || 0; // Use the selected sales type
      acc[genre] = (acc[genre] || 0) + sales; // Sum up the sales for this genre
      return acc;
    }, {});

    const sortedGenreSales = Object.entries(genreSales)
      .map(([genre, sales]) => ({
        genre,
        sales,
      }))
      .sort((a, b) => b.sales - a.sales);

    const maxSales =
      sortedGenreSales.length > 0
        ? d3.max(sortedGenreSales, (d) => d.sales)
        : 0;

    return { sortedGenreSales, maxSales };
  };

  const handleSalesTypeChange = (event) => {
    setSalesType(event.target.value);
  };

  useEffect(() => {
    d3.csv("../data/vgsales.csv").then((loadedData) => {
      const { sortedGenreSales, maxSales } = processData(loadedData, salesType);
      setData(sortedGenreSales);
      setMaxSalesValue(maxSales); // Store the max sales value in state
    });
  }, []);

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);
  //   d3.csv("../data/vgsales.csv").then((loadedData) => {
  //     // Group and sum the data by genre
  //     const processData = (loadedData, salesType) => {
  //       const genreSales = loadedData.reduce((acc, row) => {
  //         const genre = row.Genre;
  //         const sales = parseFloat(row[salesType]) || 0; // Use the selected sales type
  //         acc[genre] = (acc[genre] || 0) + sales; // Sum up the sales for this genre
  //         return acc;
  //       }, {});

  //       // Convert to array and sort by sales in descending order
  //       return Object.entries(genreSales)
  //         .map(([genre, sales]) => ({
  //           genre,
  //           sales,
  //         }))
  //         .sort((a, b) => b.sales - a.sales);
  //     };
  //     // Convert to array and sort by sales in descending order
  //     const sortedGenreSales = Object.entries(genreSales)
  //       .map(([genre, sales]) => ({
  //         genre,
  //         sales,
  //       }))
  //       .sort((a, b) => b.sales - a.sales);

  //     setData(sortedGenreSales); // Update state with the loaded data
  //   });
  // }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear the SVG

      // Group and sum the data by genre based on the selected sales type
      const genreSales = data.reduce((acc, row) => {
        const genre = row.Genre;
        const sales = parseFloat(row[salesType]) || 0; // Use the selected sales type
        acc[genre] = (acc[genre] || 0) + sales; // Sum up the sales for this genre
        return acc;
      }, {});
      // code for barchart using the loaded data
      // height is 800
      // width is 1200
      const svgWidth = 900; // Fixed SVG width
      const svgHeight = 600;
      const margin = { top: 40, right: 100, bottom: 60, left: 80 };
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      // Color scale
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

      // const colors22 = [
      //   "#8CB369", // olivine
      //   "#F4E285", // flax yellow
      //   "#F4A259", // sandy brown
      //   "#5B8E7D", // viridian
      //   "#875C74", //bittersweet shimmer red
      //   "#E3D0D8", // pale purple
      //   "#BCAC9B", // khakhi
      //   "#816E94", // light green
      //   "#E06C9F", //pink
      //   "#9CF6F6", // ice blue
      //   "#09BC8A", //mint green
      //   "#A599B5", //rose quartz
      // ];
      const colorScale = d3.scaleOrdinal(colors22);

      // Set up scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.genre))
        .rangeRound([0, width])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxSalesValue])
        .range([height, 0]);

      // Set up axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

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

      // Append group element and transform it to leave space for axes
      const plotArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Draw the bars
      const bars = plotArea
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.genre))
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
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

      // Apply the transition to grow the bars
      bars
        .transition()
        .duration(2000) // Duration of the animation in milliseconds
        .delay((d, i) => i * 100) // Delay for each bar to create a staggered appearance
        .attr("y", (d) => yScale(d.sales))
        .attr("height", (d) => height - yScale(d.sales))
        .on("end", function (d) {
          // After the transition completes
          // Append text for sales value
          d3.select(this.parentNode)
            .append("text")
            .attr("class", "bar-label")
            .attr("x", xScale(d.genre) + xScale.bandwidth() / 2)
            .attr("y", yScale(d.sales) - 5) // Position the text slightly above the top of the bar
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .style("font-size", "10px")
            .text(d.sales.toFixed(2)); // Display the sales value; adjust formatting as needed
        });

      // Append axes
      const xAxisGroup = plotArea
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      // Rotate the text of x-axis labels
      xAxisGroup
        .selectAll("text")
        .style("font-size", "12px")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".10em")
        .attr("transform", "rotate(-45)"); // Rotate labels by -45 degrees

      plotArea
        .append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .style("font-size", "15px");

      // Append title to the SVG

      // Legend
      const legendSpacing = 25;
      const legend = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(50,${i * legendSpacing})`);

      legend
        .append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", (d, i) => colorScale(i));

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .style("fill", "white")
        .text((d) => d.genre);

      //xaxis label
      xAxisGroup
        .append("text")
        .attr("class", "axis-label")
        .attr("font-size", 18)
        .attr("x", width / 2)
        .attr("y", margin.bottom + 25) // Adjust this value to position the label correctly
        .style("text-anchor", "middle")
        .style("fill", "white") // Adjust the color as needed
        .text("Genres"); // Replace with your actual label

      //y axis label
      plotArea
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em") // Adjust this value to position the label correctly
        .style("text-anchor", "middle")
        .style("fill", "white") // Adjust the color as needed
        .attr("font-size", 18)
        .text("Sales ($m)"); // Replace with your actual label
    }
  }, [data, maxSalesValue]);

  useEffect(() => {
    d3.csv("../data/vgsales.csv").then((loadedData) => {
      const { sortedGenreSales, maxSales } = processData(loadedData, salesType);
      setData(sortedGenreSales);
      setMaxSalesValue(maxSales); // Update the max sales value
    });
  }, [salesType]);

  return (
    <>
      <div style={{ marginLeft: "-10vw" }}>
        <label htmlFor="sales-type-select">Select:</label>
        <select
          id="sales-type-select"
          value={salesType}
          onChange={handleSalesTypeChange}
        >
          <option value="Global_Sales">Global Sales</option>
          <option value="NA_Sales">North America Sales</option>
          <option value="EU_Sales">Europe Sales</option>
          <option value="JP_Sales">Japan Sales</option>
          <option value="Other_Sales">Other Sales</option>
        </select>
      </div>
      <div style={{ marginLeft: "5vw" }}>
        <svg ref={svgRef} width={1200} height={640}></svg>
      </div>
    </>
  );
};

export default BarChart;
