import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout.tsx';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import Login from './components/Login.tsx';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext.tsx';
import Order from './pages/Order.tsx';
import Success from './pages/Success.tsx';
import Myorder from './pages/Myorder.tsx';

const App = () => {

  const context = useContext(StoreContext);

  if(!context){
    throw new Error("App must be used within StoreContextProvider")
  }
  const {show} = context;

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<Order/>} />
        <Route path='/success' element={<Success/>}/>
        <Route path='/myorder' element={<Myorder/>}/>
      </Route>
    )
  )

  return (
    <>
      {show?<Login/>:<></>}
      <RouterProvider router={route}/>
    </>
  )
}

export default App