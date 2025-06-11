import { createContext, useContext, useState, useEffect } from 'react';
import { GetProducts } from '../API/GET-SWR/product';

// Create the context
const ProductContext = createContext();

// Custom hook to use the product context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

// Provider component
export const ProductProvider = ({ children }) => {
  const { allProducts, error, isLoading } = GetProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Set the filtered products to all products initially
  useEffect(() => {
    if (allProducts) {
      setFilteredProducts(allProducts);
    }
  }, [allProducts]);

  // Function to filter products by category
  const filterByGenderType = (genderType) => {
    if (!genderType || genderType === 'all') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts?.filter(product => 
        product.genderType.toLowerCase() === genderType.toLowerCase()
      );
      // const unisex = allProducts?.filter(product => product.genderType === 'unisex');
      // console.log('unisex', unisex);
      // const filteredProducts = [...filtered, ...unisex];
      setFilteredProducts(filtered);
    }
  };

  // Function to filter products by price range
  const filterByPriceRange = (min, max) => {
    const filtered = allProducts?.filter(product => 
      product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
  };

  // Function to sort products
  const sortProducts = (sortBy) => {
    let sorted = [...filteredProducts];
    
    switch(sortBy) {
      case 'price-low-to-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // No sorting
        break;
    }
    
    setFilteredProducts(sorted);
  };

  // Search products
  const searchProducts = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(allProducts);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = allProducts?.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  const getProductById = (id) => {
    const product = allProducts?.find(product => product._id === id);
    return product;
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredProducts(allProducts);
  };

  // Context value
  const value = {
    allProducts,
    filteredProducts,
    isLoading,
    error,
    filterByGenderType,
    filterByPriceRange,
    sortProducts,
    searchProducts,
    resetFilters,
    getProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}; 