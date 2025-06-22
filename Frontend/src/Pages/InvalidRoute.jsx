export const InvalidRoute = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl font-extrabold text-rose-500">404</h1>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Page Not Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        The page you are looking for might have been removed or is temporarily unavailable.
                    </p>
                </div>
                <div className="animate-bounce">
                    <span className="text-6xl">🤔</span>
                </div>
                <div className="pt-6">
                    <a 
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    );
}