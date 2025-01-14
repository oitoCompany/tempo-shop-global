import React, { useEffect } from 'react'

export default function productInList(props) {
    const { product,
        handelsetProductID,
        enAndDisable,
        handleAddQuantity,
        updateQuantity,
        increment,
        decrement,
        curProductId,
        disabled,
        setdisabled
    } = props;

    useEffect(() => {
        handelMouseOver();
    }, [input])

    const handelMouseOver = () => {
        let aaa = 5;
    }

    return (       
        <li className="cart-item" key={product.name}>
            <img className="product-image" src={product.image} />
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
            </div>
            <div onMouseOver={enAndDisable} className="product-total displayd">
                <div onMouseOver={handelsetProductID(product.id)} className="notDisplay">
                    <Counter
                        onMouseOver={handelsetProductID}
                        productQuantity={product.quantity}
                        handleAddQuantity={handleAddQuantity}
                        updateQuantity={updateQuantity}
                        increment={increment}
                        decrement={decrement}
                    />
                    
                </div>
                <div className="IsDisplay">
                    <p className="quantity" disabled={(disabled) ? "disabled" : ""}>
                        {product.quantity} {product.quantity > 1 ? "יחידות" : "יחידה"}{" "}
                    </p>
                </div>
            </div>
            <a onMouseOver={handelMouseOver}
                className="product-remove"
                href="#"
                onClick={removeProduct(product.id)}
            >
                ×
            </a>
        </li>
    );
}
