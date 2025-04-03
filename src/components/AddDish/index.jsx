import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { createFood} from "../../services/foodServicer";
import { useSelector } from "react-redux";
import { FoodContext } from "../../contexts/FoodContext";

function AddDish({title, handeSetShowAddDish}) {
    const {handleGetAllFood} = useContext(FoodContext);
    const [isCheckPopular, setIsCheckPopular] = useState(false);
    const [isCheckBanner, setIsCheckBanner] = useState(false);
    const dataCategory = useSelector((state) => state.category.category);
    const [message, setMessage] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [statusAdd, setStatusAdd] = useState(false);
    const [valueInput, setValueInput] = useState({
        dishName: '',
        description: '',
        price: '',
        image: '',
        categoryId: '',
        food_outstanding: false,
        quantity: 1,
        banner: false
    });
    
    const handleChangeInput = ({target}) => {
        const {name, value, checked} = target;
        if(name === "food_outstanding") {
            setValueInput(prev => ({
                ...prev,
                [name]: checked
            }))
        }else if(name === 'banner') {
            setValueInput(prev => ({
                ...prev,
                [name]: checked
            }))
        }else if(name === "image"){
            const fileImage = target.files[0];
            const url = URL.createObjectURL(fileImage);
            setUrlImage(url);
            setValueInput(prev => ({
                ...prev,
                [name]: fileImage
            }))
        }else{
            setValueInput(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(); // Tạo một đối tượng formData dùng để đưa dữ liệu lên server
        Object.entries(valueInput).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try{
            const message = await createFood(formData);
            console.log(message)
            if(message.errCode === 0) {
                setStatusAdd(true);
                setTimeout(() => {
                    handeSetShowAddDish();
                    handleGetAllFood();
                    setStatusAdd(false);
                }, 600);
            }else{
                setMessage("Vui lòng nhập đầy đủ thông tin!");
            }
        }catch(error){
            console.log(error);
        }
    }

    return (  
        <div className="fixed inset-0 flex justify-center items-center bg-[#59595957] z-[999]">
            <div className="relative w-[90%] md:w-[80%] xl:w-[60%] h-auto bg-[#fff] shadow-nav py-[2rem] md:py-[4rem] px-[2rem] md:px-[5rem] rounded-[1rem]">
                <form onSubmit={handleSubmit}>
                    <div className="absolute top-0 md:top-[2rem] right-0 md:right-[2rem] md:w-[4rem] md:h-[4rem] w-[3.5rem] h-[3.5rem] flex justify-center items-center rounded-[.4rem] bg-[#e9e9e9] hover:bg-[#dadada]" 
                        onClick={handeSetShowAddDish}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-[2rem] md:text-[2.4rem] text-[#7d7d7d]"/>
                    </div>
                    <h2 className="text-[2.5rem] md:text-[3.5rem] text-green-600 font-bold text-center mb-[1rem] md:mb-[2rem]">
                        {title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-[1rem]">
                        <div className="w-full">
                            <label htmlFor="dishName">Tên món</label>
                            <input type="text" id="dishName" name="dishName" value={valueInput.dishName} placeholder="Nhập tên món..." className="w-full h-[4.6rem] focus:ring-2 focus:ring-cyan-300 md:h-[5rem] border border-gray-400 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                onChange={(e) => handleChangeInput(e)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-[1rem]">
                            <div className="w-full">
                                <label htmlFor="price">Giá món</label>
                                <input type="text" id="price" name="price" value={valueInput.price} placeholder="Nhập giá món..." className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="quantity">Số lượng</label>
                                <input type="text" id="quantity" name="quantity" value={valueInput.quantity} placeholder="Nhập số lượng..." className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 rounded-[.5rem] pl-[1.5rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <label htmlFor="description " className="block mt-[1rem] md:mt-[2rem] pb-[.5rem]">Mô tả</label>
                    <textarea name="description" value={valueInput.description} id="description" className="w-full h-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 outline-none rounded-[.5rem] p-[1rem]" placeholder="Nhập môt tả cho món ăn..."
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <div className="grid md:grid-cols-2 justify-between mt-[1rem] md:mt-[2rem] gap-[1rem] md:gap-[2rem]">
                        <div className="flex items-center gap-[2rem]">
                            <label htmlFor="image" className="w-[15rem] flex justify-center items-center h-[4rem] cursor-pointer rounded-[.8rem] border border-gray-400 focus:ring-2">Thêm hình ảnh</label>
                            <input type="file" id="image" name="image" className="hidden"
                                onChange={(e) => handleChangeInput(e)}
                            />
                            {
                                urlImage !== '' ? (
                                    <img src={urlImage} alt="img" className="w-[10rem] h-[10rem] rounded-[50%] object-cover"/>
                                ): (
                                    <div className="w-[6rem] md:w-[10rem] h-[6rem] md:h-[10rem] rounded-[50%] border border-gray-400 focus:ring-2 focus:ring-cyan-300">

                                    </div>
                                )
                            }
                        </div>
                        <div className="flex items-center gap-[2rem]">
                            <div className="w-full">
                                <label htmlFor="categoryId">Danh mục</label>
                                <select name="categoryId" id="categoryId" value={valueInput.categoryId} className="w-full h-[4.6rem] md:h-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 rounded-[.5rem] outline-none pl-[1rem] mt-[.5rem]"
                                    onChange={(e) => handleChangeInput(e)}
                                >
                                    <option value="" disabled hidden>Chọn danh mục</option>
                                    {
                                        dataCategory.data?.length > 0 && dataCategory.data.map((value) => {
                                            return (
                                                <option key={value.id} value={`${value.id}`}>{value.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 justify-start gap-[1rem]">
                        <div className="w-full flex items-center mt-[1rem] md:mt-[2rem]">
                            <input type="checkbox" name="food_outstanding" value={valueInput.food_outstanding} id="food_outstanding" hidden
                                onChange={(e) => {
                                    handleChangeInput(e)
                                    setIsCheckPopular(prev => !prev);
                                }}
                            />
                            <span>Món ăn nổi bậc:</span>
                            <label htmlFor="food_outstanding" className="w-[2.5rem] h-[2.5rem] rounded-[.5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 flex justify-center items-center ml-[1.5rem]"
                            >
                                <FontAwesomeIcon icon={faCheck} className={`${isCheckPopular ? 'opacity-[1] text-cyan-600' : 'opacity-0'} text-[1.8rem]`}/>
                            </label>
                        </div>
                        <div className="w-full flex items-center mt-[1rem] md:mt-[2rem]">
                            <input type="checkbox" name="banner" value={valueInput.banner} id="banner" hidden
                                onChange={(e) => {
                                    handleChangeInput(e)
                                    setIsCheckBanner(prev => !prev);
                                }}
                            />
                            <span>Hiển thị đầu trang:</span>
                            <label htmlFor="banner" className="w-[2.5rem] h-[2.5rem] rounded-[.5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 flex justify-center items-center ml-[1.5rem]"
                            >
                                <FontAwesomeIcon icon={faCheck} className={`${isCheckBanner ? 'opacity-[1] text-cyan-600' : 'opacity-0'} text-[1.8rem]`}/>
                            </label>
                        </div>
                    </div>
                    <p className="mt-[1rem] md:mt-[5rem] text-red-500">{message}</p>
                    <button className="w-full h-[4.6rem] md:h-[5rem] rounded-[.5rem] text-[#fff] bg-green-500 hover:bg-green-600 hv-linear mt-[.5rem] cursor-pointer"
                        type="submit"
                    >
                        Thêm
                    </button>
                </form>
            </div>
            {
                statusAdd && (
                    <div className="fixed inset-0 bg-[#3f3f3f73] flex justify-center items-center">
                        <div className="min-w-[10rem] h-auto rounded-[.5rem] flex flex-col gap-[1rem] justify-center items-center bg-[#fff] px-[5rem] py-[3rem] text-[2rem] shadow-2xl">
                            <div className="flex justify-center items-center w-[5rem] h-[4.6rem] md:h-[5rem] border-[.1rem] border-[#05b405] rounded-[50%]">
                                <FontAwesomeIcon icon={faCheck} className="text-[#05b405]"/>
                            </div>
                            Thêm món ăn thành công!
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

export default AddDish;