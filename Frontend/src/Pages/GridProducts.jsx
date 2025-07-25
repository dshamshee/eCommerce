import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

// Memoized Product Card Component
const ProductCard = memo(({ product, handleNavigate }) => (
  <div 
    key={product._id} 
    className="group relative dark:bg-gray-800 bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
  >
    {/* Product Badges */}
    <div className="absolute top-3 left-3 z-10 flex gap-2">
      {product.isNew && (
        <span className="dark:bg-green-900 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          New
        </span>
      )}
      {product.isBestSeller && (
        <span className="bg-yellow-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">
          Bestseller
        </span>
      )}
    </div>

    {/* Product Image */}
    <div className="aspect-square overflow-hidden">
      <img
        loading="lazy"
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        width="300"
        height="300"
      />
    </div>

    {/* Product Info */}
    <div className="p-4">
      <h3 className="md:text-lg text-xs text-nowrap overflow-hidden text-ellipsis whitespace-nowrap font-medium dark:text-gray-100 text-gray-900 mb-1">
        {product.name}
      </h3>
      
      {/* Price */}
      <div className="flex md:flex-row flex-col md:items-center gap-2 mb-3">
        <span className="md:text-lg text-sm font-bold dark:text-gray-100 text-gray-900">
          ₹{(product.price - product.discount).toFixed(2)}
        </span>
       
          <div className='flex items-center gap-2'>
          <span className={`text-sm dark:text-gray-400 text-gray-900 line-through ${product.discount === 0 ? 'hidden' : ''}`}>
            ₹{product.price.toFixed(2)} 
          </span>
          <span className={`text-sm dark:text-green-500 text-green-500 ${product.discount === 0 ? 'hidden' : ''}`}>
            {product.discount > 0 && `${Math.round((product.discount/product.price * 100))}% off`}
          </span>
          </div>
  
      </div>

      {/* Color/Size Options */}
      {/* <div className="mb-4">
        {product.colors && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm dark:text-gray-400 text-gray-900">Colors:</span>
            <div className="flex gap-1">
              {product.colors.map((color, i) => (
                <div 
                  key={i}
                  className="w-4 h-4 rounded-full border dark:border-gray-700 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
        
        {product.sizes && (
          <div className="flex items-center gap-1">
            <span className="text-sm dark:text-gray-400 text-gray-900">Sizes:</span>
            <div className="flex gap-1">
              {product.sizes.map((size, i) => (
                <span key={i} className="text-xs px-1.5 py-0.5 dark:bg-gray-700 bg-gray-300 rounded">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div> */}

      {/* Quick Actions */}
      <div className="flex gap-2 md:flex-row flex-col">
        {/* <button className="hidden md:block flex-1 md:text-sm text-xs md:btn-md btn-xs cursor-pointer md:py-2 md:px-4 border dark:border-gray-700 border-gray-300 py-1 px-2 dark:bg-gray-800 dark:text-gray-100 text-gray-900 font-medium rounded dark:hover:bg-gray-700 hover:bg-gray-300 transition-colors">
          Cart
        </button> */}
        <a onClick={() => handleNavigate(product._id)}><button className="md:py-2 py-1 px-6 md:ml-[170px] md:text-sm text-xs md:btn-md btn-xs cursor-pointer md:px-3 md:px-2 border dark:border-gray-700 border-gray-300 font-medium rounded dark:hover:bg-gray-700 hover:bg-gray-300 transition-colors">
          Quick View
        </button>
        </a>
      </div>
    </div>
  </div>
));

// Main Grid Component
export const GridProducts = memo(({products}) => {
  const displayProducts = products.slice(0, 8);
  const navigate = useNavigate();
  // const {getProductById} = useProductContext();

  const handleNavigate = (id) => {
    navigate(`/product-details/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  };

  return (
    <div className="mainContainer">
      <div className="innerContainer py-12 md:px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-gray-100 mt-5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-900 mb-2">Our Collection</h2>
            <p className="text-lg dark:text-gray-400 text-gray-900">Discover pieces designed for comfort and style.</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} handleNavigate={handleNavigate} />
            ))}
          </div>

          {/* View All Button */}
          {/* <div className="text-center mt-10">
            <button className="px-6 py-3 border cursor-pointer dark:border-gray-700 border-gray-300 text-sm font-medium rounded hover:bg-gray-900 hover:text-white transition-colors">
              View All Products
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
});