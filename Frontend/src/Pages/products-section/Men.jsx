import { GetProductByType } from "../../API/GET-SWR/product";

export const Men = () => {
  const { products, error, isLoading } = GetProductByType("Men");

  if (isLoading) {
    return (
      <div className="mainContainer flex justify-center items-center h-screen">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mainContainer">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Men's Collection</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover our latest styles for men</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input 
            type="text" 
            placeholder="Search for men's clothing..." 
            className="w-full p-4 pl-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <figure className="relative cursor-pointer">
                <img 
                  src={`${product.image}`} 
                  alt="Fashion item" 
                  className="w-full h-[400px] object-cover"
                />
                {index % 3 === 0 && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    New Arrival
                  </div>
                )}
                {index % 4 === 0 && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                    Best Seller
                  </div>
                )}
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-lg">{product.name}</h2>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-blue-600">$89.99</span>
                    <span className="text-sm line-through text-gray-400">Rs {product.price}</span>
                    <span className="text-xs text-green-500">-30% OFF</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-nowrap overflow-hidden text-ellipsis">{product.description}</p>
                
                {/* Sizes */}
                <div className="flex gap-2 mt-3">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button 
                      key={size}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors flex items-center justify-center text-sm"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 border-none">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        {/* <div className="flex flex-wrap gap-4 mb-8">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>Category</option>
            <option>Shirts</option>
            <option>Pants</option>
            <option>Suits</option>
            <option>Accessories</option>
          </select>

          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};
