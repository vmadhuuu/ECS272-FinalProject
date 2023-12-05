import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function Barchart2() {
  useEffect(() => {
    d3.csv("../data/vgsales1020pt2.csv").then((loadedData) => {
      const cleanedData = loadedData.filter((row) => {
        return !Object.values(row).some(
          (value) => value === null || value === ""
        );
      });

      console.log(cleanedData);
    });
  }, []);
  useEffect(() => {}, []);

  return <div>hi</div>;
}

export default Barchart2;
