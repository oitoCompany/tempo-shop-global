import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Counter(props) {
  const { productQuantity, updateQuantity, decrement, increment } = props;
  const [value, setvalue] = useState(productQuantity)

  
  let feedQty = React.createRef();
  const feed = (e) => {

    setvalue(feedQty.value);
    updateQuantity(value);
  }
  



  const resetQuantity = () => {
    setvalue(1);
  }


  return (
    <div className="stepper-input">
      <a href="#" className="decrement" onClick={(e) => decrement(e)}>
        –
        </a>
      <input
        ref={feedQty}
        type="number"
        className="quantity"
        value={productQuantity}
        onChange={feed}
      />
      <a href="#" className="increment" onClick={(e) => increment(e)}>
        +
        </a>
    </div>
  );

}

Counter.propTypes = {
  value: PropTypes.number
};

