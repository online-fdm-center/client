import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import "../styles/App.css"

import NavBar from './NavBar'
import RegisterPage from './RegisterPage'
import CreatePage from './CreatePage'
import ModifyPage from './ModifyPage'

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Route exact path="/" component={CreatePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/products/:productId" component={ModifyPage} />
      </>
    )
  }
}




export default App