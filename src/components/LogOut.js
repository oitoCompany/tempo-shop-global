import React, { useEffect, useRef } from "react";

export default function LogOut(props) {
    const { logOut,
        closeLogOutModal,
        clearInformations } = props;

    const modalLogOut = React.createRef();


    const handleClose = () => {
        closeLogOutModal();
    }



    return (
        <div
            className={
                logOut ? "modal-wrapper active" : "modal-wrapper"
            }>
            <div className="modalLogIn" ref={modalLogOut}>

                <div className="logout-quick-view">
                    <span className="lblEmpEmpID">האם אתה בטוח שברצונך לצאת?</span>
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
                    onClick={clearInformations}
                >
                    אישור
                    </button>
            </div>
        </div>
    );

}


