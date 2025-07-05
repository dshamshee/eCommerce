import {
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaFilter,
  FaTrash,
} from "react-icons/fa";
import { IoArrowUpCircle } from "react-icons/io5";
import { GetLimitedProducts } from "../API/GET-SWR/product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteProduct } from "../API/POST-Axios/productApi";
import { toast } from "react-toastify";
import { mutate } from "swr";
import {ProductSkeleton} from '../Pages/products-section/ProductSceleton'
import {ErrorPage} from '../Pages/ErrorPage'


export const ProductList = () => {
  const { limit } = useParams();
  const { products, error, isLoading } = GetLimitedProducts(limit);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const handlePrevious = () => {
    if (limit > 1) {
      navigate(`/admin/products-list/${Number(limit) - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/admin/products-list/${Number(limit) + 1}`);
  };

  const handleDeleteProduct = async (id) => {
    // isDesableBtn = true;
    const response = await DeleteProduct(id); // this is axios call (SWR is not working here)
    if (response.status === 200) {
      toast.success("Product deleted successfully");
      // isDesableBtn = false;
      // window.location.reload();
      mutate(`/product/get-products/${limit}`);
    } else {
      toast.error("Product not deleted");
      // isDesableBtn = false;
    }
  };

  const handleSort = (sortType) => {
    if (sortType === "lowToHigh") {
      const sortedProducts = [...allProducts].sort((a, b) => parseInt(a.stock) - parseInt(b.stock));
      setAllProducts(sortedProducts);
    } else if (sortType === "highToLow") {
      const sortedProducts = [...allProducts].sort((a, b) => parseInt(b.stock) - parseInt(a.stock));
      setAllProducts(sortedProducts);
    }else if(sortType === 'all'){
      setAllProducts(products);
    }
  };

  const handleFilter = (filterType) => {
    if (filterType === "all") {
      setAllProducts(products);
    } else if (filterType === "men") {
      setAllProducts(products.filter((product) => product.genderType === "Men"));
    } else if (filterType === "women") {
      setAllProducts(products.filter((product) => product.genderType === "Women"));
    } else if (filterType === "kids") {
      setAllProducts(products.filter((product) => product.genderType === "Kids"));
    }else if(filterType === 'Unisex'){
      setAllProducts(products.filter((product) => product.genderType === "Unisex"));
    }else if(filterType === 'newArrival'){
      setAllProducts(products.filter((product) => product.isNewProduct));
    }else if(filterType === 'bestSeller'){
      setAllProducts(products.filter((product) => product.isBestSeller));
    }
  };

  if(isLoading){
    return(
      <div className="mainContainer flex flex-row justify-center items-center h-screen gap-4">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    )
  }

  if(error){
    return(
      <ErrorPage />
    )
  }

  return (
    <div className="mainContainer  w-full dark:bg-gray-800 bg-gray-100 shadow-lg py-4 rounded-md">
      <h1 className="dark:text-primary text-rose-500 text-2xl font-semibold underline dark:decoration-primary decoration-rose-500 decoration-2 shadow-lg pb-2 text-center mb-4">
        List of Products
      </h1>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Price</th>
              <th className="">
                <div className="flex items-center gap-1 dropdown dropdown-bottom dropdown-left">
                  <span>Stock</span>
                  <IoArrowUpCircle className="dark:text-primary text-secondary text-xl cursor-pointer" tabIndex={0} role="button" />
                  <ul tabIndex={0} className="dropdown-content dropdown-bottom menu dark:bg-gray-600 bg-gray-100 rounded-box z-1 w-36 mt-2 p-2 shadow-sm">
                    <li onClick={() => handleSort("all")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">All</li>
                    <li onClick={() => handleSort("lowToHigh")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Low to High</li>
                    <li onClick={() => handleSort("highToLow")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">High to Low</li>
                    
                  </ul>
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1 dropdown dropdown-bottom dropdown-left">
                  <span>Type</span>
                  <FaFilter className="dark:text-primary text-secondary text-lg cursor-pointer" tabIndex={0} role="button"  />
                  <ul tabIndex={0} className="dropdown-content menu dark:bg-gray-600 bg-gray-100 rounded-box z-1 w-36 mt-2 p-2 shadow-sm">
                    <li onClick={() => handleFilter("all")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">All</li>
                    <li onClick={() => handleFilter("men")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Men</li>
                    <li onClick={() => handleFilter("women")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Women</li>
                    <li onClick={() => handleFilter("kids")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Kids</li>
                    <li onClick={() => handleFilter("Unisex")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Unisex</li>
                  </ul>
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1 dropdown dropdown-bottom dropdown-left">
                  <span>Status</span>
                  <FaCheckCircle className="dark:text-primary text-secondary text-lg cursor-pointer" tabIndex={0} role="button"/>
                  <ul tabIndex={0} className="dropdown-content menu dark:bg-gray-600 bg-gray-100 rounded-box z-1 w-36 mt-2 p-2 shadow-sm">
                    <li onClick={() => handleFilter("all")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">All</li>
                    <li onClick={() => handleFilter("newArrival")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">New Arrival</li>
                    <li onClick={() => handleFilter("bestSeller")} className="cursor-pointer py-1 px-2 rounded-md dark:hover:bg-gray-500">Best Seller</li>
                  </ul>
                </div>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {!isLoading &&
              allProducts &&
              allProducts.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="rounded-full h-10 w-10">
                            <img src={product.images[0]} alt={product.name} />
                          </div>
                        </div>
                        <div>
                          <h1 className="font-bold">{product.name}</h1>
                        </div>
                      </div>
                    </td>
                    <td>{product._id}</td>
                    <td>{product.price}</td>
                    <td
                      className={`${product.stock === 0 ? "text-warning" : ""}`}
                    >
                      {product.stock === 0 ? "Unavailable" : product.stock}
                    </td>
                    <td>{product.genderType}</td>
                    <td>
                      <div className="flex flex-col gap-2 items-start ">
                        <span
                          className={`font-semibold ${
                            product.isNewProduct
                              ? "badge badge-xs badge-outline badge-primary"
                              : ""
                          } `}
                        >
                          {product.isNewProduct ? "New Arrival" : ""}
                        </span>
                        <span
                          className={`font-semibold ${
                            product.isBestSeller
                              ? "badge badge-xs badge-outline badge-secondary"
                              : ""
                          } `}
                        >
                          {product.isBestSeller ? "Best Seller" : ""}
                        </span>
                        <span
                          className={`font-semibold ${
                            product.isBestSeller || product.isNewProduct
                              ? ""
                              : "badge badge-xs badge-outline badge-warning"
                          } `}
                        >
                          {product.isBestSeller || product.isNewProduct
                            ? ""
                            : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 justify-around">
                        <Link to={`/product-details/${product._id}`} className="">
                          <FaEye className="text-success hover:text-secondary text-sm cursor-pointer" />
                        </Link>
                        <button onClick={() => navigate(`/admin/edit-product/${product._id}`)} className="">
                          <FaEdit className="text-primary hover:text-info text-sm cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className=""
                        >
                          <FaTrash className="text-red-500 hover:text-warning text-sm cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="join w-full flex justify-center items-center mt-4 border-t-2 dark:border-gray-600 border-gray-300 pt-4">
          <button
            disabled={Number(limit) === 1}
            onClick={handlePrevious}
            className="join-item btn btn-sm btn-outline"
          >
            «
          </button>
          <button className="join-item btn btn-sm btn-outline">
            Page {Number(limit)}
          </button>
          <button
            disabled={!isLoading && allProducts && allProducts.length === 0}
            onClick={handleNext}
            className="join-item btn btn-sm btn-outline"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};
