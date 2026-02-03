import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"


const Success = () => {
    const navigate = useNavigate()
    const [searchparams] = useSearchParams()
    const method = searchparams.get("method")

    useEffect(()=>{
        if(method==="alipay.trade.page.pay.return")navigate("/myorder")
    },[])
  return (
    <div>Success!</div>
  )
}

export default Success