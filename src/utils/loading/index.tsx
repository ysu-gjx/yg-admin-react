import { createRoot } from 'react-dom/client'
import Loading from './Loading'

let count = 0
export const startLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)

    const root = createRoot(loading)
    root.render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  if (count <= 0) return
  count--
  if (count === 0) {
    const container = document.getElementById('loading')
    if (container) {
      document.body.removeChild(container)
    }
  }
}
