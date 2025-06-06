import { useState } from "react";
import { GetProductByType } from "../../API/GET-SWR/product";
import { ProductSkeleton } from "./ProductSceleton";

export const Women = ()=>{

    const { products, error, isLoading } = GetProductByType("Women");
  const [searchInput, setSearchInput] = useState("");

    let imageUrl = `${import.meta.env.VITE_SERVER_PROXY_URI}/images/`;

    let filterdata = !!products && products.filter((product)=>{
        return product.name.toString().toLowerCase().includes(searchInput.toLowerCase())
       })
       console.log(filterdata)


    const handleProductDetails = (id)=>{
        console.log(id)
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


    if(filterdata.length === 0){
        return <div className="mainContainer flex flex-col gap-5 justify-center items-center h-screen">
          <div className="skeletons flex gap-10">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          </div>
          <div className="text text-gray-500 text-center dark:text-gray-400 w-[300px]">
            <div className="text-2xl font-bold">No products found</div>
            <a href="/men" className="text-center hover:text-blue-300">Back</a>
          </div>
        </div>
      }


    if(error){
        return <div>Error: {error.message}</div>;
    }

    return(
        <div className="mainContainer">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Women's Collection</h1>
                    <p className="text-gray-600 dark:text-gray-400">Discover our latest styles for women</p>
                </div>
                {/* Search Bar */}
                <div className="relative mb-8">
                    <input 
                        onChange={(e)=>{setSearchInput(e.target.value)}} 
                        value={searchInput}
                        type="text" 
                        placeholder="Search for women's clothing..." 
                        className="w-full p-4 pl-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-pink-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Featured Categories */}
                {/* <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
                    {products.category.map((category) => (
                        <button 
                            key={category}
                            className="px-6 py-3 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 whitespace-nowrap hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                        >
                            {category}
                        </button>
                    ))}
                </div> */}

                {/* Products Grid with Infinite Scroll */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filterdata.map((product, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <figure className="relative cursor-pointer" onClick={()=>{handleProductDetails(product._id)}}>
                                <img 
                                    src={product.image.includes('http') ? product.image : product.image = imageUrl + product.image} 
                                    alt="Fashion item" 
                                    className="w-full h-[400px] object-cover"
                                />
                                {index % 3 === 0 && (
                                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
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
                                   <div className="name flex flex-col gap-2 w-[80%]">
                                   <h2 className="card-title text-lg">{product.name}</h2>
                                   <p className="text-gray-600 dark:text-gray-400 text-sm text-nowrap overflow-hidden text-ellipsis">{product.description}</p>
                                   </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xl font-bold text-pink-600">{product.price-product.discount}</span>
                                        <span className="text-sm line-through text-gray-400">{product.discount ? `Rs ${product.discount}` : `Rs 00` }</span>
                                        <span className="text-xs text-green-500">-{Math.floor((product.discount/product.price)*100)}% OFF</span>
                                    </div>
                                </div>
                                
                                {/* Sizes */}
                                <div className="flex gap-2 mt-3">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button 
                                            key={size}
                                            className="w-8 h-8 rounded-full border border-gray-300 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors flex items-center justify-center text-sm"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary bg-pink-500 hover:bg-pink-600 border-none">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Category</option>
                        <option>Dresses</option>
                        <option>Tops</option>
                        <option>Bottoms</option>
                        <option>Accessories</option>
                    </select>

                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Sort By</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Product Card */}
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <figure><img src="https://placehold.co/300x400" alt="Product" className="w-full h-[300px] object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Floral Summer Dress</h2>
                            <p className="text-gray-600 dark:text-gray-400">Perfect for summer occasions</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold">$89.99</span>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* More Product Cards */}
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <figure><img src="https://placehold.co/300x400" alt="Product" className="w-full h-[300px] object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Elegant Blouse</h2>
                            <p className="text-gray-600 dark:text-gray-400">Classic office wear</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold">$59.99</span>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <figure><img src="https://placehold.co/300x400" alt="Product" className="w-full h-[300px] object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Designer Jeans</h2>
                            <p className="text-gray-600 dark:text-gray-400">Premium denim collection</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold">$129.99</span>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <figure><img src="https://placehold.co/300x400" alt="Product" className="w-full h-[300px] object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Evening Gown</h2>
                            <p className="text-gray-600 dark:text-gray-400">Elegant formal wear</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold">$199.99</span>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <div className="join">
                        <button className="join-item btn">1</button>
                        <button className="join-item btn btn-active">2</button>
                        <button className="join-item btn">3</button>
                        <button className="join-item btn">4</button>
                    </div>
                </div>
            </div>
        </div>
    )
}