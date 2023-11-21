import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";

function SankeyChart({ data }) {
  const svgRef = useRef();
  const [activeNode, setActiveNode] = useState(null);

  //   const highlightConnectedPaths = (node) => {
  //     const isActive = node !== activeNode;
  //     setActiveNode(isActive ? node : null);

  //     d3.selectAll(".link")
  //       .transition()
  //       .duration(300)
  //       .style("stroke-opacity", (d) => {
  //         return isActive && (d.source === node || d.target === node)
  //           ? 0.7
  //           : 0.05;
  //       })
  //       .style("stroke", (d) => {
  //         return isActive && (d.source === node || d.target === node)
  //           ? "orange"
  //           : "grey";
  //       });
  //   };

  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
      console.error("Sankey chart data is missing or in an incorrect format");
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = 1000; // Adjust width and height as needed
    const height = 800;
    svg.attr("width", width).attr("height", height);

    svg.selectAll("*").remove(); // Clear any previous SVG content

    // color gradient
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const defs = svg.append("defs");

    data.links.forEach((link, i) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", "link-gradient-" + i)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", link.source.x0)
        .attr("y1", (link.source.y0 + link.source.y1) / 2)
        .attr("x2", link.target.x0)
        .attr("y2", (link.target.y0 + link.target.y1) / 2);

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(link.source.name));

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(link.target.name));
    });

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
        nodes: data.nodes.map((d) => ({ ...d })),
        links: data.links.map((d) => ({ ...d, value: Math.max(d.value, 0) })),
      });

      // Nodes
      const node = svg
        .append("g")
        .selectAll("rect")
        .data(graph.nodes)
        .enter()
        .append("rect")
        .attr("class", "node")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", sankeyGenerator.nodeWidth())
        .attr("fill", (d) => color(d.name))
        .on("click", (event, d) => highlightConnectedPaths(d));

      // Links
      const link = svg
        .append("g")
        .attr("fill", "none")
        .selectAll("path")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link") // Ensure this class matches the selector used in highlightConnectedPaths
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", (d, i) => `url(#link-gradient-${i})`) // Use template literals for correct string formation
        .attr("stroke-width", (d) => Math.max(1, d.width));

      // Text Labels
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
  }, [data, activeNode]);

  return (
    <div className="sankeyContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default SankeyChart;
