import { userLogin } from "../API/POST-Axios/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        try {
            const response = await userLogin(data);
            if(response.status === 200) {
                console.log(response);
                toast.success('Successfully logged in');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userName', response.data.userName);
                localStorage.setItem('userEmail', response.data.userEmail);
                navigate('/');
                window.location.reload();
            }   
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }   
    }

    return (
        <div className="mainContainer">
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                    <div className="max-w-md w-full">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">Please sign in to continue</p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => {handleLogin(e)}}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={() => {
                                                const passwordInput = document.getElementById('password');
                                                const passwordIcon = document.getElementById('passwordIcon');
                                                if (passwordInput.type === 'password') {
                                                    passwordInput.type = 'text';
                                                    passwordIcon.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />`;
                                                } else {
                                                    passwordInput.type = 'password';
                                                    passwordIcon.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
                                                }
                                            }}
                                        >
                                            <svg id="passwordIcon" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-700 cursor-pointer"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        Keep me signed in
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out text-base font-semibold shadow-sm"
                                >
                                    {loading ? <span className="loading loading-spinner text-info"></span> : 'Sign in'}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Don't have an account?{' '}
                                    <a onClick={() => {navigate('/signup')}} className="font-semibold cursor-pointer text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">
                                        Create one now 
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side - Brand Message */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 items-center justify-center">
                    <div className="max-w-md text-white">
                        <h2 className="text-4xl font-bold mb-8">Experience Fashion Like Never Before</h2>
                        <div className="space-y-6">
                            <p className="text-xl leading-relaxed">
                                Discover our curated collection of premium fashion items, handpicked for the modern trendsetter.
                            </p>
                            <blockquote className="border-l-4 border-white/30 pl-4 italic">
                                "Style is a way to say who you are without having to speak."
                                <footer className="text-sm mt-2 font-semibold">— Rachel Zoe</footer>
                            </blockquote>
                            <div className="pt-4">
                                <p className="text-lg">
                                    Join our community of fashion enthusiasts and stay ahead of the latest trends.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}