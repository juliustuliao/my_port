import Portfolio from './components/Portfolio'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Portfolio />
      <Analytics />
    </>
  )
}

export default App