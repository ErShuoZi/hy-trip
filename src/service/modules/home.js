import LSRequest from '../request/request'
export function fetchHomeHotSuggest() {
  return LSRequest.request({
    url:"/home/hotSuggests",
    method:"get"
  })
}
export function fetchHomeCategory() {
  return LSRequest.request({
    url:"/home/categories",
    method:"get"
  })
}

export function fetchHouseListData(currentPage) {
  return LSRequest.request({
    url:"/home/houselist",
    method:"get",
    params:{
      page:currentPage
    }
  })
}

