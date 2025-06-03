export const Header = () => {
  return (
    <div className="mainContainer text-gray-100">
      <div className="innerContainer">
        <div className="navbar bg-white dark:bg-gray-900 shadow-sm flex justify-between px-5">


            {/* Logo Section */}
          <div className="">
            <a className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-playfair">WOLVE<i className="text-3xl">N</i><span className="text-rose-600 dark:text-rose-500">STITCH</span></a>
          </div>


          {/* Navbar Links Section */}
          <div className="flex w-[50%]">
            <ul className="w-full flex flex-row justify-evenly items-center ">
              <li className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer"><a>Home</a></li>
              <li className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer"><a>Men</a></li>
              <li className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer"><a>Women</a></li>
              <li className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer"><a>Kids</a></li>
            </ul>
          </div>

          {/* Cart & Profile Section */}
          <div className="flex gap-3">
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
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50  rounded-lg">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="dark:text-gray-400 text-gray-600">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn bg-rose-500 text-white hover:bg-rose-600 btn-block">
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50 rounded-lg rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge bg-rose-500 dark:text-gray-100 text-white">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
