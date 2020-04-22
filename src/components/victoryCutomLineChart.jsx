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
    this.setState({ selectedOption });
  };

  componentDidMount() {
    this.updateState();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedOption.value !== this.state.selectedOption.value) {
      console.log(
        `componentDidUpdate called : ${this.state.selectedOption.value}`
      );
      this.updateState();
    }
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
          {/* Define labels*/}
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
              offsetX={50}
              tickFormat={(y) => {
                return y >= 10000 ? `${y / 1000}k` : y;
              }}
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
    const STEEL_BLUE = "#10a9c4";
    return {
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "block",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "80%",
        height: "auto",
        margin: "auto",
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#0d91d4",
        fontFamily: "inherit",
        fontSize: "16px",
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
        axis: { stroke: BLUE_COLOR, strokeWidth: 2 },
        ticks: {
          size: ({ tick }) => {
            const tickSize = tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: BLUE_COLOR,
          strokeWidth: 0.25,
        },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 10,
        },
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: "#ffffff",
          strokeWidth: 1,
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 1 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
        },
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic",
      },
      lineOne: {
        data: { stroke: STEEL_BLUE, strokeWidth: 2.5 },
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
