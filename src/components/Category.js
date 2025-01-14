import React, { useEffect } from 'react'
import '../scss/components/_products.scss';

export default function Category(props) {
    const { YDESC, QTY } = props;
    

    return (
        <div className="Entitlement">
            <span disabled="false" className="category" >{QTY}</span>
            <label className="categoryName">{YDESC}</label>
        </div>
    )
}





