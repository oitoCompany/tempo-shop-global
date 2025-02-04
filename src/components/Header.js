import React, { useState, useEffect, useRef } from "react";
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import { logo } from '../images/TempoLogo.png';
import { searchMobile } from '../images/searchMobile.png';
import productInList from "./productInList";
import Category from "./Category";
import { slide as Menu } from 'react-burger-menu'
import MenuItems from "./MenuItems";
import circle from '../images/circle.png';
import cartIMG from '../images/cartIMG.png';
import tempoLogoIMG from '../images/tempoLogoIMG.png';
import searchIMG from '../images/searchIMG.png';
import ExitIMG from '../images/ExitIMG.png';
import CancelOrder from "./CancelOrder";

export default function Header(props) {
  const {
    EmployeeName,
    productQuantity,
    cartItems,
    createOrder,
    addToCart,
    employees,
    Eligibility,
    handelCancelOrder,
    handleMobileSearch,
    handelsetProductID,
    handleAddQuantity,
    handleAddToCart,
    updateQuantity,
    increment,
    decrement,
    curProductId,
    handleRemoveProduct,
    handleSearch,
    total,
    showCart,
    isSuccess,
    setshowCart,
    handelOpenCartWin,
    categoriesList,
    setlogOut,
    isPower,
    setisPower,
    handleClearSearch,
    logInActive,
    handelShowCart,
    isCancelOrder,
    view,
    EligibilitiesPageActive,
    setEligibilitiesPageActive,
    totalItems,
    isEnableBTN
  } = props;

  const [selectedProduct, setselectedProduct] = useState({});
  const [shoeInput, setshoeInput] = useState(false);
  const [mobileSearch, setmobileSearch] = useState(false);
  const [IsFromHeader, setIsFromHeader] = useState(true);
  const [MenuActiv, setMenuActiv] = useState("hide");

  const handleCart = (e) => {
    e.preventDefault();
    handelShowCart();   
    // setshowCart(!showCart);
    // !showCart && handelShowCart();
  }

  const cartPreview = useRef();
  const cartButton = useRef();


  let searchBox = React.createRef();

  useEffect(() => {
    handelShowCart();
   
  }, []);

  useEffect(() => {
    
    if (isPower) {
      searchBox.current.value = "";
      setisPower(false);
      handleClearSearch();
    }
    // 
    searchBox.current.focus();
    const handler = (e) => {
      handleClickOutside(e);
    }
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
 
  });

 

  const logedOut = () => {
    setlogOut(true);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const l_handleMobileSearch = (e) => {
    e.preventDefault();
    setmobileSearch(true);
  }

  const handleSearchNav = (e) => {
    e.preventDefault();
    setmobileSearch(false);
    searchBox.current.value = "";
    handleMobileSearch();
  }

  const handlecreateOrder = () => {
    
    if (cartItems.length > 0){
      console.log(cartItems)
      createOrder();
    }
      //  createOrder();
}  
const handleSearchClick = () => {
  if (searchBox.current) {
    const searchTerm = searchBox.current.value; // Get the input value
    handleSearch(searchTerm); // Pass the value to the search handler
  }
};


  const handleOpenCart = ()=>{
   if(cartItems.length > 0)
     handelOpenCartWin();
  }

  const handleClickOutside = (event) => {
    const clsName = event.target.className;
    if (cartPreview.current.classList.contains("active")) {
      if (clsName === "divBTNAdd " || clsName !== "cart-icon" &&
        !cartPreview ||
        (clsName !== "cart-icon" && clsName !== "cart-count" &&
          !cartPreview.current.contains(event.target) &&
          clsName !== "product-remove")) {
      setshowCart(false);
     
        event.stopPropagation();
      }
    }
    if (clsName !== "menu-toggle" && clsName !== "divLine div10")
      setMenuActiv("hide");

  }

  const EligibilityList =

    Object.keys(Eligibility).map(category => {
      return (
        <div className="Entitlement">
          <div className="">
            <input disabled="false" className="category" value={Eligibility[category].QTY.toFixed(2)}></input>
          </div>
          <div className="divCategoryName">
            <label className="categoryName">{Eligibility[category].YDESC}</label>
          </div>
        </div>
      )
     
    })

  return (
    <div>

      <header>


        <div className={isCancelOrder || logInActive || isSuccess ? "container active" : "container"}>
          <div className="headerDiv">

            {/* logo and employee name */}

            <div className="divLine nameAndLogo">
              <div className="logodiv ">
                <div className="brand">
                  <img
                    className="logo"
                    src={tempoLogoIMG}
                    alt=""
                  />
                </div>
              </div>
              <div className="logoutDiv">
                <img className="logoutImage" src="./static/images/power.png" onClick={logedOut} alt="" ></img>
              </div>
              <div className="empNameDiv">
                <div className="EmpName">   שלום</div>
                <div className="EmpName">  {EmployeeName} </div>
              </div>

            </div>


            {/* eligibilities */}
            <div className="divLine  divEligibility">
              <div className="Headercategories" >
                {EligibilityList}
              </div>
            </div>


            {/* search input */}
            <div className="divLine div35">
              <div className="search">
                <a
                  className="mobile-search"
                  href="#"
                  onClick={(e) => l_handleMobileSearch(e)}
                >
                  <img className="searchMobile"
                    src="https://www.iconsdb.com/icons/preview/navy-blue/search-13-xxl.png"
                    alt=""
                  />
                </a>
                <form
                  action="#"
                  method="get"
                  className={
                    mobileSearch ? "search-form active" : "search-form"
                  }
                >
                  <a
                    className="back-button"
                    href="#"
                    onClick={(e) => handleSearchNav(e)}
                  >
                    <img
                      src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                      alt="back"
                    />
                  </a>
                  <input
                    type="search"
                    ref={searchBox}
                    placeholder="חיפוש פריט"
                    className="search-keyword"
                   // onChange={(e) => handleSearch(e)}
                  />
                  <div
                    className="search-button"
                    src={searchIMG}
                    type="submit"
                    onClick={handleSearchClick}
               //    onClick={(e) => handleSearch(e)}
                    // onClick={(e) => handleSubmit(e)}
                  >
                    <img className="searchIMG" src={searchIMG}></img>
                  </div>
                </form>
              </div>
            </div>


            {/* cart */}
            <div className="divLine div15">
              <div className="cart">
                <a
                  href="#"
                  onClick={(e) => handleCart(e)}
                  ref={cartButton}
                >
                  <img src={cartIMG} className="cart-icon">
                  </img>

                  {totalItems ? (
                    <span className="cart-count" onClick={(e) => handleCart(e)}>{totalItems}</span>
                  ) : (
                      ""
                    )}
                </a>
                <div
                  className={
                     "cart-preview active" 
                  }
                  // 
                  ref={cartPreview}
                >
                  <CartScrollBar>{view}</CartScrollBar>
                  <div className="action-block">
                    <div onClick={handlecreateOrder} className={cartItems.length > 0 ? "divBTNAdd" : " divBTNAdd disabled"}>
                      {/* onClick={handleOpenCart}onClick={handlecreateOrder}  */}
                      {cartItems.length > 0 &&
                        <span > ₪{total.toFixed(2)}</span>
                      }
                      {/* <span className="btnAddText">מעבר לסל</span> */}
                      <span   className="btnAddText">סיום הזמנה</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* menu */}
            <div className="divLine div10" onClick={() => setMenuActiv(MenuActiv === "show" ? "hide" : "show")}>
              <div className="divMenuButton">
                <button
                  class="menu-toggle"
                  onClick={() => setMenuActiv(MenuActiv === "show" ? "hide" : "show")}
                >Menu</button>
              </div>
              <MenuItems IsVisible={MenuActiv} handelCancelOrder={handelCancelOrder} isEnableBTN={isEnableBTN} />
             
            </div>
          </div>
        </div> 
      </header >
    </div>
  );
};


