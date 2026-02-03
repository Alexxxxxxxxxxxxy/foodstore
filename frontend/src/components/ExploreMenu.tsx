import { menu_list } from '../assets/asset'

const ExploreMenu = ({ category, setCategory }: { category: string; setCategory: any }) => {
  return (
    <div className='md:px-20 py-5' id='menu'>
        <h1 className='text-3xl'>查看我们的菜单</h1>
        <p className='py-3'>精选丰富多样的美食菜单，甄选优质食材，融合专业烹饪技艺匠心呈现。<br/>我们致力于满足您的味蕾期待，让每一口美味都成为难忘的用餐体验。</p>
        <div className='flex flex-row gap-1 items-center justify-between overflow-x-scroll scrollbar-none w-full'>
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory((prev:any)=>prev===item.menu_name?"All":item.menu_name)} key={index} className='flex flex-col items-center justify-center min-w-22.5 md:min-w-35'>
                        <img src={item.menu_image} alt="food_image" className={`w-20 h-20 md:w-35 md:h-35 rounded-xl hover:cursor-pointer transition-all duration-300 ${item.menu_name===category?"border-3 border-red-500 md:p-2 p-1":""}`}/>
                        <p className='text-gray-600 md:text-xl'>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr className='h-1 bg-gray-300 my-3 border-none'/>
    </div>
  )
}

export default ExploreMenu