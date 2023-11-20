import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";

function SankeyChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
      console.error("Sankey chart data is missing or in an incorrect format");
      return;
    }

    // Debugging logs
    console.log("Nodes:", data.nodes);
    console.log("Links:", data.links);

    const svg = d3.select(svgRef.current);
    const width = 1000; // Adjust width and height as needed
    const height = 600;
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
        nodes: data.nodes.map((d) => ({ ...d })),
        links: data.links.map((d) => ({ ...d, value: Math.max(d.value, 0) })),
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
    } catch (error) {
      console.error("Error in Sankey chart rendering:", error);
    }
  }, [data]);

  return (
    <div className="sankeyContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default SankeyChart;
