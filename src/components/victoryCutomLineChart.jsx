import React, { Component } from "react";
import { VictoryLabel, VictoryAxis, VictoryLine } from "victory";
import axios from "axios";

const apiEndpoint =
  "https://api.covid19api.com/dayone/country/bangladesh/status/confirmed/live";

class VictoryCustomLineChart extends Component {
  state = {
    lineData: [],
  };
  //   async componentDidMount() {
  //     const { data } = await axios.get(apiEndpoint);
  //     const dataArray = [...data];
  //     const newArray = dataArray.map((d) => {
  //       return { x: d.Date, y: d.Cases };
  //     });
  //     this.setState({ lineData: newArray });
  //   }

  render() {
    const styles = this.getStyles();
    const tickValues = this.getTickValues();
    const dataSetOne = this.getDataSetOne();

    return (
      <div>
        <svg style={styles.parent} viewBox="0 0 450 350">
          {/* Define labels */}
          <VictoryLabel
            x={25}
            y={24}
            style={styles.title}
            text="Covid-19 Line Graph"
          />

          <g transform={"translate(0, 40)"}>
            {/* Add shared independent axis */}
            <VictoryAxis
              scale="time"
              standalone={false}
              style={styles.axisYears}
              tickValues={tickValues}
              tickFormat={(x) => {
                if (x.getFullYear() === 2000) {
                  return x.getFullYear();
                }
                if (x.getFullYear() % 5 === 0) {
                  return x.getFullYear().toString().slice(2);
                }
              }}
            />
            {/*
              Add the dependent axis for the first data set.
              Note that all components plotted against this axis will have the same y domain
            */}
            <VictoryAxis
              dependentAxis
              domain={[-10, 15]}
              offsetX={50}
              orientation="left"
              standalone={false}
              style={styles.axisOne}
            />

            {/* dataset one */}
            <VictoryLine
              data={dataSetOne}
              domain={{
                x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
                y: [-10, 15],
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

  getDataSetOne() {
    return [
      { x: new Date(2000, 1, 1), y: 12 },
      { x: new Date(2000, 6, 1), y: 10 },
      { x: new Date(2000, 12, 1), y: 11 },
      { x: new Date(2001, 1, 1), y: 5 },
      { x: new Date(2002, 1, 1), y: 4 },
      { x: new Date(2003, 1, 1), y: 6 },
      { x: new Date(2004, 1, 1), y: 5 },
      { x: new Date(2005, 1, 1), y: 7 },
      { x: new Date(2006, 1, 1), y: 8 },
      { x: new Date(2007, 1, 1), y: 9 },
      { x: new Date(2008, 1, 1), y: -4.5 },
      { x: new Date(2009, 1, 1), y: -6 },
      { x: new Date(2010, 1, 1), y: 5 },
      { x: new Date(2013, 1, 1), y: 1 },
    ];
  }

  getTickValues() {
    return [
      new Date(1999, 1, 1),
      new Date(2000, 1, 1),
      new Date(2001, 1, 1),
      new Date(2002, 1, 1),
      new Date(2003, 1, 1),
      new Date(2004, 1, 1),
      new Date(2005, 1, 1),
      new Date(2006, 1, 1),
      new Date(2007, 1, 1),
      new Date(2008, 1, 1),
      new Date(2009, 1, 1),
      new Date(2010, 1, 1),
      new Date(2011, 1, 1),
      new Date(2012, 1, 1),
      new Date(2013, 1, 1),
      new Date(2014, 1, 1),
      new Date(2015, 1, 1),
      new Date(2016, 1, 1),
    ];
  }
  getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";

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
          fontSize: 16,
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

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 16,
        },
      },
      labelTwo: {
        textAnchor: "end",
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic",
      },
      lineTwo: {
        data: { stroke: RED_COLOR, strokeWidth: 4.5 },
      },

      // HORIZONTAL LINE
      lineThree: {
        data: { stroke: "#e95f46", strokeWidth: 2 },
      },
    };
  }
}

export default VictoryCustomLineChart;
