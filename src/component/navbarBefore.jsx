import { Link, NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';



function NavbarBefore() {
    return (
        <header className="w-full items-center mr-8 py-6 bg-white flex  justify-between shadow-sm">
            <nav className="max-w-[1220px] mx-auto flex items-center justify-between h-20 gap-[25px]">
                <div className='flex items-center'>
                {/* Logo */}
                    <img className="h-14 w-auto" src="/KELANA 1.png" alt="logo-aplikasi"/>
                    </div>
                {/* Search Bar */}
                <div className='relative w-96'>
                <div className="hidden lg:block">
                    <div className="relative w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            placeholder="Pencarian"
                            className="w-full py-2.5 px-10 pr-4 border-2 border-primary rounded-full focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-primary placeholder:text-sm text-medium"
                        />
                    </div>
                </div>
                </div>
                {/* navigasi + button*/}
                <div className="flex items-center gap-[25px] ml-10">
                    {/* Link Navigasi */}
                <div className="flex items-center gap-[20px]">
                        <NavLink to="/" end className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold ' : 'border-transparent text-gray-600 hover:border-primary'}`}>Beranda</NavLink>
                        <NavLink to="/acara" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Acara</NavLink>
                        <NavLink to="/rencana-perjalanan" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Rencana Perjalanan</NavLink>
                        <NavLink to="/ulasan" className={({ isActive }) => `px-1 py-2.5 border-b-[2.50px] border-primary whitespace-nowrap ${isActive ? 'border-primary text-primary text-base font-bold' : 'border-transparent text-gray-600 hover:border-primary'}`}>Ulasan</NavLink>
                    </div>
                    {/* Button Login */}
                        <Link to="/login">
                            <div data-property-1="Button Biru" className="w-44 h-14 px-6 py-3.5 bg-primary rounded-lg flex justify-center items-center">
                            <button className=" text-white text-lg font-bold">
                                Masuk
                            </button>
                            </div>
                        </Link>
                    </div>
            </nav>
        </header>
    );
}

export default NavbarBefore;


