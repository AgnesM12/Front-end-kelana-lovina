import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import {  useSelector } from 'react-redux';



function NavbarBefore() {
    const [menuOpen, setMenuOpen] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    

    return (
        <header className="py-6 w-full bg-white flex justify-center items-center shadow-sm mx-auto">
            <nav className="max-w-[1220px] mx-auto flex items-center justify-between h-20 px-4 md:px-6 w-full">
                <div className='flex-shrink-0'>
                {/* Logo */}
                    <img className="h-14 sm:h-12 md:h-12 w-auto" src="/KELANA 1.png" alt="logo-aplikasi"/>
                </div>
                {/* Search Bar */}
                <div className='flex-grow flex justify-center mx-3 sm:mx-5 md:mx-6 '>
                    <div className="relative w-[180px] sm:w-[260px] md:w-[320px] lg:w-[380px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            placeholder="Pencarian"
                            className="w-full py-2.5 px-10 pr-4 border-2 border-primary rounded-full focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-primary placeholder:text-sm text-medium md:text-base"
                        />
                    </div>
                </div>
                <div className='lg:hidden flex items-center'>
                    <button onClick={() => setMenuOpen(!menuOpen)}
                    className='text-primary focus:outline-none'>
                        {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>
                {/* Navigasi Desktop */}
                <div className='hidden lg:flex items-center space-x-10'>
                <div className="flex items-center gap-[25px]">
                    <NavLink to="/" end className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Beranda</NavLink>
                    <NavLink to="/acara" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Acara</NavLink>
                    <NavLink to="/rencana-perjalanan" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Rencana Perjalanan</NavLink>
                    {isAuthenticated && (
                            <NavLink to="/destinasi" end onClick={()=> setMenuOpen(false)} className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Destinasi</NavLink>
                        )}
                    <NavLink to="/ulasan" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Ulasan</NavLink>
                </div>
                        {/* Button masuk */}
                        {isAuthenticated ? (
                            <div className='flex items-center space-x-4'>
                                <Link to='/profil'>
                                    <img
                                    src={user?.profilePic}
                                    alt="User profile"
                                    className="w-14 h-14 rounded-full object-cover ml-4 cursor-pointer"
                                    />
                                </Link>
                            </div>
                    ) : (
                    <Link to="/login">
                        <div className='w-44 h-14 px-6 py-3.5 bg-primary rounded-lg flex justify-center items-center hover:bg-blue-700 transition duration-150'>
                            <button className='text-white text-lg font-bold'>
                                Masuk
                            </button>
                        </div>
                    </Link>
                    )}
                </div>
            </nav>
            {/* Nvabar Mobile */}
            {menuOpen && (
                    <div className='lg:hidden bg-white shadow-md  absolute top-[80px] left-0 w-full z-50 border-t border-gray-200 animate-slideDown'>
                        <div className='flex flex-col items-start p-4 space-y-4'>
                        <NavLink to="/" end onClick={()=> setMenuOpen(false)} className={({ isActive }) => `inline-block text-left border-b-2 pb-2 transition-all duration-200 ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Beranda</NavLink>
                        <NavLink to="/acara" end onClick={()=> setMenuOpen(false)} className={({ isActive }) => `inline-block text-left border-b-2 pb-2 transition-all duration-200 ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Acara</NavLink>
                        <NavLink to="/rencana-perjalanan" end onClick={()=> setMenuOpen(false)} className={({ isActive }) => `inline-block text-left border-b-2 pb-2 transition-all duration-200 ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Rencana Perjalanan</NavLink>
                        <NavLink to="/ulasan" end onClick={()=> setMenuOpen(false)} className={({ isActive }) => `inline-block text-left border-b-2 pb-2 transition-all duration-200 ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Ulasan</NavLink>
                        {/* button masuk */}
                        {isAuthenticated ? (
                            <div className="w-full flex justify-between items-center pt-4 border-t border-gray-200">
                                <Link to="/profil" onClick={() => setMenuOpen(false)} className='flex items-center space-x-3'>
                            <img
                            src={user?.profilePic}
                            alt="User profile"
                            className="w-14 h-14 rounded-full object-cover"/>
                            <span className='text-lg font-bold text-primary'>Profil ({user?.name})</span>
                                </Link>
                            </div>
                        ) : (
                        <Link to="/login"onClick={() => setMenuOpen(false)} className='w-full'>
                            <div className='w-full py-3 bg-primary rounded-lg flex justify-center items-center hover:bg-blue-700 transition duration-150'>
                                <button className='text-white font-bold'>
                                    Masuk
                                </button>
                            </div>
                        </Link>
                        )}
                        </div>
                    </div>
            )}
        </header>
    );
};
export default NavbarBefore;