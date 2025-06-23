# eCommerce Project

A full-stack eCommerce application built with React and Node.js.

## Project Overview

This is a complete eCommerce solution with separate frontend and backend components. The application allows users to browse products, add them to cart, checkout, and make payments. It also includes an admin panel for product management.

## Tech Stack

### Frontend
- React.js
- SWR for data fetching
- Axios for API requests
- Context API for state management
- Vite as build tool

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer for file uploads
- Cloudinary for image storage

## Features

- User authentication (signup/login)
- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Payment integration
- Order management
- Admin dashboard for product management
- Responsive design

## Project Structure

### Backend

```
Backend/
  - app.js                 # Main application entry point
  - config/                # Configuration files
  - middleware/            # Custom middleware
  - model/                 # Database models
  - routes/                # API routes
  - utils/                 # Utility functions
  - public/                # Static assets
```

### Frontend

```
Frontend/
  - src/
    - admin/              # Admin components
    - API/                # API integration
      - GET-SWR/          # SWR data fetching
      - POST-Axios/       # Axios API requests
    - Auth/               # Authentication components
    - components/         # Reusable components
    - context/            # React Context providers
    - Layout/             # Layout components
    - Pages/              # Page components
    - Sections/           # Page sections
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
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
```

### Running the Application

1. Start the backend server
```bash
cd Backend
npm start
```

2. Start the frontend development server
```bash
cd Frontend
npm run dev
```

3. Access the application at `https://e-commerce-blush-iota-63.vercel.app/`

## Application Flow

1. Users can browse products by categories (Men, Women, Kids)
2. Users can search for specific products
3. Users can view product details
4. Users can add products to cart
5. Users can proceed to checkout
6. Users can enter delivery address
7. Users can make payment
8. Users can view order history
9. Admins can add/edit products

## API Endpoints

### User
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile

### Product
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Add new product (admin)
- `PUT /api/product/:id` - Update product (admin)
- `DELETE /api/product/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Order
- `GET /api/order` - Get user orders
- `POST /api/order` - Create new order
- `GET /api/order/:id` - Get order by ID

### Payment
- `POST /api/payment` - Process payment
<!-- 
## License

[MIT](LICENSE) -->

## Contributors

- Danish Shamshee(https://github.com/dshamshee) 
