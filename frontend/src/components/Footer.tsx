import assets from "../assets/asset"

const Footer = () => {
  return (
    <div className="w-full py-10 md:px-12 flex flex-col justify-center items-center bg-neutral-800 mt-2" id="footer">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] grid-cols-1 w-full items-start justify-end md:gap-10 gap-5 mb-2 md:px-0 px-5">
            <div className="flex flex-col gap-3 text-white">
                <img src={assets.logo} alt="logo" className="md:w-35 md:h-35 w-20 h-20"/>
                <p className="md:text-base text-sm text-gray-400">Veona 精选新鲜食材，用心烹饪每一道美味。<br/>
                从经典家常到创意料理，我们致力于为你带来便捷、安心又令人满足的美食体验。</p>
            </div>
            <div className="flex flex-col gap-3 text-white">
                <h1 className="md:text-3xl text-2xl">公司</h1>
                <p className="md:text-base text-sm text-gray-400">主页</p>
                <p className="md:text-base text-sm text-gray-400">关于我们</p>
                <p className="md:text-base text-sm text-gray-400">物流</p>
                <p className="md:text-base text-sm text-gray-400">隐私条款</p>
            </div>
            <div className="flex flex-col gap-3 text-white">
                <h1 className="md:text-3xl text-2xl">联系我们</h1>
                <p className="md:text-base text-sm text-gray-400">+86 13867471941</p>
                <p className="md:text-base text-sm text-gray-400">veona@outlook.com</p>
            </div>
        </div>
        <hr className="border-none h-0.5 w-full bg-white my-2"/>
        <div>
            <p className="text-white md:text-base text-sm">Copyright 2025 &copy; Veona.com-All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer