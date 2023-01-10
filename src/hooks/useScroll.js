import { onMounted,onUnmounted, onActivated,onDeactivated } from 'vue'
import * as  _ from 'lodash'
import { ref } from 'vue'
const scrollTop  = ref(0)
const scrollHeight = ref(0)
const clientHeigt  = ref(0)
  function useScroll (cb) {

  const scrollListenerHandler = _.throttle( () => {
    scrollTop.value = document.documentElement.scrollTop;
    scrollHeight.value = document.documentElement.scrollHeight;
    clientHeigt.value = document.documentElement.clientHeight;

    if (clientHeigt.value + scrollTop.value >= scrollHeight.value) {
      if(cb) cb()
    }
  },100)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  })
  onUnmounted(()=> {
    window.removeEventListener("scroll", scrollListenerHandler);
  })
  onActivated(() => {
    window.addEventListener("scroll",scrollListenerHandler);
  })
  onDeactivated(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  })
}

export  {useScroll ,scrollTop,scrollHeight,clientHeigt}