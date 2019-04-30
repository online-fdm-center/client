import React, { Component } from "react"
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getMyProducts, deleteProduct } from '../actions/products'
import ProductItem from './ProductItem'

const mapStateToProps = ({products}) => ({
  myProducts: products.myProducts.map(id => products.byId[id]),
  preliminaryPrices: products.preliminaryPrices
})
const mapDispatchToProps = (dispatch) => ({
  getMyProducts: () => dispatch(getMyProducts()),
  deleteProduct: (id) => dispatch(deleteProduct(id))
})

class OrdersPage extends Component {
  constructor(props){
    super()
    props.getMyProducts()
  }
  productClickHandler = (id) => {
    this.props.history.push(`/products/${id}`)
  }
  render(){
    const { myProducts, preliminaryPrices, deleteProduct } = this.props
    if (myProducts.length === 0) {
      return <Container><h2>Заказы</h2>Заказов нет.</Container>
    }
    const newProducts = myProducts.filter(product => 
      product.status === 'WAITING_FOR_PROCESSING' ||
      product.status === 'PROCESSING' ||
      product.status === 'READY_FOR_PRINTING' ||
      product.status === 'PROCESSING_ERROR'
    )
    const inProgressProducts = myProducts.filter(product => 
      product.status === 'OPERATORS_CHECK' ||
      product.status === 'UNPRINTABLE' ||
      product.status === 'WAITING_FOR_PAYMENT' ||
      product.status === 'PAID' ||
      product.status === 'REFUND_BY_USER' ||
      product.status === 'PRINTING' ||
      product.status === 'REFUND_BY_OPERATOR' ||
      product.status === 'TRANSFER'
    )
    const completedProducts = myProducts.filter(product => 
      product.status === 'COMPLETED' ||
      product.status === 'DELETED'
    )
    return <Container>
      <h2>Заказы</h2>
      <h3>Новые</h3>
      <ListGroup>
        { newProducts.map(product => (
          <ListGroup.Item
            key={product.id}
            as="div"
          >
            <ProductItem
              product={product}
              preliminaryPrice={preliminaryPrices[product.id]}
              onDelete={deleteProduct.bind(this, product.id)}
              onClick={this.productClickHandler.bind(this, product.id)}
            />
          </ListGroup.Item>
        ))
        }
      </ListGroup>
      { inProgressProducts.length > 0
        ? <>
          <h3>В работе</h3>
          <ListGroup>
            { inProgressProducts.map(product => (
              <ListGroup.Item
                key={product.id}
                as="div"
              >
                <ProductItem
                  product={product}
                  onDelete={deleteProduct.bind(this, product.id)}
                  onClick={this.productClickHandler.bind(this, product.id)}
                />
              </ListGroup.Item>
            ))
            }
          </ListGroup>
        </>
        : null
      }
      { completedProducts.length > 0
        ? <>
          <h3>Завершенные</h3>
          <ListGroup>
            { completedProducts.map(product => (
              <ListGroup.Item
                key={product.id}
                as="div"
              >
                <ProductItem
                  product={product}
                  onDelete={deleteProduct.bind(this, product.id)}
                  onClick={this.productClickHandler.bind(this, product.id)}
                />
              </ListGroup.Item>
            ))
            }
          </ListGroup>
        </>
        : null
      }
    </Container>
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(OrdersPage))