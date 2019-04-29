import React from 'react'
import { Button } from 'react-bootstrap'
const statuses = {
  WAITING_FOR_PROCESSING: 'Ожидание обработки',
  PROCESSING: 'Обработка',
  PROCESSING_ERROR: 'Ошибка обработки',
  READY_FOR_PRINTING: 'Готов к печати',
  OPERATORS_CHECK: 'Проверка оператором',
  UNPRINTABLE: 'Невозможно напечатать',
  WAITING_FOR_PAYMENT: 'Ожидание оплаты',
  PAID: 'Оплачено',
  REFUND_BY_USER: 'Возврат средств пользователем',
  PRINTING: 'Печать',
  REFUND_BY_OPERATOR: 'Возврат средств оператором',
  TRANSFER: 'Передача клиенту',
  COMPLETED: 'Завершен',
  DELETED: 'Удален',
}
const ProductItem  = props => {
  const { product, onDelete, onClick } = props
  return <div className="d-flex align-items-center">
    <div onClick={onClick} style={{cursor: 'pointer'}} title="Название изделия">{product.name}</div>
    <div title="Статус изделия"className="ml-4" style={{color: 'grey'}}>{statuses[product.status]}</div>
    <Button size="sm" className="ml-auto" variant="danger" onClick={onDelete || null}>Удалить</Button>
  </div>
}

export default ProductItem