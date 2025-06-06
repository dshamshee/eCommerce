import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  const token = localStorage.getItem('token');
//   console.log("Auth check - Token:", token);
useEffect(()=>{
  if (!token) {
    toast.error("Please login to access this page");
    navigate('/login');
  }
},[token])

  return children;
}; 