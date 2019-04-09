import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { login, TEST_LOGIN_FAILED } from '../actions/auth'

const mapStateToProps = ({auth}) => ({
  token: auth.token,
  isAuth: auth.token && auth.token.user.group !== 'TEMPORARY_USER',
  status: auth.status
})
const mapDispatchToProps = dispatch => ({
  login: (mailPass) => dispatch(login(mailPass))
})

class AuthPage extends Component {
  constructor(props){
    super()
    if(props.isAuth){
      props.history.push('/')
    }
    this.state = {
      token: ''
    }
  }

  componentDidUpdate(){
    if(this.props.token){
      this.props.history.push('/')
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const mailPass = {
      mail: e.target.mail.value,
      password: e.target.password.value
    }
    this.props.login(mailPass)
  }

  render() {
    return (
      <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center'>
        <h2>Авторизация</h2>
        <Form style={{ width: '30rem' }} onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="mail"
              type="email"
              placeholder="mail@cs.vsu.ru"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="1q2w3e"
              required
              isInvalid={this.props.status === TEST_LOGIN_FAILED}
            />
            <Form.Control.Feedback type="invalid">Неверный пароль</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)