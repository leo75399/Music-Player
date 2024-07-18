//was installed with react-router-dom
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const joeyLink = (path) => (e) => {
  // allow open new window
  if (e.metaKey || e.ctrlKey) return

  e.preventDefault()
  history.push(path)
}

export default joeyLink
