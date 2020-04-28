import React, { Component } from "react";
import { scaleLinear, select, scaleLog, scalePoint } from "d3";

class Home extends Component {
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
      .domain([1, 5]) // Data space
      .range([100, 200]); // Pixel space

    const yScale = scaleLinear()
      .domain([1, 5]) // Data space
      .range([1, 200]); // Pixel space
    const wScale = scaleLinear()
      .domain([1, 5]) // Data space
      .range([10, 50]); // Pixel space

    const rects = select("svg").selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("width", (d) => wScale(d.r))
      .attr("height", 50);

    rects.attr("fill", color);

    rects.exit().remove();
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
