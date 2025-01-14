
import React, { useState, useEffect, useRef } from 'react';
import { findDOMNode } from "react-dom";
import loginimg from '../images/loginIMG.png';
import { Trans, useTranslation } from 'react-i18next';
import tempoLogoIMG from '../images/tempoLogoIMG.png';

export default function LogIn(props) {
    const { t, i18n } = useTranslation();
    const { logInActive, closeLogInModal, UpdateEmployeeName, EmployeeName, setEmployeeName, lblError } = props;
    const inputEmployee = useRef();
    let modal = useRef();
    const lblEror = useRef();


    useEffect(() => {
        inputEmployee.current.focus();
    });

    const handelNameChange = (e) => {
        UpdateEmployeeName(e.target.value);
    }

    const handleClose = () => {
        inputEmployee.current.value !== "" ? closeLogInModal() : lblEror.current.textContent = "חובה להזין מספר עובד";
        inputEmployee.current.value = "";
    }

    const handelKeyDown = (e) => {
        if (e.key === 'Enter') { handleClose(); inputEmployee.current.value = "" }
    }

    return (
        <Trans t={t}>
            <div onKeyDown={handelKeyDown}
                className={
                    logInActive ? "modal-wrapper active" : "modal-wrapper"
                }>
                <div className="modalLogIn" ref={modal}>
                    <div className="login-quick-view">
                        <img
                            className="loginIMG"
                            src={tempoLogoIMG}
                        ></img>
                        <input className="empID" type="text" ref={inputEmployee} placeholder="העבר כרטיס עובד" onChange={handelNameChange} defaultValue=""></input>

                        <button
                            type="button"
                            className="btnLogIn"
                            onClick={handleClose}>
                            התחבר

                        </button>
                        <label ref={lblEror} className="lblError">{lblError}</label>
                    </div>
                </div>
            </div>
        </Trans>
    )
}




