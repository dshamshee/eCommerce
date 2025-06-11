import { NewArrivals } from "./Landing/NewArrivals"
import { NewPopular } from "./Landing/NewPopular"
import { Trending } from "./Landing/Trending"

export const Dashboard2 = ()=>{

    return(
        <div className="mainContainer dark:bg-gray-900 bg-gray-100 w-full md:p-10 p-5">
            {/* Headings  */}
            <div className="headings md:w-[90%] mx-auto flex flex-col items-center justify-center gap-4">
                <div className="headings md:w-[60%] flex flex-col gap-2 items-center justify-center">
                    <h1 className="md:text-5xl text-2xl font-bold font-playfair">Wear your Identity</h1>
                    <h3 className="md:text-lg text-center ">Discover the latest collection from Wolvenstitch - Where comfort meets style. Explore our curated selection of premium apparel designed for the modern lifestyle.</h3>
                </div>
                <div className="buttons flex gap-4">
                    <button className="px-4 py-2 rounded-md md:text-black text-white font-semibold md:bg-white bg-gray-900">Shop the Drop</button>
                    <button className="px-4 py-2 rounded-md btn btn-outline">View Collection</button>
                </div>
            </div>

            {/* Images */}
            <div className="images w-[90%] mx-auto items-end justify-center mt-16 flex md:gap-4 gap-1">
                <h1 className="absolute font-semibold z-10 font-playfair top-[680px] left-[190px] dark:bg-white bg-gray-200 text-gray-900 px-5 py-2 rounded-md">Designed for Self Expences</h1>
                <h1 className="absolute font-semibold z-10 font-playfair top-[380px] left-[850px] dark:bg-gray-50 bg-gray-200 text-gray-900 px-5 py-2 rounded-md">100% Satisfaction</h1>
                <h1 className="absolute font-semibold z-10 font-playfair top-[680px] left-[1100px] dark:bg-white bg-gray-200 text-gray-900 px-5 py-2 rounded-md">Limited Edition Designs</h1>
                <img className="rounded-t-full md:w-[18%] w-[36%] md:h-[500px] h-[300px] object-cover dark:opacity-85" src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <img className="rounded-t-full md:w-[20%] w-[36%] md:h-[600px] h-[300px] object-cover dark:opacity-85" src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <img className="rounded-t-full md:w-[18%] w-[36%] md:h-[500px] h-[300px] object-cover dark:opacity-85" src="https://images.pexels.com/photos/1340967/pexels-photo-1340967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            </div>

<hr className="mb-10 text-gray-400"/>

            {/* Trending Section */}
            <Trending />


            {/* New & Popular Section */}
            <NewPopular />

            {/* <hr className="my-10 text-gray-400"/> */}

            {/* New Arrivals Section */}
            <NewArrivals />
        </div>
    )
}