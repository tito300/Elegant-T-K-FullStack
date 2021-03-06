import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className="part3" id="">
            <div className="part3__cards-wrapper">
                <Link to="/products/category/topsellers">
                    <div className="simple-product-card block-1">
                        <div className="simple-product-card__img img-1"></div>
                        <div className="simple-product-card__text">
                            <h3 className="simple-product-card__text__title">Best Sellers</h3>
                            <p className="simple-product-card__text__disc">Do you want to know what others are buying? click
                            here</p>
                        </div>
                    </div>
                </Link>
                <Link to="/products/category/trending">
                    <div className="simple-product-card block-2">
                        <div className="simple-product-card__img img-2"></div>
                        <div className="simple-product-card__text">
                            <h3 className="simple-product-card__text__title">Trending</h3>
                            <p className="simple-product-card__text__disc">Here you can find trending subjects.</p>
                        </div>
                    </div>
                </Link>
                <Link to="/products/category/newdesigns">
                    <div className="simple-product-card block-3">
                        <div className="simple-product-card__img img-3"></div>
                        <div className="simple-product-card__text">
                            <h3 className="simple-product-card__text__title">New Designs</h3>
                            <p className="simple-product-card__text__disc">This is our personal favorites.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="wide-note-section">
                <div className="wide-note-section__wrapper">
                    <h4 className="title">Did you know?</h4>
                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae odit
                        necessitatibus esse saepe laboriosam voluptas aperiam. Perferendis laudantium illo dicta voluptas
                        dolorum, ut enim labore esse temporibus praesentium aliquam minus neque facilis nulla quisquam
                        accusantium delectus culpa doloribus et sint architecto magnam nostrum quas ducimus? Repudiandae
                        dolor, reprehenderit, totam nihil at consectetur temporibus aliquid consequuntur non aliquam
                        asperiores explicabo vitae suscipit, voluptas voluptatibus numquam qui magni eius! Facilis, tempora
                    perferendis?</p>
                </div>

            </div>
        </div>
    )
}