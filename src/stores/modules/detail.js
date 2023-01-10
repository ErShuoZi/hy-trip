import { defineStore } from "pinia";
import { fetchDetailPageData } from '@/service/index'

const  useDetailStore = defineStore("detail",{
  state:() => ({
    detailInfos:{},
    currentHouse: {},
    mainPart:{},
    pricePart:{},
    popupUpJson:{},
    topModule:{}
  }),
  actions:{
    async fetchDetailPageDataAction(houseId) {
      const res = await fetchDetailPageData(houseId)
      this.mainPart = res.data.mainPart
    }
  }
})

export default useDetailStore