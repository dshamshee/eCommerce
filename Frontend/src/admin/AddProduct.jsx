import { useState } from "react";
import { toast } from "react-toastify";

export const AddProduct = ()=>{
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageError(null);

        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setImageError('Please upload an image file');
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setImageError('Image must be less than 10MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            gender: formData.get('gender'),
            category: formData.get('category'),
            image: imagePreview, // Changed from formData.get('image') to imagePreview
            colors: formData.get('colors')?.split(',').map(c => c.trim()) || [],
            sizes: formData.get('sizes')?.split(',').map(s => s.trim()) || [],
            discount: parseFloat(formData.get('discount')) || 0,
            isNew: formData.get('isNew') === 'true',
            isBestSeller: formData.get('isBestSeller') === 'true'
        };

        // Validate required fields
        if (!productData.name || !productData.description || !productData.price || !productData.gender || !productData.category || !productData.image) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate price is positive
        if (productData.price <= 0) {
            toast.error('Price must be greater than 0');
            return;
        }

        // Validate discount is less than price
        if (productData.discount && productData.discount >= productData.price) {
            toast.error('Discount must be less than price');
            return;
        }

        console.log(productData);
        toast.success('Product added successfully');
    }

    return(
        <div className="mainContainer min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 bg-gray-100">
            <div className="innerContainer max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100 text-gray-900">Add New Product</h1>
                <form encType="multipart/form-data" className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8 space-y-6" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Product Name
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter product name" 
                            className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Description
                        </label>
                        <textarea 
                            name="description" 
                            className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50 h-32"
                            placeholder="Enter detailed product description" 
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Regular Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 dark:text-gray-400 text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    name="price" 
                                    step="0.01" 
                                    min="0"
                                    placeholder="0.00" 
                                    className="w-full pl-8 pr-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Gender Category
                            </label>
                            <select 
                                name="gender" 
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="Men">Men's Fashion</option>
                                <option value="Women">Women's Fashion</option>
                                <option value="Kids">Kids' Fashion</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Product Category
                        </label>
                        <select 
                            name="category" 
                            className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="T-Shirt">T-Shirt</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Pants">Pants</option>
                            <option value="Jacket">Jacket</option>
                            <option value="Sweater">Sweater</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Dress">Dress</option>
                            <option value="Skirt">Skirt</option>
                            <option value="Shorts">Shorts</option>
                            <option value="Coat">Coat</option>
                            <option value="Blazer">Blazer</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Product Image
                        </label>
                        <div className="mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 border-dashed dark:border-gray-700 border-gray-300 rounded-md">
                            {imagePreview ? (
                                <div className="space-y-4 w-full">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="mx-auto h-40 w-40 object-cover rounded-lg"
                                    />
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                document.getElementById('image').value = '';
                                            }}
                                            className="text-sm text-red-500 hover:text-red-700"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="image" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Upload a file</span>
                                            <input 
                                                id="image" 
                                                name="image" 
                                                type="file" 
                                                accept="image/*" 
                                                className="sr-only" 
                                                required
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1 dark:text-gray-400">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            )}
                            {imageError && (
                                <p className="mt-2 text-sm text-red-500">{imageError}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Available Colors
                            </label>
                            <input 
                                type="text" 
                                name="colors" 
                                placeholder="e.g. Navy Blue, Charcoal Gray, Forest Green" 
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required 
                            />
                        </div>

                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Available Sizes
                            </label>
                            <input 
                                type="text" 
                                name="sizes" 
                                placeholder="e.g. S, M, L, XL, XXL" 
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Discounted Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 dark:text-gray-400 text-gray-500">$</span>
                            <input 
                                type="number" 
                                name="discount" 
                                step="0.01"
                                min="0"
                                placeholder="0.00" 
                                className="w-full pl-8 pr-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="isNew" 
                                    value="true" 
                                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium dark:text-gray-200 text-gray-700">Mark as New Arrival</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="isBestSeller" 
                                    value="true" 
                                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium dark:text-gray-200 text-gray-700">Mark as Best Seller</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-control mt-8">
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Add Product to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}