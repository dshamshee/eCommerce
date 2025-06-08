

export const Collection_1 = ({products}) => {

  let imageUrl = `${import.meta.env.VITE_SERVER_PROXY_URI}/images/`;


  return (
    <div className="mainContainer mt-20">
      <div className="innerContainer">
        <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-400">
          New Arrivals
        </h1>
        <h1 className="text-center text-gray-400 mb-5">Popular products with high ratings</h1>
        <p className=" text-sm text-gray-400 md:hidden mt-5">
          Swipe to see more
        </p>
        <div className="carousel rounded-box">
          {
            // only 7 products are shown in the carousel
            products.slice(0, 7).map((product) => {
              return <CarouseItem image={product.images.includes('http') ? product.images : product.images = imageUrl + product.images} key={product._id} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const CarouseItem = ({ image }) => {
  return (
    <>
      <div className="carousel-item mx-2 rounded-md hidden md:block ">
        <div className="img">
          <img
            src={image}
            alt="Burger"
            width={300}
            className="rounded-md object-cover"
          />
        </div>
      </div>

      <div className="carousel-item w-full md:hidden">
        <img
          src={image}
          className="w-full"
          alt="Tailwind CSS Carousel component"
        />
      </div>
    </>
  );
};
