import React from 'react'
import BuyNow from '../components/Buynow/BuyNow'
import { useState, useEffect } from 'react';
const BuyPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="container">
            {products.map((product) => (
                <BuyNow key={product.id} product={product} />
            ))}
        </div>
    );

}

export default BuyPage