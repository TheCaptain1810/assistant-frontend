export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 rounded-full m-3 mb-0">
        <h1 className="ml-10 font-semibold text-2xl">
            <a href="/" className="group">
              Assistant
              <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
        </h1>
        <nav className="flex justify-between">
            <a href="" className="mr-5 group">
              About
              <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
            <a href="" className="mr-5 group">
              Contact
              <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
            <a href="" className="mr-5 group">
              Placeholder
              <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
            <a href="" className="mr-5 group">
              Placeholder
              <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
        </nav>
    </header>
  )
}
