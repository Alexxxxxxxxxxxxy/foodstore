import assets from '../assets/asset.ts'

const Header = () => {
  return (
    <div className='md:px-20'>
        <div className='md:rounded-xl h-64 md:h-110 bg-cover bg-center bg-no-repeat flex flex-col md:gap-5 gap-2 justify-end px-5 md:px-8 items-start py-5 md:p-8' style={{backgroundImage: `url(${assets.header_cover})`}}>
            <p className='font-bold md:text-[4.5vw] text-white text-[5.5vw] animate-fadein'>你喜欢的食物都在这</p>
            <p className='text-white md:text-[1vw] text-[2.5vw] animate-fadein'>精选丰富多样的美食菜单，甄选优质食材，融合专业烹饪技艺匠心呈现。<br/>我们致力于满足您的味蕾期待，让每一口美味都成为难忘的用餐体验。</p>
            <button className='hover:cursor-pointer text-gray-400 bg-white rounded-3xl md:px-13 md:py-3 px-6 py-1 md:text-[1vw] text-[2.5vw] animate-fadein'>菜单</button>
        </div>
    </div>
  )
}

export default Header