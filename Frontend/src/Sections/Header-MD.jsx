// import profile from "../assets/profile.png";
import brandLogoWhite from "../assets/brand-logo-white.png";
import brandLogoBlack from "../assets/brand-logo-black.png";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { GetUser } from "../API/GET-SWR/user";
import { useState, useEffect } from "react";

export const HeaderMD = ()=>{
  const {filterByGenderType} = useProductContext();
  const navigate = useNavigate();
  const {stateCart} = useCartContext();
  const {user} = GetUser();
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
      setUserData(user);
  },[user]);

  const handleMenToggle = () => {
    navigate("/men");
    filterByGenderType("Men");
  }

  const handleWomenToggle = () => {
    navigate("/women");
    filterByGenderType("Women");
  }

  const handleKidsToggle = () => {
    navigate("/kids");
    filterByGenderType("Kids");
  }

  const handleHomeToggle = () => {
    filterByGenderType("all");
    navigate("/");
  }

  const handleProfileToggle = () => {
    navigate('/profile2');
  }

    return(
        <div className="innerContainer hidden md:block dark:border-b dark:border-b-gray-700">
        <div className="navbar bg-white dark:bg-gray-900 shadow-sm flex justify-between px-5">
          {/* Logo Section */}
          <div className="flex gap-3 items-center justify-center">
            <a className="md:text-2xl font-bold text-gray-900 dark:text-gray-100 font-playfair">
              WOLVE<i className="md:text-3xl text-xl">N</i>
              <span className="text-rose-600 dark:text-rose-500">STITCH</span>
            </a>
            <div className="avatar">
              <div className="w-10">
                <img src={brandLogoWhite} className="hidden md:dark:block" />
                <img src={brandLogoBlack} className="hidden md:block dark:hidden" />
              </div>
            </div>
          </div>

          {/* Navbar Links Section */}
          <div className="flex w-[50%]">
            <ul className="w-full flex flex-row justify-evenly items-center">
              <li className={`text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer ${window.location.pathname === '/' ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                <a onClick={handleHomeToggle}>Home</a>
              </li>
              <li className={`text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer ${window.location.pathname === '/men' ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                <a onClick={handleMenToggle}>Men</a>
              </li>
              <li className={`text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer ${window.location.pathname === '/women' ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                <a onClick={handleWomenToggle}>Women</a>
              </li>
              <li data-tip="Coming Soon" className={`text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 tooltip tooltip-bottom tooltip-secondary cursor-pointer ${window.location.pathname === '/kids' ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                <a onClick={handleKidsToggle}>Kids</a>
              </li>
            </ul>
          </div>

          {/* Cart & Profile Section */}
          <div className="flex gap-3 items-center">
            <div className="dropdown dropdown-end dark:text-gray-100 text-gray-900">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className={`badge badge-xs indicator-item ${stateCart && stateCart.products ? 'bg-rose-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {
                     stateCart && stateCart.products ? stateCart.products.length : 0
                    }
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50  rounded-lg">
                  <span className="text-lg font-bold">
                    {
                    stateCart && stateCart.products ? stateCart.products.length : 0
                    } Items</span>
                  <span className="dark:text-gray-400 text-gray-600">
                    {
                      stateCart && stateCart.products ? `Subtotal: $${stateCart.totalPrice}` : 'Subtotal: $0'
                    }
                  </span>
                  <div className="card-actions">
                    <button onClick={()=>{
                      navigate('/cart');
                    }} className="btn bg-rose-500 text-white hover:bg-rose-600 btn-block" disabled={!stateCart || !stateCart.products}>
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    // src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    src={userData?.avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50 rounded-lg rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="items-start flex flex-col">
                    <div className="w-full" onClick={handleProfileToggle}>
                      <h1 className="dark:text-gray-100 text-gray-900 font-semibold text-lg text-center">Welcome {userData?.name?.split(' ')[0]}</h1>
                      <p className="text-sm dark:text-gray-400 text-gray-600 text-center">{userData?.email}</p>
                    </div>
                    {/* <span className="badge bg-rose-500 dark:text-gray-100 text-white">
                      New
                    </span> */}
                  </a>
                </li>
                {/* <li>
                  <a>Settings</a>
                </li> */}
                <li>
                  {
                    localStorage.getItem('token')
                    ? <a
                    className="text-rose-500 hover:text-rose-600"
                     onClick={()=>{
                      localStorage.removeItem('token');
                      navigate('/');
                      window.location.reload();
                    }}>Logout</a> 

                    : <a
                    className=" mt-2 btn-warning btn btn-xs text-lg font-semibold"
                     onClick={()=>{
                      navigate('/login');
                    }}>Login</a>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}