import LSRequest from '../request/request'

export function fetchDetailPageData(houseId) {
  return LSRequest.request({
    url:"/detail/infos",
    method:"get",
    params:{
      houseId:houseId
    }
  })
}