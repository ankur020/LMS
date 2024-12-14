const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center ">
            <div className="h-16 w-16 rounded-full border-4 border-solid border-red-500">

                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;