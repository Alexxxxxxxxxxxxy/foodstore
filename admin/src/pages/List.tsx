import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FoodItem from "../components/FoodItem"


const List = ({url}:{url:string}) => {

  const [list,setList] = useState<any[]>([])

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.status===200){
      setList(response.data.data)
      toast.success("获取商品列表成功!",{draggable:false,autoClose:2000})
    }else{
      toast.error("获取商品列表失败!",{draggable:false,autoClose:2000})
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className="md:px-15 py-2">
      <p className="text-3xl my-5">所有商品列表</p>
      <div className="grid grid-cols-[1fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr] md:gap-5 gap-2 items-center justify-start">
        <p className="text-xl font-bold">图片</p>
        <p className="text-xl font-bold">名称</p>
        <p className="text-xl font-bold">描述</p>
        <p className="text-xl font-bold">价格</p>
        <p className="text-xl font-bold">分类</p>
        <p className="text-xl font-bold">操作</p>
      </div>
      <hr className="my-2"/>
      <div className="flex flex-col gap-5">
        {list.map((item,index)=>{
            return (
              <div key={index}>
                <FoodItem food={item} fetchList={fetchList} url={url}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List