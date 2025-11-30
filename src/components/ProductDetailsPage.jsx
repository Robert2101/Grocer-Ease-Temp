import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/staticData";
import useAppStore from "../store/appStore"; // Import the zustand store
import { ChevronLeft } from "lucide-react";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const addToCart = useAppStore((state) => state.addToCart); // Select the action
    const product = getProductById(productId);

    if (!product) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold">Product not found.</h1>
                <Link to="/" className="text-green-600 hover:underline mt-4 inline-block">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link
                to={`/products/${product.category}`}
                className="inline-flex items-center text-green-600 hover:underline mb-4"
            >
                <ChevronLeft size={20} />
                Back to {product.category}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg object-cover aspect-square"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>
                    <p className="text-3xl font-semibold text-green-600 mb-6">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-lg mb-8">{product.description}</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;