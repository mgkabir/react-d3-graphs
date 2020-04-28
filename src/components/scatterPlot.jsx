import React, { Component } from "react";
import * as d3 from "d3";

const irisEndPoint =
  "https://raw.githubusercontent.com/vega/vega/master/docs/data/iris.json";

class ScatterPlot extends Component {
  state = {};

  async componentDidMount() {
    const response = await d3.json(irisEndPoint);
    const extent = d3.extent(response, (d) => d.sepalLength);
    //const maxSepalLength = d3.max(response, (d) => d.sepalLength);

    console.log(`Extent ${extent}`);
  }
  render() {
    return <h4>Scaller Plot with Iris Data</h4>;
  }
}

export default ScatterPlot;
