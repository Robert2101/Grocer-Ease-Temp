import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useAppStore from "../store/appStore.js"; 
import {
    allCategories, 
    dietaryNeeds,
    getCategoryIcon,
} from "../data/staticData";
import { LayoutGrid, ChevronLeft, ChevronRight, Loader } from "lucide-react";

const Home = () => {
    // --- STORE CONNECTION ---
    const { products, fetchProducts, isLoading } = useAppStore();

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // --- LOCAL STATE ---
    const [selectedCategory, setSelectedCategory] = useState("fruits-vegetables");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [selectedDietaryNeeds, setSelectedDietaryNeeds] = useState([]);
    const [sortOption, setSortOption] = useState("most-popular");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // --- Filtering Logic (No changes needed here, works with store data) ---
    const filteredProducts = products.filter((product) => {

        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;

        const matchesPrice =
            product.price >= priceRange.min && product.price <= priceRange.max;

        const matchesDietary =
            selectedDietaryNeeds.length === 0 ||
            selectedDietaryNeeds.every((need) => {
                const key = `is${need.charAt(0).toUpperCase() + need.slice(1).replace("-", "")}`;
                return product[key];
            });

        return matchesCategory && matchesPrice && matchesDietary;
    });

    // --- Sorting Logic ---
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            case "most-popular":
            default:
                return 0;
        }
    });

    // --- Pagination Logic ---
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [ selectedCategory, priceRange, selectedDietaryNeeds, sortOption]);

    const handleDietaryChange = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setSelectedDietaryNeeds((prev) => [...prev, id]);
        } else {
            setSelectedDietaryNeeds((prev) => prev.filter((need) => need !== id));
        }
    };

    // --- RENDER LOADING STATE ---
    if (isLoading) {
        return (
            <div className="flex h-[70vh] justify-center items-center">
                <Loader className="animate-spin text-green-600" size={48} />
                <span className="ml-3 text-xl text-gray-600">Loading groceries...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
            {/* Left Sidebar - Filters */}
            <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <LayoutGrid size={20} />
                    Filters
                </h2>
                <p className="text-sm text-gray-500 mb-6">Refine your search</p>

                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Category</h3>
                    <div className="space-y-2">
                        {allCategories.map((cat) => {
                            const CurrentIcon = getCategoryIcon(cat.icon);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors duration-200
                    ${selectedCategory === cat.id
                                            ? "bg-green-100 text-green-700 font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <CurrentIcon size={20} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Price Range</h3>
                    <div className="flex justify-between text-gray-600 text-sm mb-2">
                        <span>Min: ${priceRange.min}</span>
                        <span>Max: ${priceRange.max}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                </div>

                {/* Dietary Needs Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Dietary Needs</h3>
                    <div className="space-y-2">
                        {dietaryNeeds.map((need) => (
                            <label key={need.id} className="flex items-center text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id={need.id}
                                    checked={selectedDietaryNeeds.includes(need.id)}
                                    onChange={handleDietaryChange}
                                    className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                />
                                <span className="ml-2">{need.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content - Search & Products */}
            <div className="w-full md:w-3/4">
                {/* Sort & Title */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {allCategories.find((cat) => cat.id === selectedCategory)?.name || "All Products"}
                    </h1>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-gray-600 whitespace-nowrap">Sort by:</span>
                        <select
                            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="most-popular">Most Popular</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                {/* Breadcrumbs (simplified) */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-green-600 font-semibold">
                        {allCategories.find((cat) => cat.id === selectedCategory)?.name || "All Products"}
                    </span>
                </div>

                {/* Product Grid */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">
                        Showing {indexOfFirstProduct + 1}-
                        {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
                        {sortedProducts.length} results
                    </p>
                </div>

                {currentProducts.length === 0 ? (
                    <div className="text-center py-12 text-gray-600 text-xl">
                        No products found matching your criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`px-4 py-2 border rounded-lg ${currentPage === page
                                    ? "bg-green-600 text-white border-green-600"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;