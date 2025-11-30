import { Link } from "react-router-dom";
import useAppStore from "../store/appStore";
import { Trash2, Plus, Minus } from "lucide-react"; 

const CartPage = () => {
    const {cartItems, removeFromCart, incrementQuantity, decrementQuantity} = useAppStore();
    
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
            0).toFixed(2);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                    <Link
                        to="/"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 border border-gray-200 rounded-lg shadow-sm gap-4"
                            >
                                {/* Item Info */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-gray-500">
                                            ${item.price.toFixed(2)} / each
                                        </p>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => decrementQuantity(item.id)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                            aria-label="Decrement quantity"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-3 font-semibold text-lg">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => incrementQuantity(item.id)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                            aria-label="Increment quantity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <span className="text-lg font-semibold w-20 text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">${cartTotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-semibold">FREE</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${cartTotal}</span>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;