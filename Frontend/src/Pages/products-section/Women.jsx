import { useState } from "react";
// import { GetProductByType } from "../../API/GET-SWR/product";
import { ProductSkeleton } from "./ProductSceleton";
import { useProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";

export const Women = () => {
  const { filteredProducts, error, isLoading } = useProductContext();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  let filterdata =
    !!filteredProducts &&
    filteredProducts.filter((product) => {
      return product.name
        .toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  console.log(filterdata);

  const handleProductDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  }


  if (isLoading) {
    return (
      <div className="mainContainer flex gap-10 justify-center items-center h-screen">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (filterdata.length === 0) {
    return (
      <div className="mainContainer flex flex-col gap-5 justify-center items-center h-screen">
        <div className="skeletons flex gap-10">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
        <div className="text text-gray-500 text-center dark:text-gray-400 w-[300px]">
          <div className="text-2xl font-bold">No products found</div>
          <a href="/men" className="text-center hover:text-blue-300">
            Back
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="mainContainer">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Women's Collection</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our latest styles for women
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select className="select select-bordered w-full max-w-xs" value={selectedCategory} onChange={handleSelect}>
            <option disabled selected value="">
              Product Type
            </option>
            <option value="T-shirts">T-shirts</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Trousers">Trousers</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
          </select>

          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Sort By
            </option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>

          {/* Search Bar */}
          <div className="relative mb-8 w-1/4 mx-auto ml-0">
            <input
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
              type="text"
              placeholder="Search for women's clothing..."
              className="w-full px-4 py-2 pl-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Products Grid with Infinite Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterdata.map((product, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <figure
                className="relative cursor-pointer"
                onClick={() => {
                  handleProductDetails(product._id);
                }}
              >
                <img
                  src={product.images[0]}
                  alt="Fashion item"
                  className="w-full h-[400px] object-cover"
                />
                {product.isNewProduct && (
                  <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs">
                    New Arrival
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                    Best Seller
                  </div>
                )}
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="name flex flex-col gap-2 w-[80%]">
                    <h2 className="card-title text-lg">{product.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm text-nowrap overflow-hidden text-ellipsis">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                  <div className="price flex flex-row gap-1 items-end">
                    <span className="text-lg font-bold dark:text-gray-400 text-gray-600">₹</span>
                    <span className="text-xl font-bold text-rose-600">
                      {product.price - product.discount}
                    </span>
                    </div>
                    <span className="text-sm line-through text-gray-400">
                      {product.discount ? `Rs ${product.discount}` : ''}
                    </span>
                    <span className="text-xs text-green-500">
                      {product.discount ? `-${Math.floor((product.discount / product.price) * 100)}% OFF` : ''}
                    </span>
                  </div>
                </div>

                {/* Sizes */}
                <div className="flex gap-2 mt-3 items-center h-8"> 
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900 transition-colors flex items-center justify-center text-sm"
                    >
                      {product.sizes.length > 0 ? size : "Size: N/A"}
                    </button>
                  ))}
                </div>

                <div className="card-actions justify-end mt-4">
                  <button onClick={()=> handleProductDetails(product._id)} className="btn btn-primary bg-rose-500 hover:bg-rose-600 border-none">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
