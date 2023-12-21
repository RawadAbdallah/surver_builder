import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Error404 from '../pages/error'
import Home from '../pages/home'
import AuthPage from '../pages/auth'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="*" element={<Error404 />} />       
      </Routes>
    </BrowserRouter>
  )
}

export default App
