import { onMounted,onUnmounted, onActivated,onDeactivated } from 'vue'
import * as  _ from 'lodash'
import { ref } from 'vue'
export default function useScroll (elRef) {

    let el = window
    const scrollTop  = ref(0)
    const scrollHeight = ref(0)
    const clientHeigt  = ref(0)
    const isReachBottom = ref(false)

    const scrollListenerHandler = _.throttle( () => {
      if(el === window){
        scrollTop.value = document.documentElement.scrollTop;
        scrollHeight.value = document.documentElement.scrollHeight;
        clientHeigt.value = document.documentElement.clientHeight;
      } else {
        scrollTop.value = el.scrollTop;
        scrollHeight.value = el.scrollHeight;
        clientHeigt.value = el.clientHeight;
      }


    if (clientHeigt.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  },100)
  
  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler);
  })
  onUnmounted(()=> {
    el.removeEventListener("scroll", scrollListenerHandler);
  })
  onActivated(() => {
    el.addEventListener("scroll",scrollListenerHandler);
  })
  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  })

  return  { scrollTop,scrollHeight,clientHeigt,isReachBottom }
}
