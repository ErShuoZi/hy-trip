import { formatMonthDay ,getDiffDate} from "@/utils/format_date";
import dayjs from "dayjs";
import {ref} from 'vue'
import { defineStore } from "pinia";
const nowDate = ref(formatMonthDay(new Date()));
const leaveDate = ref(formatMonthDay(dayjs(new Date()).add(1, "day")));
const stayCount = ref(getDiffDate(new Date(), dayjs(new Date()).add(1, "day")));
const useMainStore = defineStore("Main",{
  state:()=>({
    nowDate,
    leaveDate,
    stayCount,
    isLoading:false
  })
 })

 export default useMainStore