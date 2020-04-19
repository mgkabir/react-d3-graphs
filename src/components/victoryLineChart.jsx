import React, { Component } from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";

class VictoryLineChart extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 },
    ];

    this.setState({ data });
  }
  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine data={this.state.data}></VictoryLine>
      </VictoryChart>
    );
  }
}

export default VictoryLineChart;
