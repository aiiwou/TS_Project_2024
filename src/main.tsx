
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import './css/basic.css'
import './css/var.css'



ReactDOM.createRoot(document.getElementById('root')!).render(

     <BrowserRouter>
        <App />
      </BrowserRouter>

)
