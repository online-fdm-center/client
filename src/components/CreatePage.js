import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Card } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { createProduct } from '../actions/products'

import uploadImage from '../assets/images/Upload_alt_font_awesome.svg'

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  createProduct: (file, history) => dispatch(createProduct(file, history))
})

class CreatePage extends Component{
  onDrop = (files) => {
    const regex = /.+\.stl$/i
    const acceptedFiles = files.filter(file => regex.test(file.name))
    if (acceptedFiles.length > 0){
      this.props.createProduct(acceptedFiles[0], this.props.history)
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