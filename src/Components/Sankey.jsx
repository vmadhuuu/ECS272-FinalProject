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

  useEffect(() => {
    if (!sankeyData || !sankeyData.nodes || !sankeyData.links) return;

    const svg = d3.select(svgRef.current);
    const width = 1000;
    const height = 500;
    svg.attr("width", width).attr("height", height);

    svg.selectAll("*").remove();

    const colors22 = [
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f",
      "#e5c494",
      "#b3b3b3",
      "#7E57C2",
      "#00A4B4",
      "#29B6F6",
      "#9E0031",
      "#5C6BC0",
      "#AF97B4",
      "#D4E157",
      "#8D6E63",
      "#e789c3",
      "#D56D6D",
      "#F05822",
      "#FFA6C9",
      "#BA68C8",
      "#FF7043",
    ];

    const color = d3.scaleOrdinal(colors22);

    const sankeyGenerator = sankey()
      .nodeWidth(20) // Increased from 15 to 20
      .nodePadding(20) // Increased from 10 to 20
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
      .attr("font-size", 10)
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

    svg.selectAll(".node").on("click", (event, d) => {
      highlightConnectedPaths(d);
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
