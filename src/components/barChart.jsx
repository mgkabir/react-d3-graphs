import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  state = {};

  componentDidMount() {
    const svg = d3.select("svg");
    const height = +svg.attr("height"); // + sign converts string to number
    const width = +svg.attr("width");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const circle = g
      .append("circle")
      .attr("r", height / 2 - 50)
      .attr("fill", "yellow")
      .attr("stroke", "black");
  }

  render() {
    return (
      <React.Fragment>
        <svg style={{ background: "#83ad7f" }} width="600" height="400"></svg>
      </React.Fragment>
    );
  }
}

export default BarChart;
