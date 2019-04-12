import React, { Component } from "react"
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { deleteAlert } from '../actions/alerts'

const mapStateToProps = ({alerts}) => ({
  alerts: alerts.byTimeStamp
})
const mapDispatchToProps = (dispatch) => ({
  deleteAlert: id => dispatch(deleteAlert(id))
})

class Alerts extends Component {

  render(){
    const alerts = Object.keys(this.props.alerts).map(timeStamp => this.props.alerts[timeStamp])
    const dateNow = Date.now()
    const timesForRerender = alerts
      .map(alert => alert.closeAfter - (dateNow - alert.id))
      .filter(time => time > 0)
    if (timesForRerender.length > 0){
      setTimeout(this.forceUpdate.bind(this), Math.min(timesForRerender))
    }
    
    return <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        maxWidth: '100%',
        position: 'fixed',
        bottom: 0,
        right: 15,
        zIndex: 500,
      }}
    >
      {
        alerts.map(alert => (
          <Alert
            key={alert.id}
            dismissible
            variant={alert.variant}
            onClose={this.props.deleteAlert.bind(this, alert.id)}
            show={dateNow-alert.id < alert.closeAfter}
          >
            {alert.text}
          </Alert>
        ))
      }
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)