import React, { useEffect, useRef, useState } from "react";
import successIMG from '../images/success.png';
import ErrorIMG from '../images/warning.png';

export default function CreateOrder(props) {
    const { CreateActive,
        isSuccess,
        message,
        ProductTable,
        loading,
        closeCreateOrderModal,
        Response1,
        ReturnS
    } = props;

    const [heightModal, setheightModal] = useState(500);

    const modalCreate = React.createRef();
    const ImageName = ReturnS ? successIMG : ErrorIMG;

    const handleClose = () => {
        closeCreateOrderModal();
    }

    useEffect(() => {
        console.log(message);
    })

    useEffect(() => {
        console.log(ProductTable);
        console.log(Response1);
    }, [Response1])

    return (
        <div
            className={
                CreateActive ? "modal-wrapper active" : "modal-wrapper"
            }>
            <div className={ReturnS || !loading ? "modalLogIn modalCreateOrderS" : "modalLogIn modalCreateOrderE"} ref={modalCreate} >
                <div className="logout-quick-view" >
                    {loading ?
                        <div>
                            <img className="loginIMG" src={ImageName}></img>
                            <span className="lblMessage">{message}</span>
                            {Object.keys(ProductTable).length > 0 &&
                                <div className={Object.keys(ProductTable).length > 3 ? "scrollDiv" : ""}>
                                    {Object.keys(ProductTable).map(product =>
                                       
                                        <div className="divReturnItems">
                                            <span className="itemQuantity itemName">{ProductTable[product].REQ_QTY}</span>
                                            <span className="itemQuantity">{ProductTable[product].MAKTX}</span>
                                           
                                        </div>
                                       
                                    )}
                                </div>
                            }
                        </div>
                        : <div className="midlleDiv">
                           
                            <div class="loadingio-spinner-spinner-7gua2kz65cu"><div class="ldio-ownlejttl6">
                                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                    }
                </div>
                {loading && <button
                    type="button"
                    className="btnCreateOrder"
                    onClick={handleClose}
                >
                    אישור
                    </button>}
            </div>
        </div>
    );

}



<style type="text/css">

</style>