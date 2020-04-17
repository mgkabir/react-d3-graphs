import React, { Component } from "react";
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from "d3";
import { getCountryByPopulation } from "./../data/population";

class BarChart extends Component {
  state = {
    data: getCountryByPopulation(),
  };

  componentDidMount() {
    this.display(this.state.data);
  }

  display = (data) => {
    const svg = select("svg");
    const height = +svg.attr("height");
    const width = +svg.attr("width");
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = (d) => d.population;
    const yValue = (d) => d.country;
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);
    const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").call(axisLeft(yScale));

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth());
  };

  render() {
    return (
      <React.Fragment>
        <svg style={{ background: "#83ad7f" }} width="600" height="400"></svg>
      </React.Fragment>
    );
  }
}

export default BarChart;
