import { create } from "zustand";
import { toast } from "sonner";

const API_URL = "http://localhost:5001";

const useAppStore = create((set, get) => ({
    isLoggedIn: false,
    user: null, 

    products: [],
    categories: [],
    isLoading: false,
    error: null,

    cartItems: [],
    login: async (email, password) => {
        try {
            // 1. Fetch user by email using json-server filtering
            const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
            const users = await response.json();

            // 2. Check if user exists
            if (users.length === 0) {
                toast.error("User not found. Please sign up.");
                return false; // Return false to indicate failure
            }

            const user = users[0];

            // 3. Check password
            if (user.password !== password) {
                toast.error("Incorrect password.");
                return false;
            }

            // 4. Success! Update state
            set({ isLoggedIn: true, user: user });
            toast.success(`Welcome back, ${user.name}!`);
            return true; // Return true to indicate success

        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login failed due to server error.");
            return false;
        }
    },
    register: async (name, email, password) => {
        try {
            // 1. Check if email already exists
            const checkResponse = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                toast.error("An account with this email already exists.");
                return false;
            }

            // 2. Prepare new user object
            // Note: json-server automatically creates a unique 'id'
            const newUser = {
                name,
                email,
                password,
                joined: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) // e.g., "November 28, 2025"
            };

            // 3. POST to json-server
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const savedUser = await response.json();

            // 4. Automatically log them in
            set({ isLoggedIn: true, user: savedUser });
            toast.success("Account created successfully!");
            return true;

        } catch (error) {
            console.error("Register Error:", error);
            toast.error("Registration failed. Please try again.");
            return false;
        }
    },

    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            set({ products: data, isLoading: false });
        } catch (error) {
            console.error(error);
            set({ error: error.message, isLoading: false });
            toast.error("Could not load products.");
        }
    },
    fetchCategories: async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data = await response.json();
            set({ categories: data });
        } catch (error) {
            console.error("Category fetch error:", error);
        }
    },


    logout: () => set({ isLoggedIn: false, user: null }),

    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                const updatedCart = state.cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { cartItems: updatedCart };
            } else {
                const newCart = [...state.cartItems, { ...product, quantity: 1 }];
                return { cartItems: newCart };
            }
        });
        toast.success(`${product.name} added to cart!`);
    },

    removeFromCart: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
        toast.error("Item removed from cart.");
    },

    clearCart: () => {
        set({ cartItems: [] });
    },

    incrementQuantity: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ),
        }));
    },

    decrementQuantity: (productId) => {
        set((state) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === productId
            );
            if (existingItem?.quantity === 1) {
                return {
                    cartItems: state.cartItems.filter((item) => item.id !== productId),
                };
            }
            return {
                cartItems: state.cartItems.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        });
    },
}));

export default useAppStore;