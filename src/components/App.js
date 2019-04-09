import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import "../styles/App.css"

import NavBar from './NavBar'
import RegisterPage from './RegisterPage'


class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Route path="/register" component={RegisterPage} />
      </>
    )
  }
}




export default App