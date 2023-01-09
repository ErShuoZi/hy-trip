import axios from 'axios'
import {BASE_URL,BASE_TIME_OUT} from './requestConfig'
class LSRequest {
  constructor() {
    this.instance = axios.create({
      baseURL:BASE_URL,
      timeout:BASE_TIME_OUT
    })
  }
  request(config){
   return new Promise((resolve,reject) => {
    this.instance.request(config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
   })
  }
  get(config) {
    return this.request({...config,method:"get"})
  }
  post(config) {
    return this.request({...config,method:"post"})
  }
  delete() {
    return this.request({...config,method:"post"})
  }
}

export default new LSRequest(BASE_URL,BASE_TIME_OUT)