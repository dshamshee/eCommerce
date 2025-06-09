import { useReducer, useCallback, useState } from 'react';
import { addProduct, uploadImages } from '../API/POST-Axios/productApi';
import { toast } from 'react-toastify';

const initialState = {
    name: '',
    description: '',
    price: '',
    category: '',
    genderType: '',
    discount: '0',
    sizes: [],
    colors: [],
    images: [],
    stock: '',
    isNew: false,
    isBestSeller: false
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const categories = ['T-shirt', 'Shirt', 'Jeans', 'Hoodie', 'Jacket', 'Sweater', 'Shorts'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Grey', 'Navy'];

export const AddProduct = () => {
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [selectedImageNames, setSelectedImageNames] = useState([]);
    const [selectedImages, setSelectedImages] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            dispatch({ type: 'UPDATE_FIELD', field: name, value: checked });
        } else if (type === 'file') {
            const imageData = new FormData();
            Array.from(files).forEach(file => {
                imageData.append(`images`, file);
            });
            setSelectedImages(imageData);
            setSelectedImageNames(Array.from(files).map(file => file.name));
        } else {
           dispatch({ type: 'UPDATE_FIELD', field: name, value });
       }
    }, []);

    const handleSizeToggle = useCallback((size) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field: 'sizes',
            value: formData.sizes.includes(size)
                ? formData.sizes.filter(s => s !== size)
                : [...formData.sizes, size]
        });
    }, [formData.sizes]);

    const handleColorToggle = useCallback((color) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field: 'colors',
            value: formData.colors.includes(color)
                ? formData.colors.filter(c => c !== color)
                : [...formData.colors, color]
        });
    }, [formData.colors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await addProduct(formData);            
            if(response.status === 201){
                toast.success('Product added successfully!');
                const imageUploadResponse = await uploadImages(selectedImages, response.data.product._id);
                if(imageUploadResponse.status === 200){
                    toast.success('Images uploaded successfully!');
                }
                dispatch({ type: 'RESET_FORM' });
                setSelectedImages([]);
                setSelectedImageNames([]);
            }
            

        } catch (error) {
            toast.error(error.message || 'Error adding product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Product</h1>
                    <p className="text-gray-600 dark:text-gray-300">Fill out the form below to add a new product to your inventory</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 min-h-[42px]"
                                    rows="1"
                                    required
                                />
                            </div>
                        </div>

                        {/* Price, Discount, Stock */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Price (₹) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Discount (₹)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                                    <input 
                                        type="number" 
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Stock <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="Available quantity"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Category and Gender */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Gender Type <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="genderType"
                                    value={formData.genderType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                        </div>

                        {/* Sizes and Colors */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Sizes <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => handleSizeToggle(size)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border
                                                ${formData.sizes.includes(size)
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {formData.sizes.length === 0 && (
                                    <p className="text-sm text-red-500 mt-1">Please select at least one size</p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Colors <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-3 items-center">
                                    {availableColors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => handleColorToggle(color)}
                                            className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center
                                                ${formData.colors.includes(color)
                                                    ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                                                    : 'hover:scale-110'
                                                }`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            title={color}
                                        >
                                            {formData.colors.includes(color) && (
                                                <svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {formData.colors.length === 0 && (
                                    <p className="text-sm text-red-500 mt-1">Please select at least one color</p>
                                )}
                            </div>
                        </div>

                        {/* Product Images */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Images <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full max-w-lg rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG, JPEG (MAX. 5 images)
                                        </p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="images"
                                        onChange={handleChange}
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>
                            {selectedImageNames.length > 0 && (
                                <div className="mt-3 space-y-1">
                                    <p className="text-sm font-medium dark:text-gray-200">Selected Images:</p>
                                    <div className="max-h-32 overflow-y-auto">
                                        {selectedImageNames.map((name, index) => (
                                            <p key={index} className="text-sm text-gray-600 dark:text-gray-400 py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded">
                                                {index + 1}. {name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Checkboxes */}
                        <div className="flex flex-wrap gap-6">
                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">New Arrival</span>
                            </label>

                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox"
                                    name="isBestSeller"
                                    checked={formData.isBestSeller}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Best Seller</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full px-6 py-3.5 text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};