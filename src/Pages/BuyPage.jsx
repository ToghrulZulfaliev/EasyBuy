import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BuyNow from '../components/Buynow/BuyNow';

const BuyPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="container">
            <BuyNow product={product} />
        </div>
    );
};

export default BuyPage;
