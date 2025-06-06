import { userLogin } from "../API/POST-Axios/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
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
                navigate('/');
            }   
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full px-4 py-3 rounded-lg border dark:border-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white text-base"
                                        placeholder="Enter your password"
                                    />
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
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out text-base font-semibold shadow-sm"
                                >
                                    Sign in
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Don't have an account?{' '}
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">
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