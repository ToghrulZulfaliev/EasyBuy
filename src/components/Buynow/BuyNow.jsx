import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BuyNow.css';
;


const BuyNow = ({ product }) => {

    const handleBuyNow = () => {
        console.log(`Purchase confirmed for ${product.title}`);
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid product-image"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-muted mb-3">{product.category}</h4>
                    <h1 className="mb-4">{product.title}</h1>
                    <div className="d-flex align-items-center mb-3">
                        <span className="h5 mb-0 me-2">{product.rating.rate}</span>
                        <i className="fa fa-star text-warning"></i>
                        <span className="text-muted ms-2">({product.rating.count} reviews)</span>
                    </div>
                    <h2 className="h1 mb-4">${product.price}</h2>
                    <p className="lead mb-4">{product.description.substring(0, 100)}...</p>
                    <div className="d-flex gap-3">
                        <Link
                            to="/cart"
                            onClick={handleBuyNow}
                            className="btn btn-dark px-4 py-2"
                        >
                            Add to Cart
                        </Link>
                        <Link
                            to="/products"
                            className="btn btn-outline-dark px-4 py-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BuyNow;
