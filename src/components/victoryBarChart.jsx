import React, { Component } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";

class VictoryBarChart extends Component {
  state = {
    dataSetOne: [],
    dataSetTwo: [],
  };

  componentDidMount() {
    const dataSetOne = [
      { quarter: new Date(2000, 2, 2), earnings: 210 },
      { quarter: new Date(2000, 3, 3), earnings: 350 },
      { quarter: new Date(2000, 5, 4), earnings: 420 },
      { quarter: new Date(2000, 6, 5), earnings: 200 },
    ];
    const dataSetTwo = [
      { quarter: new Date(2000, 2, 2), earnings: 100 },
      { quarter: new Date(2000, 3, 3), earnings: 500 },
      { quarter: new Date(2000, 5, 4), earnings: 250 },
      { quarter: new Date(2000, 6, 5), earnings: 600 },
    ];

    this.setState({ dataSetOne, dataSetTwo });
  }

  render() {
    return (
      <div class="w-75">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          scale={{ x: "time" }}
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />

          <VictoryStack colorScale={["orange", "steelblue"]}>
            <VictoryBar data={this.state.dataSetOne} x="quarter" y="earnings" />
            <VictoryBar data={this.state.dataSetTwo} x="quarter" y="earnings" />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default VictoryBarChart;
