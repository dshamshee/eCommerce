import api from './apiConfig';


export const addProduct = async(productData)=>{
  try {
    const response = await api.post('/product/add-product', productData);
    return response;
  } catch (error) {
    return error;
  }
}

// export const getProducts = async()=>{

//     try {
//         const response = await api.get('/product/getProducts');
//         // console.log(response.data);
//         return response;
//     } catch (error) {
//       return error;  
//     } 
// }