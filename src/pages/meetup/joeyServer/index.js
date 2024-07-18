import axios from 'axios'
import { API_HOST } from '../../../config'

export default axios.create({
  baseURL: API_HOST,
})
