import React, { useState } from 'react';
import { addToCart, type Product } from '../utils/cart';

interface AddToCartProps {
    product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded transition-colors duration-200 text-white cursor-pointer ${
                added ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
            {added ? 'Added!' : 'Add to Cart'}
        </button>
    );
}
