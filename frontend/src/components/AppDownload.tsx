import assets from "../assets/asset"

const AppDownload = () => {
  return (
    <div className="my-3 flex flex-col items-center justify-center py-10 md:py-20 w-full" id="app">
        <p className="text-2xl md:text-3xl">为了更好的体验请下载我们的应用</p>
        <p className="text-2xl md:text-3xl">Veona App</p>
        <div className="flex flex-row my-5 justify-around w-full">
            <div className="flex flex-col justify-center items-center gap-3 md:gap-6 hover:cursor-pointer">
                <img src={assets.windows} alt="image" className="md:w-35 md:h-35 w-20 h-20 hover:scale-125 transition-all duration-500" />
                <button className="px-3 py-2 bg-gray-700 text-white rounded-xl hover:cursor-pointer hover:bg-black my-3">Windows</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-6 hover:cursor-pointer">
                <img src={assets.mac} alt="image" className="md:w-35 md:h-35 w-20 h-20 hover:scale-125 transition-all duration-500" />
                <button className="px-3 py-2 bg-gray-700 text-white rounded-xl hover:cursor-pointer hover:bg-black my-3">Mac</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-6 hover:cursor-pointer">
                <img src={assets.linux} alt="image" className="md:w-35 md:h-35 w-20 h-20 hover:scale-125 transition-all duration-500" />
                <button className="px-3 py-2 bg-gray-700 text-white rounded-xl hover:cursor-pointer hover:bg-black my-3">Linux</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-6 hover:cursor-pointer">
                <img src={assets.android} alt="image" className="md:w-35 md:h-35 w-20 h-20 hover:scale-125 transition-all duration-500" />
                <button className="px-3 py-2 bg-gray-700 text-white rounded-xl hover:cursor-pointer hover:bg-black my-3">Android</button>
            </div>
        </div>
    </div>
  )
}

export default AppDownload