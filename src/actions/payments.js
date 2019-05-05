import { getProduct } from './products'
import { Api } from '../api'

export const payForProduct = (id) => {
  return (dispatch) => {
    fetch(`//${Api.apiUrl}/payments/success/${id}`, {
      method: 'POST'
    }).then(response => {
      if (response.ok){
        dispatch(getProduct(id))
        alert(`Заказ №${id} оплачен`)
      } else {
        alert(`Ошибка оплаты`)
      }
    })
  }
}