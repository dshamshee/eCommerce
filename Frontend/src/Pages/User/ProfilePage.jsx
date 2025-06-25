import { useState } from 'react';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fashion St, Trendy District, NY 10001',
    joinDate: 'January 2022'
  });

  // Sample order history
  const orders = [
    {
      id: '#ORD-78945',
      date: '15 Oct 2023',
      items: 3,
      total: '$247.50',
      status: 'Delivered',
      products: [
        { name: 'Premium Denim Jacket', size: 'M', color: 'Blue', price: '$129.99' },
        { name: 'Cotton Graphic Tee', size: 'M', color: 'Black', price: '$29.99' },
        { name: 'Slim Fit Chinos', size: '32x34', color: 'Khaki', price: '$87.52' }
      ]
    },
    {
      id: '#ORD-67432',
      date: '02 Sep 2023',
      items: 2,
      total: '$158.98',
      status: 'Delivered',
      products: [
        { name: 'Wool Blend Coat', size: 'L', color: 'Camel', price: '$129.99' },
        { name: 'Cashmere Scarf', size: 'One Size', color: 'Grey', price: '$28.99' }
      ]
    }
  ];

  // Sample wishlist items
  const wishlist = [
    {
      id: 1,
      name: 'Leather Crossbody Bag',
      price: '$89.99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Silk Blouse',
      price: '$59.99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Suede Ankle Boots',
      price: '$129.99',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiUser className="text-indigo-600 text-2xl" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm border border-gray-200">
                    <FiEdit className="text-gray-600 text-sm" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{userData.name}</h3>
                  <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiShoppingBag className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'wishlist' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiHeart className="mr-3" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'account' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" />
                  Account Settings
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-3">Customer Support</h3>
              <p className="text-sm text-gray-500 mb-4">Need help with your order or have questions?</p>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium">
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order History</h2>
                </div>
                
                {orders.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                          <div>
                            <p className="font-medium text-gray-900">Order {order.id}</p>
                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-sm">
                              <span className="text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</span>
                              <span className="mx-2">•</span>
                              <span className="font-medium text-gray-900">Total {order.total}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          {order.products.map((product, index) => (
                            <div key={index} className="p-4 flex items-center border-b border-gray-200 last:border-b-0">
                              <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                                <img
                                  src="https://via.placeholder.com/150"
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.color}, {product.size}</p>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Track Order
                          </button>
                          <button className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Wishlist</h2>
                </div>
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href="#">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {item.name}
                              </a>
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{item.price}</p>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <button className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add to cart
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <FiHeart className="h-5 w-5 fill-current text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Save items you love for later.</p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Browse Products
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'account' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                  >
                    <FiEdit className="mr-1" />
                    {editMode ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Shipping Address
                      </label>
                      {editMode ? (
                        <textarea
                          name="address"
                          id="address"
                          rows={3}
                          value={userData.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{userData.address}</p>
                      )}
                    </div>
                    
                    {editMode && (
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          onClick={() => setEditMode(false)}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
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

export default ProfilePage;