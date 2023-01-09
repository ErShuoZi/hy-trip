import {defineStore} from 'pinia'
import { fetchCityAll } from "../../service/index";
const useCity = defineStore("city",{
  state:()=>({
    allCity:{},
    currentCity:{
      cityId:45,
      cityName:"广州",
      gangAoTai:false,
      hot:false,
      latitude:"23.1354",
      longitude:"113.271",
      pinYin:"guangzhou",
    }
  }),
  actions:{
    fetchAllCityActions(){
      fetchCityAll().then((res) => {
        this.allCity = res.data;
      });
    }
  }
})

export default useCity