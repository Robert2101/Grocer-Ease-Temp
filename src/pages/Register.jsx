import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "../store/appStore"; // Import store

const Register = () => {
    const navigate = useNavigate();
    // const register = useAppStore((state) => state.register); // Get register action
    const {register} = useAppStore();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Call the store action
        const success = await register(formData.name, formData.email, formData.password);

        setIsLoading(false);

        if (success) {
            // Redirect to profile (since we auto-login) or login page
            navigate("/profile");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
                    GrocerEase
                </h1>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="jane@example.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white py-2 px-4 rounded-md font-semibold transition-colors
                            ${isLoading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;