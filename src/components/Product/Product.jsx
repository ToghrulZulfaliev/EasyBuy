import React from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"


const Product = ({ product }) => {
    return (
        <div className="card h-100" style={{ width: "18rem" }}>
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
                <p className="card-text fw-bold fs-5">${product.price}</p>
                <div className="mt-auto d-flex gap-2">
                    <Link
                        to="/card"
                        className="btn btn-dark flex-grow-1"
                    >
                        Add to Cart
                    </Link>
                    <Link
                        to={`/product/${product.id}`}
                        className="btn btn-secondary flex-grow-1"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product