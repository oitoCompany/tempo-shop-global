import React from 'react';
import '../scss/components/_products.scss';

export default function categoryProperty(props) {
    const {
        YCODE_CAT,
        YCODE_CAT_DESC,
        YFILE
    } = props



    return (
            <div className="kat">
                <img src={YFILE} />
                <div>{YCODE_CAT_DESC}</div>
                <input className="catPropertyTxt" defaultValue={YCODE_CAT_DESC} readOnly ></input>
            </div>
    );
}


