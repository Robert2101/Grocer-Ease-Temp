import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import useAppStore from "../store/appStore";  

const Navbar = () => {
    const cartItems = useAppStore((state) => state.cartItems);
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const isLoggedIn = useAppStore((state) => state.isLoggedIn);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
                {/* 1. Left Side: Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="text-3xl font-bold text-green-600">
                        GrocerEase
                    </Link>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    {isLoggedIn ? (
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 text-gray-600 hover:text-green-600"
                        >
                            <User size={24} />
                            <span className="hidden md:block font-medium">My Profile</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 text-gray-600 hover:text-green-600"
                        >
                            <User size={24} />
                            <span className="hidden md:block font-medium">Login / Register</span>
                        </Link>
                    )}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-2 text-gray-600 hover:text-green-600"
                    >
                        <ShoppingCart size={24} />
                        <span className="hidden md:block font-medium">My Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 md:right-auto md:left-[14px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button className="md:hidden text-gray-600">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;