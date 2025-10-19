import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarBefore from './navbarBefore';
import NavbarAfter from './navbarAfter';
import Footer from './footer';

const Layout = ({ isLoggedIn, user, onLogout }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const mainPadding = !isLoginPage ? "pt-32" : "";

    return (
        <div className="flex flex-col min-h-screen">
            
            {!isLoginPage && (
                <header className="fixed top-0 left-0 w-full z-50">
                    {isLoggedIn ? (
                        <NavbarAfter user={user} onLogout={onLogout} />
                    ) : (
                        <NavbarBefore />
                    )}
                </header>
            )}

            {/* halaman konten */}
            <main className={`flex-grow ${mainPadding}`}>
                <Outlet />
            </main>
            {!isLoginPage && <Footer />}
        </div>
    );
};

export default Layout;