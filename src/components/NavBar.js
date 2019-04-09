import React, { Component } from "react"
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { unlogin, login } from '../actions/auth'

const mapStateToProps = ({auth}) => ({
  authGroup: auth.group
})
const mapDispatchToProps = dispatch => ({
  unlogin: () => dispatch(unlogin()),
  login: (mailPass) => dispatch(login(mailPass))
})

class NavBar extends Component {
  
  onLogin = (e) => {
    e.preventDefault()
    const mailPass = {
      mail: e.target.mail.value,
      password: e.target.password.value
    }
    this.props.login(mailPass)
  }

  render() {
    const { authGroup, unlogin } = this.props
    return (
      <Navbar>
        <Navbar.Brand>online.fdm.center</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="#">
            <Nav.Link>Ссылка</Nav.Link>
          </LinkContainer>
        </Nav>
        { authGroup !== "UNAUTHORIZED" && authGroup !== "TEMPORARY_USER"
          ? <Button variant="outline-secondary" onClick={unlogin} size="sm">Выйти</Button>
          : <>
            <Form inline onSubmit={this.onLogin}>
              <Form.Group>
                <Form.Label>Почта</Form.Label>
                <Form.Control className="ml-1" name="mail" type="email" size="sm" required/>
              </Form.Group>
              <Form.Group className="ml-2" >
                <Form.Label>Пароль</Form.Label>
                <Form.Control className="ml-1" name="password" type="password" size="sm" required />
              </Form.Group>
              <Button className="ml-2" type="submit" size="sm">Войти</Button>
            </Form>
            <LinkContainer to="/register">
              <Button className="ml-2" variant="outline-secondary" size="sm">Зарегистрироваться</Button>
            </LinkContainer>
          </>
        }
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)