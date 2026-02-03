import axios from "axios"
import assets from "../assets/assets"
import { toast } from "react-toastify";

export interface Food {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export type FoodWithQuantity = Food & {quantity:number}

export interface OrderData{
    _id:string; 
    totalAmount: number;
    subject: string;
    data: FoodWithQuantity[];
    userId: string;
    out_trade_no: string;
    status: string;
}

const OrderItem = ({obj,url,fetchOrders}:{obj:OrderData,url:string,fetchOrders:Function}) => {

  const handleClick = async ()=>{
    axios.post(`${url}/ali/update`,{out_trade_no:obj.out_trade_no})
    .then(()=>{
      toast.success("出餐成功",{draggable:false,autoClose:2000})
      fetchOrders()
    }).catch(()=>{
      toast.error("出餐失败",{draggable:false,autoClose:2000})
    })
  }

  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] md:gap-5 items-center justify-center my-2 gap-1">
        <img src={assets.pakage} alt="pakage" className="md:w-35 md:h-35 w-20 h-20"/>
        <p className="md:text-base text-sm">{obj.out_trade_no}</p>
        <p className="md:text-base text-sm">￥{obj.totalAmount}</p>
        <div>
          {obj.status==="paid"?
            <div className="flex flex-row items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <p className="text-sm md:text-base">商家备餐中</p>
            </div>:
            <div className="flex flex-row items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm md:text-base">配送中</p>
            </div>
          } 
        </div>
        <button onClick={handleClick} className="bg-gray-600 text-white p-2 rounded-xl hover:cursor-pointer active:bg-gray-800">出餐</button>
    </div>
  )
}

export default OrderItem