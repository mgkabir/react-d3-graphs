import React, { Component } from "react";
import { VictoryLabel, VictoryAxis, VictoryLine } from "victory";
import Select from "react-select";
import axios from "axios";

const options = [
  { value: "bangladesh", label: "Bangladesh" },
  { value: "india", label: "India" },
  { value: "kenya", label: "Kenya" },
  { value: "malaysia", label: "Malaysia" },
  { value: "pakistan", label: "Pakistan" },
  { value: "malawi", label: "Malawi" },
  { value: "spain", label: "Spain" },
  { value: "italy", label: "Italy" },
];

class VictoryCustomLineChart extends Component {
  state = {
    dataSet: [],
    tickValues: [],
    selectedOption: { value: "bangladesh", label: "Bangladesh" },
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  getApiEndPoint(country = "bangladesh") {
    return `https://api.covid19api.com/dayone/country/${country}/status/confirmed/live`;
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  componentDidMount() {
    this.updateState();
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateState();
  }

  async updateState() {
    const { data: dataArray } = await axios.get(
      this.getApiEndPoint(this.state.selectedOption.value)
    );

    const newArray = dataArray.map((d) => {
      return { x: new Date(d.Date), y: d.Cases };
    });

    const ticks = dataArray.map((d) => {
      return new Date(d.Date);
    });

    this.setState({ dataSet: newArray, tickValues: ticks });
  }

  getMaxYValue() {
    const length = this.state.dataSet.length;
    const lastObj = this.state.dataSet[length - 1];
    if (lastObj) {
      const { y } = lastObj;
      return parseInt(y);
    }
    return 0;
  }

  render() {
    const styles = this.getStyles();
    const maxY = this.getMaxYValue();
    const { selectedOption } = this.state;
    return (
      <div>
        <div>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <svg style={styles.parent} viewBox="0 0 450 350">
          {/* Define labels */}
          <VictoryLabel
            x={25}
            y={24}
            style={styles.title}
            text={`Covid-19 total case : ${this.capitalizeFirstLetter(
              this.state.selectedOption.value
            )}`}
          />
          <g transform={"translate(0, 40)"}>
            {/* Add shared independent axis */}
            <VictoryAxis
              scale="time"
              standalone={false}
              style={styles.axisYears}
              tickValues={this.state.tickValues}
              tickFormat={(x) => {
                let xAxisStr = "";
                if (x.getUTCDate() % 10 === 0) {
                  xAxisStr = `${x.getUTCDate()}/${x.getUTCMonth() + 1}`;
                }
                return xAxisStr;
              }}
            />
            {/*
              Add the dependent axis for the first data set.
              Note that all components plotted against this axis will have the same y domain
            */}
            <VictoryAxis
              dependentAxis
              minDomain={{ y: 0 }}
              maxDomain={{ y: maxY }}
              offsetX={60}
              orientation="left"
              standalone={false}
              style={styles.axisOne}
            />

            {/* dataset one */}
            <VictoryLine
              data={this.state.dataSet}
              domain={{
                x: [
                  new Date(this.state.tickValues[0]),
                  new Date(
                    this.state.tickValues[this.state.tickValues.length - 1]
                  ),
                ],
                y: [0, maxY],
              }}
              interpolation="monotoneX"
              scale={{ x: "time", y: "linear" }}
              standalone={false}
              style={styles.lineOne}
            />
          </g>
        </svg>
      </div>
    );
  }

  getStyles() {
    const BLUE_COLOR = "#00a3de";

    return {
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "70%",
        height: "auto",
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#000000",
        fontFamily: "inherit",
        fontSize: "18px",
        fontWeight: "bold",
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px",
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1 },
        ticks: {
          size: ({ tick }) => {
            const tickSize = tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1,
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 12,
        },
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? "transparent" : "#ffffff"),
          strokeWidth: 2,
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 16,
        },
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic",
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5 },
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21,
      },

      // HORIZONTAL LINE
      lineThree: {
        data: { stroke: "#e95f46", strokeWidth: 2 },
      },
    };
  }
}

export default VictoryCustomLineChart;
