import { useNavigate, Link } from "react-router-dom";
import useAppStore from "../store/appStore";

const CheckoutPage = () => {
    const navigate = useNavigate();

    const cartItems = useAppStore((state) => state.cartItems);
    const clearCart = useAppStore((state) => state.clearCart);

    const cartTotal = useAppStore((state) =>
        state.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2)
    );

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        console.log("Placing order...");
        clearCart();
        navigate("/order-success");
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                <p className="text-gray-500 mb-4">You can't checkout with an empty cart.</p>
                <Link
                    to="/"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
            <form
                onSubmit={handlePlaceOrder}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
                {/* Shipping Details */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Shipping Information</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2" />
                    </div>
                </div>

                {/* Order Summary & Payment */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
                    <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
                    <div className="space-y-2 mb-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} <span className="text-gray-500">x {item.quantity}</span></span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold mb-6">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;