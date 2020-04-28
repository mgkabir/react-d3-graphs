import React, { Component } from "react";
import ScatterPlot from "./scatterPlot";
import D3DatJoin from "./d3DataJoin";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <D3DatJoin /> */}
        <ScatterPlot />
      </React.Fragment>
    );
  }
}

export default Home;
