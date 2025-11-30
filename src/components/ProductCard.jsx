import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import useAppStore from "../store/appStore.js";

const ProductCard = ({ product }) => {
    const {addToCart} = useAppStore()

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col relative">
            {product.onSale && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">
                    On Sale
                </span>
            )}
            <Link to={`/product/${product.id}`} className="block overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex-grow">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.description.substring(0, 50)}...</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-green-600">
                        ${product.price.toFixed(2)}{" "}
                        {product.unit && <span className="text-sm font-normal text-gray-500">{product.unit}</span>}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;