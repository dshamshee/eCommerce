import React, { useEffect, useState } from 'react';
import { Save, ArrowLeft, Upload, X, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetProductById } from '../API/GET-SWR/product';
import { directUploadImages, updateProduct } from '../API/POST-Axios/productApi';
import { toast } from 'react-toastify';

export const EditProduct = () => {

    const id = useParams().id
    const navigate = useNavigate()
    const {product: productData, isLoading, error} = GetProductById(id)

  // Initialize product state with empty values to avoid uncontrolled to controlled warning
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    genderType: "",
    sizes: [],
    colors: [],
    images: [],
    stock: 0,
    isNewProduct: false,
    newProductExpiry: "",
    isBestSeller: false,
    ratings: 0,
    reviews: 0,
    fabric: "",
    care: [],
    features: []
  });

  useEffect(() => {
    if (!isLoading && !error && productData) {
      setProduct(productData);
    } else if (error) {
      console.log(error);
    }
  }, [productData, isLoading, error]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = ["T-shirt", "Shirt", "Jeans", "Shorts"];
  const genderTypes = ["Men", "Women", "Unisex", "Kids"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
  const colorOptions = ["Black", "White", "Navy", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange"];

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayAdd = (field, value) => {
    if (value && !product[field].includes(value)) {
      setProduct(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const handleArrayRemove = (field, index) => {
    setProduct(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleStringArrayAdd = (field, value) => {
    if (value.trim()) {
      setProduct(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.description.trim()) newErrors.description = "Description is required";
    if (!product.price || product.price <= 0) newErrors.price = "Valid price is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.genderType) newErrors.genderType = "Gender type is required";
    if (product.sizes.length === 0) newErrors.sizes = "At least one size is required";
    if (!product.stock || product.stock < 0) newErrors.stock = "Valid stock quantity is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      // Create a product data object with proper handling for arrays and objects
      const productDataToUpdate = {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        genderType: product.genderType,
        stock: parseInt(product.stock),
        discount: parseFloat(product.discount) || 0,
        fabric: product.fabric,
        isNewProduct: product.isNewProduct,
        isBestSeller: product.isBestSeller,
        // Convert arrays to JSON strings
        sizes: JSON.stringify(product.sizes),
        colors: JSON.stringify(product.colors),
        care: JSON.stringify(product.care),
        features: JSON.stringify(product.features),
        // Handle images array properly
        images: JSON.stringify(product.images)
      };

      const response = await updateProduct(productDataToUpdate, id);
      if(response.status === 200){
        navigate(-1)
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async(e) => {
    const files = Array.from(e.target.files);
    toast.loading("Uploading images...");
    
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('images', file);
        
        const response = await directUploadImages(formData);
        
        if (response.status === 200) {
          // The server returns an array of image URLs in imageUrls
          const uploadedImageUrls = response.data.imageUrls;
          
          // Add each image URL to the product state
          if (uploadedImageUrls && uploadedImageUrls.length > 0) {
            setProduct(prev => ({
              ...prev,
              images: [...prev.images, ...uploadedImageUrls]
            }));
          }
        }
      }
      
      toast.dismiss();
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.dismiss();
      toast.error("Failed to upload images");
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <p className="text-blue-100 mt-2">Update your product information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-500 mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product description"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Discount (₹)
                      </label>
                      <input
                        type="number"
                        value={product.discount}
                        onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Category *
                      </label>
                      <select
                        value={product.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`w-full dark:bg-gray-800 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Gender Type *
                      </label>
                      <select
                        value={product.genderType}
                        onChange={(e) => handleInputChange('genderType', e.target.value)}
                        className={`w-full dark:bg-gray-800 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.genderType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select gender type</option>
                        {genderTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.genderType && <p className="text-red-500 text-sm mt-1">{errors.genderType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0"
                      />
                      {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                        Fabric
                      </label>
                      <input
                        type="text"
                        value={product.fabric}
                        onChange={(e) => handleInputChange('fabric', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 100% Cotton"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-500 mb-6 flex items-center">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  Sizes *
                </h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-200 dark:text-green-900 text-green-800"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('sizes', index)}
                          className="ml-2 text-green-600 dark:text-red-500 hover:text-green-800 dark:hover:text-red-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleArrayAdd('sizes', size)}
                        disabled={product.sizes.includes(size)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          product.sizes.includes(size)
                            ? 'bg-gray-100 dark:bg-gray-200 text-gray-400 border-gray-200 dark:hover:border-gray-300 dark:border-gray-400 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-300 dark:text-gray-900 text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  
                  {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes}</p>}
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <h2 className="text-xl font-semibold dark:text-gray-500 text-gray-900 mb-6 flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  Colors
                </h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-200 dark:text-purple-900 text-purple-800"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('colors', index)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleArrayAdd('colors', color)}
                        disabled={product.colors.includes(color)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          product.colors.includes(color)
                            ? 'bg-gray-100 dark:bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-300 dark:text-gray-900 text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Images */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-amber-500">
                <h2 className="text-xl font-semibold dark:text-gray-500 text-gray-900 mb-6 flex items-center">
                  <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Product Images
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('images', index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm dark:text-gray-500 text-gray-600">Upload Image</span>
                      </div>
                      <input
                        type="file"
                        accept="images/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                <h2 className="text-xl font-semibold dark:text-gray-500 text-gray-900 mb-6 flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Additional Information
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                      Care Instructions
                    </label>
                    <div className="space-y-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                      {product.care.map((instruction, index) => (
                        <div key={index} className="flex items-center">
                          <span className="flex-1 text-sm dark:text-gray-500 text-gray-600">{instruction}</span>
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('care', index)}
                            className="ml-2 text-red-500 dark:text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add care instruction"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleStringArrayAdd('care', e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleStringArrayAdd('care', input.value);
                            input.value = '';
                          }}
                          className="px-3 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
                      Features
                    </label>
                    <div className="space-y-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <span className="flex-1 text-sm dark:text-gray-500 text-gray-600">{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('features', index)}
                            className="ml-2 text-red-500 dark:text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add feature"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleStringArrayAdd('features', e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleStringArrayAdd('features', input.value);
                            input.value = '';
                          }}
                          className="px-3 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-pink-500">
                <h2 className="text-xl font-semibold dark:text-gray-500 text-gray-900 mb-6 flex items-center">
                  <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 p-2 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Product Status
                </h2>
                
                <div className="space-y-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isNewProduct"
                      checked={product.isNewProduct}
                      onChange={(e) => handleInputChange('isNewProduct', e.target.checked)}
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isNewProduct" className="ml-2 block text-sm dark:text-gray-500 text-gray-900">
                      Mark as New Product
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      checked={product.isBestSeller}
                      onChange={(e) => handleInputChange('isBestSeller', e.target.checked)}
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isBestSeller" className="ml-2 block text-sm dark:text-gray-500 text-gray-900">
                      Mark as Best Seller
                    </label>
                  </div>
                  
                  {product.isNewProduct && (
                    <div>
                      <label className="block text-sm font-medium dark:text-gray-600 text-gray-700 mb-2">
                        New Arrival Expiry Date
                      </label>
                      <input
                        type="date"
                        value={product.newProductExpiry}
                        onChange={(e) => handleInputChange('newProductExpiry', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-6 py-3 border dark:bg-gray-800 border-gray-300 rounded-md dark:text-gray-400 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg transition-all duration-200"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default EditProductPage;