import { toast } from "react-toastify";
import {userSignup} from "../API/POST-Axios/userApi";
import { useNavigate } from "react-router-dom";
export const Signup = ()=>{

    const navigate = useNavigate();

    const handleSignup = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'), 
            phone: formData.get('phone'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validate all fields are present
        if(!data.name || !data.email || !data.phone || !data.password || !data.confirmPassword) {
            toast.error('All fields are required');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Validate phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if(!phoneRegex.test(data.phone)) {
            toast.error('Please enter a valid 10 digit phone number');
            return;
        }

        // Validate password length
        if(data.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        // Validate password match
        if(data.password !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await userSignup(data)
            if(response.status === 201){
                toast.success('Signup successful');
                localStorage.setItem('token', response.data.token);
                console.log(response.data)
                navigate('/');
            }
        } catch (error) {
            toast.error('Signup failed', error.response.data.message);
        }
    }

    return(
        <div className="mainContainer">
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side - Brand Message */}
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

                {/* Right Side - Signup Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                    <div className="max-w-md w-full">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">Please fill in your details to register</p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => handleSignup(e)}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                        placeholder="Enter your full name"
                                    />
                                </div>
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
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                        placeholder="Enter your phone number"
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
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => {
                                                const confirmPasswordInput = document.getElementById('confirmPassword');
                                                const confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
                                                if (confirmPasswordInput.type === 'password') {
                                                    confirmPasswordInput.type = 'text';
                                                    confirmPasswordIcon.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />`;
                                                } else {
                                                    confirmPasswordInput.type = 'password';
                                                    confirmPasswordIcon.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
                                                }
                                            }}
                                        >
                                            <svg id="confirmPasswordIcon" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out text-base font-semibold shadow-sm"
                                >
                                    Create Account
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}