import React, { useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";

export default function CancelOrder(props) {
    const { closeCancelOrderModal, isCancelOrder, handelCancelOrder, handelCancelOrderNum } = props;
    const lblEror = useRef();
    const inputText = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            let modal = React.createRef();
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    });
    const modal = React.createRef();
    const handleClickOutside = (event) => {
        closeCancelOrderModal();
      
    }



    const handleClose = () => {
        closeCancelOrderModal();
    }

    const handleSave = () => {
        if (inputText.current.value === "") lblEror.current.textContent = " חובה להכניס מספר הזמנה תקין"
        else (handelCancelOrderNum(inputText.current.value))
    }

    return (
        <div
            className={
                isCancelOrder ? "modal-wrapper active" : "modal-wrapper"
            }>
            <div className="modalLogIn" ref={modal}>

                <div className="login-quick-view">
                    <span className="lblEmpEmpID">ביטול הזמנה</span>
                    <input ref={inputText} type="text" placeholder=" הזן מספר הזמנה לביטול" ></input>
                    <label ref={lblEror} className="lblError"></label>
                </div>
                <button
                    type="button"
                    className="btnCancel"
                    onClick={handleClose}>
                    ביטול
                    </button>
                <button
                    type="button"
                    className="btnOrderID"
                    onClick={handleSave}
                >
                    שמירה
                    </button>
            </div>
        </div>
    );

}


