import { getMaterials } from './materials'
import { getQualities } from './qualities'

/**Хранилище действий, которые нужно выполнить после авторизации */
const afterAuth = [
  getMaterials,
  getQualities
]
export default afterAuth