import React from 'react'
import { Button } from 'react-bootstrap'
import statuses from '../constants/productStatuses'

const ProductItem  = props => {
  const { product, preliminaryPrice, onDelete, onClick } = props
  return <div className="d-flex align-items-center">
    <div onClick={onClick} style={{cursor: 'pointer'}} title="Название изделия">{product.name}</div>
    {preliminaryPrice ? <div title="Примерная цена" className="ml-4" >~{preliminaryPrice.toFixed(2)}р.</div> : null }
    <div title="Статус изделия" className="ml-4" style={{color: 'grey'}}>{statuses[product.status]}</div>
    <Button size="sm" className="ml-auto" variant="danger" onClick={onDelete || null}>Удалить</Button>
  </div>
}

export default ProductItem