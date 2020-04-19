import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

class VictoryBarChart extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const retrievedData = [
      { quarter: 1, earnings: 2100 },
      { quarter: 2, earnings: 3500 },
      { quarter: 3, earnings: 4250 },
      { quarter: 4, earnings: 2000 },
    ];

    this.setState({ data: retrievedData });
  }

  render() {
    return (
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `$${x / 1000}k`}
        />
        <VictoryBar data={this.state.data} x="quarter" y="earnings" />
      </VictoryChart>
    );
  }
}

export default VictoryBarChart;
