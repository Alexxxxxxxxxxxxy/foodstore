import { useContext, useEffect, useState } from 'react';
import assets from '../assets/asset.ts'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext.tsx';

const NavBar = ({setShow}:{setShow:Function}) => {
  const navigate = useNavigate();
  const [state,setState] = useState("home")
  const [menu,setMenu] = useState(false)

  const context = useContext(StoreContext)
  if(!context){
    throw new Error("Navbar must be used within StoreContextProvider")
  }

  const {getTotalCost,token,setToken, setCartItems, setOrders} = context
  const subtotal = getTotalCost()

  const handleClick = ()=>{
    setToken("")
    localStorage.removeItem("token")
    setCartItems({})
    setOrders([])
    navigate("/")
  }

  useEffect(()=>{
    if(localStorage.getItem("token"))setToken(localStorage.getItem("token"))
  },[])

  return (
    <div className='relative flex flex-row w-full justify-around items-center'>
        <img src={assets.logo} alt="logo" className='md:w-35 md:h-35 m-0 h-25 hover:cursor-pointer' onClick={()=>navigate('/')}/>
        <div className='flex flex-row gap-3 items-center md:gap-5'>
          <Link to={'/'}><p onClick={()=>setState("home")} className={`${state==="home"?"active":""} hover:cursor-pointer md:text-base text-sm`}>主页</p></Link>
          <a href='#menu' onClick={()=>setState("menu")} className={`${state==="menu"?"active":""} hover:cursor-pointer md:text-base text-sm`}>菜单</a>
          <a href='#app' onClick={()=>setState("mobile")} className={`${state==="mobile"?"active":""} hover:cursor-pointer md:text-base text-sm`}>移动端</a>
          <a href='#footer' onClick={()=>setState("contact")} className={`${state==="contact"?"active":""} hover:cursor-pointer md:text-base text-sm`}>联系我们</a>
        </div>
        <div className='flex flex-row  gap-3 md:gap-5 items-center'>
          <img src={assets.search_icon} alt="search" className='md:w-10 md:h-10 h-4 hover:cursor-pointer' />
          <div className='relative'>
            <Link to={'/cart'}><img src={assets.basket} alt="basket" className='md:w-10 md:h-10 h-4 hover:cursor-pointer' /></Link>
            {/* 没有购买就不显示 */}
            <div className={`absolute bg-red-400 min-w-2.5 min-h-2.5 rounded-full -top-2 -right-2 ${subtotal>0?"":"hidden"}`}></div>
          </div>
          {!token?
            <button onClick={()=>setShow((prev:boolean)=>!prev)} className='transition-all duration-300 text-white bg-black md:px-3 md:py-2 px-1 py-1/2 rounded-xl hover:cursor-pointer hover:bg-gray-500'>登录</button>:
            <div className='relative group'>
              <img src={assets.profile_icon} alt="profile" className='md:w-10 md:h-10 h-6 hover:cursor-pointer'/>
              <div className="absolute w-0 h-0 border-l-8 border-r-8 md:border-l-15 md:border-r-15 md:border-b-15 border-b-8 border-l-transparent border-r-transparent border-b-black hidden group-hover:block"></div>

              <div className='absolute hidden group-hover:flex group-hover:flex-col min-w-9 group-hover:items-center group-hover:justify-center -left-4 gap-2 border p-0.5 rounded-sm bg-gray-600 z-50 md:min-w-20 md:p-2 top-8 md:top-12'>
                <div className='flex flex-col'>
                  <Link to={'/myorder'}><p className='text-white hover:underline hover:cursor-pointer md:text-base text-sm hover:text-red-500'>订单</p></Link>
                  <p onClick={handleClick} className='text-white hover:underline hover:cursor-pointer md:text-base text-sm hover:text-red-500'>注销</p>
                </div>
              </div>
            </div>
          }

          {/* 移动端响应式菜单 */}
          <div className='md:hidden'>
            <img onClick={()=>setMenu(true)} src={assets.menu} alt="menu" className='h-4'/>
          </div>
        </div>
        {menu?
          <div className='w-full h-full z-50 fixed inset-0 bg-gray-400 flex flex-col gap-3 py-3 px-3'>
            <p onClick={()=>setMenu(false)} className='text-2xl'>{'<'}</p>
            <p onClick={()=>setMenu(false)} className='text-white hover:underline hover:cursor-pointer text-xl hover:text-red-500 border-b'>返回</p>
            <Link to={'/myorder'}><p onClick={()=>setMenu(false)} className='text-white hover:underline hover:cursor-pointer text-xl hover:text-red-500 border-b'>订单</p></Link>
            <p onClick={()=>{handleClick();setMenu(false)}} className='text-white hover:underline hover:cursor-pointer text-xl hover:text-red-500 border-b'>注销</p>
          </div>:
          <></>
        }
    </div>
  )
}

export default NavBar