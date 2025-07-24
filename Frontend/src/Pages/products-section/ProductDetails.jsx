import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSkeleton } from "./ProductSceleton";
import { useProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { addToCart } from "../../API/POST-Axios/cart";
import { mutate } from "swr";

export const ProductDetails = () => {
  const { id } = useParams();
  const { getProductById, isLoading, error, filterByCategory } =
    useProductContext();
  const product = getProductById(id);
  const navigate = useNavigate();
  const similarProducts =
    !isLoading && product ? filterByCategory(product.category) : [];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="sceleton flex md:flex-row flex-col justify-center items-center gap-4 w-[90%] mx-auto h-[100vh]">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }
  if (error || !product) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to add product to cart");
      navigate("/login");
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    const productData = {
      productId: product._id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    try {
      setBtnLoading(true);
      const response = await addToCart(productData);
      if (response.status === 200) {
        toast.success("Product added to cart");
        setQuantity(1);
        setSelectedSize("");
        setSelectedColor("");
        mutate("/cart/get-cart-items");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!localStorage.getItem("token")) {
        toast.error("Please login to add product to cart");
        navigate("/login");
        return;
      }
  
      if (!selectedSize || !selectedColor) {
        toast.error("Please select size and color");
        return;
      }
  
      if (product.stock === 0) {
        toast.error("Product is out of stock");
        return;
      }
  
      const productData = {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      };

      try {
        setBtnLoading(true);
        const response = await addToCart(productData);
        if (response.status === 200) {
          setQuantity(1);
          setSelectedSize("");
          setSelectedColor("");
          mutate("/cart/get-cart-items");
          navigate(`/checkout/${product._id}`);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setBtnLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

      {/* Breadcrumb */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
            <span className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap" onClick={() => navigate('/')}>Home</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap" onClick={()=> navigate(-1)}>{product.genderType}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap" onClick={()=> navigate(-1)}>{product.category}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Main Product Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Product Images Section */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 sm:p-8">
              {/* Main Image */}
              <div className="relative group mb-4 sm:mb-6">
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg">
                  <img
                    src={product.images[currentImageIndex]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={`${product.name} view ${currentImageIndex + 1}`}
                  />
                </div>
                
                {/* Image Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                      onClick={() => setCurrentImageIndex(currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1)}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                      onClick={() => setCurrentImageIndex(currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1)}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Stock Badge */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2 dark:ring-offset-gray-800 scale-110' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      className="w-full h-full object-cover"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-4 sm:p-8 lg:p-12">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < Math.floor(product.ratings?.$numberDecimal)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-1 sm:ml-2">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    ₹{product.discount && parseInt(product.discount) > 0 ? product.price - parseInt(product.discount) : product.price}
                  </span>
              
                    <>
                      <span className="text-lg sm:text-xl text-gray-500 line-through">
                        {product.discount && parseInt(product.discount) > 0 ? `₹${product.price}` : ''}
                      </span>
                      <span className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${product.discount && parseInt(product.discount) > 0 ? 'block' : 'hidden'}`}>
                        {Math.round((parseInt(product.discount) / product.price) * 100)}% OFF
                      </span>
                    </>
             
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Selection Options */}
              <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
                {/* Size Selection */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`relative px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border-2 font-medium transition-all duration-300 text-sm sm:text-base ${
                          selectedSize === size
                            ? "border-blue-500 bg-blue-500 text-white shadow-lg scale-105"
                            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:scale-105"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                        {selectedSize === size && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`relative px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border-2 font-medium transition-all duration-300 text-sm sm:text-base ${
                          selectedColor === color
                            ? "border-blue-500 bg-blue-500 text-white shadow-lg scale-105"
                            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:scale-105"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                        {selectedColor === color && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-1 w-fit">
                    <button
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-105 flex items-center justify-center font-bold text-sm sm:text-base"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <div className="w-12 h-10 sm:w-16 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center font-bold text-sm sm:text-lg bg-gray-50 dark:bg-gray-700">
                      {quantity}
                    </div>
                    <button
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-105 flex items-center justify-center font-bold text-sm sm:text-base"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                  onClick={handleAddToCart}
                  disabled={btnLoading || product.stock === 0}
                >
                  {btnLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7.5" />
                      </svg>
                      Add to Cart
                    </div>
                  )}
                </button>

                <button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                  onClick={handleBuyNow}
                  disabled={btnLoading || product.stock === 0}
                >
                  {btnLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Buy Now
                    </div>
                  )}
                </button>
              </div>

              {/* Product Information Tabs */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
                <div className="space-y-4 sm:space-y-6">
                  {/* Fabric & Care */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                      Fabric & Care
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Fabric: {product.fabric}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {product.care.map((instruction, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full"></div>
                          {instruction}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Product Details
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Brand</span>
                        <span className="font-playfair font-bold text-sm sm:text-base">
                          WOLVE<span className="italic text-base sm:text-xl font-playfair">N</span>
                          <span className="text-rose-500">STITCH</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Category</span>
                        <span className="font-medium text-sm sm:text-base">{product.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Availability</span>
                        <span className={`font-medium text-sm sm:text-base ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">You May Also Like</h2>
            <div className="hidden sm:block h-1 flex-1 bg-gradient-to-r from-blue-500 to-transparent mx-6 rounded-full"></div>
          </div>
          
          {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {similarProducts.map((item) => (
              <div 
                key={item._id} 
                className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Discount Badge */}
                  {/* {item.discount && parseInt(item.discount) > 0 && ( */}
                    <div className="absolute top-2 left-2">
                      <span className={`bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold ${item.discount && parseInt(item.discount) > 0 ? 'block' : 'hidden'}`}>
                        {Math.round((parseInt(item.discount) / item.price) * 100)}% OFF
                      </span>
                    </div>
                  {/* )} */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                    onClick={() => {
                      navigate(`/product-details/${item._id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    View
                  </button>
                </div>
                
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-xs sm:text-base leading-tight">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(item.ratings?.$numberDecimal)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">
                        ₹{item.discount && parseInt(item.discount) > 0 ? item.price - parseInt(item.discount) : item.price}
                      </span>
                 
                        <span className={`text-xs sm:text-sm text-gray-500 line-through ${item.discount && parseInt(item.discount) > 0 ? 'block' : 'hidden'}`}>
                          ₹{item.price}
                        </span>
                
                    </div>
                    <div className="hidden sm:flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
