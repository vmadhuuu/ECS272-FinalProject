import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";

function SankeyChart() {
  const svgRef = useRef();
  const [sankeyData, setSankeyData] = useState([{ nodes: [], links: [] }]);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    d3.csv("../data/vgsales1020pt2.csv").then((loadedData) => {
      const cleanedData = loadedData.filter((row) => {
        return !Object.values(row).some(
          (value) => value === null || value === ""
        );
      });
      const processedData = processDataForSankey(cleanedData);
      setSankeyData(processedData);
    });
  }, []); // Empty dependency array ensures this runs only once

  //console.log(sankeyData);
  const highlightConnectedPaths = (node) => {
    if (activeNode !== node) {
      setActiveNode(node);
      d3.selectAll(".link")
        .transition()
        .duration(300)
        .style("stroke-opacity", (d) =>
          d.source === node || d.target === node ? 0.7 : 0.1
        );
      d3.selectAll(".node")
        .transition()
        .duration(300)
        .style("opacity", (d) => (d === node ? 1 : 0.2));
    } else {
      // Reset to normal styles if the active node is clicked again
      setActiveNode(null);
      d3.selectAll(".link")
        .transition()
        .duration(300)
        .style("stroke-opacity", 0.5); // Reset links opacity
      d3.selectAll(".node").transition().duration(300).style("opacity", 1); // Reset nodes opacity
    }
  };

  function processDataForSankey(data) {
    const extractTop = (data, key) => {
      let totals = data.reduce((acc, item) => {
        const name = item[key];
        const sales = parseFloat(item.Global_Sales || 0);
        acc[name] = (acc[name] || 0) + sales;
        return acc;
      }, {});

      return Object.entries(totals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map((item) => item[0]);
    };

    const topPublishers = extractTop(data, "Publisher");
    const topPlatforms = extractTop(data, "Platform");
    const topGenres = extractTop(data, "Genre");

    const combinedTop = [
      ...new Set([...topPublishers, ...topPlatforms, ...topGenres]),
    ];

    const nodes = combinedTop.map((name) => ({ name }));
    const links = [];

    data.forEach((item) => {
      const publisher = item.Publisher;
      const platform = item.Platform;
      const genre = item.Genre;
      const value = parseFloat(item.Global_Sales || 0);

      if (
        topPublishers.includes(publisher) &&
        topPlatforms.includes(platform) &&
        topGenres.includes(genre) &&
        value > 0
      ) {
        const publisherIndex = nodes.findIndex(
          (node) => node.name === publisher
        );
        const platformIndex = nodes.findIndex((node) => node.name === platform);
        const genreIndex = nodes.findIndex((node) => node.name === genre);

        if (publisherIndex !== -1 && platformIndex !== -1) {
          links.push({
            source: publisherIndex,
            target: platformIndex,
            value,
          });
        }
        if (platformIndex !== -1 && genreIndex !== -1) {
          links.push({ source: platformIndex, target: genreIndex, value });
        }
      }
    });

    return { nodes, links };
  }

  // Define tooltip (outside of your component's return, but inside the component function)
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("padding", "10px")
    .style("background", "rgba(0, 0, 0, 0.6)")
    .style("border-radius", "4px")
    .style("color", "#fff")
    .style("pointer-events", "none"); // Ensure mouse events pass through

  useEffect(() => {
    if (!sankeyData || !sankeyData.nodes || !sankeyData.links) return;

    const margin = { top: 30, right: 50, bottom: 30, left: 60 };
    const legendWidth = 200; // Space allocated for the legend
    const totalWidth = 1500; // Total SVG width
    const width = totalWidth - margin.left - margin.right - legendWidth; // Width for the Sankey chart
    const height = 700;

    const svg = d3
      .select(svgRef.current)
      .attr("width", totalWidth)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.attr("width", width).attr("height", height);

    svg.selectAll("*").remove();

    const colors22 = [
      "#66c2a5", // sage green
      "#fc8d62", // light orange
      "#8da0cb", // pale lavender blue
      "#e78ac3", // baby pink
      "#a6d854", // lime green
      "#ffd92f", // little dark yellow
      "#e5c494", // pale orange yellow
      "#b3b3b3", // greyish white
      "#7E57C2", // light purple
      "#00A4B4", // turquoise
      "#29B6F6", // light blue
      "#9E0031", // bright red
      "#E8B4BC", // orchid pink
      "#053C5E", // indigo dye
      "#BBDBB4", // celadon green
      "#424874", // greyish orange //
      "#AA1155", // amaranth pink
      "#D56D6D", // pinkish red
      "#F05822", // bright orange
      "#034732", // british green
      "#BA68C8", // french mauve
      "#C3C9E9", // periwinkle
      // 23
      "#B57F50", //copper
      "#7D80DA", // indigo
      "#FF9770", // tangerine
      "#DD9296", // puce
      "#D3FAD6", //tea green
      "#E1BC29", //saffron
      "#09BC8A", //mint green
      "#A599B5", //rose quartz
    ];

    const color = d3.scaleOrdinal(colors22);

    const sankeyGenerator = sankey()
      .nodeWidth(24) // Increased from 15 to 20
      .nodePadding(10) // Increased from 10 to 20
      .extent([
        [1, 1],
        [width - 1, height - 5],
      ])
      .nodeAlign(sankeyJustify);

    const graph = sankeyGenerator({
      nodes: sankeyData.nodes.map((d) => ({ ...d })),
      links: sankeyData.links.map((d) => ({
        ...d,
        value: Math.max(d.value, 0),
      })),
    });

    const node = svg
      .append("g")
      .selectAll("rect")
      .data(graph.nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", sankeyGenerator.nodeWidth())
      .attr("fill", (d) => color(d.name))
      .attr("class", "node");

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.2)
      .selectAll("path")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d) => color(d.source.name))
      .attr("stroke-width", (d) => Math.max(1, d.width));

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("fill", "#fff")
      .selectAll("text")
      .data(graph.nodes)
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 + 5 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2 + 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name);

    // node titles
    svg
      .append("text")
      .attr("x", -15) // Adjust position as needed
      .attr("y", -5) // Adjust position as needed
      .text("Publishers") // Replace with dynamic labels as needed
      .style("font-size", "15px") // Adjust styling as needed
      .attr("fill", "white");

    svg
      .append("text")
      .attr("x", 560) // Adjust position as needed
      .attr("y", -5) // Adjust position as needed
      .text("Platforms") // Replace with dynamic labels as needed
      .style("font-size", "15px") // Adjust styling as needed
      .attr("fill", "white");

    svg
      .append("text")
      .attr("x", 1150) // Adjust position as needed
      .attr("y", -5) // Adjust position as needed
      .text("Genres") // Replace with dynamic labels as needed
      .style("font-size", "15px") // Adjust styling as needed
      .attr("fill", "white");

    svg.selectAll(".node").on("click", (event, d) => {
      highlightConnectedPaths(d);

      // Nodes hover interaction
      node
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`Name: ${d.name}<br>Sales: ${d.value}`) // Replace with your desired content
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });

    const colorToNameMapping = {};
    graph.nodes.forEach((node) => {
      colorToNameMapping[color(node.name)] = node.name;
    });

    const legend = svg.append("g").attr("transform", "translate(1250,50)"); // Adjust position as needed

    colors22.forEach((color, index) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(0, ${index * 20})`);

      legendItem
        .append("rect")
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", color);

      legendItem
        .append("text")
        .attr("x", 20)
        .attr("y", 8)
        .attr("dy", ".35em")
        .text(colorToNameMapping[color]) // Display node name instead of color code
        .style("font-size", "10px") // Reduced font size
        .style("text-anchor", "start")
        .style("fill", "white");
    });
  }, [sankeyData]);

  useEffect(() => {
    // Update styles without redrawing the entire chart
    const svg = d3.select(svgRef.current);

    // Select all links and transition their styles
    svg
      .selectAll(".link")
      .transition()
      .duration(300)
      .style(
        "stroke-opacity",
        (d) =>
          activeNode && (d.source === activeNode || d.target === activeNode)
            ? 0.7
            : 0.01 // Opacity for non-active links
      );

    // Select all nodes and transition their styles
    svg
      .selectAll(".node")
      .transition()
      .duration(300)
      .style("opacity", (d) => (activeNode && d === activeNode ? 1 : 0.6)); // Opacity for non-active nodes
  }, [activeNode]);

  return (
    <div className="sankeyContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default SankeyChart;
