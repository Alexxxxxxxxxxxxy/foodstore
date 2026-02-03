import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import OrderItem from "../components/OrderItem"


const Order = ({url}:{url:string}) => {
  const [orders,setOrders] = useState([])

  const fetchOrders = async ()=>{
    try{
      const response = await axios.get(`${url}/ali/list`)
      if(response.data.data){
        setOrders(response.data.data)
        toast.success("获取订单成功",{draggable:false,autoClose:2000})
      }else{
        toast.error("获取订单失败",{draggable:false,autoClose:2000})
      }
    }catch(err){
      toast.error("获取订单失败",{draggable:false,autoClose:2000})
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className="flex flex-col gap-3 w-screen md:px-15 md:my-10">
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] md:gap-5 items-center justify-center my-2">
        <p> </p>
        <p className="md:text-base text-sm font-semibold">订单号</p>
        <p className="md:text-base text-sm font-semibold">金额</p>
        <p className="md:text-base text-sm font-semibold">状态</p>
        <p> </p>
      </div>
      <hr className="border-none bg-gray-500 w-full h-0.5"/>
      {orders.map((item,index)=>{
        return (
          <div key={index}>
            <OrderItem obj={item} url={url} fetchOrders={fetchOrders}/>
            <hr className="border-none bg-gray-500 w-full h-0.5"/>
          </div>
        )
      })

      }
    </div>
  )
}

export default Order