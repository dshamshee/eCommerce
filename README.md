# Wolvenstitch - Modern eCommerce Platform

<div align="center">
  <img src="Frontend/src/assets/brand-logo-black.png" alt="Wolvenstitch Logo" width="200"/>
  <p><em>Elevating your online shopping experience</em></p>
</div>

## 🚀 Overview

Wolvenstitch is a comprehensive full-stack eCommerce application built with modern web technologies. It offers a seamless shopping experience with features like product browsing, cart management, secure checkout, and payment processing. The platform also includes an admin panel for product and order management.

## ✨ Features

- **User Authentication** - Secure signup/login system
- **Product Catalog** - Browse products by categories (Men, Women, Kids)
- **Advanced Filtering** - Search and filter products by various attributes
- **Shopping Cart** - Add, update, and remove items
- **Checkout Process** - Streamlined multi-step checkout
- **Payment Integration** - Secure payment processing with Razorpay
- **Order Management** - Track and manage orders
- **Admin Dashboard** - Comprehensive product management
- **Responsive Design** - Optimized for all device sizes
- **New Arrivals & Trending** - Highlighted sections for featured products

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **SWR** - React Hooks for data fetching
- **Axios** - HTTP client
- **React Context API** - State management
- **Vite** - Build tool and development server
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Cloud image storage
- **Razorpay** - Payment gateway integration

## 🏗️ Project Structure

### Backend Architecture
```
Backend/
  ├── app.js                 # Entry point
  ├── config/                # Configuration files
  │   ├── db_connection.js   # Database connection
  │   └── multer_config.js   # File upload configuration
  ├── middleware/            # Custom middleware
  │   └── isLoggedIn.js      # Authentication middleware
  ├── model/                 # Database models
  │   ├── cart.js
  │   ├── deliveryAddress.js
  │   ├── order.js
  │   ├── payment.js
  │   ├── product.js
  │   └── user.js
  ├── routes/                # API routes
  │   ├── cart.js
  │   ├── deliveryAddress.js
  │   ├── order.js
  │   ├── payment.js
  │   ├── product.js
  │   └── user.js
  └── utils/                 # Utility functions
      ├── cloudinaryConfig.js
      └── productUtils.js
```

### Frontend Architecture
```
Frontend/
  ├── src/
  │   ├── admin/              # Admin components
  │   ├── API/                # API integration
  │   │   ├── GET-SWR/        # SWR data fetching
  │   │   └── POST-Axios/     # Axios API requests
  │   ├── Auth/               # Authentication components
  │   ├── components/         # Reusable components
  │   ├── context/            # React Context providers
  │   ├── Layout/             # Layout components
  │   ├── Pages/              # Page components
  │   │   ├── Cart/           # Cart related pages
  │   │   ├── Landing/        # Landing page sections
  │   │   ├── Payment/        # Payment related pages
  │   │   ├── products-section/# Product categories
  │   │   └── User/           # User profile pages
  │   └── Sections/           # Page sections
  └── vite.config.js          # Vite configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB
- npm or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/dshamshee/eCommerce.git
cd eCommerce
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Install frontend dependencies
```bash
cd ../Frontend
npm install
```

### Configuration

1. Create a `.env` file in the Backend directory with the following variables:
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
```

### Running the Application

1. Start the backend server
```bash
cd Backend
node app.js
```

2. Start the frontend development server
```bash
cd Frontend
npm run dev
```

3. Access the application at `http://localhost:5173` or the deployed version at `https://e-commerce-blush-iota-63.vercel.app`

## 📱 Application Flow

1. User browses products by categories (Men, Women, Kids)
2. User searches or filters for specific products
3. User views detailed product information
4. User adds products to cart
5. User proceeds to checkout
6. User enters delivery address
7. User makes payment via Razorpay
8. User receives order confirmation
9. User can view order history in profile

## 🔄 API Endpoints

### User Authentication
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Product Management
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Add new product (admin)
- `PUT /api/product/:id` - Update product (admin)
- `DELETE /api/product/:id` - Delete product (admin)

### Cart Operations
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Address Management
- `GET /api/delivery-address` - Get user addresses
- `POST /api/delivery-address` - Add new address
- `PUT /api/delivery-address/:id` - Update address
- `DELETE /api/delivery-address/:id` - Delete address

### Order Processing
- `GET /api/order` - Get user orders
- `POST /api/order` - Create new order
- `GET /api/order/:id` - Get order by ID

### Payment Integration
- `POST /api/payment` - Process payment
- `POST /api/payment/verify` - Verify payment

## 👨‍💻 Contributors

- [Danish Shamshee](https://github.com/dshamshee) - Lead Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
