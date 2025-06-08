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

const categories = ['T-shirt', 'Shirt', 'Jeans', 'Hoodie', 'Jacket', 'Sweater'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Grey', 'Navy'];

export const AddProduct = () => {
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [selectedImageNames, setSelectedImageNames] = useState([]);
    const [selectedImages, setSelectedImages] = useState();

    const handleChange = useCallback((e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            dispatch({ type: 'UPDATE_FIELD', field: name, value: checked });
        } else if (type === 'file') {
            const imageData = new FormData();
            // Append each file to formData
            Array.from(files).forEach(file => {
                imageData.append(`images`, file);
            });
            setSelectedImages(imageData);
            setSelectedImageNames(Array.from(files).map(file => file.name));
            
            // setSelectedImages(files);
            // setSelectedImageNames(fileList.map(file => file.name));
            // dispatch({ type: 'UPDATE_FIELD', field: name, value: fileList });
        } else {
           dispatch({ type: 'UPDATE_FIELD', field: name, value });
       }
    }, []);


    // const handleImageChange = async (e) => {
    //     const files = e.target.files;
    //     const imageData = new FormData();
        
    //     // Append each file to formData
    //     Array.from(files).forEach(file => {
    //         imageData.append(`images`, file);
    //     });

    //     const response = await uploadImages(imageData);
    //     console.log('response', response);
       
    // };

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
        try {
            const response = await addProduct(formData);
            const imageUploadResponse = await uploadImages(selectedImages);
            if(response.status === 201){
                toast.success('Product added successfully!');
                dispatch({ type: 'RESET_FORM' });
                setSelectedImages([]);
                setSelectedImageNames([]);
            }
            if(imageUploadResponse.status === 200){
                toast.success('Images uploaded successfully!');
            }else toast.error('Error uploading images');
        } catch (error) {
            toast.error(error.message || 'Error adding product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Add New Product</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Product Name</span>
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Description</span>
                            </label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                className="textarea textarea-bordered h-[42px] bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Price (₹)</span>
                            </label>
                            <input 
                                type="number" 
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="input input-bordered bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Discount (₹)</span>
                            </label>
                            <input 
                                type="number" 
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                min="0"
                                placeholder="0"
                                className="input input-bordered bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Stock</span>
                            </label>
                            <input 
                                type="number" 
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                min="0"
                                placeholder="Available quantity"
                                className="input input-bordered bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Category</span>
                            </label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Gender Type</span>
                            </label>
                            <select 
                                name="genderType"
                                value={formData.genderType}
                                onChange={handleChange}
                                className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Available Sizes</span>
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSizeToggle(size)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                            ${formData.sizes.includes(size)
                                                ? 'bg-primary text-white shadow-md transform scale-105'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {formData.sizes.length === 0 && (
                                <p className="text-sm text-red-500 mt-2">Please select at least one size</p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Available Colors</span>
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {availableColors.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleColorToggle(color)}
                                        className={`group relative w-10 h-10 rounded-full transition-all duration-200 shadow-sm hover:shadow-md
                                            ${formData.colors.includes(color)
                                                ? 'ring-2 ring-primary ring-offset-2 scale-110'
                                                : 'hover:scale-110'
                                            }`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >
                                        {formData.colors.includes(color) && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        )}
                                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-medium whitespace-nowrap dark:text-gray-300">
                                            {color}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {formData.colors.length === 0 && (
                                <p className="text-sm text-red-500 mt-2">Please select at least one color</p>
                            )}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700 dark:text-gray-200">Product Images</span>
                        </label>
                        <input 
                            type="file"
                            name="images"
                            // onChange={handleChange}
                            onChange={handleChange}
                            multiple
                            accept="image/*"
                            className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-700"
                            required
                        />
                        <label className="label">
                            <span className="label-text-alt text-gray-500 dark:text-gray-400">You can select multiple images (max 5)</span>
                        </label>
                        {selectedImageNames.length > 0 && (
                            <div className="mt-2 space-y-1">
                                <p className="text-sm font-medium dark:text-gray-200">Selected Images:</p>
                                {selectedImageNames.map((name, index) => (
                                    <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                        {index + 1}. {name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-3">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">New Arrival</span>
                                <input 
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer space-x-3">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-200">Best Seller</span>
                                <input 
                                    type="checkbox"
                                    name="isBestSeller"
                                    checked={formData.isBestSeller}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};