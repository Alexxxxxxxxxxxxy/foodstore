import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const RootLayout = () => {
  const context = useContext(StoreContext)
  
  if(!context){
    throw new Error("App must be used within StoreContextProvider")
  }
  const {setShow} = context;

  return (
    <>
        <NavBar setShow={setShow}/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default RootLayout