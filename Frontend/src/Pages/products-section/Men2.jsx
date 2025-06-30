import { useEffect, useState, useCallback, useRef } from "react";
import { GetProductByType } from "../../API/GET-SWR/product";
import { ProductSkeleton } from "./ProductSceleton";
import { ErrorPage } from "../ErrorPage";
import { useNavigate } from "react-router-dom";
export const Men2 = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const { products, error, isLoading } = GetProductByType("Men");
  const carouselRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [menProducts, setMenProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (products) {
      setMenProducts(products);
    }
  }, [products]);

  // Function to go to a specific slide
  const goToSlide = useCallback(
    (slideNumber) => {
      setActiveSlide(slideNumber);
      // Only try to scroll if products are loaded
      if (products && products.length > 0 && carouselRef.current) {
        const slideElement = document.getElementById(
          `product-slide-${slideNumber}`
        );
        if (slideElement) {
          // Calculate the scroll position within the carousel container
          const scrollPosition = slideElement.offsetLeft;
          // Scroll the carousel container horizontally without affecting page scroll
          carouselRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    },
    [products]
  );

  // Function to change slide every 5 seconds using useEffect
  useEffect(() => {
    // Only set up auto-sliding if we have products
    if (products && products.length > 0) {
      const maxSlide = Math.min(products.length, 4);
      const interval = setInterval(() => {
        const nextSlide = activeSlide >= maxSlide ? 1 : activeSlide + 1;
        goToSlide(nextSlide);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeSlide, goToSlide]);

  if (isLoading) {
    return (
      <div className="mainContainer pt-3 w-full md:h-screen flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mainContainer pt-3 w-full">
        <ErrorPage />
      </div>
    );
  }

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mainContainer py-3 w-full">
      {/* Carousel Section */}
      <div className="relative py-2">
        <div
          ref={carouselRef}
          className="carousel overflow-hidden shadow-lg md:h-[400px] h-[200px] w-full scroll-smooth"
        >
          {products &&
            products.slice(0, 4).map((product, index) => {
              const slideNumber = index + 1;
              return (
                <div
                  id={`product-slide-${slideNumber}`}
                  className="carousel-item relative w-full"
                  key={product._id}
                >
                  <img
                    src={product.images[0]}
                    className="w-full object-cover"
                    alt={product.title}
                  />
                  <div className="absolute inset-0 bg-gray-500 opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-3 md:px-0">
                      <h2 className="text-3xl font-bold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-lg">
                        {product.description.slice(0, 50)}
                      </p>
                      <button className="mt-4 btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  <div className="absolute hidden md:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goToSlide(
                          slideNumber === 1
                            ? Math.min(products.length, 4)
                            : slideNumber - 1
                        );
                      }}
                      className="btn btn-circle bg-black opacity-30 border-none text-white hover:bg-black"
                    >
                      ❮
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goToSlide(
                          slideNumber === Math.min(products.length, 4)
                            ? 1
                            : slideNumber + 1
                        );
                      }}
                      className="btn btn-circle bg-black opacity-30 border-none text-white hover:bg-black"
                    >
                      ❯
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Carousel Indicators */}
        <div className="hidden md:flex justify-center w-full py-2 gap-2 absolute bottom-4">
          {products &&
            products.slice(0, 4).map((_, index) => {
              const slideNumber = index + 1;
              return (
                <button
                  key={slideNumber}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSlide(slideNumber);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    activeSlide === slideNumber
                      ? "bg-white"
                      : "bg-white opacity-50"
                  }`}
                />
              );
            })}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero flex md:flex-row flex-col gap-2 items-start min-h-[400px]">
        {/* Filter Section */}
        <div className="left hidden md:flex w-[20%] min-h-[400px] dark:bg-gray-800 bg-gray-300 p-3 rounded-md flex-col gap-2">
          <Filter
            handleChange={handleChange}
            activeTab={activeTab}
            setMenProducts={setMenProducts}
          />
        </div>

        {/* Product Section */}
        <div className="right md:w-[80%] grid grid-cols-2 md:grid-cols-4 gap-2 px-1 md:px-2">
          {products &&
            menProducts.slice(0, 4).map((product) => {
              return (
                <div
                  className="cardContainer mt-2"
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="imageContainer md:w-[290px] hover:scale-102 transition-all duration-300 cursor-pointer">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full md:h-[430px] object-cover object-center"
                    />
                  </div>
                  <div className="contentContainer">
                    <p className="text-md text-gray-300 font-bold line-clamp-1 text-wrap overflow-hidden text-ellipsis">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-1 text-wrap overflow-hidden text-ellipsis">
                      {product.description}
                    </p>
                    <div className="pricing flex items-center gap-2">
                      <span className="text-sm text-gray-200 font-semibold">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.discount
                          ? `₹${product.price + product.discount}`
                          : ""}
                      </span>
                      <span className="text-sm text-green-500">
                        {product.discount
                          ? `${Math.floor(
                              (product.discount / product.price) * 100
                            )}% off`
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* More Products Section */}
      <div className="moreProducts grid grid-cols-2 md:grid-cols-5 gap-2 px-1 md:px-2 mb-10">
        {menProducts.slice(4, menProducts.length).map((product) => {
          return (
            <div
              className="cardContainer mt-2"
              key={product._id}
              onClick={() => handleProductClick(product._id)}
            >
              <div className="imageContainer md:w-[290px] hover:scale-102 transition-all duration-300 cursor-pointer">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full md:h-[430px] object-cover object-center"
                />
              </div>
              <div className="contentContainer">
                <p className="text-md text-gray-300 font-bold line-clamp-1 text-wrap overflow-hidden text-ellipsis">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1 text-wrap overflow-hidden text-ellipsis">
                  {product.description}
                </p>
                <div className="pricing flex items-center gap-2">
                  <span className="text-sm text-gray-200 font-semibold">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.discount
                      ? `₹${product.price + product.discount}`
                      : ""}
                  </span>
                  <span className="text-sm text-green-500">
                    {product.discount
                      ? `${Math.floor(
                          (product.discount / product.price) * 100
                        )}% off`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

// Filter Component
const Filter = ({ handleChange, activeTab, setMenProducts }) => {
  const { products } = GetProductByType("Men");

  const handleAll = () => {
    handleChange("all");
    setMenProducts(products);
  };

  const handleShirt = () => {
    handleChange("shirt");
    setMenProducts(products.filter((product) => product.category === "Shirt"));
    // setMenProducts(menProducts.filter((product) => product.category === "Shirt"));
  };

  const handleTShirt = () => {
    handleChange("t-shirt");
    setMenProducts(
      products.filter((product) => product.category === "T-shirt")
    );
    // setMenProducts(menProducts.filter((product) => product.category === "T-shirt"));
  };
  const handleJeans = () => {
    handleChange("jeans");
    setMenProducts(products.filter((product) => product.category === "Jeans"));
    // setMenProducts(menProducts.filter((product) => product.category === "Jeans"));
  };
  const handleShorts = () => {
    handleChange("shorts");
    setMenProducts(products.filter((product) => product.category === "Shorts"));
    // setMenProducts(menProducts.filter((product) => product.category === "Shorts"));
  };
  const handlePrice = () => {
    handleChange("price");
    setMenProducts(products.sort((a, b) => a.price - b.price));
    // setMenProducts(menProducts.sort((a, b) => a.price - b.price));
  };

  return (
    <>
      <button
        onClick={handleAll}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "all"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        All
      </button>
      <button
        onClick={handleShirt}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "shirt"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Shirt
      </button>
      <button
        onClick={handleTShirt}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "t-shirt"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        T-Shirt
      </button>
      <button
        onClick={handleJeans}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "jeans"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Jeans
      </button>
      <button
        onClick={handleShorts}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "shorts"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Shorts
      </button>
      <button
        onClick={handlePrice}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "price"
            ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Price
      </button>
    </>
  );
};
