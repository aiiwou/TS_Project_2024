import { useEffect } from 'react'
import UserList from './components/UserList'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Header'
import UserPage from './UserPage'
import RegPage from './RegPage'


import useLocalStorage from './types/UseLocalStorage'




function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const [token, ] = useLocalStorage("token")
    const data = token.token
    if (!data) {
      navigate('/reg')
    }
  }, [])


  return (

      <div className=''>
        <Header />
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/:id' element={<UserPage />} />
          <Route path='/reg' element={<RegPage />} />
        </Routes>
      </div>

  )
}

export default App
