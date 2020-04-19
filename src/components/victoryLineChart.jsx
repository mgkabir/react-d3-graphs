import React, { Component } from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";
import axios from "axios";

class VictoryLineChart extends Component {
  state = {
    lineData: [],
  };
  async componentDidMount() {
    const { data } = await axios.get(
      "https://api.covid19api.com/dayone/country/malawi/status/confirmed/live"
    );
    const dataArray = [...data];
    const newArray = dataArray.map((d) => {
      return { x: d.Date, y: d.Cases };
    });
    this.setState({ lineData: newArray });
  }
  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine data={this.state.lineData}></VictoryLine>
      </VictoryChart>
    );
  }
}

export default VictoryLineChart;
