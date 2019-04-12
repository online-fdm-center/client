import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Form, Col, Row, Card, Button } from 'react-bootstrap'
import { getProduct, updateProduct } from '../actions/products'

const mapStateToProps = ({products, threedFiles, materials}, {match}) => {
  const product = products.byId[match.params.productId] || null
  return {
    product,
    threedFile: product ? threedFiles.byId[product.fileId] : null,
    materials
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProduct: id => dispatch(getProduct(id)),
  updateProduct: product => dispatch(updateProduct(product))
})

class ModifyPage extends Component {
  constructor(props) {
    super(props)
    if (!props.product){
      props.getProduct(props.match.params.productId)
    }
    
  }

  onSaveProduct = (e) => {
    e.preventDefault()
    const product = {
      id: Number(e.target.id.value),
      name: e.target.name.value,
      description: e.target.description.value || undefined,
      materialId: Number(e.target.materialId.value) || undefined,
      count: Math.max(1, e.target.count.value || 1)
    }
    this.props.updateProduct(product)
  }

  render() {
    const {product, threedFile, materials} = this.props
    if (!product){
      return <Container>Загрузка...</Container>
    }
    return <Container>
      <Card>
        <Card.Header>
          Изделие {product.name}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form onSubmit={this.onSaveProduct}>
                <Form.Control type="hidden" name="id" value={product.id}/>
                <Form.Group>
                  <Form.Label>Название</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    defaultValue={product.name}
                    placeholder="Название изделия"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    name="description"
                    type="textbox"
                    defaultValue={product.description}
                    placeholder="Описание изделия"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Материал</Form.Label>
                  <Form.Control as="select" name="materialId" defaultValue={product.materialId} key={'keyMaterials'+materials.materials ? materials.materials.length : 0}>
                    <option value={''}>Не выбрано</option>
                    { materials.materials.map( item => (<option key={item.id} value={item.id}>abs</option>)) }
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Количество</Form.Label>
                  <Form.Control
                    name="count"
                    type="number"
                    defaultValue={product.count}
                  />
                </Form.Group>
                <Button type="submit">Сохранить</Button>
              </Form>
            </Col>
            <Col md={6}>
              картинка (будет)
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPage)