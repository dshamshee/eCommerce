
export const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-rose-500">Something went wrong</h1>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Oops! Data Not Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please check your internet connection and try again.
                    </p>
                </div>
                <div className="animate-bounce">
                    <span className="text-6xl">😅</span>
                </div>
            </div>
        </div>
    )
}