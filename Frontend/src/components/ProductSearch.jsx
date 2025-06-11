import { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts } = useProductContext();

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchTerm);
  };

  return (
    <div className="product-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default ProductSearch; 