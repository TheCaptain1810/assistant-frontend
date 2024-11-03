import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 rounded-full m-3 mb-0">
      <h1 className="ml-10 font-semibold text-2xl">
        <Link to="/" className="group">
          Assistant
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
      </h1>
      
      <button 
        className="md:hidden mr-10 z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
        </svg>
      </button>

      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-0 right-0 h-screen md:h-auto w-64 md:w-auto bg-gray-800 md:bg-transparent pt-20 md:pt-0 px-10 md:px-0`}>
        <Link to="/about" className="mb-5 md:mb-0 md:mr-5 group">
          About
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
        <Link to="/contact" className="mb-5 md:mb-0 md:mr-5 group">
          Contact
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
        <Link to="/history" className="mb-5 md:mb-0 md:mr-5 group">
          History
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </Link>
      </nav>
    </header>
  )
}
