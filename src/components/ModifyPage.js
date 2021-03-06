import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Form, Col, Row, Card, Button, ProgressBar } from 'react-bootstrap'
import { getProduct, getProductEvent, updateProduct, setStatusProduct } from '../actions/products'
import { payForProduct } from '../actions/payments'
import { Api } from '../api'
import productStatuses from '../constants/productStatuses'

const mapStateToProps = ({products, threedFiles, materials, qualities}, {match}) => {
  const product = products.byId[match.params.productId] || null
  console.log(products.renders)
  return {
    product,
    threedFile: product ? threedFiles.byId[product.fileId] : null,
    materials,
    qualities,
    preliminaryPrice: product ? products.preliminaryPrices[product.id] || null : null,
    render: product ? products.renders[product.id] || null : null,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProduct: id => dispatch(getProduct(id)),
  getProductEvent: id => dispatch(getProductEvent(id)),
  updateProduct: product => dispatch(updateProduct(product)),
  setStatusOperatorsCheck: id => dispatch(setStatusProduct(id, 'OPERATORS_CHECK')),
  payForProduct: id => dispatch(payForProduct(id)),
})

class ModifyPage extends Component {
  constructor(props) {
    super(props)
    const productId = Number(props.match.params.productId)
    props.getProduct(productId)
    props.getProductEvent(productId)
  }

  onSaveProduct = (e) => {
    e.preventDefault()
    const product = {
      id: Number(e.target.id.value),
      name: e.target.name.value,
      description: e.target.description.value || undefined,
      qualityId: Number(e.target.qualityId.value) || undefined,
      materialId: Number(e.target.materialId.value) || undefined,
      count: Math.max(1, e.target.count.value || 1)
    }
    this.props.updateProduct(product)
  }

  setStatusOperatorsCheck = () => {
    this.props.setStatusOperatorsCheck(this.props.match.params.productId)
  }

  render() {
    const { product, threedFile, materials, preliminaryPrice, qualities, render, payForProduct } = this.props
    console.log(render)
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
                  <Form.Label>Качество</Form.Label>
                  <Form.Control as="select" name="qualityId" defaultValue={product.qualityId} key={'keyQualities'+qualities.array ? qualities.array.length : 0}>
                    <option value={''}>Не выбрано</option>
                    { qualities.array.map( item => (<option key={item.id} value={item.id}>{item.name}</option>)) }
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Материал</Form.Label>
                  <Form.Control as="select" name="materialId" defaultValue={product.materialId} key={'keyMaterials'+materials.materials ? materials.materials.length : 0}>
                    <option value={''}>Не выбрано</option>
                    { materials.materials.map( item => (<option key={item.id} value={item.id}>{item.type} - {item.color}</option>)) }
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
              <img
                style={{
                  width: '100%',
                  height: 'auto'
                }}
                src={'//'+Api.apiUrl+'/uploads/'+render}
              />
              { product.status === "WAITING_FOR_PROCESSING"
                ? <ProgressBar animated variant="info" now={100} />
                : null
              }
              { product.status === "PROCESSING" && product.progress
                ? <ProgressBar variant="info" now={product.progress*100} label={product.progressText} />
                : null
              }
              
              <div>Статус: {productStatuses[product.status]}</div>
              { product.status === 'TRANSFER'
                ? <div className="mt-2">
                    Ваш заказ доступен к выдаче по адресу г. Воронеж, ул. Казачья, д. 62
                </div>
                : null
              }
              { !product.materialId || !product.qualityId
                ? 'Выберите качество и материал, чтобы увидеть предварительную цену печати'
                : preliminaryPrice
                  ? <div className="mt-2">
                      Предварительная цена: {preliminaryPrice.toFixed(2)}р
                  </div>
                  : <div className="mt-2">
                      ...
                  </div>
              }
              { product.price
                ? <div className="mt-2">
                    Итоговая стоимость: {product.price.toFixed(2)}р
                </div>
                : null

              }
              <div className="mt-4">
                { product.status === 'READY_FOR_PRINTING'
                  ? <Button onClick={this.setStatusOperatorsCheck}>Отправить на проверку</Button>
                  : null
                }
                { product.status === 'WAITING_FOR_PAYMENT'
                  ? <Button onClick={payForProduct.bind(this, product.id)}>Оплатить</Button>
                  : null
                }
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPage)