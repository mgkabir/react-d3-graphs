import React, { Component } from "react";
import { VictoryBar, VictoryChart } from "victory";

const data = [
  { quarter: 1, earnings: 3000 },
  { quarter: 2, earnings: 8500 },
  { quarter: 3, earnings: 4250 },
  { quarter: 4, earnings: 6000 },
];

class VictoryBarChart extends Component {
  render() {
    return (
      <VictoryChart>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    );
  }
}

export default VictoryBarChart;
