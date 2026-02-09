import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Add from "./pages/Add"
import List from "./pages/List"
import Order from "./pages/Order"


const App = () => {

  const url = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000' 
    : '/api';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Add url={url}/>}/>
        <Route path="/list" element={<List url={url}/>}/>
        <Route path="/order" element={<Order url={url}/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App