import axios from "axios";
import { toast } from "react-toastify";

interface Food{
    _id:string;
    name:string;
    description:string;
    price:string;
    category:string;
    image:string;
}

const FoodItem = ({food,fetchList,url}:{food:Food,fetchList:Function,url:string}) => {

    const handleClick = async (a:string)=>{
        const data = {id:a}
        const response = await axios.delete(`${url}/api/food/remove`,{data})
        if(response.status===200){
            toast.success("删除商品成功",{draggable:false,autoClose:2000})
            fetchList()
        }else{
            toast.error("删除商品失败!",{draggable:false,autoClose:2000})
        }
    }
  return (
    <div className="w-full">
        <div className="grid grid-cols-[1fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr] md:gap-5 gap-2 items-center justify-start">
            <img src={`${url}/images/`+food.image} alt="image" className="object-cover md:w-50 md:h-50 h-30 w-30"/>
            <p>{food.name}</p>
            <p>{food.description}</p>
            <p>￥{food.price}</p>
            <p>{food.category}</p>
            <p className="hover:cursor-pointer hover:text-red-600" onClick={()=>handleClick(food._id)}>X</p>
        </div>
        <hr className="my-2"/>
    </div>
  )
}

export default FoodItem