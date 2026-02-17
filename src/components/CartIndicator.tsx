import React, { useEffect, useState } from 'react';
import { getCart, type Product } from '../utils/cart';

export default function CartIndicator() {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCount(total);
    };

    useEffect(() => {
        // Initial load
        updateCount();
        
        const handleCartUpdate = () => {
             updateCount();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <a href="/cart" className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="sr-only">Cart</span>
            {count > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {count}
                </div>
            )}
        </a>
    );
}
