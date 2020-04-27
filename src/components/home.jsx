import React, { Component } from "react";
import { scaleLinear, select } from "d3";

const data = [
  { x: 1.0, y: 1, r: 2 },
  { x: 2.0, y: 2, r: 3 },
  { x: 3.0, y: 3, r: 4 },
  { x: 4.0, y: 4, r: 5 },
  { x: 5.0, y: 5, r: 6 },
];

class Home extends Component {
  state = {};

  componentDidMount() {
    this.display();
  }

  display = () => {
    console.log("display");
    const xScale = scaleLinear()
      .domain([1, 5]) // Data space
      .range([100, 200]); // Pixel space

    const yScale = scaleLinear()
      .domain([1, 5]) // Data space
      .range([1, 200]); // Pixel space
    const rScale = scaleLinear()
      .domain([1, 5]) // Data space
      .range([1, 20]); // Pixel space

    select("svg")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => rScale(d.r))
      .attr("fill", "steelblue");
  };

  render() {
    return (
      <React.Fragment>
        <svg width="600" height="400"></svg>
      </React.Fragment>
    );
  }
}

export default Home;
