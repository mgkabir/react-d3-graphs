import React, { Component } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import axios from "axios";

const apiEndPoint =
  "https://api.covid19api.com/country/bangladesh?from=2020-04-05T00:00:00Z&to=2020-04-23T00:00:00Z";

class VictoryBarChart extends Component {
  state = {
    newConfirmed: [],
    newRecovered: [],
    newDeaths: [],
  };

  async componentDidMount() {
    const { data } = await axios.get(apiEndPoint);
    const newConfirmed = [];
    const newRecovered = [];
    const newDeaths = [];
    let prevConf = 0;
    let prevReco = 0;
    let prevDeath = 0;
    data.forEach((element) => {
      const {
        Confirmed: accConfirmed,
        Deaths: accDeaths,
        Recovered: accRecovered,
        Date: evtDate,
      } = element;

      if (prevConf !== 0) {
        newConfirmed.push({
          day: new Date(evtDate),
          confirmed: accConfirmed - prevConf,
        });
        newRecovered.push({
          day: new Date(evtDate),
          recovered: accRecovered - prevReco,
        });
        newDeaths.push({
          day: new Date(evtDate),
          deaths: accDeaths - prevDeath,
        });
      }

      prevConf = accConfirmed;
      prevReco = accRecovered;
      prevDeath = accDeaths;
    });

    this.setState({ newConfirmed, newRecovered, newDeaths });
  }

  render() {
    return (
      <div className="w-75">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          scale={{ x: "time" }}
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />

          <VictoryStack colorScale={["orange", "steelblue", "red"]}>
            <VictoryBar data={this.state.newConfirmed} x="day" y="confirmed" />
            <VictoryBar data={this.state.newRecovered} x="day" y="recovered" />
            <VictoryBar data={this.state.newDeaths} x="day" y="deaths" />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default VictoryBarChart;
