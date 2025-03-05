import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/CartSlice';

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="card h-100 product-card" style={{ width: "18rem" }}>
            <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "200px", objectFit: "contain" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title.substring(0, 25)}...</h5>
                <p className="card-text text-muted small mb-0">{product.category}</p>
                <p className="card-text">{product.description.substring(0, 50)}...</p>
                <p className="card-text fw-bold fs-5">${product.price.toFixed(2)}</p>
                <div className="mt-auto d-flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-dark flex-grow-1"
                    >
                        <i className="fa fa-shopping-cart me-2"></i>
                        Add to Cart
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-dark flex-grow-1"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;