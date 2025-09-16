import { useState, useEffect, useRef } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaPlus, FaTrash, FaTimes, FaBars, FaCheck } from 'react-icons/fa';
import {GetUser} from '../../API/GET-SWR/user';
import {GetAllAddresses} from '../../API/GET-SWR/deliveryAddress';
import {GetAllOrders} from '../../API/GET-SWR/order';
// import axios from 'axios';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../API/POST-Axios/address';
import { toast } from 'react-toastify';
import { updateProfile, updateUserData } from '../../API/POST-Axios/userApi';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

const Profile2 = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate()
  // const [Country, setCountry] = useState('');
  // const [State, setState] = useState('');
  // const [City, setCity] = useState('');

  // Get User Data 
  const {user} = GetUser();
  const {deliveryAddresses, isLoading: isLoadingAddresses} = GetAllAddresses();
  const defaultAddress = deliveryAddresses && deliveryAddresses.find(address=> address.isDefault) || "No default address found";
  const {orders: allOrders, isLoading: isLoadingOrders} = GetAllOrders();
  const [userData, setUserData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  // const [profileImage, setProfileImage] = useState(null);
  const [addressStatus, setAddressStatus] = useState(false); // false for add new address, true for edit address
  const [editAddress, setEditAddress] = useState({
    _id: '',
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
  });
  const fileInputRef = useRef(null);

  useEffect(()=>{
    setUserData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: defaultAddress && defaultAddress.address ? defaultAddress?.address + ", " + defaultAddress.city + ", " + defaultAddress.state + ", " + defaultAddress.zipCode : "No default address found",
      joinDate: user?.createdAt?.split('T')[0]
    });

    if(!isLoadingOrders){
      setOrdersData(allOrders || []);
    }

    if(!isLoadingAddresses){
      setSavedAddresses(deliveryAddresses && deliveryAddresses.length > 0 ? deliveryAddresses : []);
    }
  },[user, defaultAddress, allOrders, deliveryAddresses]);
  

  // Static wishlist items
  const wishlist = [
    {
      id: 101,
      name: 'Designer Watch',
      price: '$299.99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 102,
      name: 'Leather Wallet',
      price: '$79.99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 103,
      name: 'Sunglasses',
      price: '$129.99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 104,
      name: 'Canvas Backpack',
      price: '$89.99',
      image: 'https://via.placeholder.com/150'
    }
  ];


  // Get country 
  // const getCountry = async ()=>{
  //   const ckey = "abcdkey"
  //   const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
  //     headers: {
  //       "X-CSCAPI-KEY": ckey
  //     }
  //   })
  //   console.log(response.data);
  // }

  // useEffect(()=>{
  //   getCountry();
  // },[]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await updateUserData(userData);
      if(response.status === 200){
        toast.success("Profile updated successfully");
        setUserData((prev)=>({...prev, ...response.data.user}));
        setEditMode(false);
      } else {
        toast.error("Something went wrong");
        setUserData((prev)=>({...prev, ...user}));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
      toast.error("Please fill the valid details");
      setUserData((prev)=>({...prev, ...user}));
    }
  };

  // Delete address
  const handleDeleteAddress = async(addressID)=>{
    try {
      const response = await deleteAddress(addressID);
      if(response.status === 200){
        toast.success("Address deleted successfully");
        const updatedAddresses = savedAddresses.filter(address=> address._id !== addressID);
        setSavedAddresses(updatedAddresses);
        // Refresh the addresses data
        mutate("/delivery-address/get-all-delivery-addresses");
      }else{
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address");
    }
  }

// Add new address
  const handleAddNewAddress = ()=>{
    setAddNewAddress(!addNewAddress);
    setAddressStatus(false);
    setEditAddress({
      _id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    })
  }

  // Save address
  const handleSaveAddress = async ()=>{
    try {
      if(addressStatus){
        // Update address
        console.log("Update address");
        const response = await updateAddress(editAddress);
        if(response.status === 200){
          toast.success("Address updated successfully");
          setAddNewAddress(false);
          setAddressStatus(false);
          setEditAddress({
            _id: '',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
          })
          const updatedAddresses = savedAddresses.map(address=> address._id === editAddress._id ? response.data.deliveryAddress : address); // update the address in the saved addresses
          setSavedAddresses(updatedAddresses);
          // Refresh the addresses data
          mutate("/delivery-address/get-all-delivery-addresses");
        }
      }else{
        // Add new address
        console.log("Add new address");
        const response = await addAddress({
          name: editAddress.name,
          address: editAddress.address,
          city: editAddress.city,
          state: editAddress.state,
          zipCode: editAddress.zipCode,
          phone: editAddress.phone,
          isDefault: false,
        });
        if(response.status === 200){
          toast.success("Address added successfully");
          setAddNewAddress(false);
          setAddressStatus(false);
          setEditAddress({
            _id: '',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
          })
          // Make sure we're adding the correct data structure to the savedAddresses array
          const newAddress = response.data.deliveryAddress || response.data;
          setSavedAddresses(prev => [...prev, newAddress]);
          // Refresh the addresses data
          mutate("/delivery-address/get-all-delivery-addresses");
        }else{
          toast.error("Failed to add address");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add address");
    }
  }

  // Edit address
  const handleEditAddress = (addressID)=>{
    console.log(addressID);
    setAddNewAddress(true);
    setAddressStatus(true);
    const address = savedAddresses.find(address=> address._id === addressID);
    console.log(address)
    setEditAddress({
      _id: address._id,
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      phone: address.phone,
    })
    // Here you would typically edit the address in your backend
  }

  // Set default address
  const handleSetDefaultAddress = async(addressID)=>{

    try {
      const response = await setDefaultAddress(addressID);
      if(response.status === 200){
        toast.success("Default address set successfully");
        const updatedAddresses = savedAddresses.map(address=> address._id === addressID ? {...address, isDefault: true} : address);
        setSavedAddresses(updatedAddresses);
        // Refresh the addresses data
        mutate("/delivery-address/get-all-delivery-addresses");
      }else{
        toast.error("Failed to set default address");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false); // Close sidebar when tab is changed
  };

  // Handle update profile
  const handleUpdateProfile = () => {
    fileInputRef.current.click();
  }

  // Handle Track Order 
  const handleTrackOrder = (id)=>{
    console.log(id)
    navigate(`/profile/track-order/${id}`)
    
  }



const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if(file){
    toast.info("Updating profile...");
    // setProfileImage(file);
    // We need to call handleUpdateProfileOnServer after setting the profileImage
    // Since setState is asynchronous, we should pass the file directly
    try {
      const response = await updateProfile(file);
      if(response.status === 200){
        toast.success("Profile updated successfully");
        console.log(response.data.user.avatar);
        setUserData((prev)=>({...prev, avatar: response.data.user.avatar}));
        mutate("/user/get-user");
      }else{
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  }
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-white">My Account</h1>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm"
            onClick={toggleMobileSidebar}
          >
            <FaBars className="text-gray-600 dark:text-gray-300 text-xl" />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
              onClick={toggleMobileSidebar}
            ></div>
          )}
          
          {/* Sidebar */}
          <div className={`lg:w-1/4 fixed lg:static inset-y-0 left-0 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-20 lg:z-0 w-3/4 sm:w-1/2 md:w-2/5 overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:bg-transparent`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 h-full lg:h-auto">
              <div className="flex justify-between items-center lg:hidden mb-4">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Menu</h3>
                <button onClick={toggleMobileSidebar}>
                  <FaTimes className="text-gray-600 dark:text-gray-300 text-xl" />
                </button>
              </div>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img 
                        src={user?.avatar} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-indigo-600 dark:text-indigo-300 text-4xl" />
                    )}
                  </div>
                  <button 
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-600"
                    onClick={handleUpdateProfile}
                  >
                    <FaEdit className="text-gray-600 dark:text-gray-300 text-sm" />
                  </button>
                  <input
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">{userData.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since {userData.joinDate}</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => handleTabChange('profile')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaUser className="mr-3" />
                  My Profile
                </button>
                <button
                  onClick={() => handleTabChange('orders')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaShoppingBag className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => handleTabChange('wishlist')}
                  className={`flex tooltip tooltip-top tooltip-secondary items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'wishlist' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  data-tip="Coming Soon"
                  disabled
                >
                  <FaHeart className="mr-3" />
                  Wishlist
                </button>
                <button
                  onClick={() => handleTabChange('savedAddresses')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'savedAddresses' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaMapMarkerAlt className="mr-3" />
                  Saved Addresses
                </button>
                <button
                  onClick={() => handleTabChange('settings')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaCog className="mr-3" />
                  Settings
                </button>
                <button 
                  className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Need Help?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Our customer support team is here to assist you with any questions or concerns.</p>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h2>
                  <button 
                    onClick={() => setEditMode(!editMode)} 
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center"
                  >
                    <FaEdit className="mr-1" />
                    {editMode ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                <div className="p-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleUserDataChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleUserDataChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleUserDataChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows="3"
                          value={userData.address}
                          onChange={handleUserDataChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveProfile}
                          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center py-2">
                        <FaUser className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="font-medium text-gray-900 dark:text-white">{userData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center py-2">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                          <p className="font-medium text-gray-900 dark:text-white">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center py-2">
                        <FaPhone className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="font-medium text-gray-900 dark:text-white">{userData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center py-2">
                        <FaMapMarkerAlt className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                          <p className="font-medium text-gray-900 dark:text-white">{userData.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center py-2">
                        <FaCalendarAlt className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                          <p className="font-medium text-gray-900 dark:text-white">{userData.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order History</h2>
                </div>
                
                {!isLoadingOrders && ordersData.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!isLoadingOrders && ordersData.map((order) => (
                      <div key={order._id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Order #{order._id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Placed on {order.createdAt.split('T')[0]}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                            <span className="ml-3 font-medium text-gray-900 dark:text-white">₹{order.totalAmount}</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          {order.products.map((item) => (
                            <div key={item._id} className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                              <div className="flex-shrink-0 h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                                <img
                                  src={item.productId.images[0]}
                                  alt={item.productId.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.productId.name}</h4>
                                {/* <p className="text-sm text-gray-500 dark:text-gray-400">{item.color}, {item.productId.size}</p> */}
                                <p className="text-sm text-gray-500 dark:text-gray-400">color & size from order document</p>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">₹{item.productId.price - item.productId.discount}</p>
                                <p className="text-sm font-medium text-rose-500 line-through">{item.productId.discount > 0 ? "₹" + item.productId.price : ""}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-4">
                          <button onClick={()=> handleTrackOrder(order._id)} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                            Track Order
                          </button>
                          <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FaShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start shopping to see your orders here.</p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Wishlist</h2>
                </div>
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 group-hover:opacity-75">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700 dark:text-gray-300">
                              <a href="#">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {item.name}
                              </a>
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.price}</p>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <button className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none transition-colors">
                            Add to cart
                          </button>
                          <button className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <FaHeart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FaHeart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Your wishlist is empty</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Save items you love for later.</p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        Browse Products
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'savedAddresses' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Saved Addresses</h2>
                  <button onClick={handleAddNewAddress} className=" text-blue-500 w-32 py-2 px-5 cursor-pointer flex items-center justify-center rounded-md hover:text-blue-700 text-sm font-medium transition-colors">
                    {addNewAddress ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
                        {addNewAddress ? "Cancel" : "Add New"}
                      </button>
                      </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Saved Addresses</h3>
                  <div className="space-y-4">
                    {
                      savedAddresses.length > 0 ?(
                        savedAddresses.map((address)=>{
                          return(
                            <div className="flex items-center py-2" key={address._id}>
                      <FaMapMarkerAlt className="text-gray-400 mr-2 md:mr-3" />
                      <div className="w-full md:pr-56"> 
                          <p className="text-sm text-gray-500 dark:text-gray-400">{address.name}</p>
                        <div className="flex items-center gap-5 w-full">
                        <p className="font-medium w-full text-gray-900 dark:text-white">{address.address + ", " + address.city + ", " + address.state + ", " + address.zipCode}</p>
                        <div className="flex flex-col md:flex-row items-center gap-3 w-[120px] md:w-[300px]">
                        <FaEdit className="text-blue-500 hover:text-blue-700 text-lg cursor-pointer" onClick={()=>handleEditAddress(address._id)} />
                        <FaTrash className="text-red-500 hover:text-red-700 text-lg cursor-pointer" onClick={()=>handleDeleteAddress(address._id)} />
                        <FaCheck className={`text-green-500 hover:text-green-700 text-lg cursor-pointer ${address.isDefault ? "hidden" : ""}`} onClick={()=>handleSetDefaultAddress(address._id)} /> <span className='md:text-sm text-xs text-gray-500 dark:text-gray-400'>{address.isDefault ? "Default" : "Set as default"}</span>
                        </div>
                        </div>
                      </div>
                    </div>
                          )
                        })
                      ):(
                        <div className="p-12 text-center">
                          <FaMapMarkerAlt className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No saved addresses</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add your saved addresses to your profile.</p>
                        </div>
                      )
                    }
                    
                    {/* Add New Address */}
                    <div className="flex flex-col gap-5 py-2">
                      
                      {
                        addNewAddress ? (
                          <div className="addAddress">
                        <h1>New Address</h1>
                        <div className="flex flex-col gap-2">
                          <input className='w-full border rounded-md py-2 px-3 ' type="text" placeholder="Name"  value={editAddress.name} onChange={(e)=>setEditAddress({...editAddress, name: e.target.value})}/>
                          <input className='w-full border rounded-md py-2 px-3 ' type="text" placeholder="Address"  value={editAddress.address} onChange={(e)=>setEditAddress({...editAddress, address: e.target.value})}/>
                          <div className="cityState flex gap-2">
                            
                            <select name="state" id="state" className='w-full border rounded-md py-2 px-3 ' value={editAddress.state} onChange={(e)=>setEditAddress({...editAddress, state: e.target.value})}>
                              <option className='dark:bg-gray-800' value="">Select State</option>
                              <option className='dark:bg-gray-800' value="Bihar">Bihar</option>
                              <option className='dark:bg-gray-800' value="Delhi">Delhi</option>
                              <option className='dark:bg-gray-800' value="Maharashtra">Maharashtra</option>
                              <option className='dark:bg-gray-800' value="Tamil Nadu">Tamil Nadu</option>
                              <option className='dark:bg-gray-800' value="West Bengal">West Bengal</option>
                              <option className='dark:bg-gray-800' value="Karnataka">Karnataka</option>
                            </select>

                            <select name="city" id="city" className='w-full border rounded-md py-2 px-3 ' value={editAddress.city} onChange={(e)=>setEditAddress({...editAddress, city: e.target.value})}>
                              <option className='dark:bg-gray-800' value="">Select City</option>
                              <option className='dark:bg-gray-800' value="Patna">Patna</option>
                              <option className='dark:bg-gray-800' value="Gaya">Gaya</option>
                              <option className='dark:bg-gray-800' value="Delhi">Delhi</option>
                              <option className='dark:bg-gray-800' value="Mumbai">Mumbai</option>
                              <option className='dark:bg-gray-800' value="Chennai">Chennai</option>
                              <option className='dark:bg-gray-800' value="Kolkata">Kolkata</option>
                              <option className='dark:bg-gray-800' value="Bengaluru">Bengaluru</option>
                            </select>
                          </div>
                          <input className='w-full border rounded-md py-2 px-3 ' type="text" placeholder="Zip Code"  value={editAddress.zipCode} onChange={(e)=>setEditAddress({...editAddress, zipCode: e.target.value})}/>
                          <input className='w-full border rounded-md py-2 px-3 ' type="text" placeholder="Phone"  value={editAddress.phone} onChange={(e)=>setEditAddress({...editAddress, phone: e.target.value})}/>
                          <button onClick={handleSaveAddress} className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer text-lg font-medium transition-colors">{addressStatus ? "Update" : "Save"}</button>
                        </div>
                      </div>
                        ):(
                          ''
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="order-updates"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="order-updates" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Order updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="promotions"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="promotions" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Promotions and sales
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Weekly newsletter
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Password</h3>
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Delete Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm font-medium transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
