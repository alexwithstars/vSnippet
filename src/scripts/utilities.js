export async function copyToClipboard (text) {
  await navigator.clipboard.writeText(text)
    .catch(() => {
      return false
    })
  return true
}
