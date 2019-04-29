import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"

import "../styles/App.css"

import NavBar from './NavBar'
import Alerts from './Alerts'
import RegisterPage from './RegisterPage'
import CreatePage from './CreatePage'
import ModifyPage from './ModifyPage'
import OrdersPage from './OrdersPage'

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Route exact path="/" component={CreatePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/products/:productId" component={ModifyPage} />
        <Route exact path="/products" component={OrdersPage} />
        <Alerts />
      </>
    )
  }
}




export default App