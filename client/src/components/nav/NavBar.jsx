import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/slices/authUserSlice';
import logo from '../../assets/images/urge_viajar.svg';

const NavBar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <nav className='bg-white border-b border-gray-200 px-4 py-3 dark:bg-gray-900'>
      <div className='flex items-center justify-between max-w-screen-xl mx-auto'>
        <Link to='/' className='flex items-center'>
          <img src={logo} className='h-6 mr-3 sm:h-9' alt='Urge Viajar Logo' />
          <span className='text-xl font-semibold whitespace-nowrap dark:text-white'>
            Urge Viajar
          </span>
        </Link>
        <div className='flex items-center space-x-4'>
          <ul className='space-x-4 md:flex'>
            <li>
              <Link
                to='/'
                aria-current='page'
                className='block py-2 px-3 text-blue-600 border-b-2 border-transparent hover:border-blue-600 dark:text-blue-500 dark:hover:border-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500'
              >
                Home
              </Link>
            </li>
          </ul>
          <div className='flex items-center'>
            {auth.token !== null && (
              <Link to='/user/dashboard' className='text-blue-600'>
                Hi, {user.name.split(' ')[0]}
              </Link>
            )}
            {!auth.token && !auth.user ? (
              <>
                <Link
                  to='/login'
                  className='text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-400'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className='relative'>
                <button
                  onClick={() => setDropdown((prev) => !prev)}
                  id='dropdownUserAvatarButton'
                  className='w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center'
                  type='button'
                  aria-label='User Menu'
                >
                  <span className='sr-only'>Open user menu</span>
                  {user.name[0]}
                </button>
                {dropdown && (
                  <div className='absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'>
                    <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                      <div>Signed in as</div>
                      <div className='font-medium truncate'>{user.email}</div>
                    </div>
                    <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                      <li>
                        <Link
                          to='/user/dashboard'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                    <div className='py-2'>
                      <a
                        onClick={logout}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
