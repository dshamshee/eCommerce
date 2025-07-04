import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetUser } from '../API/GET-SWR/user';

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


export const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {user, error, isLoading} = GetUser();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(()=>{
      if(!token){
        toast.error("Please login to access this page");
        navigate('/login');
        return;
      }
      
      if(error){
        toast.error("Please login to access this page");
        navigate('/login');
        return;
      }
      
      if(!isLoading && user) {
        if(user?.role !== 'admin'){
          toast.error("You are not authorized to access this page");
          navigate('/');
          return;
        } else {
          setIsAuthorized(true);
        }
      }
    },[token, user, error, isLoading, navigate])

    if(isLoading) {
      return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>;
    }

    return isAuthorized ? children : null;
}