import React, { useContext, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"
import { toast } from "react-toastify"


const Login = () => {
  const url = "http://localhost:8000"

  const [state,setState] = useState("Login")
  const context = useContext(StoreContext)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")
  const [accept,setAccept] = useState(false)

  if(!context){
    throw new Error("Login must be used within StoreContextProvider")
  }

  const {setShow,setToken,getCart, getOrder} = context;

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!accept){
      return toast.error("请先勾选协议",{draggable:false,autoClose:2000})
    }

    if(state==="Login"){
      axios.post(`${url}/api/user/login`,{email,password})
      .then((info)=>{
        setName("")
        setEmail("")
        setPassword("")
        setPassword2("")
        toast.success("登录成功",{draggable:false,autoClose:2000})
        setToken(info.data.token)
        localStorage.setItem("token",info.data.token)
        setShow(false)
        getCart()
        getOrder()
      }).catch(err=>{
        toast.error(err.response.data.message,{draggable:false,autoClose:2000})
      })
    }else{
      if(password!==password2 && password!==""){
        return toast.error("密码不一致！",{draggable:false,autoClose:2000})
      }else{
        axios.post(`${url}/api/user/register`,{name,email,password})
        .then((info)=>{
          setName("")
          setEmail("")
          setPassword("")
          setPassword2("")
          toast.success("注册成功",{draggable:false,autoClose:2000})
          setToken(info.data.token)
          localStorage.setItem("token",info.data.token)
        }).catch(err=>{
          toast.error(err.response.data.message,{draggable:false,autoClose:2000})
        })
      }
    }
  }

  return (
    <div className=" w-screen h-screen z-10 bg-gray-600/50 fixed flex items-center justify-center">
        <form className="bg-white px-5 py-5 rounded-xl flex flex-col" onSubmit={e=>handleSubmit(e)}>
            <div className="flex justify-between my-3">
                <h2 className="text-3xl">{state==="Login"?"登录":"注册"}</h2>
                <span className="text-2xl hover:cursor-pointer" onClick={()=>setShow(false)}>X</span>
            </div>
            {state==="Login"?
              <div className="flex flex-col gap-3 my-2">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="邮箱" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="密码" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <button className="hover:cursor-pointer text-white border bg-amber-700 px-2 py-2 rounded-xl">{state==="Login"?"登录":"注册"}</button>
              </div>:
              <div className="flex flex-col gap-3 my-2">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="用户名" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="邮箱" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="密码" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <input value={password2} onChange={(e)=>setPassword2(e.target.value)} type="password" placeholder="确认密码" className="border border-gray-500 rounded-xl px-2 py-2"/>
                <button className="hover:cursor-pointer text-white border bg-amber-700 px-2 py-2 rounded-xl">{state==="Login"?"登录":"注册"}</button>
              </div>

            }
            <div className="flex my-2 gap-2 items-cente">
              <input type="checkbox" onChange={()=>{setAccept(prev=>!prev);}}></input>
              <p>为了继续，我同意接受Veona的隐私条款</p>
            </div>
            {state==="Login"?
              <p>创建一个新的账户？ <span className="hover:cursor-pointer hover:underline text-amber-700" onClick={(()=>setState("Signup"))}>点击这里</span></p>:
              <p>已有账号？ <span className="hover:cursor-pointer hover:underline text-amber-700" onClick={(()=>setState("Login"))}>在这登录</span></p>
            }
        </form>
    </div>
  )
}

export default Login