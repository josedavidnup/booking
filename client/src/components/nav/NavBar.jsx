import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/slices/authUserSlice";
import logo from "../../assets/images/urge_viajar.svg";

const NavBar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <nav className="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Urge Viajar Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Urge Viajar
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          {auth.token !== null && (
            <Link to={"/user/dashboard"}> Dashboard </Link>
          )}
          {!auth.token && !auth.user ? (
            <>
              <Link
                to={"/login"}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center mr-3"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                {user.name[0]}
              </button>
              <div
                id="dropdownAvatar"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{user.name}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <a
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </>
            // <button
            //   onClick={logout}
            //   id="dropdownUserAvatarButton"
            //   data-dropdown-toggle="dropdownAvatar"
            //   className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            //   type="button"
            // >
            //   Logout
            // </button>
          )}
        </div>
        <div className="items-center justify-between hidden w-full text-sm md:flex md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                aria-current="page"
                className="block py-2 pl-3 pr-4 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
