// import React, { useState, useEffect ,useMemo} from "react";
// import Counter from "./Counter";
// import { object } from "prop-types";
// import shoppingBasket from '../images/shoppingBasket.png'
import React, { useState, useEffect, memo, useCallback } from "react";
import shoppingBasket from "../images/shoppingBasket.png";

// import { memo } from "react";
const Product = memo(function Product(props) {
  const {
    addToCart,
    image,
    name,
    matnr,
    price,
    id,
    ClearChoose,
    setClearChoose,
    handelShowCart,
    YDESERVE_TYPE,
    category,
    productQuantity,
    openModal,
    Eligibility,
    autoAdd, // Handles auto-add logic
  } = props;

  const [clickOnAddToCart, setclickOnAddToCart] = useState(false);
  const [isAdded, setisAdded] = useState(false);
  const [NotEligibility, setNotEligibility] = useState(null);
  const [ListOfEligibilities, setListOfEligibilities] = useState([]);
  let   selectedProduct;
  let timeOut;
  let CurrentProduct;
  // console.log(`Auto-add is enabled for product: ${name} (ID: ${id})`);
  // **Handle Auto-Add Logic**
  useEffect(() => {
    if (autoAdd) {
  
      productaddToCart(id, name, matnr, price, id, productQuantity, category); // Automatically add the product
    }

    if (ClearChoose) {
      resetProductState();
      setClearChoose(false);
    }
  }, [autoAdd, ClearChoose, setClearChoose]);

  // Reset the product state
  const resetProductState = useCallback(() => {
    setclickOnAddToCart(false);
    setNotEligibility(null);
    setisAdded(false);
  }, []);

  const productaddToCart = (fimage, fname, fmatnr, fprice, fid, fquantity, fcategory) => {
    setclickOnAddToCart(true);
       selectedProduct = ({
          image: fimage,
          name: fname,
          matnr : fmatnr,
          price: fprice,
          id: fid,
          quantity: fquantity,
          category: fcategory
        });
    
        CurrentProduct = selectedProduct;
        // let currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
        // if (Catalog.length > 1) {
        //   currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
        
        // }
        // else {
        //   currProduct = Catalog[0];
        //   // isAdded(true)
        // }
       // CurrentProduct_l = currProduct;
        const Eligibilities = YDESERVE_TYPE;
         let EligibilitiesList = [];
        for (let i = 0; i < Eligibilities.length; i++) {
          for (let j = 0; j < Eligibility.length; j++) {
            if (Eligibilities[i] === Eligibility[j].CATEGORY && Eligibility[j].QTY >= selectedProduct.quantity)
              EligibilitiesList.push(Eligibility[j]);
          }
        }
    
    
    
        if (EligibilitiesList.length > 0) {
          if (EligibilitiesList.length === 1) {
            let count = Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY;
            if (count >= selectedProduct.quantity) {
             selectedProduct.eligibility = EligibilitiesList[0].CATEGORY;
              
              Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY -= selectedProduct.quantity;
              setListOfEligibilities([]);
              addCartOneElig(selectedProduct);
              setTimeout(() => {
                setisAdded(false);
                setNotEligibility(null);
                setclickOnAddToCart(false);
              }, 1000);
            }
          }
          else {
            setNotEligibility(false);
            handelselectedEligibility(EligibilitiesList);
            timeOut = setTimeout(() => {
              setisAdded(false);
               setclickOnAddToCart(false);
            }, 5000);
          }
        }
        else {
          setNotEligibility(true);
          setTimeout(() => {
            setNotEligibility(false);
            setisAdded(false);
            setclickOnAddToCart(false);
          }, 3000);
        }
      
        handelShowCart();
  };
    const addCartOneElig = (selectedProduct) => {
    addToCart(selectedProduct);
    setisAdded(true);

 }
   const handelChooseEligibility = (event) => {
    const Text = Eligibility.filter(a => a.YDESC === event.currentTarget.innerText)[0].CATEGORY;
    CurrentProduct.eligibility = Text;
    Eligibility.filter(a => a.CATEGORY === Text)[0].QTY -= selectedProduct.quantity;
    addToCart(CurrentProduct);
    setclickOnAddToCart(false);
    clearTimeout(timeOut);
    handelShowCart(); 
  }

  // Add the product to the cart
  // const productaddToCart = useCallback(() => {
  //   setclickOnAddToCart(true);

  //   const selectedProduct = {
  //     image,
  //     name,
  //     matnr,
  //     price,
  //     id,
  //     quantity: productQuantity,
  //     category,
  //   };

  //   // Filter eligibility
  //   const validEligibilities = Eligibility.filter(
  //     (eligibility) =>
  //       YDESERVE_TYPE.includes(eligibility.CATEGORY) &&
  //       eligibility.QTY >= productQuantity
  //   );

  //   if (validEligibilities.length > 0) {
  //     addToCart(selectedProduct);
  //     setisAdded(true);
  //   } else {
  //     setNotEligibility(true);
  //   }
  //   handelShowCart();
  // }, [
  //   image,
  //   name,
  //   matnr,
  //   price,
  //   id,
  //   productQuantity,
  //   category,
  //   YDESERVE_TYPE,
  //   Eligibility,
  //   addToCart,
  //   handelShowCart,
  // ]);









    let clicked = clickOnAddToCart;
  let pimage = image;
  let pname = name;
  let pprice = price;
  let pmatnr = matnr;
  let pid = id;
  let pcategory = category;
  let pquantity = productQuantity;
  // Quick view handler


  const handelselectedEligibility = (EligibilitiesList) => {

    return (
      <div className="Eligibility">
        {
          setListOfEligibilities(
            EligibilitiesList.map(
              zacaut => {
                if (zacaut.QTY >= selectedProduct.quantity)
                  return (
                    <button className="eligibilityInput" key={zacaut.YDESC} onClick={handelChooseEligibility} >{zacaut.YDESC}</button>
                  )
              }
            )
          )
        }
      </div>
    )
  }









  const quickView = useCallback(() => {
    const quickViewProduct = {
      image,
      name,
      price,
      id,
    };
    openModal(quickViewProduct);
  }, [image, name, price, id, openModal]);

  return (
        <div className={!clicked ? "product" : "product onclickedDiv"}>
          {!NotEligibility && <div className={!clicked ? "onclickedDiv" : "Eligibilities"}>
            {ListOfEligibilities.length > 0 && <h2>בחר זכאות</h2>}
            <div className="eligibility">
              {ListOfEligibilities}
            </div>
          </div>}
          {NotEligibility && <div>
            <input className="noEligibilty" defaultValue="אין זכאויות למוצר זה"></input>
          </div>}
          <div>
            <div className={!clicked ? "product-image img " : "onclickedimg"}>
    
              <img
                className="imageProduct"
                src={pimage}
                alt={pname}
                onClick={() => quickView(
                  pimage,
                  pname,
                  pprice,
                  pid,
                  pquantity,
                  pcategory
                )}
              />
            </div>
    
    
          </div>
         
          <h4 className="product-name">{pname}</h4>
          <p className="product-price">{pprice}</p>
         
          <div className="product-action">
    
            <button
              className={clicked ? !isAdded ? "btnNotEli" : "added" : !isAdded ? "myAddCartButton" : "added"}
              type="mybutton"  
              onClick={() => productaddToCart(
                pimage,
                pname,
                pmatnr,
                pprice,
                pid,
                pquantity,
                pcategory
              )}
            >
              {!isAdded ? <img src={shoppingBasket} className="imageCart"></img> : "✔"}
            </button>
          </div>
        </div>
      );
});

