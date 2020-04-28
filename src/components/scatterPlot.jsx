import React, { Component } from "react";
import * as d3 from "d3";

const irisEndPoint =
  "https://raw.githubusercontent.com/vega/vega/master/docs/data/iris.json";

class ScatterPlot extends Component {
  state = {};

  async componentDidMount() {
    const circleRadius = 5;
    const outerWidth = 600;
    const outerHeight = 400;
    const data = await d3.json(irisEndPoint); // fetch data

    const xScaleExtent = d3.extent(data, (d) => d.sepalLength);
    const yScaleExtent = d3.extent(data, (d) => d.petalLength);

    const xScale = d3.scaleLinear().domain(xScaleExtent).range([0, outerWidth]);
    const yScale = d3
      .scaleLinear()
      .domain(yScaleExtent)
      .range([outerHeight, 0]);

    // Data bind
    const circles = d3.select("svg").selectAll("circle").data(data);
    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.sepalLength))
      .attr("cy", (d) => yScale(d.petalLength))
      .attr("r", circleRadius);
    // Update : no-op ?
    circles
      .attr("cx", (d) => xScale(d.sepalLength))
      .attr("cy", (d) => yScale(d.petalLength));
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
