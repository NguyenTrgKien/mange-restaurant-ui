import { useContext, useState } from "react";
import { editFood } from "../../../../services/foodServicer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { FoodContext } from "../../../../contexts/FoodContext";

function EditFood({title,food, handleShowEdit}) {
    const {handleGetAllFood} = useContext(FoodContext);
    const category = useSelector((state) => state.category.category);
    const [isCheckBanner, setIsCheckBanner] = useState(false);
    const [isCheckPopular, setIsCheckPopular] = useState(false);
    const [deleteSuccess, setIsDeleteSuccess] = useState(false);
    const [urlImage, setUrlImage] = useState(`http://localhost:3000/${food.image}`);
    const [valueInput, setValueInput] = useState({
        dishName: food.dishName,
        description: food.description,
        categoryId: food.categoryId,
        price: food.price,
        image: food.image,
        foodId: food.id,
        food_outstanding: food.food_outstanding,
        quantity: food.quantity,
        banner: food.banner
    });
    const handleChangeInput = ({target}) => {
        const {name, value} = target;
        if(name === 'food_outstanding') {
            setValueInput(prev => ({
                ...prev,
                [name] : !prev[name]
            }))
        }else if(name === 'banner') {
            setValueInput(prev => ({
                ...prev,
                [name] : !prev[name]
            }))
        }else if(name === "image") {
            const file = URL.createObjectURL(target.files[0]);
            setUrlImage(file);
            setValueInput(prev => ({
                ...prev,
                [name]: target.files[0]
            }))
        }else{
            console.log("hihi")
            setValueInput(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(valueInput).forEach(([key, value]) => {
            formData.append(key, value);
        })
        try{
            const message = await editFood(formData);
            if(message.errCode === 0) {
                setIsDeleteSuccess(true);
                handleGetAllFood();
                setTimeout(() => {
                    setIsDeleteSuccess(false);
                    handleShowEdit(null);
                }, 400);
            }
        }catch(error){
            console.log(error);
        }
    }
    return ( 
        <div className="fixed inset-0 flex justify-center items-center bg-[#59595957] z-[999]">
            <div className="relative w-[90%] md:w-[80%] xl:w-[60%] h-auto bg-[#fff] shadow-nav py-[2rem] px-[2rem] md:py-[4rem] md:px-[5rem] rounded-[1rem]">
                <form onSubmit={handleSubmit}>
                    <div className="absolute top-0 right-0 md:top-[2rem] md:right-[2rem] w-[4rem] h-[4rem] flex justify-center items-center rounded-[.4rem] bg-[#e9e9e9] hover:bg-[#dadada]"  
                        onClick={() => handleShowEdit(null)}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-[2.4rem] text-[#7d7d7d]"/>
                    </div>
                    <h2 className="text-[2.5rem] lg:text-[3.5rem] text-amber-600 font-bold text-center mb-[1rem] md:mb-[2rem]">
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                        <div className="w-full">
                            <label htmlFor="dishName">Tên món</label>
                            <input type="text" id="dishName" name="dishName" value={valueInput.dishName} placeholder="Nhập tên món..." className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                onChange={(e) => handleChangeInput(e)}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-2 gap-[1rem]">
                            <div className="w-full">
                                <label htmlFor="price">Giá món</label>
                                <input type="text" id="price" name="price" value={valueInput.price} placeholder="Nhập giá món..." className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="quantity">Số lượng</label>
                                <input type="text" id="quantity" name="quantity" value={valueInput.quantity} placeholder="Nhập số lượng..." className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>

                        </div>
                    </div>
                    <label htmlFor="description " className="block mt-[1rem] md:mt-[2rem] pb-[.5rem]">Mô tả</label>
                    <textarea name="description" value={valueInput.description} id="description" className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 outline-none rounded-[.5rem] p-[1rem]" placeholder="Nhập môt tả cho món ăn..."
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <div className="grid md:grid-cols-2 mt-[1rem] md:mt-[2rem] items-center md:gap-[2rem]">
                        <div className="flex items-center gap-[2rem]">
                            <label htmlFor="image" className="w-[15rem] flex justify-center items-center h-[4rem] cursor-pointer rounded-[.8rem] border border-gray-400 focus:ring-2 focus:ring-amber-300">Thêm hình ảnh</label>
                            <input type="file" id="image" name="image" className="hidden"
                                onChange={(e) => handleChangeInput(e)}
                            />
                            {
                                (
                                    <img src={urlImage} alt="img" className="md:w-[10rem] md:h-[10rem] w-[6rem] h-[6rem] rounded-[50%] object-cover"/>
                                )
                            }
                        </div>
                        <div className="flex items-center gap-[1rem] md:gap-[2rem]">
                            <div className="w-full">
                                <label htmlFor="categoryId">Danh mục</label>
                                <select name="categoryId" id="categoryId" value={valueInput.categoryId} className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 rounded-[.5rem] outline-none pl-[1rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                >
                                    {
                                        category && category.data.map((value) => {
                                            return (
                                                <option key={value.id} value={`${value.id}`}>{value.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="w-full flex items-center mt-[1rem] md:mt-[2rem]">
                            <input type="checkbox" name="food_outstanding" value={valueInput.food_outstanding} id="food_outstanding" hidden
                                checked={isCheckPopular}
                                onChange={(e) => {
                                    handleChangeInput(e);
                                }}
                            />
                            <span>Món ăn nổi bậc:</span>
                            <label htmlFor="food_outstanding" className="w-[2.5rem] h-[2.5rem] rounded-[.5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 flex justify-center items-center ml-[1.5rem]"
                            >
                                <FontAwesomeIcon icon={faCheck} className={`${valueInput.food_outstanding ? 'text-amber-600 opacity-[1]' : 'opacity-0'} text-[1.8rem]`}/>
                            </label>
                        </div>
                        <div className="w-full flex items-center mt-[2rem] md:mt-[2rem]">
                            <input type="checkbox" name="banner" value={valueInput.banner} id="banner" hidden
                                checked={true}
                                onChange={(e) => {
                                    handleChangeInput(e);
                                }}
                            />
                            <span>Hiển thị đầu trang:</span>
                            <label htmlFor="banner" className="w-[2.5rem] h-[2.5rem] rounded-[.5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 flex justify-center items-center ml-[1.5rem]"
                            >
                                <FontAwesomeIcon icon={faCheck} className={`${valueInput.banner ? 'opacity-[1] text-amber-600' : 'opacity-0'} text-[1.8rem]`}/>
                            </label>
                        </div>
                    </div>
                    <button className="w-full h-[4.6rem] md:h-[5rem] rounded-[.5rem] text-[#fff] bg-amber-500 hover:bg-amber-600 hv-linear mt-[1rem] md:mt-[5rem] cursor-pointer"
                        type="submit"
                    >
                        Lưu thay đổi
                    </button>
                </form>
            </div>
            {
                deleteSuccess && (
                    <div className="fixed inset-0 bg-[#3f3f3f73] flex justify-center items-center">
                        <div className="min-w-[10rem] h-auto rounded-[.5rem] flex flex-col gap-[1rem] justify-center items-center bg-[#fff] px-[5rem] py-[3rem] text-[2rem] shadow-2xl">
                            <div className="flex justify-center items-center w-[5rem] h-[5rem] border border-gray-400 focus:ring-2 focus:ring-amber-300 rounded-[50%]">
                                <FontAwesomeIcon icon={faCheck} className="text-[#05b405]"/>
                            </div>
                            Cập nhật thành công!
                            <div className="w-[8rem] h-[4rem] flex justify-center items-center bg-[#3a84d3] rounded-[1rem] text-[#fff] border-[.3rem] text-[1.5rem] cursor-pointer border-[#98dbff]"
                                onClick={() => setStatusAdd(false)}
                            > 
                                Ok
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
     );
}

export default EditFood;