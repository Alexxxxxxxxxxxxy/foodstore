import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StoreContextProvider from './context/StoreContext.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
        <ToastContainer/>
    </>
)
