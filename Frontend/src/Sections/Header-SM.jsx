import { useNavigate } from "react-router-dom";

export const HeaderSM = () => {
  const navigate = useNavigate();
  return (
    <div className="innerContainer md:hidden">
      <div className="navbar bg-white dark:bg-gray-900 shadow-sm">
  <div className="ps-4">
  <a className="md:text-2xl font-bold text-gray-900 dark:text-gray-100 font-playfair">
              WOLVE<i className="md:text-3xl text-xl">N</i>
              <span className="text-rose-600 dark:text-rose-500">STITCH</span>
            </a>
  </div>
  <div className="flex grow justify-end px-2">
    <div className="flex items-center gap-4">

        {/* Cart */}
        <div className="dropdown dropdown-end dark:text-gray-100 text-gray-900">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle dark:hover:bg-gray-800 hover:bg-gray-50"
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
                  <span className="badge badge-sm indicator-item dark:bg-gray-800 bg-gray-50">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-44 shadow"
              >
                <div className="card-body dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50  rounded-lg">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="dark:text-gray-400 text-gray-600">
                    Subtotal: $999
                  </span>
                  <div className="card-actions">
                    <button className="btn bg-rose-500 text-white hover:bg-rose-600 btn-block btn-sm">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

      {/* Dropdown Menu */}
      <div className="dropdown dropdown-end dark:text-gray-100 text-gray-900">
        <div tabIndex={0} role="button" className="">
        <button className="dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-10 h-10 rounded-md">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content dark:bg-gray-800 dark:text-gray-100 text-gray-900 bg-gray-50 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
          <li><a>Home</a></li>
          <li><a>Men</a></li>
          <li><a>Women</a></li>
          <li><a>Kids</a></li>
          <li><a>Profile</a></li>
          <li>
                  {
                    localStorage.getItem('token')
                    ? <a onClick={()=>{
                      localStorage.removeItem('token');
                      navigate('/');
                    }}>Logout</a> 

                    : <a onClick={()=>{
                      navigate('/login');
                    }}>Login</a>
                  }
                </li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};
