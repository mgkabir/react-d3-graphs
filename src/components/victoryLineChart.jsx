import React, { Component } from "react";
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory";
import axios from "axios";

const apiEndpoint =
  "https://api.covid19api.com/dayone/country/bangladesh/status/confirmed/live";
class VictoryLineChart extends Component {
  state = {
    lineData: [],
  };
  async componentDidMount() {
    const { data } = await axios.get(apiEndpoint);
    const dataArray = [...data];
    const newArray = dataArray.map((d) => {
      return { x: d.Date, y: d.Cases };
    });
    this.setState({ lineData: newArray });
  }

  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis tickValues={[]} tickFormat={(x) => x} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}K`} />
        <VictoryLine data={this.state.lineData}></VictoryLine>
      </VictoryChart>
    );
  }
}

export default VictoryLineChart;
