import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="w-full dark:bg-gray-900 bg-gray-100 dark:text-gray-400 text-gray-900 py-3 px-6 border-t dark:border-gray-800 border-gray-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                <div>
                    <h3 className="dark:text-gray-100 text-gray-900 text-lg font-bold mb-4 font-playfair">WOLVE<i className="text-2xl">N</i><span className="text-rose-600 dark:text-rose-500">STITCH</span></h3>
                    <p className="mb-4">Redefining luxury fashion with timeless elegance.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-rose-400">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-rose-400">Twitter</a>
                    </div>
                </div>
                <div>
                    <h4 className="text-gray-100 font-semibold mb-4">Shop</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-rose-400 transition">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-rose-400 transition">Bestsellers</a></li>
                        <li><a href="#" className="hover:text-rose-400 transition">Sale</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-100 font-semibold mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-rose-400 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-rose-400 transition">FAQs</a></li>
                        <li><a href="#" className="hover:text-rose-400 transition">Shipping</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-100 font-semibold mb-4">Admin</h4>
                    <ul className="space-y-2">
                        <li><Link to="/add-product" className="hover:text-rose-400 transition">New Product</Link></li>
                        <li><Link to="#" className="hover:text-rose-400 transition">Manage Products</Link></li>
                        <li><Link to="#" className="hover:text-rose-400 transition">Manage Orders</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-gray-100 font-semibold mb-4">Newsletter</h4>
                    <p className="mb-4">Subscribe for exclusive drops and styling tips.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your email" className="dark:bg-gray-800 bg-gray-600 text-white px-4 py-2 rounded-l-md focus:outline-none" />
                        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r-md transition cursor-pointer">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-5 mt-8">
                <p className="text-gray-900 dark:text-gray-100 text-center text-sm">All Rights Reserved &copy; 2025</p>
                <h1 className="text-gray-900 dark:text-gray-100 text-center text-md">Developed by <span className="text-rose-600 dark:text-rose-500">Danish</span></h1>
            </div>
        </footer>
    );
};