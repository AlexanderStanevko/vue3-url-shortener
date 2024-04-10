export const isLoginInputEvent = (event: KeyboardEvent) => {
  const { key } = event

  // Only digits are allowed
  if ((key !== 'Delete' && key !== 'Backspace') && (isNaN(Number(key)) || key === ' ')) {
    event.preventDefault()
  } else {
    return true
  }
}
