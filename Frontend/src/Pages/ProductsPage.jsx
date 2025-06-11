import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import { useProductContext } from '../context/ProductContext';

const ProductsPage = () => {
  const { isLoading, error } = useProductContext();

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      <ProductSearch />
      
      {isLoading ? (
        <div className="loading-state">Loading products...</div>
      ) : error ? (
        <div className="error-state">
          Error loading products: {error.message}
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
};

export default ProductsPage; 