export default Product;




// export default function Product(props) {
//   const {
//     addToCart,
//     handelsetcategoriesOnChoose,
//     image,
//     name,
//     matnr,
//     price,
//     id,
//     ClearChoose,
//     setClearChoose,
//      handelShowCart,
//      YDESERVE_TYPE,
//    // Catalog,
//     category,
//     productQuantity,
//     openModal,
//     Eligibility,
//         autoAdd, // New prop to indicate auto-add


    
//   } = props;
//   const [clickOnAddToCart, setclickOnAddToCart] = useState(false);
//   const [isAdded, setisAdded] = useState(false);
//   const [isMouseInside, setisMouseInside] = useState(false);
//   const [IsFromProduct, setIsFromProduct] = useState(true);
//   const [NotEligibility, setNotEligibility] = useState(null);
//   const [ListOfEligibilities, setListOfEligibilities] = useState([]);
 
//   let timeOut;
//   let CurrentProduct_l;
//   let selectedProduct;
//   let CurrentProduct;
//   const handelbtnClicked = (e) => {
//     setclickOnAddToCart(true);
//   };

//   // console.log(`Product rendered: ${name}`,autoAdd);
//   //  console.log(`Catalog: ${Catalog}`);
//   //console.log(`YDESERVE_TYPE: ${YDESERVE_TYPE}`);
//   useEffect(() => {
   
//       if (autoAdd) {
//        console.log(`Auto-add is enabled for product: ${name} (ID: ${id})`);
      
     
     
//       productaddToCart(id, name, matnr, price, id, productQuantity, category);
//       // setisAdded(true);
//     }
//      if (ClearChoose) {
//         setclickOnAddToCart(false);
//         setNotEligibility(false);
//         setisAdded(false);
//       }
//       setClearChoose(false);
  
//     }, [autoAdd, name ,id]);

//   const productaddToCart = (fimage, fname, fmatnr,fprice, fid, fquantity, fcategory) => {
//     //handelShowCart();
//     setclickOnAddToCart(true);
//      selectedProduct = ({
//       image: fimage,
//       name: fname,
//       matnr : fmatnr,
//       price: fprice,
//       id: fid,
//       quantity: fquantity,
//       category: fcategory
//     });

//     CurrentProduct = selectedProduct;
//     // let currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
//     // if (Catalog.length > 1) {
//     //   currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
    
