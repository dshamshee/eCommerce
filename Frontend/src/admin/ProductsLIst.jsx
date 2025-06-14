import { GetProducts } from "../API/GET-SWR/product";
import { DeleteProduct } from "../API/POST-Axios/productApi";
import { toast } from "react-toastify";
import { ProductSkeleton } from "../Pages/products-section/ProductSceleton";
import { useProductContext } from "../context/ProductContext";

export const ProductsList = () => {
const {filteredProducts, sortProducts, error, isLoading} = useProductContext();
  let isDesableBtn = false;

  const handleDeleteProduct = async(id)=>{
    isDesableBtn = true;
    const response = await DeleteProduct(id) // this is axios call (SWR is not working here)
    if(response.status === 200){
        toast.success("Product deleted successfully");
        isDesableBtn = false;
        window.location.reload();
    }else{
        toast.error("Product not deleted");
        isDesableBtn = false;
    }
  }


  if (isLoading) {
    return (
        <div className="mainContainer flex flex-wrap gap-10 justify-center items-center p-10">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
        </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mainContainer hidden md:block p-10 dark:bg-gray-900 bg-white">


      <ul className="list dark:bg-gray-800 bg-gray-100 rounded-box shadow-md">
        
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide text-center ">
          <div>List of Products</div>
          <div className="shorting flex justify-center gap-5 mt-2">
            <select onChange={(e) => sortProducts(e.target.value)} className="select select-bordered w-full max-w-xs">
                <option value="">Sort By</option>
                <option value="all">All</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="available">Available</option>
                <option value="best seller">Best Seller</option>
                <option value="new arrival">New Arrival</option>
                <option value="out of stock">Out of Stock</option>
            </select>

            <select onChange={(e) => sortProducts(e.target.value)} className="select select-bordered w-full max-w-xs">
                <option value="">Filter By</option>
                <option value="all">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        </li>
        {/* <li><hr className="border-gray-600 mt-8" /></li> */}
        
        <li className="list-row">
          <div className="md:text-xl text-center font-thin dark:opacity-80 opacity-60 tabular-nums hidden md:block">SL</div>
          <div className="md:text-xl text-center font-thin dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Image
          </div>
          <div className="list-col-grow md:text-xl font-thin dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Name
          </div>
          <div className="md:text-xl text-center font-thin mr-20 dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Date
          </div>
          <div className="md:text-xl text-center font-thin mr-14 dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Stock
          </div>
          {/* <div className="text-xl font-thin mr-5 dark:opacity-30 opacity-60 tabular-nums">
            Ratings
          </div> */}
          <div className="md:text-xl text-center font-thin mr-8 dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Best Seller
          </div>
          <div className="md:text-xl text-center font-thin mr-3  dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            New Arrival
          </div>
          <div className="md:text-xl text-center font-thin dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            Action
          </div>
        </li>

        {
            filteredProducts.map((product, index)=>{
                return(
                    <li className="list-row" key={product._id}>
          <div className="text-4xl font-thin opacity-30 tabular-nums hidden md:block">{index +1 < 10 ? `0${index +1}` : index +1}</div>
          <div className="hidden md:block">
            <img
              className="size-10 rounded-box"
              src={product.images[0]}
            />
          </div>
          <div className="list-col-grow">
            <div>{product.name}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {product.genderType}
            </div>
          </div>

          <div className="text-xl text-center font-thin mr-1 dark:opacity-80 opacity-60 tabular-nums hidden md:block">
            {new Date(product.createdAt).toLocaleDateString('en-GB')}
          </div>
          <div className={`text-lg tabular-nums w-34 text-center hidden md:block ${product.stock > 0 ? 'text-accent' : 'text-red-500'}`}>
        <span>
        {product.stock > 0 ? 'Available' : 'Out of stock'}
        </span>
          </div>
          {/* <div className="text-2xl font-thin opacity-30 tabular-nums">
            {
              console.log(product.ratings)
            }
          </div> */}
          <div className={`text-xl w-28 text-center tabular-nums hidden md:block ${product.isBestSeller ? 'text-accent' : 'text-red-500'}`}>
            {product.isBestSeller ? "Yes" : "No"}
          </div>
          <div className={`text-xl w-34 text-center tabular-nums hidden md:block ${product.isNewProduct ? 'text-accent' : 'text-red-500'}`}>
            {product.isNewProduct ? "Yes" : "No"} 
          </div>
          <button disabled={isDesableBtn} onClick={()=> handleDeleteProduct(product._id)} className="btn btn-square btn-outline hover:bg-red-500">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
              </g>
            </svg>
          </button>
        </li>
                )
            })
        }

        {/* <li className="list-row">
          <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            />
          </div>
          <div className="list-col-grow">
            <div>Ellie Beilish</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Bears of a fever
            </div>
          </div>
          <button className="btn btn-square btn-ghost">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li className="list-row">
          <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            />
          </div>
          <div className="list-col-grow">
            <div>Sabrino Gardener</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Cappuccino
            </div>
          </div>
          <button className="btn btn-square btn-ghost">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
        </li> */}
      </ul>
    </div>
  );
};
