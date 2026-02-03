import React, { useContext, useState } from "react"
import { StoreContext, type Food } from "../context/StoreContext"
import axios from "axios"
import { toast } from "react-toastify"

export type FoodWithQuantity = Food & {quantity:number}

const Order = () => {
    const url = "http://localhost:8000"
    const context = useContext(StoreContext)
    if(!context){
        throw new Error("Order must be used within StoreContextProvider")
    }

    const {getTotalCost,food_list,cartItems} = context

    const subtotal = getTotalCost()

    const [lastname,setLastname] = useState("")
    const [firstname,setFirstname] = useState("")
    const [email,setEmail] = useState("")
    const [province,setProvince] = useState("")
    const [city,setCity] = useState("")
    const [detail,setDetail] = useState("")
    const [phone,setPhone] = useState("")

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            // 添加信息到数据库
            const data:FoodWithQuantity[] = []
            food_list.map((item)=>{
                if(cartItems[item._id]>0){
                    let ItemInfo:FoodWithQuantity = item as FoodWithQuantity
                    ItemInfo["quantity"]=cartItems[item._id]
                    data.push(ItemInfo)
                }
            })

            // 跳转到支付页面
            const totalAmount = subtotal+2
            const subject = "Veona食品消费"
            const payment = await axios.post(`${url}/ali/pay`,{totalAmount,subject,data:data},{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            console.log(payment)
            if(payment.data.status===400)return toast.error(payment.data.message)
            document.write(payment.data)
        }catch(err){
            console.log(err)
        }
     }

  return (
    <div className="md:px-15">
        <form className="flex md:flex-row flex-col md: justify-between my-5" onSubmit={e=>handleSubmit(e)}>
            <div className="flex flex-col gap-3 md:w-1/2">
                <p className="text-3xl font-bold my-5">快递地址信息</p>
                <div className="flex gap-3 md:w-2/3 justify-between">
                    <input onChange={(e)=>setLastname(e.target.value)} value={lastname} required type="text" placeholder="姓" className="border border-gray-500 rounded-xl px-2 py-2 w-1/2"/>
                    <input onChange={(e)=>setFirstname(e.target.value)} value={firstname} required type="text"placeholder="名"  className="border border-gray-500 rounded-xl px-2 py-2 w-1/2"/>
                </div>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" placeholder="邮箱" className="border border-gray-500 rounded-xl px-2 py-2 md:w-2/3"/>
                <div className="flex gap-3 md:w-2/3 justify-between">
                    <input onChange={(e)=>setProvince(e.target.value)} value={province} required type="text" placeholder="省份" className="border border-gray-500 rounded-xl px-2 py-2 w-1/2"/>
                    <input onChange={(e)=>setCity(e.target.value)} value={city} required type="text"placeholder="城市"  className="border border-gray-500 rounded-xl px-2 py-2 w-1/2"/>
                </div>
                <input onChange={(e)=>setDetail(e.target.value)} value={detail} required type="text" placeholder="详细地址" className="border border-gray-500 rounded-xl px-2 py-2 md:w-2/3"/>
                <input onChange={(e)=>setPhone(e.target.value)} value={phone} required type="text" placeholder="电话" className="border border-gray-500 rounded-xl px-2 py-2 md:w-2/3"/>
            </div>
            <div className="flex flex-col items-start my-8 md:my-10 gap-2 md:w-5/13">
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
                <button type="submit" className="text-white px-4 py-2 bg-amber-600 rounded-xl w-1/3 hover:bg-amber-900 hover:cursor-pointer my-2">支付</button>
            </div>
        </form>
    </div>
  )
}

export default Order