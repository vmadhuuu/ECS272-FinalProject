import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TreeMap = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    d3.csv("../data/vgsales.csv").then(loadedData => {
        loadedData.forEach(d => {
            d.Global_Sales = +d.Global_Sales; // Convert to numeric value
          });
        
        // Aggregate the data by platform and genre
        const root = d3.rollup(loadedData, 
            v => d3.sum(v, leaf => leaf.Global_Sales), // summing up the global sales
            d => d.Platform, // first level of the hierarchy
            d => d.Genre // second level of the hierarchy
        );

        // Transform rollupData into a hierarchical structure
        const hierarchyData = Array.from(root, ([platform, genres]) => ({
            name: platform,
            children: Array.from(genres, ([genre, value]) => ({
                name: genre,
                value: value
            }))
        }));

        // console.log(hierarchyData, "hierarchyData")

        // Create the root of the hierarchy
        const hierarchyRoot = d3.hierarchy({name: 'Platforms', children: hierarchyData})
            .sum(d => d.value) // Compute the 'value' of each level
            .sort((a, b) => b.value - a.value); // Sort the nodes

        // // Convert the Map returned by d3.rollup into a structure suitable for d3.hierarchy
        // const hierarchyRoot = d3.hierarchy(Array.from(root), ([key, value]) => value.size ? Array.from(value) : null)
        // .sum(([key, value]) => value) // specifying how to compute the 'value' of each level
        // .sort((a, b) => b.value - a.value); // sort the nodes

        console.log(hierarchyRoot, "TreeMap Data")

        setData(hierarchyRoot);
    });

  }, []);

  useEffect(() => {
    // console.log(data, "data 1")
    if (data) {
        
        console.log(data, "data 2");

    
    }
  }, [data]);

  return (
    <>
       TreeMap
      <svg ref={svgRef} width={600} height={500}></svg>
    </>
  );
};

export default TreeMap;
