import { AboutBrand } from "./AboutBrand";
import { Collection_1 } from "./Collection-1";
import { GridProducts } from "./GridProducts";
import { ProductSkeleton } from "./products-section/ProductSceleton";
// import { GetProducts } from "../API/GET-SWR/product";
import { useProductContext } from "../context/ProductContext";


export const Dashboard = () => {
  // const {allProducts, error, isLoading} = GetProducts();
  const {allProducts, error, isLoading} = useProductContext();

  if (isLoading || !allProducts[0].images[0]) {
    return(
      <div className="mainContainer flex gap-10 justify-center items-center h-screen">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    )
  }
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="dark:bg-gray-950 bg-gray-100 dark:text-gray-100 text-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
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

      <hr className="mt-28 mb-5 dark:border-gray-700 border-gray-300"/>

      {/* Collection 1 */}
      <Collection_1 products={allProducts} />
      <GridProducts products={allProducts}/>
      <hr className="mt-28 mb-5 dark:border-gray-700 border-gray-300"/>
      <AboutBrand />
    </div>
  );
};
