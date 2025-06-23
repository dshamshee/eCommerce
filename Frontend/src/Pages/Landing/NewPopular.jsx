import { useProductContext } from "../../context/ProductContext";
// import SmoothImage from 'react-smooth-image'

export const NewPopular = ()=>{

    const {allProducts, isLoading, error} = useProductContext();


    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }

    return(
        <div className="mainContainer mt-16">
            <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-400">New & Popular</h1>
            <div className="cards grid grid-cols-3 gap-2 ">
            {
                allProducts.slice(0, 6).map((product)=>{
                    
                    return <PopularCard key={product._id} product={product} />
                })
            }
            </div>
        </div>
    )
}


const PopularCard = ({product})=>{

    return(
        <div className="container h-[600px] rounded-md">
            <img className="w-[480px] h-[600px] rounded-md cursor-pointer object-cover transition-all duration-300 hover:scale-102" src={product.images[0]} alt="" />
            {/* <SmoothImage
         src={product.images[0]}
         alt="a nice image of mordor"
         transitionTime={1.0}
        // imageStyles={{height: '700px'}}
        //  imageStyles={{
        //    width: '480px',
        //    height: '600px',
        //    borderRadius: '0.375rem',
        //    cursor: 'pointer',
        //    objectFit: 'cover',
        //    transition: 'all 300ms',
        //    '&:hover': {
        //      transform: 'scale(1.02)'
        //    }
        //  }}
      /> */}
            <h1 className="text-2xl font-bold relative top-[-40px] left-3 text-gray-600 dark:text-gray-400">{product.name}</h1>
        </div>
    )
}