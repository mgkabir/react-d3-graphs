import React, { Component } from "react";
import { VictoryLabel, VictoryAxis, VictoryLine } from "victory";
import axios from "axios";

const country = "bangladesh";
const apiEndpoint = `https://api.covid19api.com/dayone/country/${country}/status/confirmed/live`;

class VictoryCustomLineChart extends Component {
  state = {
    dataSet: [],
    tickValues: [],
  };

  async componentDidMount() {
    const { data: dataArray } = await axios.get(apiEndpoint);

    const newArray = dataArray.map((d) => {
      return { x: new Date(d.Date), y: d.Cases };
    });

    const ticks = dataArray.map((d) => {
      return new Date(d.Date);
    });
    this.setState({ dataSet: newArray });
    this.setState({ tickValues: ticks });
  }

  getMaxYValue() {
    const length = this.state.dataSet.length;
    const lastObj = this.state.dataSet[length - 1];
    if (lastObj) {
      const { y } = lastObj;
      console.log(`${length} - Obj - ${y}`);
      return y;
    }
    return 0;
  }

  render() {
    const styles = this.getStyles();
    const maxY = this.getMaxYValue();

    return (
      <div>
        <svg style={styles.parent} viewBox="0 0 450 350">
          {/* Define labels */}
          <VictoryLabel
            x={25}
            y={24}
            style={styles.title}
            text={`Covid-19 total case : ${country}`}
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
                if (x.getUTCDate() % 5 === 0) {
                  xAxisStr = `${x.getUTCMonth() + 1}-${x.getUTCDate()}`;
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
              domain={[0, maxY]}
              offsetX={65}
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
        maxWidth: "50%",
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
