import assets from "../assets/assets"
import { NavLink } from "react-router-dom"

const NavBar = () => {

  return (
    <>
      <div className="md:px-35 flex flex-row justify-between items-center">
        <img src={assets.logo} alt="logo" className="w-20 h-20 md:w-35 md:h-35"/>
        <div className="flex flex-row items-center justify-center gap-3 md:gap-5">
          <NavLink to={'/'}><p className={`hover:cursor-pointer ${status==="add"?"active":""}`}>添加商品</p></NavLink>
          <NavLink to={'/list'}><p className={`hover:cursor-pointer ${status==="list"?"active":""}`}>查看商品</p></NavLink>
          <NavLink to={'/order'}><p className={`hover:cursor-pointer ${status==="order"?"active":""}`}>查看订单</p></NavLink>
        </div>
        <img src={assets.profile_image} alt="profile" className="md:w-15 md:h-15 w-10 h-10 hover:cursor-pointer"/>
      </div>
      <hr className="my-2"/>
    </>
  )
}

export default NavBar