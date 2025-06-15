import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSkeleton } from "./ProductSceleton";
import { useProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { addToCart } from "../../API/POST-Axios/cart";
// import { debounce } from 'lodash';

export const ProductDetails = () => {
    const {id} = useParams();
    const {getProductById, isLoading, error, filterByCategory} = useProductContext();
    const product = getProductById(id);
    const navigate = useNavigate();
    const similarProducts = !isLoading && product ? filterByCategory(product.category) : [];

    
    // const [product, setProduct] = useState({
    //     name: "Premium Cotton Casual T-Shirt",
    //     price: 39.99,
    //     description: "Ultra-soft premium cotton t-shirt with a modern fit. Features reinforced stitching and a comfortable crew neckline. Perfect for everyday wear.",
    //     brand: "StyleFit",
    //     category: "Men's Clothing",
    //     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    //     colors: ["White", "Black", "Navy", "Gray", "Burgundy"],
    //     fabric: "100% Cotton",
    //     care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low heat"],
    //     features: [
    //         "Premium cotton fabric",
    //         "Reinforced stitching",
    //         "Crew neckline",
    //         "Regular fit",
    //         "Pre-shrunk material"
    //     ],
        // measurements: {
        //     "S": "Chest: 38\" | Length: 28\"",
        //     "M": "Chest: 40\" | Length: 29\"",
        //     "L": "Chest: 42\" | Length: 30\"",
        //     "XL": "Chest: 44\" | Length: 31\""
        // },
    //     images: [
    //         "https://placehold.co/600x400",
    //         "https://placehold.co/600x400",
    //         "https://placehold.co/600x400",
    //         "https://placehold.co/600x400"
    //     ],
    //     inStock: true,
    //     rating: 4.5,
    //     reviews: 128
    // });

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setSelectedSize('');
        setSelectedColor('');
        setQuantity(1);
    }, [product])
    

    if(isLoading || !product){
        return (
            <div className="sceleton flex flex-row gap-4 w-[90%] mx-auto h-[100vh]">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
            </div>
        )
    }
    if(error || !product){
        return <div>Error: {error.message}</div>
    }
    

    const handleAddToCart = async ()=>{
        if(!selectedSize || !selectedColor){
            toast.error("Please select size and color");
            return;
        }

        // check if product is in stock
        if(product.stock === 0){
            toast.error("Product is out of stock");
            return;
        }

        // add product to cart
        const productData = {
            productId: product._id,
            quantity,
            size: selectedSize,
            color: selectedColor,
        }
        // console.log(productData);
        
        const response = await addToCart(productData);
        if(response.status === 200){
            toast.success("Product added to cart");
            setQuantity(1);
            setSelectedSize('');
            setSelectedColor('');
            // navigate('/cart');
        }else{
            toast.error(response.data.message);
        }
    }

const handleBuyNow = ()=>{
    console.log("Buy Now Button Clicked");
}    


    // const similarProducts = [
    //     {
    //         id: 1,
    //         name: "Classic Denim Jacket",
    //         price: 89.99,
    //         image: "https://placehold.co/300x400",
    //         rating: 4.3
    //     },
    //     {
    //         id: 2, 
    //         name: "Slim Fit Chinos",
    //         price: 59.99,
    //         image: "https://placehold.co/300x400",
    //         rating: 4.4
    //     },
    //     {
    //         id: 3,
    //         name: "Polo Shirt",
    //         price: 34.99,
    //         image: "https://placehold.co/300x400",
    //         rating: 4.2
    //     },
    //     {
    //         id: 4,
    //         name: "Casual Hoodie",
    //         price: 49.99,
    //         image: "https://placehold.co/300x400",
    //         rating: 4.6
    //     }
    // ];

    return (
        <div className="mainContainer p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="carousel w-full rounded-lg overflow-hidden">
                            {product.images.map((image, index) => (
                                <div key={index} className="carousel-item w-full">
                                    <img src={image} className="w-full object-cover" alt={`${product.name} view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {product.images.map((image, index) => (
                                <div key={index} className="w-20 h-20">
                                    <img src={image} className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-75" alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-xl font-semibold mt-2">${product.price}</p>
                            <div className="flex items-center mt-2">
                                <div className="rating rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <input 
                                            key={i}
                                            type="radio" 
                                            name="rating-2" 
                                            className={`mask mask-star-2 ${i < Math.floor(product.ratings?.$numberDecimal) ? 'bg-orange-400' : 'bg-gray-500 dark:bg-gray-200'}`}
                                            disabled
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert">
                            <p>{product.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className="font-semibold mb-2">Select Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`btn btn-sm ${selectedSize === size ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            
                            {/* For showing the size measurements */}
                            {/* {selectedSize && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {product.measurements[selectedSize]}
                                </p>
                            )} */}
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="font-semibold mb-2">Select Color</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`btn btn-sm  ${selectedColor === color ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="font-semibold mb-2">Quantity</h3>
                            <div className="flex items-center gap-2">
                                <button 
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button 
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="py-1 flex flex-row gap-2 w-full justify-around items-center">
                            <button 
                            className="btn btn-info hover:bg-rose-500 w-[45%]"
                            onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>

                            <button 
                            className="btn btn-warning hover:bg-success w-[50%]"
                            onClick={handleBuyNow}
                            >Buy Now</button>
                        </div>

                        {/* Fabric & Care */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Fabric & Care</h3>
                            <p className="text-sm mb-2">Fabric: {product.fabric}</p>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                {product.care.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Features</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Info */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span>Brand:</span>
                                <span className="font-playfair font-bold">WOLVE<span className="italic text-xl font-playfair">N</span><span className="text-rose-500">STITCH</span></span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span>Category:</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span>Availability:</span>
                                <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {similarProducts.map((item) => (
                            <div key={item._id} className="card bg-base-100 shadow-xl">
                                <figure>
                                    <img src={item.images[0]} alt={item.name} className="w-full h-64 object-cover" />
                                    </figure>
                                <div className="card-body">
                                    <h3 className="card-title text-lg">{item.name}</h3>
                                    <div className="flex items-center">
                                        <div className="rating rating-sm">
                                            {[...Array(5)].map((_, i) => (
                                                <input 
                                                    key={i}
                                                    type="radio" 
                                                    name={`rating-${item.id}`}
                                                    className={`mask mask-star-2 ${i < Math.floor(item.ratings?.$numberDecimal  ) ? 'bg-orange-400' : 'bg-gray-300'}`}
                                                    disabled
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold">${item.price}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary btn-sm" onClick={() => {
                                            navigate(`/product-details/${item._id}`)
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            });
                                        }}>View Details</button>
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