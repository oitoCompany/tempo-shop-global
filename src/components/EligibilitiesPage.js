import React, { useEffect, useRef } from "react";

export default function EligibilitiesPage(props) {
    const { Eligibility, EligibilitiesPageActive } = props;
    let modal = React.createRef();


    const handleClose = () => {
        closeCancelOrderModal();
    }

    return (
        <div className={EligibilitiesPageActive ? "modal-wrapper active" : "modal-wrapper"}>
            <div className="modalLogIn" ref={modal}>
                <div className="login-quick-view">
                    <div className="Entitlement">
                        {Object.keys(Eligibility).map(category =>
                            <div>
                                < div className="">
                                    <input disabled="false" className="category autoHeight" value={Eligibility[category].QTY.toFixed(2)}></input>
                                </div>
                                <div className="divCategoryName">
                                    <label className="categoryName autoHeight">{Eligibility[category].YDESC}</label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >      
    )
}
