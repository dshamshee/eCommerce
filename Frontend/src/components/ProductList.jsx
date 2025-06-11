import { useProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { 
    filteredProducts, 
    isLoading, 
    error, 
    filterByCategory, 
    sortProducts 
  } = useProductContext();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!filteredProducts || filteredProducts.length === 0) return <div>No products found</div>;

  return (
    <div className="product-list-container">
      <div className="filter-controls">
        <div className="category-filters flex gap-5">
          <button onClick={() => filterByCategory('all')}>All</button>
          <button onClick={() => filterByCategory('Men')}>Men</button>
          <button onClick={() => filterByCategory('Women')}>Women</button>
          <button onClick={() => filterByCategory('Kids')}>Kids</button>
        </div>
        <div className="sort-controls">
          <select onChange={(e) => sortProducts(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            {/* <img 
              src={product.images[0]} 
              alt={product.name} 
              className="product-image" 
            /> */}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-category">{product.genderType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 