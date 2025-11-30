import { LayoutGrid, Leaf, Egg, Fish, Cake } from 'lucide-react';

// Static UI Configuration (Keep these here)
export const allCategories = [
    { id: "all", name: "All Products", icon: "LayoutGrid" },
    { id: "fruits-vegetables", name: "Fruits & Vegetables", icon: "Leaf" },
    { id: "dairy-eggs", name: "Dairy & Eggs", icon: "Egg" },
    { id: "meat-seafood", "name": "Meat & Seafood", icon: "Fish" },
    { id: "bakery", name: "Bakery", icon: "Cake" },
];

export const dietaryNeeds = [
    { id: "organic", name: "Organic" },
    { id: "gluten-free", name: "Gluten-Free" },
    { id: "vegan", name: "Vegan" },
];

// --- HELPER FUNCTIONS ---

export const getCategoryIcon = (iconName) => {
    const icons = { LayoutGrid, Leaf, Egg, Fish, Cake };
    return icons[iconName] || LayoutGrid;
};
