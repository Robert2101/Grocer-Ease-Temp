import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
    return (
        <div className="text-center py-12">
            <CheckCircle
                className="mx-auto text-green-500 mb-4"
                size={80}
                strokeWidth={1.5}
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Thank you for your purchase. We'll send you an email confirmation shortly.
            </p>
            <Link
                to="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccessPage;