import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import OrderItem from "../components/OrderItem"


const Myorder = () => {
  const context = useContext(StoreContext)

  if(!context){
    throw new Error("Myorder must be used within StoreContextProvider")
  }

  const {orders} = context

  return (
    <div className="flex flex-col gap-3 w-screen md:px-15 md:my-10">
      <p className="w-full text-center my-2 text-3xl font-bold">我的订单</p>
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] md:gap-5 items-center justify-center my-2">
        <p> </p>
        <p className="md:text-base text-sm font-semibold">订单号</p>
        <p className="md:text-base text-sm font-semibold">金额</p>
        <p className="md:text-base text-sm font-semibold">状态</p>
      </div>
      <hr className="border-none bg-gray-500 w-full h-0.5"/>
      {orders.map((item,index)=>{
        return (
          <div key={index}>
            <OrderItem obj={item}/>
            <hr className="border-none bg-gray-500 w-full h-0.5"/>
          </div>
        )
      })

      }
    </div>
  )
}

export default Myorder