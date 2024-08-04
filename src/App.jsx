import './App.css'
import { RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import { router } from './router/router'

function App() {
  return (
    <RouterProvider router={router}>
      <Body />
    </RouterProvider>
  )
}

export default App;
