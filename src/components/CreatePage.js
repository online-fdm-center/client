import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Card, Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { sendFile } from '../actions/products'

import uploadImage from '../assets/images/Upload_alt_font_awesome.svg'

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  sendFile: file => dispatch(sendFile(file))
})

class CreatePage extends Component{
  onDrop = (files) => {
    const regex = /.+\.stl$/i
    const acceptedFiles = files.filter(file => regex.test(file.name))
    if (acceptedFiles.length > 0){
      console.log(acceptedFiles[0])
      this.props.sendFile(acceptedFiles[0])
    }
  }

  render(){
    return <Container>
      <Card>
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <Card.Body
                className='d-flex justify-content-center align-items-center'
                style={{
                  fontSize: 24,
                  cursor: 'pointer'
                }}
              >
                <img src={uploadImage} height={24} />
                <div className="ml-2">
                  { isDragActive
                    ? 'Отпустите файл'
                    : 'Загрузить модель'
                  }  
                </div>
              </Card.Body>
            </div>
          )}
        </Dropzone>
      </Card>
    </Container>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)