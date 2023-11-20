import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft } from "d3-sankey";

function SankeyChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
      console.error("Sankey chart data is missing or in an incorrect format");
      return;
    }

    // Debugging logs
    console.log("Sankey Data - Nodes:", data.nodes);
    console.log("Sankey Data - Links:", data.links);

    const svgElement = ref.current;
    const svgWidth = 780;
    const svgHeight = 350;
    const svg = d3.select(svgElement);

    svg.selectAll("*").remove();
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .nodeAlign(sankeyLeft)
      .extent([
        [1, 1],
        [svgWidth - 1, svgHeight - 5],
      ]);

    let graph;
    try {
      graph = sankeyGenerator({
        nodes: data.nodes.map((d) => ({ ...d })),
        links: data.links.map((d) => ({ ...d })),
      });
    } catch (error) {
      console.error("Error generating Sankey diagram:", error);
      return;
    }

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d) => color(d.source.name))
      .attr("stroke-width", (d) => Math.max(1, d.width));

    const node = svg
      .append("g")
      .attr("stroke", "#000")
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
  }, [data]);

  return (
    <div className="sankeyContainer">
      <p
        style={{
          color: "#ACACAC",
          fontSize: 18,
          fontFamily: "serif",
          marginBottom: 3,
        }}
      >
        Preferred Platforms to Preferred Genres
      </p>
      {/* <svg ref={ref} width={850} height={350}></svg> */}
    </div>
  );
}

export default SankeyChart;
