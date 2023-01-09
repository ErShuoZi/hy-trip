import { defineStore } from 'pinia'
import { fetchHomeHotSuggest,fetchHomeCategory,fetchHouseListData } from "../../service/index";
const useHome = defineStore("Home",{
  state:() => ({
    hotSuggests:[],
    categories:[],
    houseList:[],
    currentPage:1
  }),
  actions:{
    async fetchHomeSuggestsAction() {
       const res = await fetchHomeHotSuggest()
       this.hotSuggests = res.data
    },
    async fetchHomeCategoryAction() {
      const res = await fetchHomeCategory()
      this.categories = res.data
   },
   async fetchHouseListAction() {
    const res = await fetchHouseListData(this.currentPage++)
    this.houseList.push(...res.data)
 }
  },
  
})
export default useHome