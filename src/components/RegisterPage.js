import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { register } from '../actions/auth'

const mapStateToProps = () => ({
})
const mapDispatchToProps = dispatch => ({
  register: (user, history) => dispatch(register(user, history))
})

class RegisterPage extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    const user = {
      name: e.target.name.value,
      mail: e.target.mail.value,
      password: e.target.password.value,
      address: e.target.address.value
    }
    this.props.register(user, this.props.history)
  }

  render() {
    return (
      <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center'>
        <h2>Регистрация</h2>
        <Form style={{ width: '30rem' }} onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              name="name"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="mail"
              type="email"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Адрес</Form.Label>
            <Form.Control
              name="address"
              type="text"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)