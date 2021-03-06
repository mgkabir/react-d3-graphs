import React, { Component } from "react";
import * as d3 from "d3";

const irisEndPoint =
  "https://raw.githubusercontent.com/vega/vega/master/docs/data/iris.json";

class ScatterPlot extends Component {
  state = {};

  async componentDidMount() {
    const svg = d3.select("svg");
    const minRad = 2;
    const maxRad = 10;
    const height = +svg.attr("height");
    const width = +svg.attr("width");
    const margin = { top: 20, right: 20, bottom: 20, left: 30 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const data = await d3.json(irisEndPoint); // fetch data

    const xScaleExtent = d3.extent(data, (d) => d.sepalLength);
    const yScaleExtent = d3.extent(data, (d) => d.petalLength);
    const rScaleExtent = d3.extent(data, (d) => d.sepalWidth);

    const xScale = d3
      .scaleLinear()
      .domain(xScaleExtent)
      .range([0, innerWidth])
      .nice();
    const yScale = d3
      .scaleLinear()
      .domain(yScaleExtent)
      .range([height, 0])
      .nice();

    const rScale = d3
      .scaleLinear()
      .domain(rScaleExtent)
      .range([minRad, maxRad]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${-margin.bottom})`);
    // Data bind
    const circles = g.selectAll("circle").data(data);
    // Enter
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.sepalLength))
      .attr("cy", (d) => yScale(d.petalLength))
      .attr("r", (d) => rScale(d.sepalWidth))
      .attr("stroke", (d) => colorScale(d.species));
    // Update : no-op ?
    circles
      .attr("cx", (d) => xScale(d.sepalLength))
      .attr("cy", (d) => yScale(d.petalLength));
    // Exit
    circles.exit().remove();

    this.includeXAxis(svg, xScale, innerHeight, margin);
    this.includeYAxis(svg, yScale, margin);
  }

  includeXAxis(svg, xScale, innerHeight, margin) {
    const xAxis = d3.axisBottom().scale(xScale);
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left},${innerHeight + margin.top})`
      )
      .call(xAxis);
  }

  includeYAxis(svg, yScale, margin) {
    const yAxis = d3.axisLeft().scale(yScale);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${-margin.bottom})`)
      .call(yAxis);
  }

  render() {
    return (
      <React.Fragment>
        <svg width="960" height="640" style={{ margin: 20 }}></svg>
      </React.Fragment>
    );
  }
}

export default ScatterPlot;
