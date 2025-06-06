import { useState } from "react";
import { toast } from "react-toastify";
import { addProduct } from "../API/POST-Axios/productApi";

export const AddProduct = ()=>{
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        genderType: '',
        category: '',
        image: null,
        colors: [],
        sizes: [],
        discount: '',
        isNew: false,
        isBestSeller: false,
        stock: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (name === 'colors') {
            const colorArray = value.split(',').map(color => color.trim());
            setFormData(prev => ({
                ...prev,
                colors: colorArray
            }));
        } else if (name === 'sizes') {
            const sizeArray = value.split(',').map(size => size.trim());
            setFormData(prev => ({
                ...prev,
                sizes: sizeArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

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

            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            setFormData(prev => ({
                ...prev,
                image: null
            }));
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.description || !formData.price || 
            !formData.genderType || !formData.category || !formData.image) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate price is positive
        if (parseFloat(formData.price) <= 0) {
            toast.error('Price must be greater than 0');
            return;
        }

        // Validate discount is less than price
        if (formData.discount && parseFloat(formData.discount) >= parseFloat(formData.price)) {
            toast.error('Discount must be less than price');
            return;
        }

        try {
            const response = await addProduct(formData);
            if(response.status === 201){
                toast.success('Product added successfully');
                // Clear form
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    genderType: '',
                    category: '',
                    image: null,
                    colors: [],
                    sizes: [],
                    discount: '',
                    isNew: false,
                    isBestSeller: false,
                    stock: ''
                });
                setImagePreview(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        }
    }

    return(
        <div className="mainContainer min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 bg-gray-100">
            <div className="innerContainer max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100 text-gray-900">Add New Product</h1>
                <form encType="multipart/form-data" className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Product Name
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
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
                            value={formData.description}
                            onChange={handleInputChange}
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
                                    value={formData.price}
                                    onChange={handleInputChange}
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
                                name="genderType"
                                value={formData.genderType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                            Product Category
                        </label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
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
                                                setFormData(prev => ({...prev, image: null}));
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
                                value={formData.colors.join(', ')}
                                onChange={handleInputChange}
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
                                value={formData.sizes.join(', ')}
                                onChange={handleInputChange}
                                placeholder="e.g. S, M, L, XL, XXL" 
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Discounted Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 dark:text-gray-400 text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00" 
                                    className="w-full pl-8 pr-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
                                Stock Quantity
                            </label>
                            <input 
                                type="number" 
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="Enter stock quantity" 
                                className="w-full px-3 py-2 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 bg-gray-50"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleInputChange}
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
                                    checked={formData.isBestSeller}
                                    onChange={handleInputChange}
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