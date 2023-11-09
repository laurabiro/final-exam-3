
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//@ts-ignore
import { makeServer } from '../api'
makeServer({ environment: 'development' })
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <App />

)
