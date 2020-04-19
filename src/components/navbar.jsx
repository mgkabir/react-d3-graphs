import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bar-d3">Bar - D3</Link>
        </li>
        <li>
          <Link to="/bar-victory">Bar - Victory</Link>
        </li>
      </ul>
    );
  }
}

export default NavBar;
