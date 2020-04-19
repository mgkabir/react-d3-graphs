import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BarChart from "./components/barChart";
import VictoryBarChart from "./components/victoryBarChart";
import Home from "./components/home";

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <Switch>
          <Route path="/bar-victory" component={VictoryBarChart} />
          <Route path="/bar-d3" component={BarChart} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    );
  }
}

export default App;
