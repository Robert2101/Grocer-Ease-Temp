import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="text-center py-12">
            <h1 className="text-9xl font-bold text-green-600">404</h1>
            <h2 className="text-4xl font-semibold text-gray-800 mt-4 mb-2">
                Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default PageNotFound;