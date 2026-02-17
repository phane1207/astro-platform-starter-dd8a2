import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateQuantity, getCartTotal, type Product } from '../utils/cart';

export default function CartList() {
    const [cart, setCart] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);

    const refreshCart = () => {
        setCart(getCart());
        setTotal(getCartTotal());
    };

    useEffect(() => {
        refreshCart();
        window.addEventListener('cart-updated', refreshCart);
        return () => window.removeEventListener('cart-updated', refreshCart);
    }, []);

    if (cart.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-400 mb-4">Your cart is empty.</p>
                <a href="/shop" className="text-blue-400 hover:text-blue-300 underline">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Your Cart</h2>
            <ul className="space-y-4">
                {cart.map((item) => (
                    <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 pb-4">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div>
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                <p className="text-gray-400">${item.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white cursor-pointer"
                                >-</button>
                                <span className="text-white w-8 text-center">{item.quantity || 1}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white cursor-pointer"
                                >+</button>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-300 underline text-sm cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-2xl font-bold text-white mb-4 sm:mb-0">
                    Total: <span className="text-green-400">${total}</span>
                </div>
                <a 
                    href="/checkout"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                    Proceed to Checkout
                </a>
            </div>
        </div>
    );
}
