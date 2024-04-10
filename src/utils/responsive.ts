import { ref } from 'vue'

const mobileMaxWidth = 1023
const isMobile = ref(false)
const isDesktop = ref(false)

const checkScreenType = () => {
  isMobile.value = window.innerWidth <= mobileMaxWidth
  isDesktop.value = !isMobile.value
}

checkScreenType()
window.addEventListener('resize', checkScreenType)

export default {
  isDesktop,
  isMobile,
}
