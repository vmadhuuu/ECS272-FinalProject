import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import Sankey from "./Components/Sankey";

function App() {
  const [sankeyData, setSankeyData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    d3.csv("../data/vgsales.csv").then((loadedData) => {
      // console.log(loadedData);
      const cleanedData = loadedData.filter((row) => {
        return !Object.values(row).some(
          (value) => value === null || value === ""
        );
      });

      // console.log(cleanedData);
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
            .slice(0, 15)
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
        // console.log("Nodes:", nodes);

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
      console.log("Processed Data for Sankey:", processedData); // Debugging line
      setSankeyData(processedData);
    });
  }, []);

  return (
    <>
      <Sankey data={sankeyData} />
    </>
  );
}

export default App;
