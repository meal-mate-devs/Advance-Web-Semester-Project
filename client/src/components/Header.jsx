import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  PlusCircle,
  Menu,
  X,
  UserCircle,
  Sparkles,
  LogOut,
  Settings,
  ChefHat,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useGlobalContext();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const profileButtonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfilePopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const handleProfileClick = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handlePopupNavigation = (path) => {
    navigate(path);
    setIsProfilePopupOpen(false);
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfilePopupOpen(false);
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-emerald-500" />
              <Link to="/" className="ml-2 text-xl font-bold text-gray-800">
                MealMate
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={"/"}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              Home
            </Link>

            <Link
              to={"/recipes"}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              My Recipes
            </Link>

            <Link
              to={"/courses"}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role !== "chef" && (
                  <Button
                    variant="secondary"
                    onClick={() => handleNavigation("/become-chef")}
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Become a Chef
                  </Button>
                )}
                {user?.role === "chef" && (
                  <Button
                    variant="secondary"
                    onClick={() => handleNavigation("/upload-course")}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upload Course
                  </Button>
                )}
                <div className="relative">
                  <button
                    ref={profileButtonRef}
                    onClick={handleProfileClick}
                    className="px-3 py-2 rounded-full text-gray-700 hover:text-emerald-500 hover:bg-gray-100 focus:outline-none"
                    aria-label="Profile"
                  >
                    <UserCircle className="h-6 w-6" />
                  </button>
                  {isProfilePopupOpen && (
                    <div
                      ref={popupRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {user ? user.name : "User"}
                      </div>
                      <p class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 truncate">
                        {user && user.email}...
                      </p>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-red-500" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to={"/"}
              onClick={() => handleNavigation("/")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to={"/recipes"}
              onClick={() => handleNavigation("/recipes")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              My Recipes
            </Link>
            <Link
              to={"/courses"}
              onClick={() => handleNavigation("/courses")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role !== "chef" && (
                  <button
                    onClick={() => handleNavigation("/become-chef")}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 flex items-center"
                  >
                    <ChefHat className="h-5 w-5 mr-2" />
                    Become a Chef
                  </button>
                )}
                {user?.role === "chef" && (
                  <button
                    onClick={() => handleNavigation("/upload-course")}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 flex items-center"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Upload Course
                  </button>
                )}
                <button
                  onClick={() => handlePopupNavigation("/profile")}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100 flex items-center"
                >
                  <UserCircle className="h-6 w-6 mr-2" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100 mt-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  onClick={() => handleNavigation("/login")}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => handleNavigation("/register")}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
