import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BarChart from "./components/barChart";
import VictoryBarChart from "./components/victoryBarChart";
import VictoryLineChart from "./components/victoryLineChart";
import VictoryCustomLineChart from "./components/victoryCutomLineChart";
import Home from "./components/home";
import NavBar from "./components/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/bar-victory" component={VictoryBarChart} />
          <Route path="/line-victory" component={VictoryLineChart} />
          <Route
            path="/custom-line-victory"
            component={VictoryCustomLineChart}
          />
          <Route path="/bar-d3" component={BarChart} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    );
  }
}

export default App;
