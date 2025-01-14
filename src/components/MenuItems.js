import React from 'react'

export default function MenuItems(props) {
    const { IsVisible, handelCancelOrder, isEnableBTN } = props;
    return (
        <div id="flyoutMenu" className={IsVisible}>
            {isEnableBTN && <button className="btnCancelOrder" onClick={handelCancelOrder}>ביטול הזמנה</button>}            
        </div>
    )
}
