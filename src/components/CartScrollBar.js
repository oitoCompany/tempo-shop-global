import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export default function CartScrollBar(props) {
  const { children } = props;

  let scrollbars = React.createRef();
  const handleScroll = (event) => {
    const positions = scrollbars.getValues();
    if (positions.top >= 1) {
      event.stopPropagation();
    }
  }

  return (
    <Scrollbars style={{ width: '100%', height:'100%', marginleft: -17, }} ref={scrollbars}>
      {children}
    </Scrollbars>
  );

}

