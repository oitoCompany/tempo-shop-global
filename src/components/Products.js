import React, { useState, useEffect, useRef ,useMemo} from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import categoryProperty from './categoryProperty';
import axios from 'axios';
import e from "cors";

export default function Products(props) {
  const {
    searchTerm,
    productsList,
    SearchingFor,
    handelswSearchingFor,
    categoryTerm,
    handelShowCart,
    Eligibility,
    categoriesList,
    categoriesList1,
    handelsetcategoriesOnChoose,
    addToCart,
    productQuantity,
    updateQuantity,
    ClearChoose,
    setClearChoose,
    Catalog,
    openModal
  } = props;
  const [IsFromKCategories, setIsFromKCategories] = useState(true);

  // let productsData;
  let categoriesListItems;
  let term = searchTerm;
  
  const filteredProducts = useMemo(() => {
    if (!productsList || productsList.length === 0) return [];

    return productsList
    // .filter((product) => {
    //   const matchesSearchTerm =
    //     !searchTerm ||
    //     product.MAKTX.includes(searchTerm) ||
    //     product.EAN11.includes(searchTerm);

    //   const matchesCategory =
    //     categoryTerm.length === 0 || categoryTerm.includes(product.YCODE_CAT);

    //   return matchesSearchTerm && matchesCategory;
    // });
  }, [productsList, searchTerm, categoryTerm]);



  const handleChoose = (event) => {
    handelswSearchingFor(event);
  }
  const autoAdd = useMemo(() => filteredProducts.length === 1, [filteredProducts]);


  useEffect(() => {
    // console.log("productsList:", productsList);
    // console.log("searchTerm:", searchTerm);
    // console.log("categoryTerm:", categoryTerm);
  }, [productsList, searchTerm, categoryTerm]);

  const equals = (a) => {
    return (x => x.YCODE_CAT == a);
  }



  //  categoriesListItems = useMemo(() => {
  //   return Object.keys(categoriesList1).map((key) => {
  //     const category = categoriesList1[key];
  //     return (
  //       <div
  //         key={category.YCODE_CAT}
  //         className={`divCategory ${
  //           categoryTerm.includes(category.YCODE_CAT) ? "choosedCategory" : ""
  //         }`}
  //         onClick={() => handleChoose(category.YCODE_CAT)}
  //       >
  //         {category.YCODE_CAT_DESC}
  //       </div>
  //     );
  //   });
  // }, [categoriesList1, categoryTerm, handelsetcategoriesOnChoose]);


  let categoryview;
  categoriesListItems = Object.keys(categoriesList1).map(category => {
    return (
      <div className={categoriesList.length > 0 && categoriesList.filter(categoryItem => categoryItem === categoriesList1[category].YCODE_CAT).length > 0 ?
        "divCategory choosedCategory" : "divCategory"} key={categoriesList1[category].YCODE_CAT} onClick={handleChoose}>
        {categoriesList1[category].YCODE_CAT_DESC}

      </div>

    )
  })

  //  const searchingCategory = (categoryID) => {
  //     if (categoryID.length > 0) {
  //       return (x) => categoryID.map(e => e).includes(x.YCODE_CAT);
  //     }
  //     console.log(x ,"searchingCategory rachel" )
  //     return (x) => x;

  //   }
 
  // const searchingCategory = (categoryID) => {
  //   if (categoryID && categoryID.length > 0) {
  //     // Filter products by category if there's a selection
  //     return (x) => categoryID.includes(x.YCODE_CAT);
  //   }
  //   // Return a function that does not filter when there's no selection
  //   return () => true;
  // };
  // const searchingFor = (term) => {
  //   return function (x) {
  //    // console.log(term, searchingFor, "rachel")
  //     return (x.MAKTX.includes(term) || !term) || (x.EAN11.includes(term) || !term);

  //   };

  // }
// let autoAdd = false;
//   const filteredProducts =
// //  productsList.length > 1 ?
 
//      productsList
//   //  .filter(
  //        SearchingFor === "term"
  //      ?  searchingFor(term)
  //       :  searchingCategory(categoryTerm)
  //   )
  //  : productsList 
// 
    // if(filteredProducts.length === 1){
    //   autoAdd = true; 
    
    // }
// Map the filtered products into Product components

const productsData = useMemo(() => {
  
  return filteredProducts.map((product) => (
    <Product
   key={`${product.EAN11}-${product.MATNR}`}
  // key={product.EAN11}
    setClearChoose={setClearChoose}
      ClearChoose={ClearChoose}
      Eligibility={Eligibility}
      handelShowCart={handelShowCart}
      matnr={product.MATNR}
      price={product.YPRICE_NETO_TAX}
      name={product.MAKTX}
      image={product.YFILE}
      id={product.EAN11}
      YDESERVE_TYPE={product.YDESERVE_TYPE}
      addToCart={addToCart}
      productQuantity={productQuantity}
      updateQuantity={updateQuantity}
      openModal={openModal}
      category={product.YCODE_CAT}
      autoAdd={autoAdd}
    />
  ));
}, [
  filteredProducts,
  setClearChoose,
  ClearChoose,
  Eligibility,
  handelShowCart,
  addToCart,
  productQuantity,
  updateQuantity,
  openModal,
  autoAdd,
]);

// Determine the view based on the state of filtered products
const view = useMemo(() => {
  if (filteredProducts.length === 0 && searchTerm) return <NoResults />;
  if (filteredProducts.length === 0) return <LoadingProducts />;
  return (
    <CSSTransitionGroup
      transitionName="fadeIn"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      component="div"
      className="products"
    >
      {productsData}
    </CSSTransitionGroup>
  );
}, [filteredProducts, searchTerm, productsData]);

// Debugging logs
useEffect(() => {
  // console.log("Filtered Products:", filteredProducts);
  // console.log("Search Term:", searchTerm);
  // console.log("Category Term:", categoryTerm);
}, [filteredProducts, searchTerm, categoryTerm]);

return (
  <div className="products-wrapper">
    <div className="flex">
      <div className="categories">{categoriesListItems}</div>
      <div>{view}</div>
    </div>
  </div>
);
}