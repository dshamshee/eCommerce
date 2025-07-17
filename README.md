# 🛍️ Wolvenstitch - A Clothing Brand

<div align="center">
  <img src="Frontend/src/assets/brand-logo-black.png" alt="Wolvenstitch Logo" width="200"/>
  <p><em>Elevating your online shopping experience with modern technology</em></p>
  
  [![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/CSS-TailwindCSS-blue.svg)](https://tailwindcss.com/)
</div>

## 🚀 Overview

Wolvenstitch is a comprehensive full-stack eCommerce platform designed to provide a seamless online shopping experience. Built with cutting-edge technologies, it features a modern React frontend, robust Node.js backend, and integrated payment processing. The platform supports Clothing product browsing, advanced cart management, secure checkout processes, and includes a powerful admin dashboard for comprehensive business management.

## ✨ Key Features

### 🛒 Customer Features
- **🔐 Secure Authentication** - JWT-based authentication with Google OAuth support
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🔍 Advanced Search & Filtering** - Smart product discovery with multiple filter options
- **🛍️ Category Browsing** - Organized product sections (Men, Women, Kids)
- **🛒 Dynamic Shopping Cart** - Real-time cart updates with quantity management
- **💳 Secure Checkout** - Multi-step checkout with address management
- **💰 Payment Integration** - Razorpay payment gateway with multiple payment options
- **📦 Order Tracking** - Comprehensive order history and status updates
- **👤 User Profiles** - Account management with order history and addresses
- **⭐ Product Reviews** - Rating and review system for products
- **🎯 Wishlist** - Save favorite products for later
- **🆕 New Arrivals** - Automated new product highlighting with 7-day expiry

### 🎛️ Admin Features
- **📊 Analytics Dashboard** - Real-time business insights and charts
- **📦 Product Management** - Complete CRUD operations for products
- **🖼️ Image Management** - Cloudinary integration for optimized image uploads
- **📋 Order Management** - Order processing and status updates
- **👥 User Management** - Customer account oversight
- **📈 Sales Analytics** - Revenue tracking and performance metrics
- **🔄 Inventory Control** - Stock management and low-stock alerts
- **🏷️ Category Management** - Product categorization and organization

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI Library |
| **React Router DOM** | 7.6.1 | Client-side routing |
| **Tailwind CSS** | 4.1.8 | Utility-first CSS framework |
| **DaisyUI** | 5.0.43 | Component library |
| **Material-UI** | 7.2.0 | React components |
| **SWR** | 2.3.3 | Data fetching and caching |
| **Axios** | 1.9.0 | HTTP client |
| **React Toastify** | 11.0.5 | Toast notifications |
| **Lucide React** | 0.525.0 | Modern icons |
| **Recharts** | 3.0.2 | Data visualization |
| **Vite** | 6.3.5 | Build tool and dev server |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | 5.1.0 | Web framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8.15.1 | MongoDB object modeling |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt** | 6.0.0 | Password hashing |
| **Multer** | 2.0.1 | File upload handling |
| **Cloudinary** | 2.6.1 | Cloud image storage |
| **Razorpay** | 2.9.6 | Payment gateway |
| **Nodemailer** | 7.0.5 | Email services |
| **CORS** | 2.8.5 | Cross-origin resource sharing |

## 🏗️ Architecture Overview

### Project Structure
```
eCommerce/
├── Backend/                    # Server-side application
│   ├── app.js                 # Express server entry point
│   ├── config/                # Configuration files
│   │   ├── db_connection.js   # MongoDB connection setup
│   │   ├── multer_config.js   # File upload configuration
│   │   └── multer_memory.config.js
│   ├── middleware/            # Custom middleware
│   │   └── isLoggedIn.js      # Authentication middleware
│   ├── model/                 # Mongoose schemas
│   │   ├── cart.js           # Shopping cart model
│   │   ├── deliveryAddress.js # User addresses
│   │   ├── order.js          # Order management
│   │   ├── payment.js        # Payment records
│   │   ├── product.js        # Product catalog
│   │   └── user.js           # User accounts
│   ├── routes/               # API endpoints
│   │   ├── cart.js           # Cart operations
│   │   ├── deliveryAddress.js # Address management
│   │   ├── order.js          # Order processing
│   │   ├── payment.js        # Payment handling
│   │   ├── product.js        # Product CRUD
│   │   └── user.js           # User authentication
│   └── utils/                # Utility functions
│       ├── cloudinaryConfig.js # Image upload utilities
│       └── productUtils.js    # Product helper functions
│
└── Frontend/                  # Client-side application
    ├── src/
    │   ├── admin/            # Admin dashboard components
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── EditProduct.jsx
    │   │   ├── ProductsList.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Analytics.jsx
    │   │   └── ViewOrder.jsx
    │   ├── API/              # API integration layer
    │   │   ├── GET-SWR/      # SWR data fetching hooks
    │   │   └── POST-Axios/   # Axios API requests
    │   ├── Auth/             # Authentication components
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context providers
    │   │   ├── CartContext.jsx
    │   │   ├── OrderContext.jsx
    │   │   └── ProductContext.jsx
    │   ├── Layout/           # Layout components
    │   │   ├── AppLayout.jsx
    │   │   ├── AdminLayout.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── Pages/            # Main page components
    │   │   ├── Cart/         # Shopping cart pages
    │   │   ├── Landing/      # Homepage sections
    │   │   ├── Payment/      # Payment processing
    │   │   ├── products-section/ # Product categories
    │   │   └── User/         # User profile pages
    │   └── Sections/         # Page sections
    │       ├── Header.jsx
    │       └── Footer.jsx
    └── vite.config.js        # Vite configuration
```

## 🚦 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or later)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **bun** package manager
- **Cloudinary account** (for image storage)
- **Razorpay account** (for payment processing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd eCommerce
```

2. **Install backend dependencies**
```bash
cd Backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../Frontend
npm install
```

### Environment Configuration

Create a `.env` file in the **Backend** directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/wolvenstitch
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wolvenstitch

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Frontend URL (adjust based on environment)
FRONTENT_ORIGIN_URI=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start the backend server**
```bash
cd Backend
npm start
# or for development with auto-reload
node app.js
```

3. **Start the frontend development server**
```bash
cd Frontend
npm run dev
```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📱 Application Workflow

### Customer Journey
1. **Browse & Discover** → User explores products by categories or search
2. **Product Details** → User views detailed product information and reviews
3. **Add to Cart** → User adds desired items with size/color selection
4. **Cart Review** → User reviews cart items and quantities
5. **Checkout** → User provides delivery address and contact information
6. **Payment** → Secure payment processing via Razorpay
7. **Order Confirmation** → User receives order confirmation and tracking details
8. **Order Tracking** → User can track order status in their profile

### Admin Workflow
1. **Dashboard Overview** → Admin views business analytics and metrics
2. **Product Management** → Add, edit, or remove products with image uploads
3. **Order Processing** → Review and update order statuses
4. **User Management** → Monitor customer accounts and activities
5. **Analytics Review** → Track sales performance and trends

## 🔌 API Documentation

### Authentication Endpoints
```
POST   /api/user/signup          # Register new user
POST   /api/user/login           # User login
GET    /api/user/profile         # Get user profile
PUT    /api/user/profile         # Update user profile
POST   /api/user/logout          # User logout
GET    /api/user/verify          # Verify JWT token
```

### Product Endpoints
```
GET    /api/product              # Get all products (with pagination)
GET    /api/product/:id          # Get product by ID
POST   /api/product              # Create new product (admin)
PUT    /api/product/:id          # Update product (admin)
DELETE /api/product/:id          # Delete product (admin)
GET    /api/product/category/:category # Get products by category
GET    /api/product/search        # Search products
```

### Cart Endpoints
```
GET    /api/cart                 # Get user cart
POST   /api/cart                 # Add item to cart
PUT    /api/cart/:productId      # Update cart item quantity
DELETE /api/cart/:productId      # Remove item from cart
DELETE /api/cart                 # Clear entire cart
```

### Order Endpoints
```
GET    /api/order                # Get user orders
POST   /api/order                # Create new order
GET    /api/order/:id            # Get order details
PUT    /api/order/:id            # Update order status (admin)
GET    /api/order/admin/all      # Get all orders (admin)
```

### Address Endpoints
```
GET    /api/delivery-address     # Get user addresses
POST   /api/delivery-address     # Add new address
PUT    /api/delivery-address/:id # Update address
DELETE /api/delivery-address/:id # Delete address
```

### Payment Endpoints
```
POST   /api/payment/create       # Create payment order
POST   /api/payment/verify       # Verify payment signature
GET    /api/payment/orders       # Get payment history
```

## 🚀 Deployment

### Production Environment Variables
For production deployment, update the following variables:
```env
NODE_ENV=production
FRONTENT_ORIGIN_URI=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://your-atlas-connection-string
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, or any static hosting service
- **Backend**: Heroku, Railway, DigitalOcean, or AWS
- **Database**: MongoDB Atlas (recommended for production)

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test
```

## 🔧 Development Tools

### Code Quality
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (recommended)
- **Husky** - Git hooks for pre-commit checks

### Development Commands
```bash
# Backend
npm run dev          # Start with nodemon
npm run start        # Production start

# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or Atlas connection string is correct
   - Check network connectivity and firewall settings

2. **Image Upload Failures**
   - Verify Cloudinary configuration in environment variables
   - Check file size limits and format restrictions

3. **Payment Processing Issues**
   - Confirm Razorpay API keys are valid and environment-appropriate
   - Check webhook URL configuration for production

4. **CORS Errors**
   - Verify frontend URL in backend CORS configuration
   - Ensure credentials are properly configured

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=*
NODE_ENV=development
```

## 🤝 Contributing

We welcome contributions to improve Wolvenstitch! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation for significant changes

## 📊 Performance Metrics

### Frontend Optimizations
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Cloudinary automatic optimization
- **Caching** - SWR for efficient data fetching
- **Bundle Analysis** - Optimized build sizes

### Backend Optimizations
- **Database Indexing** - Optimized MongoDB queries
- **Compression** - Gzip compression for responses
- **Rate Limiting** - API request rate limiting
- **Caching** - Response caching strategies

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author & Support

**Developed by:** [Danish Shamshee](https://github.com/dshamshee)

For support, bug reports, or feature requests:
- 📧 Create an issue on GitHub
- 💬 Reach out via GitHub discussions
- 🐛 Submit bug reports with detailed information

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🚀 Built with ❤️ for the modern web</p>
</div>
