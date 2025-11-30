import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import useAppStore from "../store/appStore"; // <-- Import new store

const Navbar = () => {
    // Get cart count
    const cartItems = useAppStore((state) => state.cartItems);
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Get auth state
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

                {/* 2. Center: Search Bar (for Desktop) */}
                {/* <div className="hidden md:flex-grow md:max-w-lg mx-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search for groceries..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div> */}

                {/* 3. Right Side: Profile & Cart */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* --- CONDITIONAL PROFILE LINK --- */}
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

                    {/* --- CART LINK (Unchanged) --- */}
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

                    {/* Mobile Menu Button - shows search/links on mobile */}
                    <button className="md:hidden text-gray-600">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;