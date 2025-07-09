import { AboutBrand } from "./AboutBrand";
import { Collection_1 } from "./Collection-1";
import { GridProducts } from "./GridProducts";
import { ProductSkeleton } from "./products-section/ProductSceleton";
// import { GetProducts } from "../API/GET-SWR/product";
import { useProductContext } from "../context/ProductContext";
import { ErrorPage } from "./ErrorPage";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../API/GET-SWR/user";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {user, isLoading: userLoading} = GetUser();
  // const {allProducts, error, isLoading} = GetProducts();
  const { allProducts, error, isLoading } = useProductContext();

  // Redirect to admin page if user is admin (after login)
  useEffect(()=>{
    if(!userLoading && user?.role === 'admin'){
      navigate('/admin');
    }
  },[user, userLoading, navigate])

  if (error) {
    navigate("/error");
  } else if (isLoading || !allProducts[0].images[0]) {
    return (
      <div className="mainContainer flex gap-10 justify-center items-center h-screen">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-100 text-gray-900 w-full md:p-10 p-5">
      {/* Heading Section for Mobile */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:hidden">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-900 mb-4">
           
            ELEVATE YOUR <span className="text-rose-500">STYLE</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-900 text-lg mb-8">
            Discover exclusive luxury pieces designed for the modern
            trendsetter.
          </p>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-md font-medium transition">
            Explore Collection
          </button>
          
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Luxury Fashion"
            className="rounded-lg shadow-2xl border dark:border-gray-800 border-gray-200"
          />
        </div>
      </div>

      <hr className="mt-28 mb-5 dark:border-gray-700 border-gray-300 md:hidden"/>

      {/* Headings for Desktop */}
      <div className="headings md:w-[90%] mx-auto md:flex flex-col items-center justify-center gap-4 hidden">
        <div className="headings md:w-[60%] flex flex-col gap-2 items-center justify-center">
          <h1 className="md:text-5xl text-2xl font-bold font-playfair">
            Wear your Identity
          </h1>
          <h3 className="md:text-lg text-center ">
            Discover the latest collection from Wolvenstitch - Where comfort
            meets style. Explore our curated selection of premium apparel
            designed for the modern lifestyle.
          </h3>
        </div>
        <div className="buttons flex gap-4">
          <button className="btn px-4 py-2 rounded-md md:text-black text-white font-semibold md:bg-white bg-gray-800">
            Shop the Drop
          </button>
          <button className="px-4 py-2 rounded-md btn btn-outline">
            View Collection
          </button>
        </div>
      </div>

      {/* Images for Desktop */}
      <div className="images w-[90%] mx-auto items-end justify-center mt-16 md:flex md:gap-4 gap-1 hidden">
        <h1 className="absolute font-semibold z-10 font-playfair top-[680px] left-[190px] dark:bg-white bg-gray-200 text-gray-900 px-5 py-2 rounded-md">
          Designed for Self Expences
        </h1>
        <h1 className="absolute font-semibold z-10 font-playfair top-[380px] left-[850px] dark:bg-gray-50 bg-gray-200 text-gray-900 px-5 py-2 rounded-md">
          100% Satisfaction
        </h1>
        <h1 className="absolute font-semibold z-10 font-playfair top-[680px] left-[1100px] dark:bg-white bg-gray-200 text-gray-900 px-5 py-2 rounded-md">
          Limited Edition Designs
        </h1>
        <img
          className="rounded-t-full md:w-[18%] w-[36%] md:h-[500px] h-[300px] object-cover dark:opacity-85"
          src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <img
          className="rounded-t-full md:w-[20%] w-[36%] md:h-[600px] h-[300px] object-cover dark:opacity-85"
          src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <img
          className="rounded-t-full md:w-[18%] w-[36%] md:h-[500px] h-[300px] object-cover dark:opacity-85"
          src="https://images.pexels.com/photos/1340967/pexels-photo-1340967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>

      <hr className="mb-10 text-gray-400 hidden md:block" />

      {/* Collection 1 */}
      <Collection_1 products={allProducts} />
      <GridProducts products={allProducts} />
      <hr className="mt-28 mb-5 dark:border-gray-700 border-gray-300" />
      <AboutBrand />
    </div>
  );
};
