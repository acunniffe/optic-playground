import React, { Component } from "react";
import { hot } from "react-hot-loader";
// import ComponentOne from "./components/ComponentOne";
// import ComponentTwo from "./components/ComponentTwo";
import "./styles.css";
import { compare } from "./optic-compare";
class App extends Component {
  render() {
    compare();
    return (
      <div className="App">
        {/* <ComponentOne /> */}
        SUP BRO
        {/* <ComponentTwo /> */}
      </div>
    );
  }
}

export default hot(module)(App);
