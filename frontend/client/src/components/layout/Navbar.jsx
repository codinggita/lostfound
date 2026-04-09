import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileOpen(false);
  };

  const baseLinkClasses =
    "text-xl font-medium text-black hover:text-emerald-600 transition-colors duration-200 pb-1";

  const activeLinkClasses =
    "text-emerald-600 border-b-2 border-emerald-600";

  const getNavLinkClasses = ({ isActive }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`;

  const mobileLinkClasses = "block text-lg font-medium text-black hover:text-emerald-600 py-2";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className=" font-bold tracking-tight text-3xl"
          >
            <span className="text-black">Lost</span>
            <span className="text-emerald-600">Found</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ">
            <NavLink to="/" end className={getNavLinkClasses}>
              Home
            </NavLink>

            <NavLink to="/items" className={getNavLinkClasses}>
              Browse Items
            </NavLink>

            <NavLink to="/post-item" className={getNavLinkClasses}>
              Post Item
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <span className="font-semibold text-gray-800">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-500 font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-black font-medium hover:text-emerald-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
                >
                  Signup
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg border text-black border-gray-300"
            >
              {isMobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-100 flex flex-col">
            <NavLink to="/" className={mobileLinkClasses} onClick={() => setIsMobileOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/items" className={mobileLinkClasses} onClick={() => setIsMobileOpen(false)}>
              Browse Items
            </NavLink>

            <NavLink to="/post-item" className={mobileLinkClasses} onClick={() => setIsMobileOpen(false)}>
              Post Item
            </NavLink>

            <div className="pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-full border-2 border-emerald-500 object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-red-500 font-semibold border border-red-200 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full text-center py-2 text-gray-700 font-medium border border-gray-200 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full text-center py-2 bg-emerald-500 text-white font-medium rounded-lg"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;