import { useContext } from 'react'
import { StoreContext, type Food } from '../context/StoreContext'
import FoodItem from './FoodItem';

const FoodDisplay = ({category}:{category:string}) => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("FoodDisplay must be used within StoreContextProvider");
    }

    const { food_list } = context;

  return (
    <div className='md:px-20 w-full'>
        <p className='text-2xl my-2 w-full'>为您精心挑选的食物</p>
        <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5 gap-2 w-full'>
            {food_list.map((item:Food,index:number)=>{
                if(category==="All" || category===item.category){
                    return (
                        <div key={index}>
                            <FoodItem key={index} _id={item._id} name={item.name} image={item.image} price={item.price} description={item.description}/>
                        </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay