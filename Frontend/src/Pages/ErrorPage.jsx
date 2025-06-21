export const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-9xl font-extrabold text-rose-500">404</h1>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Oops! Page Not Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="mt-4 flex flex-col space-y-4">
                        <button 
                            onClick={() => window.history.back()}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                        >
                            Go Back
                        </button>
                        <a
                            href="/"
                            className="group relative w-full flex justify-center py-2 px-4 border border-rose-500 text-sm font-medium rounded-md text-rose-500 bg-transparent hover:bg-rose-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                        >
                            Return to Home
                        </a>
                    </div>
                </div>
                <div className="animate-bounce">
                    <span className="text-6xl">😅</span>
                </div>
            </div>
        </div>
    )
}