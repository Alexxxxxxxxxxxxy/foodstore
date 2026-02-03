import { useContext } from 'react'
import assets from '../assets/asset.ts'
import { StoreContext } from '../context/StoreContext.tsx';

const FoodItem = ({_id,name,image,price,description,category}:{
  _id:string;
  name:string;
  image:string;
  price:number;
  description:string;
  category:string;
}) => {

  const context = useContext(StoreContext);

  if(!context){
    throw new Error("FoodItem must be used within StoreContextProvider");
  }

  const {cartItems, addToCart, removeFromCart} = context;

  return (
    <div className='flex flex-col justify-center w-full animate-fadein my-2 md:rounded-3xl overflow-hidden shadow-md rounded-2xl hover:cursor-pointer'>
      <div className='w-full md:h-100 h-70 relative'>
        <img src={image} alt="image" className='w-full h-full object-cover'/>
        <div>
          {!cartItems[_id]?
            <img onClick={()=>addToCart(_id)} src={assets.add} alt="add" className='w-7 h-7 bg-white rounded-full absolute bottom-5 right-5 p-1 md:w-10 md:h-10'/>:
            <div className='flex absolute gap-2 bottom-5 right-5 bg-white rounded-xl p-2 items-center'>
              <img onClick={()=>removeFromCart(_id)} src={assets.minus} alt="minus" className='w-7 h-7 bg-red-300 rounded-full p-1 md:w-10 md:h-10'/>
              <p className='md:text-xl'>{cartItems[_id]}</p>
              <img onClick={()=>addToCart(_id)} src={assets.add} alt="add" className='w-7 h-7 bg-green-300 rounded-full p-1 md:w-10 md:h-10'/>
            </div>
          }
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:px-4 px-2 md:justify-between py-2 my-2'>
        <p className='m-0 md:text-2xl text-xl'>{name}</p>
        <img src={assets.rating_stars} alt="stars"  className='md:w-auto w-20 h-5 m-0 p-0'/>
      </div>
      <p className='px-4 text-gray-600'>{description}</p>
      <p className='px-4 pb-5 text-orange-400 text-2xl'>￥{price}</p>
    </div>
  )
}

export default FoodItem