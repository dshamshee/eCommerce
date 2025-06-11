import { useProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
export const Trending = () => {
  const { allProducts, isLoading, error } = useProductContext();
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

//   console.log("allProducts", allProducts);

  return (
    <div className="mainContainer flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-400">
        Trending
      </h1>
      <p className="text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <div className="flex gap-4 mt-4">
        {/* 7 cards Display here */}
        {allProducts.slice(0, 7).map((product) => {
          return <Card key={product._id} product={product} handleProductClick={handleProductClick} />;
        })}
      </div>
    </div>
  );
};

const Card = ({ product, handleProductClick }) => {
  return (
    <div className="container w-[230px] h-[410px] rounded-md flex flex-col bg-gray-800 overflow-hidden">
      {/* Card Image */}
      <img
        onClick={() => {
          handleProductClick(product._id);
        }}
        className="w-[230px] h-[300px] rounded-t-md object-cover cursor-pointer transition-all duration-300 hover:scale-105"
        src={product.images[0]}
        alt=""
      />

      {/* Card Body */}
      <div className="w-full h-[100px] flex flex-col gap-2 px-2 text-white mt-3">
        <h1 className="text-lg font-bold text-nowrap overflow-hidden text-ellipsis text-gray-300">
          {product.name}
        </h1>
        <p className="text-sm text-nowrap text-gray-500 line-clamp-2 overflow-hidden text-ellipsis">
          {product.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="w-full h-[100px] flex justify-between px-4 items-baseline-last mb-3">
        <p className="text-gray-500 line-through">
          {product.discount > 0 ? `₹${product.price}` : ""}
        </p>
        <p className="text-gray-500">₹{product.price - product.discount}</p>
      </div>
    </div>
  );
};
