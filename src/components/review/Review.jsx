import React from 'react';
import { useEffect, useState } from "react";
import { getProduct } from "../../services/ProductService";
import "./Review.css"

const Review = ({ id }) => {

    const [reviews, setReviews] = useState(undefined)
    
    useEffect(() => {
        getProduct(id)
        .then((product) => {
            setReviews(product.reviews)
        })
        .catch((e) => console.error(e));
    }, [id])

    if(!reviews) {
        return <h3>Cargando...</h3>
    }

    const generateStars = (rating) => {
        const starsArr = []
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsArr.push(<span key={i}>⭐</span>)
            } else {
                starsArr.push(<span key={i} className="Review__review__star--shadow">⭐</span>)
            }
        }
        return starsArr
    }

    return (
        <div className="Review">
                <h2>User reviews</h2>
                {reviews.map((review) => {
                    return (
                    <div className="Review__review" key={review._id}>
                        <div>
                        <h4>{review.title} {" - "} {review.author.name} {generateStars(Number(review.score)).map((star => star))}</h4>
                        </div>
                        <p>{review.description}</p>
                    </div>
                    )
                })}
        </div>
    );
};

export default Review;