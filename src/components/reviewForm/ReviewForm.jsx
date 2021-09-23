import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { getProduct } from "../../services/ProductService";
import { createReview } from '../../services/ReviewService';
import "./ReviewForm.css"

const ReviewForm = ({ productId }) => {

    const [ form, setForm ] = useState({
        title: "",
        description: "",
        score: 0
    })

    const onChange = (e) => {
        if (e.target.name === "score" && e.target.value < 0) {
            e.target.value = 0
        }

        if (e.target.name === "score" && e.target.value > 5) {
            e.target.value = 5
        }
        
        setForm((last) => {
            return (
                {...last,
                    [e.target.name]: e.target.value
                }
            )
        })
    } 

    const onSubmit = (e) => {
        createReview(productId, {
            ...form,
            product: productId
        })
        .then(() => {
            setForm({
                title: "",
                description: "",
                score: 0
            })
        })
        .catch((e) => console.error(e))
    }

    return (
        <>
            <h2>Write your own review</h2>
            <form className="ReviewForm" onSubmit={onSubmit}>
                <div className="ReviewForm__element">
                    <label className="ReviewForm__element__label" htmlFor="title">Title</label>
                    <input className="ReviewForm__element__input" type="text" name="title" value={form.title} onChange={onChange}></input>
                </div>
                <div className="ReviewForm__element">
                    <label className="ReviewForm__element__label" htmlFor="description">Description</label>
                    <input className="ReviewForm__element__input" type="text" name="description" value={form.description} onChange={onChange}></input>
                </div>
                <div className="ReviewForm__element">
                    <label className="ReviewForm__element__label" htmlFor="score">Score</label>
                    <input className="ReviewForm__element__input" type="number" name="score" value={form.score} onChange={onChange}></input>
                </div>
                <button type="submit" className="ReviewForm__button">  Create review</button>
            </form> 
        </>
    );
};

export default ReviewForm;