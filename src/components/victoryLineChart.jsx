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
      return { x: new Date(d.Date), y: d.Cases };
    });
    this.setState({ lineData: newArray });
  }

  render() {
    return (
      <div class="w-75">
        <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryLine data={this.state.lineData}></VictoryLine>
        </VictoryChart>
      </div>
    );
  }
}

export default VictoryLineChart;
