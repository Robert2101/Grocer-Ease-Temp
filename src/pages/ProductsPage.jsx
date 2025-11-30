import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppStore from "../store/appStore"; // Import Store
import ProductCard from "../components/ProductCard";
import { Loader } from "lucide-react";

const ProductsPage = () => {
    const { categoryId } = useParams();

    // Get data and actions from the store
    const { products, categories, fetchProducts, fetchCategories, isLoading } = useAppStore();

    // Fetch data when the page loads (if not already loaded)
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    // Filter products based on the URL parameter
    const categoryProducts = products.filter((product) => product.category === categoryId);

    // Find the category details (for the title)
    const currentCategory = categories.find((c) => c.id === categoryId);

    // Show loading state while fetching data
    if (isLoading && products.length === 0) {
        return (
            <div className="flex h-[50vh] justify-center items-center">
                <Loader className="animate-spin text-green-600" size={40} />
            </div>
        );
    }

    // Handle case where category doesn't exist
    if (!currentCategory) {
        return (
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-gray-800">Category not found.</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {currentCategory.name}
            </h1>

            {categoryProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;