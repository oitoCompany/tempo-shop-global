import React, { useState } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { object } from "prop-types";


export default function Products(props) {
    const {
        cart,
        handleRemoveProduct,
        disabled,
        createOrder,
        enAndDisable,
        handelOpenCartWin,
        isCartWinVisible,
        Eligibility,
        total
    } = props;

    const db = cart.reduce((objectsByKeyValue, obj) => {
        const value = obj.eligibility;
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

    const handlecreateOrder = () => {
        if (Object.keys(cart).length > 0)
            createOrder();
    }

    return (
        <div className="cart-win">
            <div className="cart-win-a">
                {
                    Object.keys(db).map((category, i) => (
                        <div key={i} className="product-cart">
                            <h3>{Eligibility.filter(a => a.CATEGORY === category)[0].YDESC}</h3>
                            {
                                db[category].map(product =>
                                    <li className="cart-item" key={product.name}>
                                        <a
                                            className="product-remove"
                                            href="#"
                                            onClick={(e) => handleRemoveProduct(e, product.id, product.eligibility)}
                                        >
                                            X
                                      </a>
                                        <div onMouseOver={enAndDisable} className="product-total displayd">

                                        </div>
                                        <div className="product-info">
                                            <p className="product-name">{product.name}</p>
                                            <p className="quantity" disabled={(disabled) ? "disabled" : ""}>
                                                {product.quantity} {" "}{product.quantity > 1 ? "יחידות" : "יחידה"}
                                            </p>
                                            <p className="product-price">{product.price}{" ₪ "}</p>
                                        </div>

                                        <div className="cart-product-image-div">
                                            <img className="cart-product-image" src={product.image} />
                                        </div>

                                    </li>
                                )
                            }
                        </div>
                    ))
                }
                <div className="totalInCart">
                    
                    <span className="total-text"> {"סך הכל"}</span>
                    <span >  {total.toFixed(2)}  {"₪"} </span>

                </div>
            </div>

            <div className="buttonsCart">
                <button className={Object.keys(cart).length > 0 ? "btnCartSave" : "btnCartSave notAllowed"} onClick={handlecreateOrder}>שמירה</button>
                <button className="btnCartCancel" onClick={handelOpenCartWin}>ביטול</button>
            </div>
        </div>

    );



    // const productsData = Object.keys(db).map(category => {
    //     db[category].map(product => {
    //         return (
    //             <li className="cart-item" key={product.name}>
    //                 <img className="product-image" src={product.image} />
    //                 <div className="product-info">                        <p className="product-name">{product.name}</p>
    //                     <p className="product-price">{product.price}</p>
    //                 </div>
    //                 <div onMouseOver={enAndDisable} className="product-total displayd">
    //                     <p className="quantity" disabled={(disabled) ? "disabled" : ""}>
    //                         {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
    //                     </p>
    //                 </div>
    //                 <a
    //                     className="product-remove"
    //                     href="#"
    //                     onClick={(e) => handleRemoveProduct(e, product.id)}
    //                 >
    //                     ×
    //              </a>
    //             </li>
    //         );
    //     });
    // });
    // // Empty and Loading States
    // let view;
    // if (productsData.length <= 0) {
    //     view = <LoadingProducts />;
    // } else if (productsData.length <= 0) {
    //     view = <NoResults />;
    // } else {
    //     view = (
    //         <CSSTransitionGroup
    //             transitionName="fadeIn"
    //             transitionEnterTimeout={500}
    //             transitionLeaveTimeout={300}
    //             component="div"
    //             className="cart-items"
    //         >
    //             {productsData}
    //         </CSSTransitionGroup>
    //     );
    // }
    // return <div className="products-wrapper">
    //     <div className="flex">

    //         <div>{view}</div>
    //     </div>
    // </div>
}

// import React from 'react';
// import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
// import EmptyCart from "../empty-states/EmptyCart";

// export default function Cart(props) {
//     const { cart, handleRemoveProduct, disabled, enAndDisable, view, setview } = props;

//     const db = cart.reduce((objectsByKeyValue, obj) => {
//         const value = obj.category;
//         objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//         return objectsByKeyValue;
//     }, {});

//     return( Object.keys(db).map(category => {
//          db[category].map(product => {

//                 // <li key={`${product}-${category}`}>{db[category][product]}</li>
//                 // <h1>{category}</h1>
//                 // <ul defaultValue={category}>
//                 <li className="cart-item" key={product.name}>
//                     <img className="product-image" src={product.image} />
//                     <div className="product-info">
//                         <p className="product-name">{product.name}</p>
//                         <p className="product-price">{product.price}</p>
//                     </div>
//                     <div onMouseOver={enAndDisable} className="product-total displayd">
//                         <p className="quantity" disabled={(disabled) ? "disabled" : ""}>
//                             {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
//                         </p>
//                     </div>
//                     <a
//                         className="product-remove"
//                         href="#"
//                         onClick={(e) => handleRemoveProduct(e, product.id)}
//                     >
//                         ×
//                 </a>
//                 </li>
//                 // </ul>

//         });
//     })
//     // const win = (arrry.length <= 0) ?
//     //     setview(<EmptyCart />)
//     //     : setview(
//     //         <CSSTransitionGroup
//     //             transitionName="fadeIn"
//     //             transitionEnterTimeout={500}
//     //             transitionLeaveTimeout={300}
//     //             component="div"
//     //             className="cart-items"
//     //         >
//     //             {/* {l_cartItems} */}
//     //             {arrry}
//     //         </CSSTransitionGroup>
//     //     );
//     // return ({ win })
//     );

// }
