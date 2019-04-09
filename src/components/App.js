import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import "../styles/App.css"

import NavBar from './NavBar'


class App extends Component {
  render() {
    return (
      <>
        <NavBar />
      </>
    )
  }
}




export default App