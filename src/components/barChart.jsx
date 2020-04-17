import React, { Component } from "react";
import { select, scaleLinear, max, scaleBand } from "d3";
import { getCountryByPopulation } from "./../data/population";

class BarChart extends Component {
  state = {
    data: getCountryByPopulation(),
  };

  componentDidMount() {
    const svg = select("svg");
    const height = +svg.attr("height");
    const width = +svg.attr("width");

    const display = (data) => {
      const xValue = (d) => d.population;
      const yValue = (d) => d.country;
      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, width]);

      const yScale = scaleBand().domain(data.map(yValue)).range([0, height]);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", (d) => yScale(yValue(d)))
        .attr("width", (d) => xScale(xValue(d)))
        .attr("height", yScale.bandwidth());
    };

    display(this.state.data);
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
