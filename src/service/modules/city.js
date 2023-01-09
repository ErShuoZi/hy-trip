import LSRequest from '../request/request'

export function fetchCityAll() {
  return LSRequest.request({
    url:"/city/all",
    method:"get"
  })
}