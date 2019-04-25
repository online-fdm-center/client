import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App.js"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers"
import { BrowserRouter } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

import { initAuth } from './actions/auth'

const store = createStore(
  rootReducer,
  {},
  (true)
    ? composeWithDevTools(
      applyMiddleware(thunk)
    )
    : applyMiddleware(thunk)
)

store.dispatch(initAuth())

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)