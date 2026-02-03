import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { useNavigate } from "react-router-dom"


const Cart = () => {
  const context = useContext(StoreContext)
  if(!context){
    throw new Error("Cart must be used within StoreContextProvider")
  }

  const {food_list,cartItems,removeFromCart,getTotalCost} = context

  const subtotal = getTotalCost()

  const navigate = useNavigate()

  return (
    <div className="md:px-15">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center">
        <p>物品</p>
        <p>名称</p>
        <p>单价</p>
        <p>数量</p>
        <p>总金额</p>
        <p>移除商品</p>
      </div>
      <br />
      <hr className="border-none bg-gray-500 w-full h-0.5"/>

      {food_list.map((item,index)=>{
        if(cartItems[item._id]>0){
          return (
            <div key={index}>
              <div key={index} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center my-2">
                <img src={item.image} alt="image" className="w-20 h-20"/>
                <p>{item.name}</p>
                <p>￥{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>￥{item.price*cartItems[item._id]}</p>
                <p onClick={()=>{removeFromCart(item._id)}} className="hover:cursor-pointer">X</p>
              </div>
              <hr className="border-none bg-gray-500 w-full h-0.5"/>
            </div>
          )
        }
      })}

      <div className="flex flex-col items-start my-8 md:my-10 gap-2 w-full md:w-5/13">
        <p className="text-3xl font-bold my-3">总账单</p>
        <div className="flex justify-between w-full">
          <p>商品总和</p>
          <p>￥{subtotal}</p>
        </div>
        <hr className="border-none bg-gray-300 w-full h-0.5"/>
        <div className="flex justify-between w-full">
          <p>运费总和</p>
          <p>￥{subtotal?2:0}</p>
        </div>
        <hr className="border-none bg-gray-300 w-full h-0.5"/>
        <div className="flex justify-between w-full">
          <p className="font-bold">总和</p>
          <p className="font-bold">￥{subtotal?subtotal+2:0}</p>
        </div>
        <button onClick={()=>{
          if(subtotal!==0)navigate('/order')
          }} className="text-white px-4 py-2 bg-amber-600 rounded-xl w-1/3 hover:bg-amber-900 hover:cursor-pointer my-2">提交订单</button>
      </div>
    </div>
  )
}

export default Cart