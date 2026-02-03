import type { OrderData } from "../context/StoreContext"
import assets from "../assets/asset"


const OrderItem = ({obj}:{obj:OrderData}) => {
  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] md:gap-5 items-center justify-center my-2 gap-1">
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
    </div>
  )
}

export default OrderItem