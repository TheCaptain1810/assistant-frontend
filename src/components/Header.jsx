import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 rounded-full m-3 mb-0">
      <h1 className="ml-10 font-semibold text-2xl">
        <Link to="/" className="group">
          Assistant
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
      </h1>
      <nav className="flex justify-between">
        <Link to="/about" className="mr-5 group">
          About
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
        <Link to="/contact" className="mr-5 group">
          Contact
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
        <Link to="/history" className="mr-5 group">
          History
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
      </nav>
    </header>
  )
}
