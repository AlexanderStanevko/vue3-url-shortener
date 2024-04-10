import { scroll } from 'quasar'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const HEADER_SHIFT = 70

export const SCROLL_DURATION = 500

const DEFAULT_SCROLL_TARGET = document.getElementById('q-app')

export const scrollToElement = (el) => {
  const target = getScrollTarget(el)
  const offset = el.offsetTop

  setVerticalScrollPosition(target, offset - HEADER_SHIFT, SCROLL_DURATION)
}

export const scrollTo = (offset) => {
  if (DEFAULT_SCROLL_TARGET) {
    const target = getScrollTarget(DEFAULT_SCROLL_TARGET)

    setVerticalScrollPosition(target, offset - HEADER_SHIFT, SCROLL_DURATION)
  }

}

export const scrollTop = () => {
  scrollToElement(DEFAULT_SCROLL_TARGET)
}
