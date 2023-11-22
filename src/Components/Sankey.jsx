import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";

function SankeyChart() {
  const svgRef = useRef();
  const [sankeyData, setSankeyData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    d3.csv("../data/vgsalessample.csv").then((loadedData) => {
      //console.log(loadedData);
      const cleanedData = loadedData.filter((row) => {
        return !Object.values(row).some(
          (value) => value === null || value === ""
        );
      });

      //console.log(cleanedData);
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

        // Combine and deduplicate
        const combinedTop = [
          ...new Set([...topPublishers, ...topPlatforms, ...topGenres]),
        ];

        const nodes = combinedTop.map((name) => ({ name }));

        // Debugging: Check the nodes
        //console.log("Nodes:", nodes);

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
            const platformIndex = nodes.findIndex(
              (node) => node.name === platform
            );
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

        // Debugging: Check the links
        // console.log("Links:", links);

        return { nodes, links };
      }

      const processedData = processDataForSankey(cleanedData);
      // console.log(processedData);

      setSankeyData(processedData);
    });
  }, []);

  //console.log(sankeyData);

  if (!sankeyData || !sankeyData.nodes || !sankeyData.links) {
    console.error("Sankey chart data is missing or in an incorrect format");
    return;
  }

  //    Debugging logs
  // console.log("Nodes:", sankeyData.nodes);
  // console.log("Links:", sankeyData.links);

  const uniqueNodes = new Set(sankeyData.nodes.map((node) => node.name));
  if (uniqueNodes.size !== sankeyData.nodes.length) {
    console.error("Duplicate nodes detected");
    return;
  }

  // Check for invalid link indices
  const invalidLinks = sankeyData.links.filter(
    (link) =>
      link.source < 0 ||
      link.source >= sankeyData.nodes.length ||
      link.target < 0 ||
      link.target >= sankeyData.nodes.length
  );
  if (invalidLinks.length > 0) {
    console.error("Invalid links detected:", invalidLinks);
    return;
  }

  const svg = d3.select(svgRef.current);
  const width = 1000; // Adjust width and height as needed
  const height = 800;
  svg.attr("width", width).attr("height", height);

  try {
    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
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

    svg
      .append("g")
      .selectAll("rect")
      .data(graph.nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", sankeyGenerator.nodeWidth())
      .attr("fill", "blue"); // Modify as needed

    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", "grey") // Modify as needed
      .attr("stroke-width", (d) => Math.max(1, d.width));

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .selectAll("text")
      .data(graph.nodes)
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name);
  } catch (error) {
    console.error("Error in Sankey chart rendering:", error);
  }

  return (
    <div className="sankeyContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default SankeyChart;
