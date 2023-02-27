import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Head from './comp/head'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Head/>
    </div>
  )
}

export default App
