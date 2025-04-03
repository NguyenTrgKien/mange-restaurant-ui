import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createStaff, editStaff } from "../../../../../services/staffService";

function AddStaff({statusStaff, positionStaff, showAddStaff,handleShowAddStaff, handleGetAllStaff}) {
    const [urlImg, setUrlImg] = useState(showAddStaff === 'add' ? '' : `http://localhost:3000/${showAddStaff.image}`);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [valueStaff, setValueStaff] = useState({
        email: showAddStaff === 'add' ? '' : showAddStaff.email || '',
        password: showAddStaff === 'add' ? '' : showAddStaff.password || '',
        fullName: showAddStaff === 'add' ? '' : showAddStaff.fullName || '',
        salary: showAddStaff === 'add' ? '' : showAddStaff.salary || '',
        positionId: showAddStaff === 'add' ? '' : showAddStaff.positionId || '',
        statusId: showAddStaff === 'add' ? '' : showAddStaff.statusId || '',
        image: showAddStaff === 'add' ? '' : showAddStaff.image || '',
        gender: showAddStaff === 'male' ? 'male' : showAddStaff.gender || '',
        phoneNumber: showAddStaff === 'add' ? '' : showAddStaff.phoneNumber || '',
        startDate: showAddStaff === 'add' ? '' : showAddStaff.startDate || '',
    });
    const handleChangeInput = ({target}) => {
        const {name, value} = target;
        if(name === "image") {
            if(urlImg) {
                URL.revokeObjectURL(urlImg);
            }
            if(target.files.length > 0) {
                const file = URL.createObjectURL(target.files[0]);
                setUrlImg(file);
                setValueStaff(prev => ({
                    ...prev,
                    [name]: target.files[0]
                }))
            }
        }else{
            setValueStaff(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        if(showAddStaff !== 'add'){
            valueStaff.userId = showAddStaff.userId;
        }
        Object.entries(valueStaff).forEach(([key, value]) => {
            formData.append(key, value);
        })
        try{
            let message
            if(showAddStaff === 'add') {
                message = await createStaff(formData);
            }else{
                message = await editStaff(formData);
            }
            if(message.errCode === 0) {
                setCreateSuccess(true);
                handleGetAllStaff();
                setTimeout(() => {
                    setCreateSuccess(false);
                },400)
                handleShowAddStaff(null);
            }else{
                setMessageError(message.message);
            }
        }catch(error){
            console.log(error);
        }
    }

    return ( 
        <div className="fixed inset-0 flex justify-center items-center z-[999] bg-[#58585866]">
            <div className={`w-[95%] lg:w-[80%] xl:w-[65%] h-auto relative transition-all duration-[.5s] bg-[#fff] md:px-[6rem] px-[2rem] md:py-[4rem] py-[2rem] rounded-[1rem] shadow-2xl`}>
                <form onSubmit={handleSubmit}>
                    <div className="absolute top-[2rem] right-[2rem] w-[4rem] h-[4rem] flex justify-center items-center rounded-[.4rem] bg-[#e9e9e9] hover:bg-[#dadada]"  
                        onClick={()=> handleShowAddStaff(null)}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-[2.4rem] text-[#7d7d7d]"/>
                    </div>
                    <h2 className={`text-[2rem] md:text-[3.5rem] ${showAddStaff === 'add' ? 'text-green-600' : 'text-amber-600'}  font-bold text-center mb-[1rem] md:mb-[3rem]`}>
                        {showAddStaff === 'add' ? 'Thêm nhân viên' : 'Sửa thông tin nhân viên'}
                    </h2>
                    <div className="flex md:flex-row flex-col gap-[1rem] md:gap-[3rem] items-start mb-[2rem]">
                        <div className="md:w-[35%]">
                            <div className={`md:text-[1.8rem] ${showAddStaff === 'add' ? 'text-green-800' : 'text-amber-800'} mb-[1rem] md:mb-[1.5rem] font-bold`}>
                                Thông tin tài khoản: 
                            </div>
                            <div className="flex md:flex-col md:gap-[2rem] gap-[1rem] flex-row items-center">
                                <div className="w-full">
                                    <label htmlFor="email" className="text-[1.4rem] md:text-[1.6rem]">Email nhân viên</label>
                                    <input type="text" id="email" name="email" value={valueStaff.email} placeholder="Nhập email nhân viên..." className={`w-full h-[4rem] md:h-[4.6rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"}  rounded-[.5rem] pl-[1.5rem] mt-[.5rem]`}
                                        onChange={(e) => handleChangeInput(e)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="password" className="text-[1.4rem] md:text-[1.6rem]">Mật khẩu</label>
                                    <input type="password" id="password" name="password" value={valueStaff.password} placeholder="Nhập mật khẩu..." className={`w-full h-[4rem] md:h-[4.6rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"} rounded-[.5rem] pl-[1.5rem] mt-[.5rem]`}
                                        onChange={(e) => handleChangeInput(e)}
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-[1rem] md:mt-[2rem]">
                                <label htmlFor="positionId" className="text-[1.4rem] md:text-[1.6rem]">Chức vụ</label>
                                <select name="positionId" id="positionId" value={valueStaff.positionId} className={`w-full border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"} outline-none  h-[4rem] md:h-[4.6rem] rounded-[.5rem] pl-[1.5rem] mt-[.5rem]`}
                                    onChange={(e) => handleChangeInput(e)}
                                >
                                    <option value="" disabled hidden>Chọn chức vụ</option>
                                    {
                                        positionStaff.length > 0 && positionStaff.map((value) => {
                                            return (
                                                <option key={value.id} value={value.id}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="md:w-[65%]">
                            <div className={`md:text-[1.8rem] ${showAddStaff === 'add' ? 'text-green-800' : 'text-amber-800'} mb-[1rem] md:mb-[1.5rem] font-bold`}>
                                Thông tin nhân viên:
                            </div>
                            <div className="flex flex-row md:flex-col lg:flex-row gap-[1rem] md:gap-[1.5rem] items-center">
                                <div className="w-full">
                                    <label htmlFor="fullName" className="text-[1.4rem] md:text-[1.6rem]">Họ tên nhân viên</label>
                                    <input type="text" name="fullName" id="fullName" value={valueStaff.fullName} className={`w-full h-[4rem] md:h-[4.6rem] rounded-[.5rem] mt-[.5rem] pl-[1.5rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"}`} placeholder="Nhập họ tên..." 
                                        onChange={(e) => handleChangeInput(e)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="salary" className="text-[1.4rem] md:text-[1.6rem]">Tiền lương</label>
                                    <input type="number" name="salary" id="salary" value={valueStaff.salary} className={`w-full h-[4rem] md:h-[4.6rem] rounded-[.5rem] mt-[.5rem] pl-[1.5rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"}`} placeholder="Nhập họ..." 
                                        onChange={(e) => handleChangeInput(e)} 
                                    />
                                </div>
                            </div>
                            <div className="flex gap-[1rem] md:gap-[1.5rem] items-center mt-[1rem] md:mt-[2rem]">
                                <div className="w-full">
                                    <label htmlFor="statusId" className="text-[1.4rem] md:text-[1.6rem]">Trạng thái</label>
                                    <select name="statusId" value={valueStaff.statusId} id="statusId" className={`w-full border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"} h-[4rem] md:h-[4.6rem] rounded-[.5rem pl-[1.5rem] rounded-[.5rem] outline-none mt-[.5rem]`}
                                        onChange={(e) => handleChangeInput(e)}
                                    >
                                        <option value="" disabled hidden>Trạng thái làm việc</option>
                                    {
                                        statusStaff.length > 0 && statusStaff.map((value) => {
                                            return (
                                                <option key={value.id} value={value.id}>{value.statusName}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="gender" className="text-[1.4rem] md:text-[1.6rem]">Giới tính</label>
                                    <select name="gender" value={valueStaff.gender} id="gender" className={`w-full border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"} h-[4rem] md:h-[4.6rem] rounded-[.5rem pl-[1.5rem] rounded-[.5rem] outline-none mt-[.5rem]`}
                                        onChange={(e) => handleChangeInput(e)}
                                    >
                                        <option value="" disabled hidden>Chọn giới tính</option>
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1rem] md:gap-[1.5rem] mt-[1rem] md:mt-[2rem]">
                                <div className="w-full">
                                    <label htmlFor="phoneNumber" className="text-[1.4rem] md:text-[1.6rem]">Số điện thoại</label>
                                    <input type="number" name="phoneNumber" id="phoneNumber" value={valueStaff.phoneNumber} className={`w-full h-[4rem] md:h-[4.6rem] rounded-[.5rem] mt-[.5rem] pl-[1.5rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"}`} placeholder="Nhập sđt..." 
                                        onChange={(e) => handleChangeInput(e)}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="startDate" className="text-[1.4rem] md:text-[1.6rem]">Ngày bắt đầu</label>
                                    <input type="date" name="startDate" id="startDate" value={valueStaff.startDate} className={`w-full h-[4rem] md:h-[4.6rem] rounded-[.5rem] mt-[.5rem] pl-[1.5rem] border border-gray-400 focus:ring-2 ${showAddStaff === 'add' ? "focus:ring-cyan-300" : "focus:ring-amber-300"}`} 
                                        onChange={(e) => handleChangeInput(e)}
                                    />
                                </div>
                            </div>
                            <div className="w-[50%] mt-[1rem] md:mt-[2rem] flex items-end gap-[1rem] md:gap-[2rem] md:justify-center md:mx-0 mx-auto">
                                <div className="w-full">
                                    <label htmlFor="image" className="w-full flex md:text-[1.6rem] text-[1.4rem] justify-center items-center rounded-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 cursor-pointer h-[4rem] md:h-[4.6rem] mt-[.5rem]">Chose file</label>
                                    <input type="file" id="image" name="image" className="hidden" 
                                        onChange={(e) => handleChangeInput(e)} 
                                    />
                                </div>
                                <div className="md:w-[12rem] md:h-[8rem] w-[6rem] h-[4.6rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 rounded-[.5rem]">
                                    {
                                        urlImg && (
                                            <img src={urlImg} alt="image" className="w-full h-full rounded-[.5rem] object-cover"/>
                                        )
                                        
                                    }
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="text-[red]">
                        {messageError}
                    </div>
                    <button className={`w-full h-[4rem] md:h-[4.6rem] rounded-[.5rem] text-[#fff] ${showAddStaff === 'add' ? 'bg-green-500' : 'bg-amber-500'} md:mt-[1.5rem] cursor-pointer `}
                        type="submit"
                    >
                        {showAddStaff === 'add' ? 'Thêm' : 'Lưu'}
                    </button>
                </form>
                {
                    createSuccess && (
                    <div className="fixed inset-0 bg-[#3f3f3f73] flex justify-center items-center">
                        <div className="min-w-[10rem] h-auto rounded-[.5rem] flex flex-col gap-[1rem] justify-center items-center bg-[#fff] px-[5rem] py-[3rem] text-[2rem] shadow-2xl">
                            <div className="flex justify-center items-center w-[5rem] h-[5rem] border border-gray-400 focus:ring-2 focus:ring-cyan-300 rounded-[50%]">
                                <FontAwesomeIcon icon={faCheck} className="text-[#05b405]"/>
                            </div>
                            {showAddStaff === 'add' ? 'Thêm' : 'Sửa'} nhân viên thành công!
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
        </div>
     );
}

export default AddStaff;