// productApi.js
import { apiForAddProduct } from './apiConfig';
import api from './apiConfig';

export const addProduct = async (productData) => {

  try {
      const formData = new FormData();
      // console.log('selectedImages', selectedImages);
      // Append all fields except arrays and files
      Object.keys(productData).forEach(key => {
          if (key !== 'sizes' && key !== 'colors' && key !== 'images') {
              formData.append(key, productData[key]);
          }
      });

      // Handle arrays
      formData.append('sizes', JSON.stringify(productData.sizes));
      formData.append('colors', JSON.stringify(productData.colors));
      console.log('api formData', productData);
      // Handle images
      // Array.from(selectedImages).forEach((file) => {
      //     formData.append(`images`, file);
      // });
      // console.log('api formData', formData);

      // const config = {
      //     headers: {
      //         'Content-Type': 'multipart/form-data',
      //         'Authorization': localStorage.getItem('token')
      //     }
      // };

      const response = await api.post('/product/add-product', {productData});
      return response;
  } catch (error) {
      throw error.response?.data?.message || 'Error adding product';
  }
};



// upload images
export const uploadImages = async(images, id)=>{
  console.log('uploadImages function frontend called');
  try {
    const response = await apiForAddProduct.post(`/product/upload-images/${id}`, images); // /api/product/upload-images
    return response;
  } catch (error) {
    throw error.response?.data?.message || 'Error uploading images';
  }
}


export const DeleteProduct = async(id)=>{

  try {
    const response = await api.get(`/product/delete-product/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data?.message || 'Error deleting product';
  }
}