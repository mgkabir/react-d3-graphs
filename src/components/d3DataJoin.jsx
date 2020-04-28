import React, { Component } from "react";
import { scaleLinear, select } from "d3";

class D3DatJoin extends Component {
  state = {
    data: [
      { x: 1, y: 1, r: 1 },
      { x: 2, y: 2, r: 2 },
      { x: 3, y: 3, r: 3 },
      { x: 4, y: 4, r: 4 },
      { x: 5, y: 5, r: 5 },
    ],
  };

  componentDidMount() {
    setTimeout(() => this.display(this.state.data, "red"), 1000);
    setTimeout(() => this.display(this.state.data.slice(2), "green"), 2000);
    setTimeout(() => this.display(this.state.data.slice(3), "blue"), 3000);
  }

  display = (data, color) => {
    console.log(`Data : ${JSON.stringify(data)} Color : ${color}`);
    const xScale = scaleLinear()
      .domain([1, 10]) // Data space
      .range([100, 400]); // Pixel space

    const yScale = scaleLinear()
      .domain([1, 10]) // Data space
      .range([100, 500]); // Pixel space
    const rScale = scaleLinear()
      .domain([1, 10]) // Data space
      .range([10, 50]); // Pixel space

    // Data bind
    const circles = select("svg").selectAll("circle").data(data);

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => rScale(d.r))
      .attr("fill", color);

    // Update
    circles
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("fill", color);

    // Exit
    circles.exit().remove();
  };

  render() {
    return (
      <React.Fragment>
        <svg width="400" height="400"></svg>
      </React.Fragment>
    );
  }
}

export default D3DatJoin;
