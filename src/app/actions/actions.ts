import { Product } from "../types/products";

export const ADD_TO_CART = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(item => item._id === product._id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].inventory += 1;
    } else {
        cart.push({ ...product, inventory: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const REMOVE_FROM_CART = (productId: string): Product[] => {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Filter out the item to remove
    cart = cart.filter(item => item._id !== productId);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // ✅ Return updated cart array
    return cart;
};

export const UPDATE_CART = (productId: string, quantity: number): Product[] => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Find the product in the cart
    const productIndex = cart.findIndex(item => item._id === productId);

    // If productToUpdate is found, update the inventory
    if (productIndex > -1) {
        cart[productIndex].inventory = quantity;
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // ✅ Return updated cart array
    return cart;
};

export const getcartItems = (): Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};

