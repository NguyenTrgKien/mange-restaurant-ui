import { faAngleDown, faAngleUp, faEject, faEthernet, faHouse, faReceipt, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import ContentManage from "./ContentManage";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actionType";
import { FoodContext } from "../../contexts/FoodContext";
import { checkLogin } from "../../services/loginService";
import { useNavigate } from "react-router";

function Manage() {
    const [login, setLogin] = useState({});
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.category.category);
    const [isOpenMenuDish, setIsOpenMenuDish] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("DashBoard");
    const [currentListCategory, setCurrentListCategory] = useState('DashBoard');
    const {setCurrentCategoryId} = useContext(FoodContext);
    const [dataAdmin, setDataAdmin] = useState({});
    const [isCheckingLogin, setIsCheckingLogin] = useState(false);
    const [isOpenMenuOrder, setIsOpenMenuOrder] = useState(false);
    const [currentOrderItem, setCurrentOrderItem] = useState('Order');
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = async() => {
            try{
                const data = await checkLogin();
                if(data.errCode === 0) {
                    if(data.user?.role !== 'Admin') {
                        navigate('/login');
                    }
                    setLogin(data.user);
                    setDataAdmin(data.user); 
                    setIsCheckingLogin(true);
                }else{
                    navigate('/login');
                }
            }catch(error){
                console.log(error);
                navigate('/login');
            }
        }
        isLogin();
    }, []);
    
    useEffect(() => {
        dispatch(getCategory());
    }, []);

    const handleSetCurrentListCategory = (menu) => {
        setCurrentListCategory(menu);
    }

    const handleSetCurrentMenu = (value) => {
        setCurrentMenu(value);
    }

    return (      
        isCheckingLogin && (
            <div className="w-full h-[100vh] flex items-start">
                <nav className="fixed top-0 left-0 hidden md:block w-[10rem] lg:w-[20%] h-[100vh] bg-[#fff] z-[200] shadow-2xl shadow-[#c7c7c7] p-y-[2rem]">
                    <h2 className="text-[3.4rem] text-green-800 h-[7.2rem] flex justify-center items-center font-bold text-center border-b-[.1rem] border-b-[#ddd]" >
                        ADMIN
                    </h2>
                    <div className="py-[2rem] px-[2rem]">
                        <div className="flex items-center gap-[1rem] py-[1.6rem] my-[.8rem] px-[2rem] rounded-[.5rem] text-[#fff] shadow-2xl shadow-[#a1a1a1] bg-[#288ada] cursor-pointer"
                            onClick={() => {
                                handleSetCurrentMenu("DashBoard");
                                setIsOpenMenuDish(false);
                            }}
                        >
                            <div className="w-[3rem] h-auto text-start">
                                <FontAwesomeIcon icon={faHouse} className="text-[#fff] "/>
    
                            </div>
                            <span className="hidden lg:block">
                                DashBoard
                            </span>
                        </div>
                        
                        <div className="my-[.8rem]">
                            <div className={`flex items-center py-[1.6rem]  px-[2rem] ${currentMenu === "Dish" ? "text-[red]" : ''} group cursor-pointer transition-all duration-[.25s] rounded-[.5rem] select-none`}
                                onClick={()=>{
                                    setIsOpenMenuOrder(false);
                                    setIsOpenMenuDish(prev => !prev);
                                }}
                            >
                                <div className="w-[3rem] h-auto text-start">
                                    <FontAwesomeIcon icon={faEject} className="text-inherit group transition-all duration-[.25s]"/>
    
                                </div>
                                <span className=" hidden lg:flex lg:items-center gap-[.5rem]">
                                    Thực đơn
                                    {
                                        isOpenMenuDish ? (
                                            <FontAwesomeIcon icon={faAngleUp} className="text-gray-600"/>
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} className={`text-gray-600`}/>
                                        )
                                    }
                                </span>
                            </div>
                            <div className={` ${isOpenMenuDish ? "h-[22rem] opacity-100" : "h-0 opacity-0"} overflow-hidden lg:pl-[4rem] transition-all duration-[.5s]`}>
                                {
                                    listCategory && listCategory.data.map((item) => {
                                        return (
                                            <div key={item.id} className={`py-[1rem] cursor-pointer transition-all duration-[.25s] ${currentListCategory === item.categoryName ? "text-[red]" : ""}`}
                                                onClick={() => {
                                                    setCurrentCategoryId(item.id);
                                                    handleSetCurrentMenu("Dish")
                                                    handleSetCurrentListCategory(item.categoryName);
                                                }}
                                            >
                                                {item.categoryName}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`flex flex-col justify-end py-[1.6rem] my-[.8rem] px-[2rem] cursor-pointer rounded-[.5rem] `}
                            onClick={() => {
                                setIsOpenMenuDish(false);
                                setIsOpenMenuOrder(prev => !prev);
                            }}
                        >
                            <div className={`w-full flex items-center transition-all duration-[.25s] ${currentMenu == "Order" ? "text-[red]" : ""}`}>
                                <span className="w-[3rem] h-auto text-start"> 
                                    <FontAwesomeIcon icon={faReceipt} className="text-inherit"/>
                                </span>
                                <span className=" hidden lg:flex lg:items-center gap-[.5rem]">
                                    Đơn hàng 
                                    {
                                        isOpenMenuOrder ? (
                                            <FontAwesomeIcon icon={faAngleUp} className="text-gray-600"/>
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} className={`text-gray-600`}/>
                                        )
                                    }
                                </span>
                            </div>
                            <div className={` flex flex-col gap-[2rem] ${isOpenMenuOrder ? "h-[11rem] mt-[2rem]" : "h-0"}  overflow-hidden px-[2rem] transition-all duration-[.5s]`}>
                                <div className={`${currentOrderItem === 'OrderDish' ? 'text-red-500' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetCurrentMenu('OrderDish');
                                        setCurrentOrderItem("OrderDish");
                                    }}
                                >
                                    Đơn đặt món
                                </div>
                                <div className={`${currentOrderItem === 'OrderTable' ? 'text-red-500' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetCurrentMenu('OrderTable');
                                        setCurrentOrderItem("OrderTable");
                                    }}
                                >
                                    Đơn đặt bàn
                                </div>
                                <div className={`${currentOrderItem === 'OrderCombo' ? 'text-red-500' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetCurrentMenu('OrderCombo');
                                        setCurrentOrderItem("OrderCombo");
                                    }}
                                >
                                    Combo
                                </div>
                            </div>
                        </div>
                        {/* <div className={`flex items-center pb-[1.6rem] my-[.8rem] px-[2rem] group cursor-pointer transition-all duration-[.25s] rounded-[.5rem] ${currentMenu == "Customer" ? "text-[red]" : ""}`}
                            onClick={() => {
                                setIsOpenMenuOrder(false);
                                handleSetCurrentMenu("Customer");
                                setIsOpenMenuDish(false);
                            }}
                        >
                            <div className="w-[3rem] h-auto text-start">
                                <FontAwesomeIcon icon={faUsers} className="text-inherit group transition-all duration-[.25s]"/>
    
                            </div>
                            <span className="hidden lg:block">
                                Khách hàng
                            </span>
                        </div> */}
                        <div className={`flex items-center py-[1.6rem] my-[.8rem] px-[2rem] group cursor-pointer transition-all duration-[.25s] rounded-[.5rem] ${currentMenu == "Staff" ? "text-[red]" : ""}`}
                            onClick={() => {
                                setIsOpenMenuOrder(false);
                                handleSetCurrentMenu("Staff");
                                setIsOpenMenuDish(false);
                            }}
                        >
                            <div className="w-[3rem] h-auto text-start">
                                <FontAwesomeIcon icon={faUser} className="text-inherit group transition-all duration-[.25s]"/>
    
                            </div>
                            <span className="hidden lg:block">
                                Nhân viên
                            </span>
                        </div>
                        <div className={`flex items-center py-[1.6rem] my-[.8rem] px-[2rem] group cursor-pointer transition-all duration-[.25s] rounded-[.5rem] ${currentMenu == "Table" ? "text-[red]" : ""}`}
                            onClick={() => {
                                setIsOpenMenuOrder(false);
                                handleSetCurrentMenu("Table");
                                setIsOpenMenuDish(false);
                            }}
                        >
                            <div className="w-[3rem] h-auto text-start">
                                <FontAwesomeIcon icon={faEthernet} className="text-inherit group transition-all duration-[.25s]"/>
    
                            </div>
                            <span className="hidden lg:block">
                                Bàn
                            </span>
                        </div>
                    </div>
                </nav>
                {
                    dataAdmin && (
                        <ContentManage login={login} content={currentMenu} setCurrentMenu={setCurrentMenu}  setCurrentCategoryId={setCurrentCategoryId} currentListCategory={currentListCategory} dataAdmin={dataAdmin}/>
                    )
                }
            </div>
        )
    );
}

export default Manage;