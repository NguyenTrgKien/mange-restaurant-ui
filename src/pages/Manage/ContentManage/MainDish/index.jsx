import { faCheck, faEdit, faPlus, faSearch, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useContext,  useState } from "react";
import AddDish from "../../../../components/AddDish";
import { deleteFood } from "../../../../services/foodServicer";
import EditFood from "../EditFood";
import { FoodContext } from "../../../../contexts/FoodContext";

function MainDish({titleAdd}) {
    const [showAddDish, setShowAdddDish] = useState(null);
    const [showDelete, setShowDelete] = useState('');
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(null);
    const [showEdit, setShowEdit] = useState(null);
    const {dataAllFood, handleGetAllFood, currentCategoryId} = useContext(FoodContext);
    const dataFood = dataAllFood;
    const [valueSearch, setValueSearch] = useState('');

    const handeSetShowAddDish = () => {
        setShowAdddDish(prev => !prev);
    }

    const handleShowDelete = (foodId) => {
        setShowDelete(foodId);
    }

    const handleShowEdit = (food) => {
        setShowEdit(food);
    }

    const handleDelete = async(foodId) => {
        try{
            const message = await deleteFood(foodId);
            if(message.errCode === 0) {
                setShowDelete(false);
                setIsDeleteSuccess(true);
                handleGetAllFood();
                setTimeout(() => {
                    setIsDeleteSuccess(false);
                }, 600);
            }
        }catch(error){
            console.log(error);
        }
    }
    console.log(dataFood)
    return (  
        <div className="w-full h-auto pt-[3rem]">
            <div className="flex items-center justify-between mx-[2rem] sm:mx-[3rem] md:mx-[5rem]">
                <div className="w-[16rem]  h-[4.8rem] md:h-[5rem] flex gap-[1rem] justify-center items-center rounded-[1rem] bg-[#1fc5c5] cursor-pointer hover:bg-[#0cb7b7] transition-all duration-[.25s]"
                    onClick={handeSetShowAddDish}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-[#fff]"/>
                    <span className="text-[#fff]">
                        Thêm {titleAdd} 
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        className="w-[16rem] sm:w-[22rem] md:w-[28rem] h-[4.8rem] md:h-[5rem] px-[1rem] pr-[3rem] border border-gray-400 rounded-[0.75rem] focus:outline-none focus:ring-2 focus:ring-[#1fc5c5] transition-all"
                        value={valueSearch}
                        placeholder="Tìm kiếm..."
                        onChange={(e) => setValueSearch(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                </div>
            </div>
            <div className="w-full h-auto mt-[2rem] relative flex items-center px-[5rem] gap-[2rem]  border-b-[.1rem] border-b-[#c0c0c0]">
            </div>  
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-[2rem] sm:px-[3rem] md:px-[5rem] md:gap-[2rem] gap-[1rem] h-auto removeScrollbar overflow-scroll  py-[2rem]">
                {
                    dataFood.length > 0 && dataFood.filter((it) => it.categoryId === currentCategoryId).filter((item) => item.dishName.toLowerCase().includes(valueSearch.toLowerCase())).map((value) => {
                        return (
                            <div key={value.id} className="w-full h-[32rem] md:h-[35rem] flex flex-col rounded-[2rem] px-[1rem] md:px-[2rem] pb-[2rem] bg-[#ffffff] shadow-2xl ">
                                <div className="w-full h-[14rem] flex justify-center items-center rounded-[50%] ">
                                    <div className="w-[12rem] h-[12rem] flex justify-center items-center rounded-[50%]">
                                        <img src={`http://localhost:3000/${value.image}`} alt="img" className="w-full h-full rounded-[50%] object-cover shadowImg"/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="md:text-[2rem] maxlineThree text-center font-bold">
                                        Tên: {value.dishName}
                                    </span>
                                    <p className="md:text-[1.5rem] text-[1.3rem] text-center maxlineThree">
                                        Mô tả: {value.description}
                                    </p>
                                </div>
                                <div className="mt-auto gap-[.5rem]">
                                    <div className="flex justify-between text-[1.4rem] gap-[.5rem] items-center mb-[.5rem]">
                                        <div>
                                            <span>Giá:</span>
                                            <span className="text-[red]">{value.price}đ</span>
                                        </div>
                                        <span className="md:px-[1rem] md:py-[.5rem] px-[.5rem] block bg-[#d2ffff] rounded-[.5rem]">Kho: {value.quantity}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto gap-[1rem]">
                                        <button className="w-[60%] h-[3rem] md:h-[4rem] flex items-center justify-center gap-[.5rem] bg-[#ffc107] text-[1.2rem] md:text-[1.6rem] text-[#fff] rounded-[.6rem] cursor-pointer hover:bg-[#d3a10a] transition-all duration-[.25s]"
                                            onClick={() => handleShowEdit(value)}
                                        >
                                            <FontAwesomeIcon icon={faEdit}/>
                                            Chỉnh sửa</button>
                                        <button className="w-[40%] h-[3rem] md:h-[4rem] flex items-center justify-center gap-[.5rem] bg-[#f50019] text-[1.2rem] md:text-[1.6rem] text-[#fff] rounded-[.6rem] cursor-pointer hover:bg-[#c40014] transition-all duration-[.25s]"
                                            onClick={() => handleShowDelete(value.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash}/>
                                            Xóa</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                
            </div>
            {
                showAddDish && (<AddDish title={`Thêm ${titleAdd}`} handeSetShowAddDish={handeSetShowAddDish}/>)
            }
            {
                showDelete && dataFood.find((it) => it.id === showDelete) && (
                    <div className="fixed inset-0 flex justify-center items-center z-[200] bg-[#4e4e4e4b]">
                        <div className="w-auto h-auto relative bg-[#fff] rounded-[1rem] p-[6rem]">
                            <FontAwesomeIcon icon={faXmark} className="text-[1.8rem] absolute top-[1rem] right-[1rem] p-[.5rem] bg-[#e6e6e6] text-[#767676] rounded-[.5rem]"
                                onClick={() => handleShowDelete(null)}
                            /> 
                            <div className="text-[2rem] font-bold text-blue-700" >
                                Bạn có chắc muốn xóa món ăn này
                            </div>
                            <div className="flex items-center gap-[1.5rem] justify-center mt-[2rem]">
                                <button className="px-[2rem] py-[1rem] bg-[#e7e7e7] rounded-[.8rem] hover:opacity-[.8] cursor-pointer" 
                                    onClick={() => handleDelete(showDelete)}
                                >Có</button>
                                <button className="px-[2rem] py-[1rem] bg-green-600 text-[#fff] rounded-[.8rem] hover:opacity-[.8] cursor-pointer"
                                    onClick={() => handleShowDelete(null)}
                                >Không</button>
                            </div>

                        </div>
                    </div>
                )
            }
            {
                isDeleteSuccess && (
                    <div className="fixed flex justify-center items-center inset-0 z-[400] bg-[#50505052]">
                        <div className="w-[40rem] h-auto py-[3rem] flex flex-col items-center gap-[1.5rem] bg-[#fff] rounded-[1rem] text-[2rem] font-bold">
                            <FontAwesomeIcon icon={faCheck} className="p-[2rem] rounded-[50%] border-[.2rem] text-[#00be00] border-[#00be00]"/>
                            Xóa món ăn thành công!
                        </div>
                    </div>

                )
            }
            {
                showEdit && (
                    <EditFood title={'Chỉnh sửa món ăn'} food={showEdit} handleShowEdit={handleShowEdit} />
                )
            }
        </div>
    );
}

export default MainDish;