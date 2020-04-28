import React, { Component } from "react";
import * as d3 from "d3";

const irisEndPoint =
  "https://raw.githubusercontent.com/vega/vega/master/docs/data/iris.json";

class ScatterPlot extends Component {
  state = {};

  async componentDidMount() {
    // const data = [
    //   { x: 1, y: 1, r: 1 },
    //   { x: 2, y: 2, r: 2 },
    //   { x: 3, y: 3, r: 3 },
    //   { x: 4, y: 4, r: 4 },
    //   { x: 5, y: 5, r: 5 },
    // ];

    const responseData = await d3.json(irisEndPoint);
    const xScaleExtent = d3.extent(responseData, (d) => d.sepalLength);
    const yScaleExtent = d3.extent(responseData, (d) => d.petalLength);

    // const xScale = d3.scaleLinear().range([0, 250]);
    // const yScale = d3.scaleLinear().range([250, 0]);

    // xScale.domain(xScaleExtent);
    // yScale.domain(yScaleExtent);

    const xScale = d3.scaleLinear().domain([1, 10]).range([0, 600]);
    const yScale = d3.scaleLinear().domain([1, 10]).range([400, 0]);

    // Data bind
    const circles = d3.select("svg").selectAll("circle").data(responseData);

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.sepalLength))
      .attr("cy", (d) => yScale(d.petalLength))
      .attr("r", 2);

    // Update
    circles.attr("cx", (d) => xScale(d.x)).attr("cy", (d) => yScale(d.y));

    // Exit
    circles.exit().remove();
  }

  render() {
    return (
      <React.Fragment>
        <svg width="600" height="400"></svg>
      </React.Fragment>
    );
  }
}

export default ScatterPlot;
