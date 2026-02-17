export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity?: number;
}

export const getCart = (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        return [];
    }
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
};

export const removeFromCart = (id: number) => {
    const cart = getCart();
    const updatedCart = cart.filter((p) => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
};

export const updateQuantity = (id: number, quantity: number) => {
    const cart = getCart();
    const productIndex = cart.findIndex((p) => p.id === id);

    if (productIndex > -1) {
        if (quantity <= 0) {
            cart.splice(productIndex, 1);
        } else {
            cart[productIndex].quantity = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }
};

export const clearCart = () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cart-updated'));
};

export const getCartTotal = (): number => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
};
