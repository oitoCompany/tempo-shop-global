import React, { useEffect } from "react";
import { findDOMNode } from "react-dom";

export default function QuickView(props) {
  const { closeModal, openModal, product } = props;
  

  let modal = React.createRef();

 

  const handleClickOutside = (event) => {
    if (modal && (!modal || !modal.contains(event.target))) {
      closeModal();
    }
  }

  const handleClose = () => {
    closeModal();
  }

  
  return (
    <div
      className={
        openModal ? "modal-wrapper active" : "modal-wrapper"
      }
    >
      <div className="modal" ref={modal}>
        <button
          type="button"
          className="close"
          // onClick={handleClose}
        >
          &times;
          </button>
        <div className="quick-view">
          <div className="quick-view-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="quick-view-details">
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
