import { useProductContext } from "../../Context/ProductContext";
import SmoothImage from 'react-smooth-image'
export const NewArrivals = ()=>{

    const {allProducts, isLoading, error} = useProductContext();

    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }

    return(

        <div className="mainContainer mt-16">
            <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-400">New Arrivals</h1>
            <div className="cards grid grid-cols-3 gap-2">
                {
                    allProducts.slice(0, 6).map((product)=>{
                        return <NewArrivalsCard key={product._id} product={product} />
                    })
                }
            </div>
        </div>
    )
}


const NewArrivalsCard = ({product})=>{

    return(
        <div className="container bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
                {/* <img className="w-full h-[400px] object-cover" src={product.images[0]} alt="" /> */}
                <SmoothImage
         src={product.images[0]}
         alt="a nice image of mordor"
         transitionTime={1.0}
         //Other props if you choose to use them
      />
                <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                        New
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 truncate">{product.name}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.discount > 0 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₹{product.price}
                            </span>
                        )}
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            ₹{product.price - product.discount}
                        </span>
                    </div>
                    <button className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}