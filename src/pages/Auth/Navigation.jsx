import "./Navigation.css";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

import { FaHeart, FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { useState } from "react";
const DesktopNavigation = ({ cartItems, userInfo }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      id="navigation-container"
      className={` ${
        showSidebar ? "md:hidden" : "md:flex"
      } xl:flex lg:flex md:hidden  flex-col justify-between p-4  text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed  `}
    >
      <div className=" flex justify-center flex-col space-y-4 ">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt[3rem]" size={26} />
          <span className="hidden nav-item-name mt[3rem]">Home</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt[3rem]" size={26} />
          <span className="hidden nav-item-name mt[3rem]">Shop</span>
        </Link>

        <Link to="/cart" className="flex relative mt-2">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2 mt[3rem]" size={26} />
            <span className="hidden nav-item-name mt[3rem]">Cart</span>
          </div>

          <div className="absolute -top-5 -left-2">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full text-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2 " size={26} />
            <span className="hidden nav-item-name mt-[3rem]">
              Favorites
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </div>

      {/* //only show when user is loged in */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center flex-col text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className={`text-pink-600`}>{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <FaUserCircle size={26} className={` ml-1 text-white `} />
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-transperant  p-1 text-pink-600  ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {/* if user is Admin then show this dashboard menu */}
            {userInfo.isAdmin && (
              <>
                <li className="text-left">
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer "
                  >
                    Dashboard
                  </Link>
                </li>
                <li className=" text-left">
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer "
                  >
                    Product
                  </Link>
                </li>
                <li className="text-left">
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Category
                  </Link>
                </li>
                <li className="text-left">
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Orders
                  </Link>
                </li>
                <li className="text-left">
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            {/* if not user Admin only show this two things profile and logout  */}
            <li className="text-left">
              <Link
                to="/profile"
                className="block px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </Link>
            </li>

            <li className="text-left">
              <button
                onClick={logoutHandler}
                className="block w-full py-2 px-4 text-left rounded hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
              <span className="hidden nav-item-name">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="hidden nav-item-name">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

const MobileNavigation = ({ userInfo, cartItems, logoutHandler }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white z-50 border-t border-gray-800">
      <div className="flex justify-around items-center py-3">
        <Link
          to="/"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center ${
            activeTab === "home" ? "text-pink-500" : ""
          }`}
        >
          <AiOutlineHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/shop"
          onClick={() => setActiveTab("shop")}
          className={`flex flex-col items-center ${
            activeTab === "shop" ? "text-pink-500" : ""
          }`}
        >
          <AiOutlineShopping size={24} />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <Link
          to="/cart"
          onClick={() => setActiveTab("cart")}
          className={`flex flex-col items-center relative ${
            activeTab === "cart" ? "text-pink-500" : ""
          }`}
        >
          <AiOutlineShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-2 px-1.5 py-0.5 text-xs text-white bg-pink-500 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>

        <Link
          to="/favorite"
          onClick={() => setActiveTab("favorite")}
          className={`flex flex-col items-center relative ${
            activeTab === "favorite" ? "text-pink-500" : ""
          }`}
        >
          <FaHeart size={24} />
          <div className="absolute right-1 -top-3">
            {favoriteCount > 0 && (
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {favoriteCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Favorites</span>
        </Link>

        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex flex-col items-center ${
                activeTab === "user" ? "text-pink-500" : ""
              }`}
            >
              <AiOutlineUser size={24} />
              <span className="text-xs mt-1">Account</span>
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded shadow-lg text-black p-2">
                {userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    logoutHandler();
                    setShowUserMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setActiveTab("login")}
            className={`flex flex-col items-center ${
              activeTab === "login" ? "text-pink-500" : ""
            }`}
          >
            <AiOutlineLogin size={24} />
            <span className="text-xs mt-1">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <DesktopNavigation
          userInfo={userInfo}
          cartItems={cartItems}
          logoutHandler={logoutHandler}
        />
      </div>
      <MobileNavigation
        userInfo={userInfo}
        cartItems={cartItems}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Navigation;
