import React, { useState, useEffect, useRef, useContext, Suspense } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import Counter from "./components/Counter";
import EmptyCart from "./empty-states/EmptyCart";
import "./scss/style.scss";
import LogIn from "./components/LogIn";
import CancelOrder from "./components/CancelOrder";
import Cart from './components/Cart';
import { useTranslation } from 'react-i18next';
import './i18n';
import EligibilitiesPage from "./components/EligibilitiesPage";
import LogOut from "./components/LogOut";
import CreateOrder from "./components/CreateOrder";

function MyComponent() {
    const { t, i18next } = useTranslation();
    const currentLang = window.location.pathname.match(/^\/([\w]{2})\//);

    return (
        <React.Fragment>
            <h1>{t("hello")}</h1>
            <h1>{t("hello")}</h1>
            <h1>{t("login")}</h1>
        </React.Fragment>
    )
}
export default function App() {
    const [isCartWinVisible, setisCartWinVisible] = useState(false);
    const [logInActive, setlogInActive] = useState(true);
    const [logOut, setlogOut] = useState(false);
    const [EligibilitiesPageActive, setEligibilitiesPageActive] = useState(false);
    const [products, setproducts] = useState([]);
    const [employees, setemployees] = useState({});
    const [cart, setcart] = useState([]);
    const [disabled, setdisabled] = useState(false);
    const [totalItems, settotalItems] = useState(0);
    const [isout, setisout] = useState(false);
    const [totalAmount, settotalAmount] = useState(0);
    const [swSearchingFor, setswSearchingFor] = useState("term");
    const [term, setterm] = useState("");
    const [category, setcategory] = useState("");
    const [categories, setcategories] = useState([]);
    const [cartBounce, setcartBounce] = useState(false);
    const [quantity, setquantity] = useState(1);
    const [quickViewProduct, setquickViewProduct] = useState({});
    const [modalActive, setmodalActive] = useState(false);
    const [value, setvalue] = useState(1);
    const [EmployeeTag, setEmployeeTag] = useState("");
    const [EmployeeName, setEmployeeName] = useState("");
    const [view, setview] = useState();
    const [showCart, setshowCart] = useState(false);
    const [categoriesOnChoose, setcategoriesOnChoose] = useState([]);
    const [categoriesList, setcategoriesList] = useState([]);
    const [Eligibility, setEligibility] = useState({});
    const [categoriesList1, setcategoriesList1] = useState({});
    const [lblError, setlblError] = useState("");
    const [Catalog, setCatalog] = useState([]);
    const [ClearChoose, setClearChoose] = useState(false);
    const [CreateActive, setCreateActive] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [ReturnS, setReturnS] = useState(false);
    const [isCancelOrder, setisCancelOrder] = useState(false);
    const [message, setmessage] = useState("");
    const [ProductTable, setProductTable] = useState([]);
    const [loading, setloading] = useState(false);
    const [Response1, setResponse1] = useState({});
    const [txtOrderNum, settxtOrderNum] = useState("");
    const [isEnableBTN, setisEnableBTN] = useState(false);
    const [isPower, setisPower] = useState(false);
    const [Categoriestosend, setCategoriestosend] = useState([]);
    const zakot = [
        {
            "CATEGORY": "W",
            "YDESC": "חיוב יינות ברקן",
            "QTY": 4.50,
            "NIZUL_CODE": "0739",
            "PERCENTAGE": 0,
            "KUNNR": "0000609015"
        },
        {
            "CATEGORY": "P",
            "YDESC": "חיוב משקאות פרנו",
            "QTY": 12.00,
            "NIZUL_CODE": "0740",
            "PERCENTAGE": 0,
            "KUNNR": "0000609013"
        },
        {
            "CATEGORY": "B",
            "YDESC": "ניצול תלושי ב",
            "QTY": 4.00,
            "NIZUL_CODE": "9Q73",
            "PERCENTAGE": 0,
            "KUNNR": "0000609011"
        },
        {
            "CATEGORY": "A",
            "YDESC": "ניצול תלושי א",
            "QTY": 30.00,
            "NIZUL_CODE": "9QT3",
            "PERCENTAGE": 1.00,
            "KUNNR": "0000609001"
        }
    ]

    const data = [
        {
            "MATNR": "000000000007005025",
            "EAN11": "4066600999614",
            "MAKTX": "פאולנר 500 מ\"ל בקבוק 20 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4066600999614.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 130.89,
            "YPRICE_TAX": 22.25,
            "YPRICE_NETO_TAX": 153.14
        },
        {
            "MATNR": "000000000007005217",
            "EAN11": "7501049936945",
            "MAKTX": "בירה סול בקבוק 330 מ\"ל שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007005217.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 96.23,
            "YPRICE_TAX": 16.36,
            "YPRICE_NETO_TAX": 112.59
        },
        {
            "MATNR": "000000000007005521",
            "EAN11": "7290010237678",
            "MAKTX": "היינקן אלומיניום ח\"פ 330 בקבוק 24 יח'",
            // "YFILE": "",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 102.57,
            "YPRICE_TAX": 17.44,
            "YPRICE_NETO_TAX": 120.01
        },
        {
            "MATNR": "000000000007001048",
            "EAN11": "5010677554398",
            "MAKTX": "בקרדי בריזר אבטיח 275 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001048.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000007001047",
            "EAN11": "5010677552387",
            "MAKTX": "בקרדי בריזר אננס 275 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001047.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000007001046",
            "EAN11": "5010677551281",
            "MAKTX": "בקרדי בריזר לימון 275 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001046.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000007003652",
            "EAN11": "5010677552387",
            "MAKTX": "בקרדי בריזר אננס 275 כשל\"פ בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007003652.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000003005398",
            "EAN11": "7290000136653",
            "MAKTX": "דיאט נשר מאלט 1.5 ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005398.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 47.95,
            "YPRICE_TAX": 8.15,
            "YPRICE_NETO_TAX": 56.10
        },
        {
            "MATNR": "000000000007003551",
            "EAN11": "5010677551397",
            "MAKTX": "בקרדי בריזר ליים 275 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5010677551397.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000007007499",
            "EAN11": "8712000051099",
            "MAKTX": "היינקן 0.0 כשר ח\"פ 330 מ\"ל בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007499.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 74.62,
            "YPRICE_TAX": 12.69,
            "YPRICE_NETO_TAX": 87.31
        },
        {
            "MATNR": "000000000003005379",
            "EAN11": "7290000136646",
            "MAKTX": "נשר מאלט 1.5 ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005379.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 47.95,
            "YPRICE_TAX": 8.15,
            "YPRICE_NETO_TAX": 56.10
        },
        {
            "MATNR": "000000000007008755",
            "EAN11": "7610113011652",
            "MAKTX": "בקרדי בריזר תפוח 275 מ\"ל בק' 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007008755.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000003005048",
            "EAN11": "7290008464673",
            "MAKTX": "גולדסטאר SLOW BREW פחית 500 מ\"ל 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005048.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 92.06,
            "YPRICE_TAX": 15.65,
            "YPRICE_NETO_TAX": 107.71
        },
        {
            "MATNR": "000000000003004786",
            "EAN11": "7290008464734",
            "MAKTX": "גולדסטאר SLOW BREW ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004786.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 77.61,
            "YPRICE_TAX": 13.20,
            "YPRICE_NETO_TAX": 90.81
        },
        {
            "MATNR": "000000000003004536",
            "EAN11": "7290008464697",
            "MAKTX": "מכבי חזקה 7.9% ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004536.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 70.97,
            "YPRICE_TAX": 12.07,
            "YPRICE_NETO_TAX": 83.04
        },
        {
            "MATNR": "000000000003004447",
            "EAN11": "7290008464024",
            "MAKTX": "גולדסטאר לא מסונן פחית 500 מ\"ל 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004447.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 92.06,
            "YPRICE_TAX": 15.65,
            "YPRICE_NETO_TAX": 107.71
        },
        {
            "MATNR": "000000000003004380",
            "EAN11": "7290010237784",
            "MAKTX": "שנדי לימון ליים 330 מ\"ל בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004380.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 66.00,
            "YPRICE_TAX": 11.22,
            "YPRICE_NETO_TAX": 77.22
        },
        {
            "MATNR": "000000000003004378",
            "EAN11": "7290011133375",
            "MAKTX": "שנדי אפרסק 330 מ\"ל בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004378.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 66.00,
            "YPRICE_TAX": 11.22,
            "YPRICE_NETO_TAX": 77.22
        },
        {
            "MATNR": "000000000003004376",
            "EAN11": "7290011133368",
            "MAKTX": "שנדי תפוח 330 מ\"ל בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004376.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 66.00,
            "YPRICE_TAX": 11.22,
            "YPRICE_NETO_TAX": 77.22
        },
        {
            "MATNR": "000000000003004336",
            "EAN11": "7290008464130",
            "MAKTX": "גולדסטאר לא מסונן ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004336.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 77.61,
            "YPRICE_TAX": 13.20,
            "YPRICE_NETO_TAX": 90.81
        },
        {
            "MATNR": "000000000003001595",
            "EAN11": "7290008464468",
            "MAKTX": "גולדסטאר 500 פחית 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003001595.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 85.21,
            "YPRICE_TAX": 14.49,
            "YPRICE_NETO_TAX": 99.70
        },
        {
            "MATNR": "000000000003001588",
            "EAN11": "7290008464741",
            "MAKTX": "גולדסטאר ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003001588.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 71.79,
            "YPRICE_TAX": 12.21,
            "YPRICE_NETO_TAX": 84.00
        },
        {
            "MATNR": "000000000003001539",
            "EAN11": "7290008464703",
            "MAKTX": "מכבי ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003001539.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 68.01,
            "YPRICE_TAX": 11.57,
            "YPRICE_NETO_TAX": 79.58
        },
        {
            "MATNR": "000000000003003336",
            "EAN11": "7290006764485",
            "MAKTX": "נשר מאלט ח\"פ 330 בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003003336.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 53.00,
            "YPRICE_TAX": 9.01,
            "YPRICE_NETO_TAX": 62.01
        },
        {
            "MATNR": "000000000003002139",
            "EAN11": "7290008464796",
            "MAKTX": "היינקן ח\"פ 330 מ\"ל בקבוק שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002139.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 98.11,
            "YPRICE_TAX": 16.68,
            "YPRICE_NETO_TAX": 114.79
        },
        {
            "MATNR": "000000000007011723",
            "EAN11": "5010677554398",
            "MAKTX": "בקרדי בריזר אבטיח 275 כשל\"פ בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5010677554398.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 164.14,
            "YPRICE_TAX": 27.91,
            "YPRICE_NETO_TAX": 192.05
        },
        {
            "MATNR": "000000000003001566",
            "EAN11": "7290006229588",
            "MAKTX": "איגל זהב 500 פחית 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003001566.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 58.39,
            "YPRICE_TAX": 9.93,
            "YPRICE_NETO_TAX": 68.32
        },
        {
            "MATNR": "000000000007002779",
            "EAN11": "7290005896415",
            "MAKTX": "איגל ירוק 500 מ\"ל פחית 24 יח'- יוון",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002779.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "10",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 58.39,
            "YPRICE_TAX": 9.93,
            "YPRICE_NETO_TAX": 68.32
        },
        {
            "MATNR": "000000000007002942",
            "EAN11": "5900685000188",
            "MAKTX": "וודקה וויברובה אקסוויזיט 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002942.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 66.37,
            "YPRICE_TAX": 11.28,
            "YPRICE_NETO_TAX": 77.65
        },
        {
            "MATNR": "000000000007003911",
            "EAN11": "4603928004042",
            "MAKTX": "בלוגה נובל וודקה 1.5 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928004042.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 231.83,
            "YPRICE_TAX": 39.41,
            "YPRICE_NETO_TAX": 271.24
        },
        {
            "MATNR": "000000000007003913",
            "EAN11": "4603928004127",
            "MAKTX": "בלוגה נובל וודקה 3 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928004127.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 552.85,
            "YPRICE_TAX": 93.98,
            "YPRICE_NETO_TAX": 646.83
        },
        {
            "MATNR": "000000000007004035",
            "EAN11": "5000299609347",
            "MAKTX": "וויסקי גלנליווט פאונדרס ריזרב 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299609347.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 123.15,
            "YPRICE_TAX": 20.93,
            "YPRICE_NETO_TAX": 144.08
        },
        {
            "MATNR": "000000000007004320",
            "EAN11": "5000299604717",
            "MAKTX": "בלנטיינ'ס הארד פיירד 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299604717.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 80.54,
            "YPRICE_TAX": 13.69,
            "YPRICE_NETO_TAX": 94.23
        },
        {
            "MATNR": "000000000007004394",
            "EAN11": "4603928004158",
            "MAKTX": "בלוגה גולד ליין אריזת עור 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928004158.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 209.41,
            "YPRICE_TAX": 35.60,
            "YPRICE_NETO_TAX": 245.01
        },
        {
            "MATNR": "000000000007004436",
            "EAN11": "7312040211012",
            "MAKTX": "אבסולוט אליקס 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7312040211012.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 86.98,
            "YPRICE_TAX": 14.78,
            "YPRICE_NETO_TAX": 101.76
        },
        {
            "MATNR": "000000000007004437",
            "EAN11": "7312040217014",
            "MAKTX": "אבסולוט אליקס 700 מ\"ל 42.3%",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7312040217014.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 50.35,
            "YPRICE_TAX": 8.56,
            "YPRICE_NETO_TAX": 58.91
        },
        {
            "MATNR": "000000000007004705",
            "EAN11": "5000299607091",
            "MAKTX": "סקאפה סקירן סינגל מאלט 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007004705.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 189.87,
            "YPRICE_TAX": 32.27,
            "YPRICE_NETO_TAX": 222.14
        },
        {
            "MATNR": "000000000007004706",
            "EAN11": "3047100017849",
            "MAKTX": "אברלור 12 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/3047100017849.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 159.96,
            "YPRICE_TAX": 27.19,
            "YPRICE_NETO_TAX": 187.15
        },
        {
            "MATNR": "000000000007004883",
            "EAN11": "4603928004363",
            "MAKTX": "בלוגה טרנסאטלנטיק וודקה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007004883.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 109.15,
            "YPRICE_TAX": 18.55,
            "YPRICE_NETO_TAX": 127.70
        },
        {
            "MATNR": "000000000007004947",
            "EAN11": "5010739261523",
            "MAKTX": "אברלור אבונה- 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5010739261523.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 305.85,
            "YPRICE_TAX": 51.99,
            "YPRICE_NETO_TAX": 357.84
        },
        {
            "MATNR": "000000000007004948",
            "EAN11": "5000299298022",
            "MAKTX": "אברלור 16 שנה- 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299298022.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 273.31,
            "YPRICE_TAX": 46.46,
            "YPRICE_NETO_TAX": 319.77
        },
        {
            "MATNR": "000000000007005075",
            "EAN11": "42213277",
            "MAKTX": " ג'ין מנקי 47 500 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/42213277.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 155.74,
            "YPRICE_TAX": 26.47,
            "YPRICE_NETO_TAX": 182.21
        },
        {
            "MATNR": "000000000007005081",
            "EAN11": "5000299609200",
            "MAKTX": "וויסקי גלנליווט נאדורה פירסט פיל 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299609200.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 198.95,
            "YPRICE_TAX": 33.82,
            "YPRICE_NETO_TAX": 232.77
        },
        {
            "MATNR": "000000000007005082",
            "EAN11": "5000299612712",
            "MAKTX": "וויסקי גלנליווט סייפר 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299612712.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 296.06,
            "YPRICE_TAX": 50.33,
            "YPRICE_NETO_TAX": 346.39
        },
        {
            "MATNR": "000000000007005085",
            "EAN11": "5000299609248",
            "MAKTX": "וויסקי גלנליווט נאדורה אולורוסו 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299609248.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 198.95,
            "YPRICE_TAX": 33.82,
            "YPRICE_NETO_TAX": 232.77
        },
        {
            "MATNR": "000000000007002968",
            "EAN11": "7312040060702",
            "MAKTX": "אבסולוט  וניליה (וניל) 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002968.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 58.28,
            "YPRICE_TAX": 9.90,
            "YPRICE_NETO_TAX": 68.18
        },
        {
            "MATNR": "000000000007003909",
            "EAN11": "3890000781095",
            "MAKTX": "בלוגה נובל וודקה 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928000983.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 120.49,
            "YPRICE_TAX": 20.48,
            "YPRICE_NETO_TAX": 140.97
        },
        {
            "MATNR": "000000000007003905",
            "EAN11": "4603928000976",
            "MAKTX": "בלוגה נובל וודקה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928000976.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 94.39,
            "YPRICE_TAX": 16.04,
            "YPRICE_NETO_TAX": 110.43
        },
        {
            "MATNR": "000000000007003666",
            "EAN11": "7290000023410",
            "MAKTX": "ליקר שטוק גלה קפה 18% 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023410.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007003665",
            "EAN11": "7290000023427",
            "MAKTX": "ליקר שטוק אמרטו 18% 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023427.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007003664",
            "EAN11": "7290000023434",
            "MAKTX": "ליקר שטוק וישניאק 18% 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023434.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007003663",
            "EAN11": "7290000023465",
            "MAKTX": "ליקר שטוק בננה  18% 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023465.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007003662",
            "EAN11": "7290000023472",
            "MAKTX": "ליקר שטוק טריפל סק  18% 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023472.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007003618",
            "EAN11": "7290000024899",
            "MAKTX": "קגלביץ' אסאי 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024899.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 27.17,
            "YPRICE_TAX": 4.61,
            "YPRICE_NETO_TAX": 31.78
        },
        {
            "MATNR": "000000000007003599",
            "EAN11": "8594405105429",
            "MAKTX": "ליקר בחרובקה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8594405105429.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 70.56,
            "YPRICE_TAX": 11.99,
            "YPRICE_NETO_TAX": 82.55
        },
        {
            "MATNR": "000000000007003001",
            "EAN11": "5000299284926",
            "MAKTX": "שיבאס ריגאל 25 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007003001.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 856.54,
            "YPRICE_TAX": 145.61,
            "YPRICE_NETO_TAX": 1002.15
        },
        {
            "MATNR": "000000000007003400",
            "EAN11": "7290000023007",
            "MAKTX": "ברנדי שטוק 84  37 %  750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023007.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 49.12,
            "YPRICE_TAX": 8.35,
            "YPRICE_NETO_TAX": 57.47
        },
        {
            "MATNR": "000000000007003261",
            "EAN11": "5000299611104",
            "MAKTX": "שיבאס ריגאל אקסטרה 700 מל 40%",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299611104.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 101.00,
            "YPRICE_TAX": 17.17,
            "YPRICE_NETO_TAX": 118.17
        },
        {
            "MATNR": "000000000007003002",
            "EAN11": "5000299211557",
            "MAKTX": "רויאל סאלוט 38 שנה דסטיני 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299211557.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 2266.42,
            "YPRICE_TAX": 385.23,
            "YPRICE_NETO_TAX": 2651.65
        },
        {
            "MATNR": "000000000007003215",
            "EAN11": "080432402146",
            "MAKTX": "טקילה אולמקה גולד 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/80432402146.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 85.87,
            "YPRICE_TAX": 14.59,
            "YPRICE_NETO_TAX": 100.46
        },
        {
            "MATNR": "000000000007003191",
            "EAN11": "5010106113493",
            "MAKTX": "וויסקי בלנטיינ'ס 200 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5010106113493.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 21.41,
            "YPRICE_TAX": 3.64,
            "YPRICE_NETO_TAX": 25.05
        },
        {
            "MATNR": "000000000007003031",
            "EAN11": "5000299605004",
            "MAKTX": "ביפאיטר ג'ין 24 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299605004.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 117.08,
            "YPRICE_TAX": 19.90,
            "YPRICE_NETO_TAX": 136.98
        },
        {
            "MATNR": "000000000007003172",
            "EAN11": "5000299603017",
            "MAKTX": "וויסקי פור רוזס סינגל בארל 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299603017.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 141.45,
            "YPRICE_TAX": 24.04,
            "YPRICE_NETO_TAX": 165.49
        },
        {
            "MATNR": "000000000007003170",
            "EAN11": "5000299101100",
            "MAKTX": "וויסקי פור רוזס ילו לייבל 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299101100.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 70.73,
            "YPRICE_TAX": 12.02,
            "YPRICE_NETO_TAX": 82.75
        },
        {
            "MATNR": "000000000007003167",
            "EAN11": "5000299284865",
            "MAKTX": "וויסקי פור רוזס סמול באץ' 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299284865.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 94.31,
            "YPRICE_TAX": 16.03,
            "YPRICE_NETO_TAX": 110.34
        },
        {
            "MATNR": "000000000007003147",
            "EAN11": "5000299606728",
            "MAKTX": "וויסקי בלנטיינ'ס 500 מ\"ל (ארוז 12 )",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299606728.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 51.54,
            "YPRICE_TAX": 8.76,
            "YPRICE_NETO_TAX": 60.30
        },
        {
            "MATNR": "000000000007005086",
            "EAN11": "5000299295328",
            "MAKTX": "וויסקי גלנליווט נאדורה פיטד 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299295328.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 198.95,
            "YPRICE_TAX": 33.82,
            "YPRICE_NETO_TAX": 232.77
        },
        {
            "MATNR": "000000000007012006",
            "EAN11": "5011007024000",
            "MAKTX": "וויסקי ג'יימסון בלאק בארל 40% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5011007024000.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 123.63,
            "YPRICE_TAX": 21.01,
            "YPRICE_NETO_TAX": 144.64
        },
        {
            "MATNR": "000000000007011733",
            "EAN11": "080432402931",
            "MAKTX": "וויסקי שיבאס ריגאל 12 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007011733.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 84.20,
            "YPRICE_TAX": 14.31,
            "YPRICE_NETO_TAX": 98.51
        },
        {
            "MATNR": "000000000007010748",
            "EAN11": "80432115251",
            "MAKTX": "טקילה אולמקה סילבר 700 מ\"ל 35%",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007010748.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 72.27,
            "YPRICE_TAX": 12.28,
            "YPRICE_NETO_TAX": 84.55
        },
        {
            "MATNR": "000000000007010660",
            "EAN11": "80432115305",
            "MAKTX": "טקילה אולמקה גולד 700 מ\"ל 35%",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007010660.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 85.87,
            "YPRICE_TAX": 14.59,
            "YPRICE_NETO_TAX": 100.46
        },
        {
            "MATNR": "000000000007010472",
            "EAN11": "080432400432",
            "MAKTX": "וויסקי שיבאס ריגאל 12 שנה 1 ליטר 2022",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007010472.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 109.32,
            "YPRICE_TAX": 18.58,
            "YPRICE_NETO_TAX": 127.90
        },
        {
            "MATNR": "000000000007009726",
            "EAN11": "7290000135991",
            "MAKTX": "ערק נח 12 לימונים 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009726.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 55.35,
            "YPRICE_TAX": 9.41,
            "YPRICE_NETO_TAX": 64.76
        },
        {
            "MATNR": "000000000007009724",
            "EAN11": "7290000135984",
            "MAKTX": "ערק נח 12 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009724.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 64.66,
            "YPRICE_TAX": 10.99,
            "YPRICE_NETO_TAX": 75.65
        },
        {
            "MATNR": "000000000007009352",
            "EAN11": "5000329002193",
            "MAKTX": "ביפאיטר ג'ין 700 מל 2021",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009352.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 66.58,
            "YPRICE_TAX": 11.31,
            "YPRICE_NETO_TAX": 77.89
        },
        {
            "MATNR": "000000000007009248",
            "EAN11": "8501110080231",
            "MAKTX": "רום הוואנה קלאב 3 שנים 700 מ\"ל כשר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009248.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 85.50,
            "YPRICE_TAX": 14.53,
            "YPRICE_NETO_TAX": 100.03
        },
        {
            "MATNR": "000000000007009190",
            "EAN11": "5000299620915",
            "MAKTX": "אברלור 14 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009190.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 239.80,
            "YPRICE_TAX": 40.76,
            "YPRICE_NETO_TAX": 280.56
        },
        {
            "MATNR": "000000000007008932",
            "EAN11": "80432403105",
            "MAKTX": "וויסקי גלנליווט 18 שנה 700 מ\"ל 40%",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007008932.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 320.54,
            "YPRICE_TAX": 54.49,
            "YPRICE_NETO_TAX": 375.03
        },
        {
            "MATNR": "000000000007007533",
            "EAN11": "7290000023083",
            "MAKTX": "ערק אשקלון 700 מ\"ל כהל מקומי",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007533.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 36.71,
            "YPRICE_TAX": 6.24,
            "YPRICE_NETO_TAX": 42.95
        },
        {
            "MATNR": "000000000007007474",
            "EAN11": "5000299605950",
            "MAKTX": "ביפאיטר ג'ין פינק 37% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007474.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 73.20,
            "YPRICE_TAX": 12.44,
            "YPRICE_NETO_TAX": 85.64
        },
        {
            "MATNR": "000000000007005758",
            "EAN11": "5000299622049",
            "MAKTX": "וויסקי שיבאס XV ריגאל 15 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007005758.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 129.21,
            "YPRICE_TAX": 21.96,
            "YPRICE_NETO_TAX": 151.17
        },
        {
            "MATNR": "000000000007005749",
            "EAN11": "5000299607176",
            "MAKTX": "סקאפה גלאנסה סינגל מאלט 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007005749.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 197.71,
            "YPRICE_TAX": 33.61,
            "YPRICE_NETO_TAX": 231.32
        },
        {
            "MATNR": "000000000007005729",
            "EAN11": "633824000095",
            "MAKTX": "ואן גוך אננס 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824000095.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005728",
            "EAN11": "633824141194",
            "MAKTX": "ואן גוך אפרסק 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824141194.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005724",
            "EAN11": "633824702098",
            "MAKTX": "ואן גוך אסאי 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824702098.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005723",
            "EAN11": "633824000149",
            "MAKTX": "ואן גוך מלון 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824000149.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005721",
            "EAN11": "633824139191",
            "MAKTX": "ואן גוך קרמל 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824139191.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005720",
            "EAN11": "633824141125",
            "MAKTX": "ואן גוך אפרסק 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824141125.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007005718",
            "EAN11": "633824141101",
            "MAKTX": "ואן גוך אפרסק 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824141101.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007005715",
            "EAN11": "633824139108",
            "MAKTX": "ואן גוך קרמל 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824139108.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007005713",
            "EAN11": "633824204882",
            "MAKTX": "ואן גוך דאבל אספרסו 50 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824204882.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 125.83,
            "YPRICE_TAX": 21.39,
            "YPRICE_NETO_TAX": 147.22
        },
        {
            "MATNR": "000000000007005640",
            "EAN11": "5201304100013",
            "MAKTX": "אוזו מיני 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5201304100013.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 48.61,
            "YPRICE_TAX": 8.26,
            "YPRICE_NETO_TAX": 56.87
        },
        {
            "MATNR": "000000000007005509",
            "EAN11": "3890000781255",
            "MAKTX": "בלוגה טראנסאטלנטיק וודקה 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928005551.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 138.64,
            "YPRICE_TAX": 23.56,
            "YPRICE_NETO_TAX": 162.20
        },
        {
            "MATNR": "000000000007005431",
            "EAN11": "7290015350242",
            "MAKTX": "ברנדי שטוק 84 דבש 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015350242.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 49.12,
            "YPRICE_TAX": 8.35,
            "YPRICE_NETO_TAX": 57.47
        },
        {
            "MATNR": "000000000007005421",
            "EAN11": "5000299601693",
            "MAKTX": "שיבאס ריגאל מיזונארה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299601693.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 142.55,
            "YPRICE_TAX": 24.23,
            "YPRICE_NETO_TAX": 166.78
        },
        {
            "MATNR": "000000000007005419",
            "EAN11": "5000299613252",
            "MAKTX": "וויסקי בלנטיינ'ס מילטונדוף 15 שנה 700 מל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299613252.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 142.98,
            "YPRICE_TAX": 24.30,
            "YPRICE_NETO_TAX": 167.28
        },
        {
            "MATNR": "000000000007005405",
            "EAN11": "5000299613238",
            "MAKTX": "וויסקי בלנטיינ'ס גלנבורגי 15 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299613238.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 142.98,
            "YPRICE_TAX": 24.30,
            "YPRICE_NETO_TAX": 167.28
        },
        {
            "MATNR": "000000000007005396",
            "EAN11": "5000299225004",
            "MAKTX": "שיבאס ריגאל 18 שנה 700 מ\"ל 2017",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299225004.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 175.91,
            "YPRICE_TAX": 29.90,
            "YPRICE_NETO_TAX": 205.81
        },
        {
            "MATNR": "000000000007005341",
            "EAN11": "4603928005438",
            "MAKTX": "בלוגה נובל וודקה 6 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928005438.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 936.78,
            "YPRICE_TAX": 159.25,
            "YPRICE_NETO_TAX": 1096.03
        },
        {
            "MATNR": "000000000007005201",
            "EAN11": "4603928004455",
            "MAKTX": "וודקה בלוגה 375 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4603928004455.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 51.30,
            "YPRICE_TAX": 8.72,
            "YPRICE_NETO_TAX": 60.02
        },
        {
            "MATNR": "000000000007005189",
            "EAN11": "5011007003548",
            "MAKTX": "וויסקי  ג'יימסון קרסטד 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5011007003548.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 113.24,
            "YPRICE_TAX": 19.25,
            "YPRICE_NETO_TAX": 132.49
        },
        {
            "MATNR": "000000000007005139",
            "EAN11": "5000299603376",
            "MAKTX": "וויסקי סטרת'יילה 12 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299603376.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 129.86,
            "YPRICE_TAX": 22.07,
            "YPRICE_NETO_TAX": 151.93
        },
        {
            "MATNR": "000000000007005138",
            "EAN11": "5000299611524",
            "MAKTX": "וויסקי שיבאס אולטיס 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299611524.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 427.59,
            "YPRICE_TAX": 72.69,
            "YPRICE_NETO_TAX": 500.28
        },
        {
            "MATNR": "000000000007005109",
            "EAN11": "5000299602065",
            "MAKTX": "וויסקי לונגמורן דיסטילר צ'ויס 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5000299602065.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 253.25,
            "YPRICE_TAX": 43.05,
            "YPRICE_NETO_TAX": 296.30
        },
        {
            "MATNR": "000000000007005108",
            "EAN11": "80432106037",
            "MAKTX": "טקילה אלטוס פלטה 38% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/80432106037.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 105.88,
            "YPRICE_TAX": 18.00,
            "YPRICE_NETO_TAX": 123.88
        },
        {
            "MATNR": "000000000007005107",
            "EAN11": "80432107621",
            "MAKTX": "טקילה אביון סילבר 40% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/80432107621.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 140.28,
            "YPRICE_TAX": 23.84,
            "YPRICE_NETO_TAX": 164.12
        },
        {
            "MATNR": "000000000007005106",
            "EAN11": "80432107409",
            "MAKTX": "טקילה אביון אנייחו 40% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/80432107409.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 180.28,
            "YPRICE_TAX": 30.64,
            "YPRICE_NETO_TAX": 210.92
        },
        {
            "MATNR": "000000000007005105",
            "EAN11": "80432105528",
            "MAKTX": "טקילה אלטוס רפוסאדו 38% 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/80432105528.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 116.28,
            "YPRICE_TAX": 19.76,
            "YPRICE_NETO_TAX": 136.04
        },
        {
            "MATNR": "000000000007005091",
            "EAN11": "4976881520592",
            "MAKTX": "וויסקי יפני אוואי טראדישאן 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4976881520592.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 116.91,
            "YPRICE_TAX": 19.87,
            "YPRICE_NETO_TAX": 136.78
        },
        {
            "MATNR": "000000000007002860",
            "EAN11": "7312040017683",
            "MAKTX": "אבסולוט וודקה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002860.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 51.89,
            "YPRICE_TAX": 8.82,
            "YPRICE_NETO_TAX": 60.71
        },
        {
            "MATNR": "000000000007002123",
            "EAN11": "5011007003005",
            "MAKTX": "וויסקי ג'יימסון 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002123.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 71.61,
            "YPRICE_TAX": 12.17,
            "YPRICE_NETO_TAX": 83.78
        },
        {
            "MATNR": "000000000007002428",
            "EAN11": "3376370097108",
            "MAKTX": "סופר קאסיס 700 מל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/3376370097108.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 47.78,
            "YPRICE_TAX": 8.12,
            "YPRICE_NETO_TAX": 55.90
        },
        {
            "MATNR": "000000000007002124",
            "EAN11": "5011007003227",
            "MAKTX": "וויסקי ג'יימסון 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002124.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 91.68,
            "YPRICE_TAX": 15.58,
            "YPRICE_NETO_TAX": 107.26
        },
        {
            "MATNR": "000000000007002280",
            "EAN11": "7290005020162",
            "MAKTX": "וויסקי בלנטיינ'ס פיינסט 700 מל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002280.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 58.24,
            "YPRICE_TAX": 9.90,
            "YPRICE_NETO_TAX": 68.14
        },
        {
            "MATNR": "000000000007002275",
            "EAN11": "080432402825",
            "MAKTX": "וויסקי גלנליווט 12 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002275.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 146.90,
            "YPRICE_TAX": 24.97,
            "YPRICE_NETO_TAX": 171.87
        },
        {
            "MATNR": "000000000007002243",
            "EAN11": "8501110080439",
            "MAKTX": "רום הוואנה אנייחו 7 שנים 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002243.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 106.81,
            "YPRICE_TAX": 18.15,
            "YPRICE_NETO_TAX": 124.96
        },
        {
            "MATNR": "000000000007002140",
            "EAN11": "7312040017034",
            "MAKTX": "אבסולוט וודקה 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002140.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 72.54,
            "YPRICE_TAX": 12.33,
            "YPRICE_NETO_TAX": 84.87
        },
        {
            "MATNR": "000000000007002178",
            "EAN11": "7312040017072",
            "MAKTX": "אבסולוט וודקה 500 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002178.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 38.70,
            "YPRICE_TAX": 6.57,
            "YPRICE_NETO_TAX": 45.27
        },
        {
            "MATNR": "000000000007002181",
            "EAN11": "7312040017508",
            "MAKTX": "אבסולוט מיני וודקה 50 מ\"ל תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002181.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 80.71,
            "YPRICE_TAX": 13.72,
            "YPRICE_NETO_TAX": 94.43
        },
        {
            "MATNR": "000000000007002242",
            "EAN11": "3047100090309",
            "MAKTX": "פרנו 40% - 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002242.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 105.73,
            "YPRICE_TAX": 17.97,
            "YPRICE_NETO_TAX": 123.70
        },
        {
            "MATNR": "000000000007002241",
            "EAN11": "3047100097209",
            "MAKTX": "פסטיס 51 (45%) - 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002241.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 112.51,
            "YPRICE_TAX": 19.12,
            "YPRICE_NETO_TAX": 131.63
        },
        {
            "MATNR": "000000000007002240",
            "EAN11": "5000299608005",
            "MAKTX": "פליימות ג'ין 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002240.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 93.16,
            "YPRICE_TAX": 15.83,
            "YPRICE_NETO_TAX": 108.99
        },
        {
            "MATNR": "000000000007002238",
            "EAN11": "7610594252148",
            "MAKTX": "ליקר קלואה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002238.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 62.94,
            "YPRICE_TAX": 10.70,
            "YPRICE_NETO_TAX": 73.64
        },
        {
            "MATNR": "000000000007002232",
            "EAN11": "80432400340",
            "MAKTX": "שיבאס ריגאל מיני 12 שנה 50 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002232.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 133.32,
            "YPRICE_TAX": 22.66,
            "YPRICE_NETO_TAX": 155.98
        },
        {
            "MATNR": "000000000007002230",
            "EAN11": "5000299211243",
            "MAKTX": "וויסקי רויאל סלוט 21 שנה שיבאס 700",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002230.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 355.97,
            "YPRICE_TAX": 60.51,
            "YPRICE_NETO_TAX": 416.48
        },
        {
            "MATNR": "000000000007002229",
            "EAN11": "5000299226421",
            "MAKTX": "וויסקי גלנליווט 25 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002229.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 1095.35,
            "YPRICE_TAX": 186.21,
            "YPRICE_NETO_TAX": 1281.56
        },
        {
            "MATNR": "000000000007002227",
            "EAN11": "5000299226216",
            "MAKTX": "וויסקי גלנליווט 21 שנה ארכיב 700",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002227.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 762.91,
            "YPRICE_TAX": 129.69,
            "YPRICE_NETO_TAX": 892.60
        },
        {
            "MATNR": "000000000007002224",
            "EAN11": "5000299295021",
            "MAKTX": "וויסקי גלנליווט 15 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002224.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 194.11,
            "YPRICE_TAX": 32.99,
            "YPRICE_NETO_TAX": 227.10
        },
        {
            "MATNR": "000000000007002208",
            "EAN11": "5011007015381",
            "MAKTX": "וויסקי ג'יימסון 18 לימיטד רזרב 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5011007015381.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 337.40,
            "YPRICE_TAX": 57.35,
            "YPRICE_NETO_TAX": 394.75
        },
        {
            "MATNR": "000000000007002209",
            "EAN11": "5011007021610",
            "MAKTX": "וויסקי ג'יימסון גולד 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5011007021610.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 337.40,
            "YPRICE_TAX": 57.35,
            "YPRICE_NETO_TAX": 394.75
        },
        {
            "MATNR": "000000000007002213",
            "EAN11": "5010106110225",
            "MAKTX": "וויסקי בלנטיינ'ס 12 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002213.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 85.58,
            "YPRICE_TAX": 14.54,
            "YPRICE_NETO_TAX": 100.12
        },
        {
            "MATNR": "000000000007002215",
            "EAN11": "5010106111956",
            "MAKTX": "וויסקי בלנטיינ'ס פיינסט 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002215.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 80.53,
            "YPRICE_TAX": 13.69,
            "YPRICE_NETO_TAX": 94.22
        },
        {
            "MATNR": "000000000007002221",
            "EAN11": "5010106113912",
            "MAKTX": "וויסקי בלנטיינ'ס מיני 50 מ\"ל תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5010106113912.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 97.11,
            "YPRICE_TAX": 16.51,
            "YPRICE_NETO_TAX": 113.62
        },
        {
            "MATNR": "000000000007002218",
            "EAN11": "5010106110386",
            "MAKTX": "וויסקי בלנטיינ'ס 21 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002218.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 303.87,
            "YPRICE_TAX": 51.65,
            "YPRICE_NETO_TAX": 355.52
        },
        {
            "MATNR": "000000000007001234",
            "EAN11": "7290000024905",
            "MAKTX": "קגלביץ' קלאסיקה 40% 700 מ\"ל כהל יבוא",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024905.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 36.68,
            "YPRICE_TAX": 6.23,
            "YPRICE_NETO_TAX": 42.91
        },
        {
            "MATNR": "000000000007001278",
            "EAN11": "633824111852",
            "MAKTX": "ואן גוך אננס 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001278.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007001282",
            "EAN11": "633824408020",
            "MAKTX": "ואן גוך דאבל אספרסו 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001282.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007001525",
            "EAN11": "7290000023441",
            "MAKTX": "ליקר שטוק שוקולד 750 מ\"ל 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023441.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 31.35,
            "YPRICE_TAX": 5.33,
            "YPRICE_NETO_TAX": 36.68
        },
        {
            "MATNR": "000000000007001816",
            "EAN11": "633824110435",
            "MAKTX": "ואן גוך אסאי 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001816.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007001817",
            "EAN11": "633824332141",
            "MAKTX": "ואן גוך רימונים 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001817.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007001834",
            "EAN11": "633824913432",
            "MAKTX": "ואן גוך אסאי 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001834.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007001835",
            "EAN11": "633824111838",
            "MAKTX": "ואן גוך אננס 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001835.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007001836",
            "EAN11": "633824102201",
            "MAKTX": "ואן גוך מלון 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001836.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007001841",
            "EAN11": "633824102225",
            "MAKTX": "ואן גוך מלון 1 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001841.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 108.20,
            "YPRICE_TAX": 18.39,
            "YPRICE_NETO_TAX": 126.59
        },
        {
            "MATNR": "000000000007001896",
            "EAN11": "633824208040",
            "MAKTX": "ואן גוך דאבל אספרסו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001896.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007001897",
            "EAN11": "633824929532",
            "MAKTX": "ואן גוך רימון 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/633824929532.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007001954",
            "EAN11": "7290000024967",
            "MAKTX": "קגלביץ' פאוור אספרסו 23% 700",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024967.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 27.17,
            "YPRICE_TAX": 4.61,
            "YPRICE_NETO_TAX": 31.78
        },
        {
            "MATNR": "000000000007002500",
            "EAN11": "3163937187460",
            "MAKTX": "ריקארד 45% 700 מ\"ל כשר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002500.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.25,
            "YPRICE_TAX": 15.34,
            "YPRICE_NETO_TAX": 105.59
        },
        {
            "MATNR": "000000000007002580",
            "EAN11": "7312040217502",
            "MAKTX": "אבסולוט אליקס 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7312040217502.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 57.19,
            "YPRICE_TAX": 9.72,
            "YPRICE_NETO_TAX": 66.91
        },
        {
            "MATNR": "000000000007002066",
            "EAN11": "633824139122",
            "MAKTX": "ואן גוך קרמל 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002066.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 90.73,
            "YPRICE_TAX": 15.42,
            "YPRICE_NETO_TAX": 106.15
        },
        {
            "MATNR": "000000000007002661",
            "EAN11": "5010106110126",
            "MAKTX": "וויסקי בלנטיינ'ס 17 שנה 700 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002661.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "20",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 166.16,
            "YPRICE_TAX": 28.24,
            "YPRICE_NETO_TAX": 194.40
        },
        {
            "MATNR": "000000000003005382",
            "EAN11": "7290000136783",
            "MAKTX": "מירינדה 1.5 ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005382.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 22.88,
            "YPRICE_TAX": 3.89,
            "YPRICE_NETO_TAX": 26.77
        },
        {
            "MATNR": "000000000003005384",
            "EAN11": "7290000136691",
            "MAKTX": "סבן אפ 1.5 ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005384.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 22.88,
            "YPRICE_TAX": 3.89,
            "YPRICE_NETO_TAX": 26.77
        },
        {
            "MATNR": "000000000003005386",
            "EAN11": "7290000136769",
            "MAKTX": "פפסי 1.5 שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005386.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 22.88,
            "YPRICE_TAX": 3.89,
            "YPRICE_NETO_TAX": 26.77
        },
        {
            "MATNR": "000000000003005247",
            "EAN11": "7290010237531",
            "MAKTX": "פפסי 500 בקבוק 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005247.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 28.63,
            "YPRICE_TAX": 4.86,
            "YPRICE_NETO_TAX": 33.49
        },
        {
            "MATNR": "000000000007004823",
            "EAN11": "7290106577848",
            "MAKTX": "נסטי אפרסק 1.5 ליטר - שישייה חסום",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290106577848.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 20.35,
            "YPRICE_TAX": 3.46,
            "YPRICE_NETO_TAX": 23.81
        },
        {
            "MATNR": "000000000003005481",
            "EAN11": "7290000136523",
            "MAKTX": "ג'אמפ אקסטרה פרוט ענבים 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005481.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005482",
            "EAN11": "7290000136585",
            "MAKTX": "ג'אמפ אקסטרה פרוט תפוזים 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005482.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005387",
            "EAN11": "7290000136776",
            "MAKTX": "פפסי ZERO 1.5 שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005387.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 22.88,
            "YPRICE_TAX": 3.89,
            "YPRICE_NETO_TAX": 26.77
        },
        {
            "MATNR": "000000000003005410",
            "EAN11": "7290000136752",
            "MAKTX": "סבן אפ 1.5 ליטר ZERO שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005410.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 22.88,
            "YPRICE_TAX": 3.89,
            "YPRICE_NETO_TAX": 26.77
        },
        {
            "MATNR": "000000000007004892",
            "EAN11": "8005217176557",
            "MAKTX": "נסטי ענבים 1.5 ליטר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8005217176557.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 20.35,
            "YPRICE_TAX": 3.46,
            "YPRICE_NETO_TAX": 23.81
        },
        {
            "MATNR": "000000000003005480",
            "EAN11": "7290000136431",
            "MAKTX": "ג'אמפ אקסטרה פרוט אפרסק 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005480.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005483",
            "EAN11": "7290000136561",
            "MAKTX": "ג'אמפ אקסטרה פרוט תות בננה 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005483.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005484",
            "EAN11": "7290000136516",
            "MAKTX": "ג'אמפ אקסטרה פרוט מנגו פסיפלורה 1.5תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005484.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005485",
            "EAN11": "7290000136608",
            "MAKTX": "ג'אמפ אקסטרה פרוט תפוחים 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005485.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005486",
            "EAN11": "7290000136455",
            "MAKTX": "ג'אמפ אקסטרה פרוט אשכול 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005486.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005487",
            "EAN11": "7290000136486",
            "MAKTX": "ג'אמפ דיאט אשכוליות 1.5 תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005487.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.74,
            "YPRICE_TAX": 7.26,
            "YPRICE_NETO_TAX": 50.00
        },
        {
            "MATNR": "000000000003005051",
            "EAN11": "7290010822096",
            "MAKTX": "סיידר תפוח מוגז 275 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005051.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 59.30,
            "YPRICE_TAX": 10.09,
            "YPRICE_NETO_TAX": 69.39
        },
        {
            "MATNR": "000000000007008916",
            "EAN11": "8001620015636",
            "MAKTX": "סן בנדטו פרוטה מיקס פירות 400 מל 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007008916.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.58,
            "YPRICE_TAX": 7.24,
            "YPRICE_NETO_TAX": 49.82
        },
        {
            "MATNR": "000000000003004843",
            "EAN11": "5902198160403",
            "MAKTX": "TEN XL ללא סוכר 250 מ\"ל פחית 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003004843.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 49.75,
            "YPRICE_TAX": 8.46,
            "YPRICE_NETO_TAX": 58.21
        },
        {
            "MATNR": "000000000007008912",
            "EAN11": "8001620015612",
            "MAKTX": "סן בנדטו פרוטה גזר תפוז לימון 400 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007008912.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 42.58,
            "YPRICE_TAX": 7.24,
            "YPRICE_NETO_TAX": 49.82
        },
        {
            "MATNR": "000000000003003372",
            "EAN11": "5906485301012",
            "MAKTX": "XL 250 מ\"ל פחית 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009621.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 49.75,
            "YPRICE_TAX": 9.01,
            "YPRICE_NETO_TAX": 58.76
        },
        {
            "MATNR": "000000000007003408",
            "EAN11": "5035766044673",
            "MAKTX": "סיידר תפוחים סטרונגבאו 330 בקבוק 24",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/5035766044673.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 114.45,
            "YPRICE_TAX": 19.46,
            "YPRICE_NETO_TAX": 133.91
        },
        {
            "MATNR": "000000000007009809",
            "EAN11": "7290011133634",
            "MAKTX": "פפסי ZERO פחית צרה 330 שישייה ח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009809.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 46.39,
            "YPRICE_TAX": 7.89,
            "YPRICE_NETO_TAX": 54.28
        },
        {
            "MATNR": "000000000007009829",
            "EAN11": "7290000136875",
            "MAKTX": "סן בנדטו מוגז 1.5 ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009829.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 19.55,
            "YPRICE_TAX": 3.32,
            "YPRICE_NETO_TAX": 22.87
        },
        {
            "MATNR": "000000000007009905",
            "EAN11": "7290000327020",
            "MAKTX": "פפסי 330 פחית צרה שישייה ח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009905.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 46.39,
            "YPRICE_TAX": 7.89,
            "YPRICE_NETO_TAX": 54.28
        },
        {
            "MATNR": "000000000007009906",
            "EAN11": "7290000327037",
            "MAKTX": "מירינדה פחית צרה 330 שישייה ח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009906.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 46.39,
            "YPRICE_TAX": 7.89,
            "YPRICE_NETO_TAX": 54.28
        },
        {
            "MATNR": "000000000007009907",
            "EAN11": "7290000327044",
            "MAKTX": "סבן אפ פחית צרה 330 שישייה ח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009907.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 46.39,
            "YPRICE_TAX": 7.89,
            "YPRICE_NETO_TAX": 54.28
        },
        {
            "MATNR": "000000000007009925",
            "EAN11": "7290000135182",
            "MAKTX": "סבן אפ ZERO פחית צרה 330 שישייה ח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009925.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 46.39,
            "YPRICE_TAX": 7.89,
            "YPRICE_NETO_TAX": 54.28
        },
        {
            "MATNR": "000000000003002048",
            "EAN11": "7290006764034",
            "MAKTX": "סבן אפ 330 מ\"ל ZERO בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002048.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 50.70,
            "YPRICE_TAX": 8.62,
            "YPRICE_NETO_TAX": 59.32
        },
        {
            "MATNR": "000000000003002047",
            "EAN11": "7290006764027",
            "MAKTX": "סבן אפ 330 מ\"ל בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002047.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 50.70,
            "YPRICE_TAX": 8.62,
            "YPRICE_NETO_TAX": 59.32
        },
        {
            "MATNR": "000000000003002046",
            "EAN11": "7290006764010",
            "MAKTX": "פפסי ZERO 330 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002046.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 50.70,
            "YPRICE_TAX": 8.62,
            "YPRICE_NETO_TAX": 59.32
        },
        {
            "MATNR": "000000000003002045",
            "EAN11": "7290006764041",
            "MAKTX": "מירינדה 330 מ\"ל בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002045.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 50.70,
            "YPRICE_TAX": 8.62,
            "YPRICE_NETO_TAX": 59.32
        },
        {
            "MATNR": "000000000003002044",
            "EAN11": "7290006764003",
            "MAKTX": "פפסי 330 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003002044.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 50.70,
            "YPRICE_TAX": 8.62,
            "YPRICE_NETO_TAX": 59.32
        },
        {
            "MATNR": "000000000003001711",
            "EAN11": "7290000336282",
            "MAKTX": "סיידר תפוח צלול 330 בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003001711.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "30",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 69.94,
            "YPRICE_TAX": 11.89,
            "YPRICE_NETO_TAX": 81.83
        },
        {
            "MATNR": "000000000007001059",
            "EAN11": "7290010822430",
            "MAKTX": "סן בנדטו זכוכית 1 ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001059.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 55.30,
            "YPRICE_TAX": 9.40,
            "YPRICE_NETO_TAX": 64.70
        },
        {
            "MATNR": "000000000007009828",
            "EAN11": "7290000136868",
            "MAKTX": "סן בנדטו 1.5 ליטר שישייה פק",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007009828.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 11.34,
            "YPRICE_TAX": 1.93,
            "YPRICE_NETO_TAX": 13.27
        },
        {
            "MATNR": "000000000007002020",
            "EAN11": "7290006229427",
            "MAKTX": "סן בנדטו 500 מ\"ל 4 שישיות",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002020.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 36.70,
            "YPRICE_TAX": 6.24,
            "YPRICE_NETO_TAX": 42.94
        },
        {
            "MATNR": "000000000007002504",
            "EAN11": "8001620011935",
            "MAKTX": "סן בנדטו מוגז 500 מ\"ל 4 שישיות",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002504.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 36.70,
            "YPRICE_TAX": 6.24,
            "YPRICE_NETO_TAX": 42.94
        },
        {
            "MATNR": "000000000007005373",
            "EAN11": "8001620017456",
            "MAKTX": "סן בנדטו פקק ספורט 500 מ\"ל 4 שישיות",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8001620017456.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 41.00,
            "YPRICE_TAX": 6.97,
            "YPRICE_NETO_TAX": 47.97
        },
        {
            "MATNR": "000000000007003148",
            "EAN11": "7290005896637",
            "MAKTX": "סן בנדטו 1.5 ליטר תריסר (חנות טמפו)",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290005896637.jpg",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 21.46,
            "YPRICE_TAX": 3.64,
            "YPRICE_NETO_TAX": 25.10
        },
        {
            "MATNR": "000000000007003216",
            "EAN11": "7290008464543",
            "MAKTX": "סן בנדטו מוגז 1.5 ליטר תריסר (חנות טמפו)",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290008464543.jpg",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "40",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 23.26,
            "YPRICE_TAX": 3.95,
            "YPRICE_NETO_TAX": 27.21
        },
        {
            "MATNR": "000000000007007735",
            "EAN11": "73490132865",
            "MAKTX": "מיץ ענבים קדם קונקורד 240 מ\"ל 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007735.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 4.05,
            "YPRICE_TAX": 0.68,
            "YPRICE_NETO_TAX": 4.73
        },
        {
            "MATNR": "000000000007001219",
            "EAN11": "7290000521381",
            "MAKTX": "זני של סגל קברנה ומרלו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000521381.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.56,
            "YPRICE_TAX": 2.30,
            "YPRICE_NETO_TAX": 15.86
        },
        {
            "MATNR": "000000000007001176",
            "EAN11": "7290000521350",
            "MAKTX": "זני של סגל קברנה סוביניון 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001176.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.56,
            "YPRICE_TAX": 2.30,
            "YPRICE_NETO_TAX": 15.86
        },
        {
            "MATNR": "000000000007001161",
            "EAN11": "7290000521367",
            "MAKTX": "זני של סגל מרלו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000521367.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.56,
            "YPRICE_TAX": 2.30,
            "YPRICE_NETO_TAX": 15.86
        },
        {
            "MATNR": "000000000007007743",
            "EAN11": "73490151934",
            "MAKTX": "מיץ ענבים קדם קונקורד 650 מ\"ל 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007743.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 10.82,
            "YPRICE_TAX": 1.84,
            "YPRICE_NETO_TAX": 12.66
        },
        {
            "MATNR": "000000000007011785",
            "EAN11": "7290019220190",
            "MAKTX": "מארז אלטיטיוד 624 קברנה סוביניון 2021",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290019220190.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 70.04,
            "YPRICE_TAX": 11.90,
            "YPRICE_NETO_TAX": 81.94
        },
        {
            "MATNR": "000000000007001153",
            "EAN11": "7290000521015",
            "MAKTX": "סגל לבן יבש 750 מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001153.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.64,
            "YPRICE_TAX": 2.31,
            "YPRICE_NETO_TAX": 15.95
        },
        {
            "MATNR": "000000000007007694",
            "EAN11": "7290017589770",
            "MAKTX": "סגל לבאנט ארגמן 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290017589770.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 20.76,
            "YPRICE_TAX": 3.53,
            "YPRICE_NETO_TAX": 24.29
        },
        {
            "MATNR": "000000000007005496",
            "EAN11": "7290015350402",
            "MAKTX": "רזרב מוסקט ורוד 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015350402.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007007745",
            "EAN11": "73490128134",
            "MAKTX": "מיץ ענבים קדם לבן 650 מ\"ל 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007745.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 10.82,
            "YPRICE_TAX": 1.84,
            "YPRICE_NETO_TAX": 12.66
        },
        {
            "MATNR": "000000000007007747",
            "EAN11": "73490130427",
            "MAKTX": "מיץ ענבים קדם קונקורד לייט 650 מ\"ל 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007747.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 10.82,
            "YPRICE_TAX": 1.84,
            "YPRICE_NETO_TAX": 12.66
        },
        {
            "MATNR": "000000000007010706",
            "EAN11": "7290015350136",
            "MAKTX": "פלטינום קברנה סוביניון 750 מ\"ל שישית",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007010706.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 41.51,
            "YPRICE_TAX": 7.05,
            "YPRICE_NETO_TAX": 48.56
        },
        {
            "MATNR": "000000000007007748",
            "EAN11": "73490153396",
            "MAKTX": "מיץ ענבים קדם מוגז קונקורד 750 מ\"ל 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007748.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.83,
            "YPRICE_TAX": 2.35,
            "YPRICE_NETO_TAX": 16.18
        },
        {
            "MATNR": "000000000007007749",
            "EAN11": "73490128493",
            "MAKTX": "מיץ ענבים קדם מוגז אפרסק 750 מ\"ל 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007749.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.83,
            "YPRICE_TAX": 2.35,
            "YPRICE_NETO_TAX": 16.18
        },
        {
            "MATNR": "000000000007007750",
            "EAN11": "73490153556",
            "MAKTX": "מיץ ענבים קדם קונקורד 946 מ\"ל 12 12 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007750.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 12.32,
            "YPRICE_TAX": 2.09,
            "YPRICE_NETO_TAX": 14.41
        },
        {
            "MATNR": "000000000007005748",
            "EAN11": "7290017589190",
            "MAKTX": "אלטיטיוד 720+ קברנה סוביניון 2014",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290017589190.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 70.04,
            "YPRICE_TAX": 11.90,
            "YPRICE_NETO_TAX": 81.94
        },
        {
            "MATNR": "000000000007005740",
            "EAN11": "7290017589374",
            "MAKTX": "Free Run שרדונה 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290017589374.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007007757",
            "EAN11": "7290017589831",
            "MAKTX": "סופרייר קברנה סוביניון 750 מ\"ל 2016",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290017589831.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 141.71,
            "YPRICE_TAX": 24.09,
            "YPRICE_NETO_TAX": 165.80
        },
        {
            "MATNR": "000000000007007821",
            "EAN11": "73490153624",
            "MAKTX": "מיץ ענבים קונקורד 1.5 ליטר 8 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/73490153624.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 19.76,
            "YPRICE_TAX": 3.36,
            "YPRICE_NETO_TAX": 23.12
        },
        {
            "MATNR": "000000000007001152",
            "EAN11": "7290000521008",
            "MAKTX": "סגל אדום יבש  750 מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001152.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.64,
            "YPRICE_TAX": 2.31,
            "YPRICE_NETO_TAX": 15.95
        },
        {
            "MATNR": "000000000007007860",
            "EAN11": "7290017589923",
            "MAKTX": "FREE RUN גוורצטרמינר 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290017589923.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007008750",
            "EAN11": "7290000135267",
            "MAKTX": "יין חנות דירוג א",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000135267.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 5.99,
            "YPRICE_TAX": 1.01,
            "YPRICE_NETO_TAX": 7.00
        },
        {
            "MATNR": "000000000007008751",
            "EAN11": "7290000135274",
            "MAKTX": "יין חנות דירוג ב",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000135274.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 10.26,
            "YPRICE_TAX": 1.74,
            "YPRICE_NETO_TAX": 12.00
        },
        {
            "MATNR": "000000000007009783",
            "EAN11": "7290019220596",
            "MAKTX": "ברקן מוסקטו 2023 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290019220596.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 24.68,
            "YPRICE_TAX": 4.19,
            "YPRICE_NETO_TAX": 28.87
        },
        {
            "MATNR": "000000000007008752",
            "EAN11": "7290000135281",
            "MAKTX": "יין חנות דירוג ג",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000135281.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 17.10,
            "YPRICE_TAX": 2.90,
            "YPRICE_NETO_TAX": 20.00
        },
        {
            "MATNR": "000000000007008753",
            "EAN11": "7290000135304",
            "MAKTX": "יין חנות דירוג ד",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000135304.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 29.92,
            "YPRICE_TAX": 5.08,
            "YPRICE_NETO_TAX": 35.00
        },
        {
            "MATNR": "000000000007003922",
            "EAN11": "7290000024578",
            "MAKTX": "אסמבלאז' צפית 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024578.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007002881",
            "EAN11": "7290000024202",
            "MAKTX": "רזרב קברנה סוביניון 750 מ\"ל  12 יח בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002881.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007002900",
            "EAN11": "7290012576355",
            "MAKTX": "ספיישל רזרב פטי ורדו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576355.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007002901",
            "EAN11": "7290012576348",
            "MAKTX": "ספיישל רזרב שרדונה 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002901.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007002911",
            "EAN11": "8410644611210",
            "MAKTX": "קאווה איבריקה לבן חצי יבש 750 מ\"ל 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002911.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 17.83,
            "YPRICE_TAX": 3.03,
            "YPRICE_NETO_TAX": 20.86
        },
        {
            "MATNR": "000000000007002912",
            "EAN11": "8410644611203",
            "MAKTX": "קאווה איבריקה לבן יבש 750 מ\"ל 12 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8410644611203.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 17.83,
            "YPRICE_TAX": 3.03,
            "YPRICE_NETO_TAX": 20.86
        },
        {
            "MATNR": "000000000007002921",
            "EAN11": "7290012576393",
            "MAKTX": "ספיישל רזרב שיראז 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576393.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007002922",
            "EAN11": "7290012576362",
            "MAKTX": "ספיישל רזרב קברנה סוביניון 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002922.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007003735",
            "EAN11": "7290015348089",
            "MAKTX": "למברוסקו ביאנקו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015348089.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 15.29,
            "YPRICE_TAX": 2.60,
            "YPRICE_NETO_TAX": 17.89
        },
        {
            "MATNR": "000000000007003525",
            "EAN11": "7290015348072",
            "MAKTX": "למברוסקו אמיליאנו אדום 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015348072.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 15.29,
            "YPRICE_TAX": 2.60,
            "YPRICE_NETO_TAX": 17.89
        },
        {
            "MATNR": "000000000007003524",
            "EAN11": "7290015348096",
            "MAKTX": "למברוסקו אמיליאנו  רוזה 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015348096.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 15.29,
            "YPRICE_TAX": 2.60,
            "YPRICE_NETO_TAX": 17.89
        },
        {
            "MATNR": "000000000007002355",
            "EAN11": "7290000023953",
            "MAKTX": "קלאסיק פטיט סירה 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023953.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007002490",
            "EAN11": "7290000521411",
            "MAKTX": "מרום גליל מרלו סינגל 750 מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002490.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.52,
            "YPRICE_TAX": 3.14,
            "YPRICE_NETO_TAX": 21.66
        },
        {
            "MATNR": "000000000007002491",
            "EAN11": "7290000521404",
            "MAKTX": "מרום גליל קברנה סוביניון סינגל 750 בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002491.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.52,
            "YPRICE_TAX": 3.14,
            "YPRICE_NETO_TAX": 21.66
        },
        {
            "MATNR": "000000000007003145",
            "EAN11": "7290012576416",
            "MAKTX": "רזרב מלבק 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576416.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007003082",
            "EAN11": "7290012576409",
            "MAKTX": "ספיישל רזרב סוביניון בלאן 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576409.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007003036",
            "EAN11": "7290012576591",
            "MAKTX": "גוורצטרמינר רזרב 750  מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576591.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007003022",
            "EAN11": "7290000023830",
            "MAKTX": "קלאסיק רוזה בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023830.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007003013",
            "EAN11": "7290012576614",
            "MAKTX": "פרימייר אמרלד ריזלינג בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576614.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 14.74,
            "YPRICE_TAX": 2.50,
            "YPRICE_NETO_TAX": 17.24
        },
        {
            "MATNR": "000000000007003012",
            "EAN11": "7290012576607",
            "MAKTX": "פרמייר קברנה סובניון 750 מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576607.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 14.74,
            "YPRICE_TAX": 2.50,
            "YPRICE_NETO_TAX": 17.24
        },
        {
            "MATNR": "000000000007002841",
            "EAN11": "7290000024219",
            "MAKTX": "רזרב אמרלד ריזילינג 750 מ\"ל 12 יח שישית",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002841.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007002943",
            "EAN11": "7290000521398",
            "MAKTX": "זני של סגל קברנה שיראז 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000521398.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.56,
            "YPRICE_TAX": 2.30,
            "YPRICE_NETO_TAX": 15.86
        },
        {
            "MATNR": "000000000007002850",
            "EAN11": "7290000024240",
            "MAKTX": "רזרב שרדונה 750 מ\"ל 12 יח בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002850.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007002934",
            "EAN11": "7290000025193",
            "MAKTX": "אלטיטיוד מרלו 711 - 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000025193.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 70.04,
            "YPRICE_TAX": 11.90,
            "YPRICE_NETO_TAX": 81.94
        },
        {
            "MATNR": "000000000007002924",
            "EAN11": "7290012576379",
            "MAKTX": "ספיישל רזרב מרלו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002924.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007002923",
            "EAN11": "7290012576386",
            "MAKTX": "ספיישל רזרב פינוטאז' 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012576386.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 42.77,
            "YPRICE_TAX": 7.27,
            "YPRICE_NETO_TAX": 50.04
        },
        {
            "MATNR": "000000000007005385",
            "EAN11": "7290015350143",
            "MAKTX": "Free Run  מרלו 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015350143.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007005380",
            "EAN11": "7290015350235",
            "MAKTX": "קברנה סוביניון התססה פראית 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015350235.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007005378",
            "EAN11": "7290015350273",
            "MAKTX": "שרדונה התססה פראית 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015350273.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007005312",
            "EAN11": "7290000024523",
            "MAKTX": "תירוש של סגל 1 ליטר 100% מיץ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024523.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 9.44,
            "YPRICE_TAX": 1.60,
            "YPRICE_NETO_TAX": 11.04
        },
        {
            "MATNR": "000000000007001447",
            "EAN11": "7290000521022",
            "MAKTX": "סגל לבן חצי יבש 750 מ\"ל בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001447.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 13.64,
            "YPRICE_TAX": 2.31,
            "YPRICE_NETO_TAX": 15.95
        },
        {
            "MATNR": "000000000007001957",
            "EAN11": "7290000023823",
            "MAKTX": "קלאסיק סוביניון בלאן - בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001957.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007002880",
            "EAN11": "7290000024264",
            "MAKTX": "רזרב מרלו 750 מ\"ל 12 יח בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007002880.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 23.88,
            "YPRICE_TAX": 4.06,
            "YPRICE_NETO_TAX": 27.94
        },
        {
            "MATNR": "000000000007001958",
            "EAN11": "7290000023847",
            "MAKTX": "קלאסיק שרדונה בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001958.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007001959",
            "EAN11": "7290000023977",
            "MAKTX": "קלאסיק מרלו 750 מ\"ל בדצ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001959.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007001991",
            "EAN11": "7290000023816",
            "MAKTX": "קלאסיק אמרלד ריזלינג בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001991.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007001992",
            "EAN11": "7290000023809",
            "MAKTX": "קלאסיק קברנה סוביניון בד\"צ",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007001992.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007001994",
            "EAN11": "7290000023984",
            "MAKTX": "קלאסיק פינוטאז",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000023984.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 18.53,
            "YPRICE_TAX": 3.15,
            "YPRICE_NETO_TAX": 21.68
        },
        {
            "MATNR": "000000000007004937",
            "EAN11": "7290000024530",
            "MAKTX": "יין אדום מתוק-סגל 750 לקידוש- בקבוק שחור",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024530.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 9.74,
            "YPRICE_TAX": 1.65,
            "YPRICE_NETO_TAX": 11.39
        },
        {
            "MATNR": "000000000007004816",
            "EAN11": "7290000024561",
            "MAKTX": "אסמבלאז' איתן 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024561.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007004813",
            "EAN11": "7290000024554",
            "MAKTX": "אסמבלאז' ריחן 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000024554.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007004460",
            "EAN11": "7290000521275",
            "MAKTX": "מארז רכסים דישון קברנה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290000521275.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 45.48,
            "YPRICE_TAX": 7.73,
            "YPRICE_NETO_TAX": 53.21
        },
        {
            "MATNR": "000000000007004095",
            "EAN11": "7290015348300",
            "MAKTX": "ריחן קברנה סוביניון 750 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290015348300.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "50",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 35.74,
            "YPRICE_TAX": 6.07,
            "YPRICE_NETO_TAX": 41.81
        },
        {
            "MATNR": "000000000007009976",
            "EAN11": "7290102303960",
            "MAKTX": "מעדן ארבעה פירות 284 גר' – שוק פרטי",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290102303960.jpg",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 17.10,
            "YPRICE_TAX": 2.91,
            "YPRICE_NETO_TAX": 20.01
        },
        {
            "MATNR": "000000000003005380",
            "EAN11": "7290000136790",
            "MAKTX": "סודה 1.5 ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005380.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 0.50,
            "KMEIN": "EA",
            "YPRICE_NETO": 10.97,
            "YPRICE_TAX": 1.86,
            "YPRICE_NETO_TAX": 12.83
        },
        {
            "MATNR": "000000000003005202",
            "EAN11": "7290000135151",
            "MAKTX": "סודה נגיעות לימון 275 מ\"ל בקבוק 24 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005202.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 35.31,
            "YPRICE_TAX": 6.01,
            "YPRICE_NETO_TAX": 41.32
        },
        {
            "MATNR": "000000000003005030",
            "EAN11": "7290008464642",
            "MAKTX": "ג'ינג'ר אייל 275 מ\"ל בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005030.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 53.36,
            "YPRICE_TAX": 9.08,
            "YPRICE_NETO_TAX": 62.44
        },
        {
            "MATNR": "000000000003005029",
            "EAN11": "7290008464635",
            "MAKTX": "מי טוניק 275 מ\"ל בקבוק 24 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005029.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 53.36,
            "YPRICE_TAX": 9.08,
            "YPRICE_NETO_TAX": 62.44
        },
        {
            "MATNR": "000000000003005027",
            "EAN11": "7290008464611",
            "MAKTX": "סודה 275 מ\"ל בקבוק 24 יח'",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000003005027.JPG",
            "YDESERVE_TYPE": "AB",
            "YCODE_CAT": "60",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 35.31,
            "YPRICE_TAX": 6.01,
            "YPRICE_NETO_TAX": 41.32
        },
        {
            "MATNR": "000000000007003948",
            "EAN11": "8002530150226",
            "MAKTX": "קפה מאורו צ'נטופרצנטו שקית פולים 1קג 6יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530150226.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 57.51,
            "YPRICE_TAX": 9.78,
            "YPRICE_NETO_TAX": 67.29
        },
        {
            "MATNR": "000000000007003945",
            "EAN11": "8002530151124",
            "MAKTX": "קפה מאורו דה לוקס שקית פולים 1 קג 6יח חס",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530151124.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 57.51,
            "YPRICE_TAX": 9.78,
            "YPRICE_NETO_TAX": 67.29
        },
        {
            "MATNR": "000000000007007189",
            "EAN11": "8002530155122",
            "MAKTX": "מאורו פרימיום קפסולות א 10שרוול כשלפ כיה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007189.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 8.55,
            "YPRICE_TAX": 1.45,
            "YPRICE_NETO_TAX": 10.00
        },
        {
            "MATNR": "000000000007013302",
            "EAN11": "8002530914637 ",
            "MAKTX": "קפה מאורו אמנטה פודים 50 יח כשלפ כיה",
            // "YFILE": "",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 36.47,
            "YPRICE_TAX": 6.20,
            "YPRICE_NETO_TAX": 42.67
        },
        {
            "MATNR": "000000000007007187",
            "EAN11": "8002530121028",
            "MAKTX": "מאורו צ'נטו קפסולות אל' 10שרוול כשלפ כיה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007187.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 8.55,
            "YPRICE_TAX": 1.45,
            "YPRICE_NETO_TAX": 10.00
        },
        {
            "MATNR": "000000000007007185",
            "EAN11": "8002530155221",
            "MAKTX": "מאורו דלוקס קפסולות אל' 10שרוול כשלפ כיה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007185.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 8.55,
            "YPRICE_TAX": 1.45,
            "YPRICE_NETO_TAX": 10.00
        },
        {
            "MATNR": "000000000007003954",
            "EAN11": "8002200140014",
            "MAKTX": "קפה קימבו אקסטרה קרים שקית פולים 1קג 6יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002200140014.jpg",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 62.81,
            "YPRICE_TAX": 10.68,
            "YPRICE_NETO_TAX": 73.49
        },
        {
            "MATNR": "000000000007011342",
            "EAN11": "5711953159763",
            "MAKTX": "סטארבקס דאבל שוט ללא סוכר פחית 200 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007011342.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 82.12,
            "YPRICE_TAX": 13.96,
            "YPRICE_NETO_TAX": 96.08
        },
        {
            "MATNR": "000000000007011341",
            "EAN11": "5711953156892",
            "MAKTX": "סטארבקס דאבל שוט פחית 200 מ\"ל",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007011341.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 82.12,
            "YPRICE_TAX": 13.96,
            "YPRICE_NETO_TAX": 96.08
        },
        {
            "MATNR": "000000000007009593",
            "EAN11": "8002530180124",
            "MAKTX": "מאורו צ'נטופרצ'נטו 250 גר' פוליםחסום",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530180124.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 0.25,
            "KMEIN": "YMN",
            "YPRICE_NETO": 24.42,
            "YPRICE_TAX": 4.15,
            "YPRICE_NETO_TAX": 28.57
        },
        {
            "MATNR": "000000000007009592",
            "EAN11": "8002530180322",
            "MAKTX": "מאורו פרימיום 250 גר' פוליםחסום",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530180322.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 0.25,
            "KMEIN": "YMN",
            "YPRICE_NETO": 22.14,
            "YPRICE_TAX": 3.76,
            "YPRICE_NETO_TAX": 25.90
        },
        {
            "MATNR": "000000000007009591",
            "EAN11": "8002530180223",
            "MAKTX": "מאורו דה-לוקס 250 גר' פוליםחסום",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530180223.jpg",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 0.25,
            "KMEIN": "YMN",
            "YPRICE_NETO": 24.42,
            "YPRICE_TAX": 4.15,
            "YPRICE_NETO_TAX": 28.57
        },
        {
            "MATNR": "000000000007010842",
            "EAN11": "8002200141837",
            "MAKTX": "קימבו נאופלי אלומינ' עוצמה10כשלפ כל ימות",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007010842.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 0.10,
            "KMEIN": "YMN",
            "YPRICE_NETO": 8.55,
            "YPRICE_TAX": 1.45,
            "YPRICE_NETO_TAX": 10.00
        },
        {
            "MATNR": "000000000007003960",
            "EAN11": "8002530151728",
            "MAKTX": "קפה מאורו OnePoint דה לוקס קפסולות 150יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007003960.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 142.50,
            "YPRICE_TAX": 24.23,
            "YPRICE_NETO_TAX": 166.73
        },
        {
            "MATNR": "000000000007004193",
            "EAN11": "8002530164827",
            "MAKTX": "קפה מאורו דהלוקס שק' פולים 1קג6 כשלפ כיה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8012470000802.JPG",
            "YDESERVE_TYPE": "P",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "ST",
            "YPRICE_NETO": 57.51,
            "YPRICE_TAX": 9.78,
            "YPRICE_NETO_TAX": 67.29
        },
        {
            "MATNR": "000000000007004195",
            "EAN11": "8002530164926",
            "MAKTX": "קפה מאורו פרימיום שק' פולים 1ק6 כשלפ כיה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8002530152022.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "YMN",
            "YPRICE_NETO": 57.51,
            "YPRICE_TAX": 9.78,
            "YPRICE_NETO_TAX": 67.29
        },
        {
            "MATNR": "000000000007004199",
            "EAN11": "8002530915160",
            "MAKTX": "מאורו דהלוקס קופס פודים 150יח כשל\"פ כי\"ה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8012470000802.JPG",
            "YDESERVE_TYPE": "W",
            "YCODE_CAT": "70",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 109.41,
            "YPRICE_TAX": 18.60,
            "YPRICE_NETO_TAX": 128.01
        },
        {
            "MATNR": "000000000007003762",
            "EAN11": "8850389105825",
            "MAKTX": "סאפה ענבים בקבוק ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389105825.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 7.43,
            "YPRICE_TAX": 1.26,
            "YPRICE_NETO_TAX": 8.69
        },
        {
            "MATNR": "000000000007007771",
            "EAN11": "7501013122992",
            "MAKTX": "ג'ומקס קוקוס אננס קרטונית ליטר תריסרחסום",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007771.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 3.55,
            "YPRICE_TAX": 0.60,
            "YPRICE_NETO_TAX": 4.15
        },
        {
            "MATNR": "000000000007007763",
            "EAN11": "7501013122114",
            "MAKTX": "ג'ומקס אננס קרטונית ליטר תריסר חס",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/000000000007007763.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 3.55,
            "YPRICE_TAX": 0.60,
            "YPRICE_NETO_TAX": 4.15
        },
        {
            "MATNR": "000000000007003764",
            "EAN11": "8850389105832",
            "MAKTX": "סאפה תפוח בקבוק ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389105832.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 7.43,
            "YPRICE_TAX": 1.26,
            "YPRICE_NETO_TAX": 8.69
        },
        {
            "MATNR": "000000000007003766",
            "EAN11": "8850389105849",
            "MAKTX": "סאפה אפרסק בקבוק ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389105849.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 7.43,
            "YPRICE_TAX": 1.26,
            "YPRICE_NETO_TAX": 8.69
        },
        {
            "MATNR": "000000000007003772",
            "EAN11": "8850389103111",
            "MAKTX": "סאפה ענבים בקבוק 300 מ\"ל 24 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389103111.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 86.08,
            "YPRICE_TAX": 14.64,
            "YPRICE_NETO_TAX": 100.72
        },
        {
            "MATNR": "000000000007003774",
            "EAN11": "8850389103128",
            "MAKTX": "סאפה תפוח בקבוק 300 מ\"ל 24 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389103128.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 86.08,
            "YPRICE_TAX": 14.64,
            "YPRICE_NETO_TAX": 100.72
        },
        {
            "MATNR": "000000000007003784",
            "EAN11": "839762000658",
            "MAKTX": "איילנד גויאבה בקבוק ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/839762000658.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.16,
            "KMEIN": "YMN",
            "YPRICE_NETO": 6.20,
            "YPRICE_TAX": 1.05,
            "YPRICE_NETO_TAX": 7.25
        },
        {
            "MATNR": "000000000007003786",
            "EAN11": "839762000641",
            "MAKTX": "איילנד מנגו בקבוק ליטר שישייה",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/839762000641.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.16,
            "KMEIN": "YMN",
            "YPRICE_NETO": 6.20,
            "YPRICE_TAX": 1.05,
            "YPRICE_NETO_TAX": 7.25
        },
        {
            "MATNR": "000000000007003792",
            "EAN11": "4710068001692",
            "MAKTX": "מאסטר קפה לאטה פחית 240 מ\"ל 24 יח",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/4710068001692.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 78.78,
            "YPRICE_TAX": 13.39,
            "YPRICE_NETO_TAX": 92.17
        },
        {
            "MATNR": "000000000007003814",
            "EAN11": "8001160001786",
            "MAKTX": "גטורייד ספורט כחול בקבוק 500 מ\"ל תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8001160001786.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 52.98,
            "YPRICE_TAX": 9.00,
            "YPRICE_NETO_TAX": 61.98
        },
        {
            "MATNR": "000000000007005516",
            "EAN11": "8850389115336",
            "MAKTX": "סאפה מלון בקבוק ליטר תריסר",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/8850389115336.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 0.08,
            "KMEIN": "YMN",
            "YPRICE_NETO": 7.43,
            "YPRICE_TAX": 1.26,
            "YPRICE_NETO_TAX": 8.69
        },
        {
            "MATNR": "000000000007005446",
            "EAN11": "7290012588242",
            "MAKTX": "כדורגל מים מינרלים בקבוק 500מל שישייהחס",
            // "YFILE": "HTTP://STOREIIS/EMPSTORE/7290012588242.JPG",
            "YDESERVE_TYPE": "B",
            "YCODE_CAT": "80",
            "KONWA": "ILS",
            "KPEIN": 1.00,
            "KMEIN": "EA",
            "YPRICE_NETO": 29.62,
            "YPRICE_TAX": 5.04,
            "YPRICE_NETO_TAX": 34.66
        }

    ]
    const catgories = [
        {
            "YCODE_CAT": "10",
            "YCODE_CAT_DESC": "בירות",
            "YLOCATION": "1",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "20",
            "YCODE_CAT_DESC": "אלכוהול",
            "YLOCATION": "2",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "30",
            "YCODE_CAT_DESC": "קלים ומוגזים",
            "YLOCATION": "3",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "40",
            "YCODE_CAT_DESC": "מים",
            "YLOCATION": "4",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "50",
            "YCODE_CAT_DESC": "יינות",
            "YLOCATION": "5",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "60",
            "YCODE_CAT_DESC": "סודה ומיקסרים",
            "YLOCATION": "6",
            // "YFILE": ""
        },
        {
            "YCODE_CAT": "70",
            "YCODE_CAT_DESC": "קפה",
            "YLOCATION": "7",
            // "YFILE": ""
        }
    ]



    const getCategories = () => {
        setcategoriesList1(catgories)
        //BUILD
        // axios.post("/zui5/order/category").then(response => { 
        //   setcategoriesList1(response.data["CATEGORIES"]);
        // });
    }

    const getCancelAuth = () => {
        axios.post("/zui5/order/DATA_INIT").then(response => {
            console.log(response.data);
            console.log(response.data.CANCEL_AUTH);
            setisEnableBTN(response.data.CANCEL_AUTH);
            console.log(isEnableBTN);
        });

    }

    const getProducts = () => {
        getCatalog();
    }

    const getCatalog = () => {

        setCatalog(data);
        setproducts(data);
        //BUILD
        // axios.post("/zui5/order/catalog").then(response => {
        //   console.log(response);
        //     //setCatalog(response.data["CATALOG"]);
        //     setproducts(response.data["CATALOG"]);
        // });


    }

    const getEmployees = () => {
        console.log(isEnableBTN);

        axios.post(
            "/zui5/order/employee",
            JSON.stringify({ 'TAG': EmployeeTag })
        ).then(response => {
            const CurrentEmployeeDetails = response.data.EMP_DATA
            if (CurrentEmployeeDetails["ZAKAUT"].length > 0) {
                setEligibility(CurrentEmployeeDetails["ZAKAUT"]);
                setemployees(CurrentEmployeeDetails["EMPLOYEE"]);
                setCreateActive(true);
                setEmployeeName(CurrentEmployeeDetails["EMPLOYEE"].NAME);
                setlogInActive(false);
            }
            else
                setlogInActive(true);


            setlblError("שים לב, לא קיימים זכאויות לעובד זה")
        }),
            ((error) => alert(errror));

    }

    const createOrder = () => {


        setisSuccess(true);
        setCreateActive(true);
        let index = 0;
        const order = {
            "PERNR": employees.PERNR,
            "ITEMS": []
        }
        cart.map(item => {
            index += 10;
            let curProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === item.id)];
            let curEligibility = Eligibility.filter(a => a.CATEGORY === item.eligibility)[0];
            order.ITEMS.push({
                "ITM_NUMBER": index,
                "MATERIAL": curProduct.MATNR,
                "PLANT": "",
                "REQ_QTY": item.quantity,
                "KUNNR": curEligibility.KUNNR,
                "NIZUL_CODE": curEligibility.NIZUL_CODE,
                "SALES_UNIT": curProduct.KMEIN,
            });
        })

        axios.post(
            "/zui5/order/create",
            JSON.stringify(order)
        ).then(response => {
            if (response.data["MTYPE"] === "S")
                setReturnS(true);
            setResponse1(response);
            setloading(true);
            setmessage(response.data["MESSAGE"]);
            setProductTable(response.data["RETURN"]);
        }

        );
    }

    const handelCancelOrderNum = (OrderNumber) => {
        closeCancelOrderModal();
        setisSuccess(true);
        setCreateActive(true);
        const orderNum = {
            "PERNR": employees["PERNR"],
            "TAG": employees["TAG"],
            "VBELN": OrderNumber
        }
        axios.post("/zui5/order/cancel",
            JSON.stringify(orderNum)).
            then(response => {
                if (response.data["MTYPE"] === "S") {
                    setReturnS(true);
                }
                setmessage(response.data["MESSAGE"])
            });
        setloading(true);
    }

    // const clearInformations = () => {
    //     console.log("Clearing states...");
    //     setisCartWinVisible(false);  
    //     setcart((cart) => []); // מנקה את הסל
    //     //setCatalog((Catalog) => []);
    //     setproducts((product) => []);

    //     // setcart([]);
    //     // //setCatalog([]); // Ensure this triggers a re-render.       
    //     // setproducts([]); // Products depend on Catalog.
    //     setloading(false);
    //     settotalAmount(0);
    //     settotalItems(0);
    //     setEligibility([]);
    //     setlogInActive(true);
    //     setClearChoose(true);
    //     setlogOut(false);
    //     setisout(true);
    //     setcategoriesList([]);
    //     setcategories([]);
    //     console.log("Cleared states:", { cart, Catalog, products, categories });
    // };
    const clearInformations = () => {
        console.log("Clearing states...");
        setisCartWinVisible(false);
        setcart([]);
        // //setCatalog([]);
        // setproducts([]);
        setcategories([]);
        setloading(false);
        settotalAmount(0);
        settotalItems(0);
        setEligibility({});
        setlogInActive(true);
        setClearChoose(true);
        setlogOut(false);
        setcategoriesList([]);
        setisPower(true);

        // וודא שנמנעת טעינה מחודשת של API
        console.log("Cleared states:", { cart, Catalog, products, categories });
    };

    // useEffect(() => {
    //     // console.log("Cart updated:", cart);
    //     // console.log("Catalog updated:", Catalog);
    //     // console.log("Products updated:", products);
    //     handelShowCart();
    // }, [cart]);



    const closeCreateOrderModal = () => {
        setmessage("");
        setProductTable([]);
        setReturnS(false);
        setisSuccess(false);
        setCreateActive(false);
        clearInformations();
    }
    useEffect(() => {
        const handler = (e) => {
            e.target.className !== "imageProduct" && closeModal();
        }
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    useEffect(() => {
        getCancelAuth();
        getCategories();
        getProducts();
        getCatalog();
        handelShowCart();
    }, [cart]);



    let curProductId;


    const handelCancelOrder = () => {
        setisCancelOrder(true);
        setlogInActive(false);
    }

    const handelsetProductID = (id, event) => {
        curProductId = id;
    }

    const handelsetcategoriesOnChoose = (NewCategories) => {
        setcategoriesOnChoose(NewCategories);
    }


    const handelswSearchingFor = (event) => {
        let value = event._targetInst.key;
        let categoriesList_l = categories;

        (categoriesList_l.indexOf(value) === -1 ?
            categoriesList_l.push(value) :
            categoriesList_l = categoriesList_l.filter(x => x !== value));
        setswSearchingFor("categories");
        setcategories(categoriesList_l);
        setcategoriesList(categoriesList_l);

        handleCategory(event._targetInst.key);


        let updatedCategoriesToSend = [...Categoriestosend];

        // If the category is not present, add it; otherwise, remove it
        const categoryExists = updatedCategoriesToSend.some(
            (category) => category.LOW === value
        );

        if (!categoryExists) {
            updatedCategoriesToSend = [
                ...updatedCategoriesToSend,
                { SIGN: "I", OPTION: "EQ", LOW: value }
            ];
        } else {
            updatedCategoriesToSend = updatedCategoriesToSend.filter(
                (category) => category.LOW !== value
            );
        }

        // Remove duplicates in updatedCategoriesToSend
        updatedCategoriesToSend = updatedCategoriesToSend.filter(
            (category, index, self) =>
                self.findIndex((c) => c.LOW === category.LOW) === index
        );

        // Now updatedCategoriesToSend will have no duplicates and will append/remove categories as needed
        setCategoriestosend(updatedCategoriesToSend);

        // Construct the payload with the updated categories
        const payload = {
            CATEGORY: updatedCategoriesToSend,
            SEARCH: term,
        };

        console.log("Payload:", payload);

        if (updatedCategoriesToSend.length > 0) {
            const categoryLowValues = updatedCategoriesToSend.map(category => category.LOW);
            const filteredData = data.filter(product => categoryLowValues.includes(product.YCODE_CAT));
            //setCatalog(filteredData);
            setproducts(filteredData);
        }
        else {
            //setCatalog(data);
            setproducts(data);
        }
        // Send the request
        // axios
        //     .post("/zui5/order/catalog", JSON.stringify(payload))
        //     .then((response) => {
        //         if (response.data) {
        //             console.log(response.data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
    };



    const handleClearSearch = () => {
        setterm("");
        setswSearchingFor("term");



    }


    const handleSearch = (event) => {
        setterm(event);
        setswSearchingFor("term");
        if (event !== "") {
            let response = Catalog.filter(product => product.EAN11.includes(event) || product.MAKTX.includes(event));

            //setCatalog(response)
            setproducts(response);

        }
        else {
            //setCatalog(data);
            setproducts(data);
        }

        // const s = {
        //     CATEGORY: [],
        //     SEARCH: term
        //    }
        //    axios.post("/zui5/order/catalog",
        //     JSON.stringify(s)).
        //     then(response => {
        //         if (response.data) {
        //           console.log(response.data);
        //         }
        //         // setmessage(response.data["MESSAGE"])
        //     });


        // let add = handleAddToCartDigit(event.target.value);
        // if(add){
        //     handleAddToCart(add);

        // }
        //handleAddToCart(handleAddToCartDigit(event.target.value)) 
        // handelShowCart();

    }

    const handleMobileSearch = () => {
        setterm("");
    }

    const handleCategory = (value) => {
        setcategory(value);
        // categoryTerm(value);
    }

    const handleAddToCart = (selectedProducts) => {
        let cartItem = cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.quantity;
        let productEilibility = selectedProducts.eligibility;
        if (checkProduct(productID, productEilibility)) {
            let index = cartItem.findIndex(x => x.id == productID && x.eligibility === productEilibility);
            cartItem[index].quantity =
                Number(cartItem[index].quantity) + Number(productQty);
        } else {
            cartItem.push(selectedProducts);
        }
        cartItem.sort(a => a.eligibility);
        setcart(cartItem.sort(compare));
        setcartBounce(true);

        setTimeout(
            function () {
                setcartBounce(false);;;
                setquantity(1);
            },
            1000
        );
        sumTotalItems(cart);
        sumTotalAmount(cart);
    }


    const handleAddQuantity = (selectedProduct) => {
        let cartItem = cart;
        let productID = selectedProduct.id;
        let productQty = selectedProduct.quantity;
        if (checkProduct(productID)) {
            let index = cartItem.findIndex(x => x.id == productID);
            cartItem[index].quantity =
                Number(cartItem[index].quantity) + Number(productQty);
            setcart(cartItem.sort(compare));

        } else {
            cartItem.push(selectedProduct);
        }
        setcart(cartItem.sort(compare));
        setcartBounce(true);

        setTimeout(
            function () {
                setcartBounce(false);
                setquantity(productQty + 1);

            },
            1000
        );
        sumTotalItems(cart);
        sumTotalAmount(cart);
    }

    const handleRemoveProduct = (e, id, matnr, eligibility) => {
        let index = cart.findIndex(x => x.id == id && x.eligibility === eligibility);
        let quentity = cart[index].quantity;
        let kepin = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
        Eligibility.filter(a => a.CATEGORY === cart[index].eligibility)[0].QTY += (Number(kepin.KPEIN) * quentity);
        cart.splice(index, 1);
        setcart(cart);
        sumTotalItems(cart);
        sumTotalAmount(cart);
        e.preventDefault();
        handelShowCart();
    }
    const checkProduct = (productID, productElblty) => {

        try {
            let result = cart.filter(function (item) {
                return item.id === productID && item.eligibility === productElblty;
            });
            return result.length > 0 ? true : false;
        } catch (error) {
            return false;
        }

    }
    const sumTotalItems = (cart) => {
        let total = 0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].quantity;
        }
        settotalItems(total);
    }
    const sumTotalAmount = (cart) => {
        let total = 0;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].eligibility !== 'A') {
                total += cart[i].price * parseInt(cart[i].quantity);
            }

        }
        settotalAmount(total);
    }
    const UpdateEmployeeName = (tagNumber) => {

        setEmployeeTag(tagNumber);
    }

    const updateQuantity = (qty) => {
        setquantity(qty);
    }

    const openModal = (product) => {
        setquickViewProduct(product);
        setmodalActive(true);
    }

    const closeModal = () => {
        setmodalActive(false);
    }

    const openLogInModal = () => {
        setlogInActive(true);
    }

    const closeLogOutModal = () => {
        setlogOut(false);
    }

    const closeLogInModal = () => {
        setCreateActive(true);
        //BUILD
        setEligibility(zakot);
        setlogInActive(false);
        //BUILD
        //  getEmployees();
    }
    const closeCancelOrderModal = () => {
        setisCancelOrder(false);

    }


    const increment = (e, p) => {
        e.preventDefault();
        let count = Eligibility.filter(a => a.CATEGORY === p.eligibility)[0].QTY;
        let index = cart.findIndex(x => x.id === p.id);
        if (index >= 0 && count >= 1) {
            cart[index].quantity++;
            sumTotalAmount(cart);
            setcart(cart);
            handelShowCart();
        }
        e.preventDefault();

        Eligibilityinde('add', p);
    }




    const decrement = (e, p) => {
        e.preventDefault();



        let index = cart.findIndex(x => x.id === p.id);
        if (index >= 0 && cart[index].quantity > 1) {

            cart[index].quantity--;
            sumTotalAmount(cart);
            setcart(cart);
            handelShowCart();
        }
        e.preventDefault();
        Eligibilityinde('sub', p);
    }



    const Eligibilityinde = (event, product) => {
        let add = event === 'add' ? 1 : -1;
        let CurrentProduct_l;
        let currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === product.id && Catalog[a].MATNR == product.matnr)];
        CurrentProduct_l = currProduct;

        let empzakot = zakot.findIndex(a => a.CATEGORY === product.eligibility);
        let countTo = zakot[empzakot].QTY;
        // let empzakot = employees["ZAKAUT"].filter(a => a.CATEGORY === product.eligibility)[0].QTY;
        let count = Eligibility.filter(a => a.CATEGORY === product.eligibility)[0].QTY;
        const Text = Eligibility.filter(a => a.CATEGORY === product.eligibility)[0].CATEGORY;
        currProduct.eligibility = Text;

        if (add === 1) {
            if (count >= CurrentProduct_l.KPEIN) {
                Eligibility.filter(a => a.CATEGORY === Text)[0].QTY -= CurrentProduct_l.KPEIN;
            }
        }

        else {


            let index = cart.findIndex(x => x.id == product.id && x.eligibility === product.eligibility);
            let quentity = cart[index].quantity;
            // Eligibility.filter(a => a.CATEGORY === cart[index].eligibility)[0].QTY += Number(Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === product.id && Catalog[a].MATNR == product.matnr)].KPEIN * quentity);
            if (empzakot - 1 > count) {
                Eligibility.filter(a => a.CATEGORY === Text)[0].QTY += CurrentProduct_l.KPEIN;
            }
        }
        handelShowCart();

    }











    const enAndDisable = (e) => {
        setdisabled(true);
    }

    const handelOpenCartWin = () => {
        setisCartWinVisible(!isCartWinVisible);
        setshowCart(true);
        // setshowCart(false);
    }
    const compare = (a, b) => {
        if (a.eligibility < b.eligibility) {
            return -1;
        }
        if (a.eligibility > b.eligibility) {
            return 1;
        }
        return 0;
    }

    const handelShowCart = () => {

        let l_quantity = quantity;
        setcart(cart.sort(compare));
        const db = cart.reduce((objectsByKeyValue, obj) => {
            const value = obj.eligibility;
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});


        const arrry = Object.keys(db).map((category, i) => (
            <div key={i} className="product-cart">
                <h3>{Eligibility.filter(a => a.CATEGORY === category)[0].YDESC}</h3>
                {
                    db[category].map(product =>
                        <li className="cart-item" key={product.name}>
                            <a
                                className="product-remove"
                                href="#"
                                onClick={(e) => handleRemoveProduct(e, product.id, product.matnr, product.eligibility)}
                            >
                                X
                            </a>
                            <div onMouseOver={enAndDisable} className="product-total displayd">

                            </div>
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <div onMouseOver={enAndDisable} className="product-total displayd">
                                    <div onMouseOver={handelsetProductID(product.id)} className="notDisplay">
                                        <Counter
                                            onMouseOver={handelsetProductID}
                                            productQuantity={product.quantity}
                                            handleAddQuantity={handleAddQuantity}
                                            updateQuantity={updateQuantity}
                                            increment={(e) => increment(e, product)}
                                            decrement={(e) => decrement(e, product)}
                                        />

                                    </div>
                                    <div className="IsDisplay">
                                        <p className="quantity" disabled={(disabled) ? "disabled" : ""}>
                                            {product.quantity} {product.quantity > 1 ? "יחידות" : "יחידה"}{" "}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="quantity" disabled={(disabled) ? "disabled" : ""}>

                  {product.quantity}{" "} {product.quantity > 1 ? "יחידות" : "יחידה"}
                </p> */}
                                {product.eligibility !== 'A' && <p className="product-price">{product.price}{" ₪ "}</p>}
                            </div>
                            <div className="product-image-div">
                                <img className="product-image" src={product.image} />
                            </div>

                        </li>
                    )
                }
            </div>
        ));




        if (arrry.length <= 0) {
            setview(<EmptyCart />);
        } else {
            setview(
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                    className="cart-items"
                >
                    {/* {l_cartItems} */}
                    {arrry}
                </CSSTransitionGroup>
            );
        }
    }


    return (
        <Suspense fallback="loading">
            <div className="container">

                {isSuccess && <CreateOrder
                    ReturnS={ReturnS}
                    Response1={Response1}
                    loading={loading}
                    CreateActive={CreateActive}
                    message={message}
                    ProductTable={ProductTable}
                    isSuccess={isSuccess}
                    closeCreateOrderModal={closeCreateOrderModal}
                />}
                <LogOut
                    setlogOut={setlogOut}
                    logOut={logOut}
                    closeLogOutModal={closeLogOutModal}
                    clearInformations={clearInformations}
                />
                <LogIn
                    lblError={lblError}
                    setlblError={setlblError}
                    logInActive={logInActive}
                    openLogInModal={openLogInModal}
                    closeLogInModal={closeLogInModal}
                    setEmployeeName={setEmployeeName}
                    UpdateEmployeeName={UpdateEmployeeName}
                    EmployeeName={EmployeeName}
                />
                {isCancelOrder &&
                    <CancelOrder
                        handelCancelOrderNum={handelCancelOrderNum}
                        closeCancelOrderModal={closeCancelOrderModal}
                        isCancelOrder={isCancelOrder}
                    />
                }
                <Header
                    handleClearSearch={handleClearSearch}
                    isPower={isPower}
                    setisPower={setisPower}
                    isSuccess={isSuccess}
                    isCancelOrder={isCancelOrder}
                    setlogOut={setlogOut}
                    categoriesList={categoriesList}
                    showCart={showCart}
                    setshowCart={setshowCart}
                    EligibilitiesPageActive={EligibilitiesPageActive}
                    setEligibilitiesPageActive={setEligibilitiesPageActive}
                    view={view}
                    employees={employees}
                    createOrder={createOrder}
                    Eligibility={Eligibility}
                    handelShowCart={handelShowCart}
                    // isCancelOrder={isCancelOrder}
                    handelCancelOrder={handelCancelOrder}
                    EmployeeName={EmployeeName}
                    setEmployeeName={UpdateEmployeeName}
                    cartBounce={cartBounce}
                    total={totalAmount}
                    totalItems={totalItems}
                    cartItems={cart}
                    handleRemoveProduct={handleRemoveProduct}
                    handleSearch={handleSearch}
                    handleMobileSearch={handleMobileSearch}
                    handleCategory={handleCategory}
                    categoryTerm={categories}
                    swSearchingForSearch={swSearchingFor}
                    handelswSearchingFor={handelswSearchingFor}
                    updateQuantity={updateQuantity}
                    productQuantity={quantity}
                    addToCart={handleAddToCart}
                    AddQuantity={handleAddToCart}
                    increment={increment}
                    decrement={decrement}
                    handelOpenCartWin={handelOpenCartWin}
                    logInActive={logInActive}
                    isEnableBTN={isEnableBTN}
                    handelsetProductID={handelsetProductID}
                />

                {isCartWinVisible &&
                    <Cart
                        Eligibility={Eligibility}
                        createOrder={createOrder}
                        total={totalAmount}
                        view={view}
                        setview={setview}
                        disabled={disabled}
                        enAndDisable={enAndDisable}
                        cart={cart}
                        handelOpenCartWin={handelOpenCartWin}
                        isCartWinVisible={isCartWinVisible}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                }
                {/* {!isCartWinVisible && */}
                <Products
                    ClearChoose={ClearChoose}
                    setClearChoose={setClearChoose}
                    Eligibility={Eligibility}
                    handelsetcategoriesOnChoose={handelsetcategoriesOnChoose}
                    productsList={products}
                    Catalog={Catalog}
                    SearchingFor={swSearchingFor}
                    swSearchingForSearch={swSearchingFor}
                    handelswSearchingFor={handelswSearchingFor}
                    categoriesList={categoriesList}
                    categoriesList1={categoriesList1}
                    categoryTerm={categories}
                    handelShowCart={handelShowCart}
                    searchTerm={term}
                    addToCart={handleAddToCart}
                    productQuantity={quantity}
                    updateQuantity={updateQuantity}
                    openModal={openModal}
                    handleCategory={handleCategory}
                />
                {/* } */}
                <QuickView
                    product={quickViewProduct}
                    openModal={modalActive}
                    closeModal={closeModal}
                />
            </div>
        </Suspense>
    );
}


ReactDOM.render(<App />, document.getElementById("root"));