//     // }
//     // else {
//     //   currProduct = Catalog[0];
//     //   // isAdded(true)
//     // }
//    // CurrentProduct_l = currProduct;
//     const Eligibilities = YDESERVE_TYPE;
//      let EligibilitiesList = [];
//     for (let i = 0; i < Eligibilities.length; i++) {
//       for (let j = 0; j < Eligibility.length; j++) {
//         if (Eligibilities[i] === Eligibility[j].CATEGORY && Eligibility[j].QTY >= selectedProduct.quantity)
//           EligibilitiesList.push(Eligibility[j]);
//       }
//     }



//     if (EligibilitiesList.length > 0) {
//       if (EligibilitiesList.length === 1) {
//         let count = Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY;
//         if (count >= selectedProduct.quantity) {
//          selectedProduct.eligibility = EligibilitiesList[0].CATEGORY;
          
//           Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY -= selectedProduct.quantity;
//           setListOfEligibilities([]);
//           addCartOneElig(selectedProduct);
//           setTimeout(() => {
//             setisAdded(false);
//             setNotEligibility(null);
//             setclickOnAddToCart(false);
//           }, 1000);
//         }
//       }
//       else {
//         setNotEligibility(false);
//         handelselectedEligibility(EligibilitiesList);
//         timeOut = setTimeout(() => {
//           setisAdded(false);
//            setclickOnAddToCart(false);
//         }, 1000);
//       }
//     }
//     else {
//       setNotEligibility(true);
//       setTimeout(() => {
//         setNotEligibility(false);
//         setisAdded(false);
//         setclickOnAddToCart(false);
//       }, 1000);
//     }
  
//     handelShowCart();   
//   }

//   const checkEligibility = (value) => {

//   }

//   const handelChooseEligibility = (event) => {
//     const Text = Eligibility.filter(a => a.YDESC === event.currentTarget.innerText)[0].CATEGORY;
//     CurrentProduct.eligibility = Text;
//     Eligibility.filter(a => a.CATEGORY === Text)[0].QTY -= selectedProduct.quantity;
//     addToCart(CurrentProduct);
//     setclickOnAddToCart(false);
//     clearTimeout(timeOut);
//     handelShowCart(); 
//   }

//   const addCartOneElig = (selectedProduct) => {
//     addToCart(selectedProduct);
//    // setisAdded(true);

//  }


//   const handelselectedEligibility = (EligibilitiesList) => {

//     return (
//       <div className="Eligibility">
//         {
//           setListOfEligibilities(
//             EligibilitiesList.map(
//               zacaut => {
//                 if (zacaut.QTY >= selectedProduct.quantity)
//                   return (
//                     <button className="eligibilityInput" key={zacaut.YDESC} onClick={handelChooseEligibility} >{zacaut.YDESC}</button>
//                   )
//               }
//             )
//           )
//         }
//       </div>
//     )
//   }

//   const quickView = (qimage, qname, qprice, qid) => {

//     let quickViewProduct = {
//       image: qimage,
//       name: qname,
//       price: qprice,
//       id: qid
//     };

//     NotEligibility === null && openModal(quickViewProduct);
//   }

//   let IsFree = false;
//   let IsAnHlf = false;
//   let IsAnRe = false;
//   let IsWine = false;

//   let clicked = clickOnAddToCart;
//   let pimage = image;
//   let pname = name;
//   let pprice = price;
//   let pmatnr = matnr;
//   let pid = id;
//   let pcategory = category;
//   let pquantity = productQuantity;
//   switch (pcategory) {
//     case "vegetables":
//       IsFree = true
//       break;
//     case "fruits":
//       IsAnHlf = true
//       break;
//     case "fruits":
//       IsAnRe = true
//       break;
//     case "nuts":
//       IsWine = true
//       break;

//   }
//   return (
//     <div className={!clicked ? "product" : "product onclickedDiv"}>
//       {!NotEligibility && <div className={!clicked ? "onclickedDiv" : "Eligibilities"}>
//         {ListOfEligibilities.length > 0 && <h2>בחר זכאות</h2>}
//         <div className="eligibility">
//           {ListOfEligibilities}
//         </div>
//       </div>}
//       {NotEligibility && <div>
//         <input className="noEligibilty" defaultValue="אין זכאויות למוצר זה"></input>
//       </div>}
//       <div>
//         <div className={!clicked ? "product-image img " : "onclickedimg"}>

//           <img
//             className="imageProduct"
//             src={pimage}
//             alt={pname}
//             onClick={() => quickView(
//               pimage,
//               pname,
//               pprice,
//               pid,
//               pquantity,
//               pcategory
//             )}
//           />
//         </div>


//       </div>
     
//       <h4 className="product-name">{pname}</h4>
//       <p className="product-price">{pprice}</p>
     
//       <div className="product-action">

//         <button
//           className={clicked ? !isAdded ? "btnNotEli" : "added" : !isAdded ? "myAddCartButton" : "added"}
//           type="mybutton"  
//           onClick={() => productaddToCart(
//             pimage,
//             pname,
//             pmatnr,
//             pprice,
//             pid,
//             pquantity,
//             pcategory
//           )}
//         >
//           {!isAdded ? <img src={shoppingBasket} className="imageCart"></img> : "✔"}
//         </button>
//       </div>
//     </div>
//   );
// }



