import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { FoodWithQuantity } from "../pages/Order";

export interface Food {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface OrderData{
    _id:string; 
    totalAmount: number;
    subject: string;
    data: FoodWithQuantity[];
    userId: string;
    out_trade_no: string;
    status: string;
}

/* Context 类型 */
interface StoreContextType {
  food_list: Food[];
  cartItems:{[key:string]:number};
  setCartItems:Function;
  addToCart:Function;
  removeFromCart:Function;
  show:boolean;
  setShow:Function;
  getTotalCost:Function;
  token:string;
  setToken:Function;
  getCart:Function;
  orders:OrderData[];
  setOrders:Function;
  getOrder:Function;
}

export const StoreContext = createContext<StoreContextType|null>(null)

const StoreContextProvider = (props:any)=>{
    const url = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : '/api';
    const [token,setToken] = useState("")
    
    // 从数据库获取数据
    const [food_list,setFood_list] = useState<Food[]>([])
    const [orders, setOrders] = useState<OrderData[]>([])

    const getFood_list = async ()=>{
        try{
            const response = await axios.get(`${url}/api/food/list`)
            const foods = response.data.data
            setFood_list(foods.map((item:Food)=>{
                return {...item,image:`${url}/images/`+item.image}
            }))
        }catch(err){
            toast.error("获取商品信息出错",{draggable:false,autoClose:2000})
        }
    }

    const getCart = async ()=>{
        try{
            const response = await axios.post(`${url}/api/cart/list`,{},{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            if(response.data.data)setCartItems(response.data.data)
            else toast.error(response.data.Message,{draggable:false,autoClose:2000})
        }catch(err){
            toast.error("请先登录",{draggable:false,autoClose:2000})
        }
    }

    const getOrder = async ()=>{
        try{
            const response = await axios.post(`${url}/ali/list`,{},{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            if(response.data.data)setOrders(response.data.data)
            else toast.error(response.data.Message,{draggable:false,autoClose:2000})
        }catch(err){
            toast.error("请先登录",{draggable:false,autoClose:2000})
        }
    }

    useEffect(()=>{
        getFood_list()
        getCart()
        getOrder()
    },[])

    // 添加物品到购物车
    const [cartItems,setCartItems] = useState<{[key:string]:number}>({})
    const [show,setShow] = useState(false)

    // useEffect(()=>{
    //     console.log(cartItems)
    // },[cartItems])

    const addToCart = (ItemId:string)=>{
        if(!token){
            if(!cartItems[ItemId]){
                return setCartItems(prev=>({...prev,[ItemId]:1}))
            }else{
                return setCartItems(prev=>({...prev,[ItemId]:prev[ItemId]+1}))
            }
        }
        try{
            axios.post(`${url}/api/cart/add`,{ItemId},{
                headers:{
                    token:localStorage.getItem("token")
                }
            }).then(()=>{
                getCart()
            }).catch(err=>{
                toast.error(err.response.data.message,{draggable:false,autoClose:2000})
            })
        }catch(err){
            toast.error("修改购物车信息出错",{draggable:false,autoClose:2000})
        }
    }

    // 删除物品在购物车
    const removeFromCart = (ItemId:string)=>{
        if(!token){
            if(!cartItems[ItemId]){
                return
            }else{
                return setCartItems(prev=>({...prev,[ItemId]:prev[ItemId]-1}))
            }
        }
        try{
            axios.post(`${url}/api/cart/remove`,{ItemId},{
                headers:{
                    token:localStorage.getItem("token")
                }
            }).then(()=>{
                getCart()
            }).catch(err=>{
                toast.error(err.response.data.message,{draggable:false,autoClose:2000})
            })
        }catch(err){
            toast.error("修改购物车信息出错",{draggable:false,autoClose:2000})
        }
    }

    // 获得购物车所有商品加起来的总和
    const getTotalCost = ()=>{
        let total = 0
        for(const item in cartItems){
            const itemInfo = food_list.find((product)=>product._id===item)
            if (!itemInfo) {
                throw new Error(`Food item ${item} not found`)
            }
            total+=itemInfo.price * cartItems[item]
        }
        return total
    }

    const contextValue: StoreContextType = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        show,
        setShow,
        getTotalCost,
        token,
        setToken,
        getCart,
        orders,
        setOrders,
        getOrder
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
