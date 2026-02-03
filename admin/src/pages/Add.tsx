import React, { useState } from "react"
import assets from "../assets/assets"
import axios from "axios"
import { toast } from "react-toastify"

const Add = ({url}:{url:string}) => {

    const [image,setImage] = useState<File|null>(null)
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("披萨")
    const [price,setPrice] = useState(20)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setImage(e.target.files[0])
        }
    }

    const submitHandler = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("price",price.toString())
        if(image){
            formData.append("image",image)
        }
        
        // 处理api接口传输数据
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.status===200){
            setImage(null)
            setName("")
            setDescription("")
            setCategory("披萨")
            setPrice(20)
            toast.success("商品添加成功",{draggable:false,autoClose:2000})
        }
        else{
            toast.error("商品添加失败!",{draggable:false,autoClose:2000})
        }
    }

  return (
    <div className="w-screen flex items-center justify-center">
        <form className="flex flex-col items-start gap-3 px-2 py-2 w-1/2" onSubmit={(e)=>submitHandler(e)}>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-2xl">上传图片</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="upload" className="w-35 h-35 md:w-40 md:h-40 hover:cursor-pointer"/>
                </label>
                <input onChange={(e)=>handleChange(e)} type="file" id="image" hidden required/>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-2xl">商品名称</p>
                <input type="text" placeholder="请输入" className="p-2 border border-black rounded-xl" value={name} onChange={(e)=>{
                    if(e.target.value)setName(e.target.value)
                }}/>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-2xl">商品描述</p>
                <textarea name="description" rows={6} placeholder="请输入" className="p-2 border border-black rounded-xl" value={description} onChange={(e)=>{
                    if(e.target.value)setDescription(e.target.value)
                }}></textarea>
            </div>
            <div className="flex gap-5 md:items-center justify-between w-full md:flex-row flex-col items-start">
                <div className="flex flex-col gap-3 w-1/2">
                    <p className="text-2xl">商品分类</p>
                    <select name="category" className="hover:cursor-pointer p-2 border border-black rounded-xl" value={category} onChange={(e)=>{
                        if(e.target.value)setCategory(e.target.value)
                    }}>
                        <option value="披萨">披萨</option>
                        <option value="西餐">西餐</option>
                        <option value="面食">面食</option>
                        <option value="家常菜">家常菜</option>
                        <option value="粥">粥</option>
                        <option value="寿司">寿司</option>
                        <option value="汉堡">汉堡</option>
                        <option value="烧烤">烧烤</option>
                    </select>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <p className="text-2xl">商品价格</p>
                    <input type="Number" placeholder="￥20" className="p-2 border border-black rounded-xl" value={price} onChange={(e)=>{
                        if(e.target.value)setPrice(Number(e.target.value))
                    }}/>
                </div>
            </div>
            <button type="submit" className="bg-black text-white p-3 rounded-xl hover:cursor-pointer active:bg-gray-700 w-full my-2">添加商品</button>
        </form>
    </div>
  )
}

export default Add