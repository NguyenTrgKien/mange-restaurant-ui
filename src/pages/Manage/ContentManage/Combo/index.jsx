import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { authPayment, getAllOrderTableDishForAdmin } from "../../../../services/userService";

const statusMap = {
    PENDING: 'Chờ xác nhận',
    WAITPAYMENT: 'Chờ thanh toán',
    PAID: 'Đã thanh toán',
    CANCELLED: 'Đã hủy',
    PREPARING: 'Đang chuẩn bị',
    CONFIRM: 'Đã xác nhận',
    READY: 'Đã sẵn sàng phục vụ',
    CHECKED_IN: 'Khách đã đến',
    COMPLETED: 'Đã hoàn thành',
    NO_SHOW: 'Khách không đến',
    FAILED: 'Thất bại'
};

export default function Combo() {
    const [listOrderCombo, setListOrderCombo] = useState([]);
    const [currentOrderTable, setCurrentOrderTable] = useState('paymentHere');
    const elementOrder = useRef();
    const [openUpdateStatusOrderTableDish, setOpenUpdateStatusOrderDish] = useState();
    const [updateStatus, setUpdateStatus] = useState();
    const [errMessage, setErrMessage] = useState('');
    const [currentProgress, setCurrentProgress] = useState(0);
    
    const dataOrder = async() => {
        try{
            const response = await getAllOrderTableDishForAdmin();
            console.log(response);
            if(response.errCode === 0) {
                const data = response.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                setListOrderCombo(data);
            }
        }catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        dataOrder();
    }, []);

    useEffect(() => {
        if(elementOrder.current) {
            setCurrentProgress(elementOrder.current);
        }
    }, []);

    const handleUpdateOrderTableDish = async(orderId, status) => {
        if(!status) {
            setMessageUpdate('Vui lòng chọn trạng thái!');
            return;
        }
        try{
            const response = await authPayment({orderId, status});
            if(response.errCode === 0) {
                setOpenUpdateStatusOrderDish(null);
                dataOrder();
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleSetCurrentProgress = ({currentTarget}) => {
        setCurrentProgress(currentTarget);
    }
    return (
        <div className="pt-[2rem] md:pt-[3rem] pb-[4rem]">
            <div className="w-[16rem] md:w-[18rem] ml-[2rem] sm:ml-[3.5rem] md:ml-[5rem] h-[5rem] flex gap-[1rem] justify-center items-center rounded-[1rem] bg-[#1fc5c5] hover:bg-[#0cb7b7] transition-all duration-[.25s]"
            >
                <span className="text-[#fff] text-[1.5rem] md:text-[1.6rem]">
                    Đơn đặt bàn
                </span>
            </div>
            <div className="relative flex items-center gap-[2rem] mt-[2rem] pb-[1rem] border-b border-b-gray-300 mx-[5rem]">
                <span
                    className={`cursor-pointer select-none ${currentOrderTable === 'paymentHere' ? "text-blue-700" : "text-gray-700"} `}
                    ref={elementOrder}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrderTable('paymentHere')
                    }}
                >
                    Thanh toán tại nhà hàng
                </span>
                <span className={`cursor-pointer select-none ${currentOrderTable === 'paymented' ? "text-blue-700" : "text-gray-700"} `}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrderTable('paymented');
                    }}
                >
                    Đã thanh toán trước
                </span>
                <span className={`cursor-pointer select-none ${currentOrderTable === 'completed' ? "text-blue-700" : "text-gray-700"} `}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrderTable('completed');
                    }}
                >
                    Đã hoàn thành
                </span>
                <div className={`absolute bottom-0 h-[.2rem] rounded-full bg-blue-500 transition-all duration-[.35s]`} style={{
                    width: currentProgress.offsetWidth,
                    left: currentProgress.offsetLeft
                }}>

                </div>
            </div>
            <div className="grid grid-cols-3 gap-[2rem] px-[5rem] my-[2rem]">
                {
                    listOrderCombo?.filter((it) => {
                        if(currentOrderTable === 'paymentHere') {
                            return it.status !== 'PAID' && it.status!== 'COMPLETED';
                        }else if(currentOrderTable === 'completed') {
                            return it.status === 'COMPLETED';
                        }
                        return it.status === 'PAID';
                    }).map((item) => {
                        console.log(item)
                        return (
                            <div className="w-full h-auto">
                                <div className={`w-full flex items-center justify-between p-[1rem] bg-gradient-to-r ${item.status === 'COMPLETED' ? "bg-gray-200 text-gray-500" : "from-cyan-500 to-cyan-400 text-white"}   rounded-tr-[.5rem] rounded-tl-[.5rem]`}>
                                    <div className="flex flex-col gap-0">
                                        <span className="text-[1.2rem] font-bold">Mã đơn: {item.id}</span>
                                        <h4 className="font-bold">
                                            {item.OrderTable.Table.tableName}
                                        </h4>
                                        <span className="text-[1.2rem]">{item.OrderTable.numberGuests} người</span>
                                    </div>
                                    <div className={`flex items-center gap-[.5rem] px-[1rem] py-[.2rem] rounded-full ${item.status !== "PAID" ? "bg-amber-50" : "bg-green-200"}`}>
                                        <span className={`block w-[.8rem] h-[.8rem] rounded-full ${item.status !== 'PAID' ? "bg-amber-600" : "bg-green-600"}`}></span>
                                        <span className={`${item.status !==  "PAID" ? "text-amber-600" : "text-green-600"} text-[1.2rem]`}>
                                            {
                                                statusMap[item.status]
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-auto bg-white p-[1rem] rounded-[.5rem] shadow-xl shadow-gray-200">
                                    <div className="flex items-center gap-[1rem] bg-gray-100 rounded-[.5rem] p-[1rem]">
                                        <FontAwesomeIcon icon={faUser} className="text-gray-600"/>
                                        <div className="">
                                            <h4 className="text-[1.6rem] text-gray-900 maxlineOne">{item.fullName}</h4>
                                            <span className="flex items-center gap-[.4rem] text-[1.2rem]"><FontAwesomeIcon icon={faClock} className="text-gray-500"/>{item.createdAt}</span>
                                        </div>
                                    </div>
                                    <p className="py-[1rem]">Danh sách món</p>
                                    <div className="w-full max-h-[10rem] min-h-[10rem] p-[1rem] bg-gray-100 overflow-y-scroll removeScrollbar flex flex-col gap-[1rem rounded-[.5rem]">
                                        {
                                            item?.OrderItems?.map((it) => {
                                                return (
                                                    <div className=" flex justify-between items-center border-b border-b-gray-300 py-[1rem]">
                                                        <div>
                                                            <span className="text-[1.4rem] font-bold">{it.Food.dishName}</span>
                                                            <span className="text-[1.4rem] pl-[1rem]">x{it.Food.quantityOrder}</span>
                                                        </div>
                                                        <span className="text-[1.4rem]">{item.totalAmount}đ</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-gray-600 text-[1.5rem] mt-[1rem]">
                                            <span>Tạm tính: </span>
                                            <span>200.000đ</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600 text-[1.5rem] mt-[1rem]">
                                            <span>Giảm giá: </span>
                                            <span>200.000đ</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600 text-[1.5rem] mt-[1rem]">
                                            <span className="font-bold text-gray-900">Tổng: </span>
                                            <span className="text-red-500">200.000đ</span>
                                        </div>
                                    </div>
                                    {
                                        item.status !== 'COMPLETED' ? (
                                            item.status !== "PAID" ? (
                                                <div className="flex items-center gap-[1rem] justify-end mt-[2rem]">
                                                    <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">Chi tiết</button>
                                                    <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                                        onClick={() => setOpenUpdateStatusOrderDish(item)}
                                                    >Cập nhật</button>
                                                    <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-green-500 hover:bg-green-600 text-white cursor-pointer">Thanh toán</button>
                                                </div>
                                            ): (
                                                <div className="flex items-center gap-[1rem] justify-between mt-[2rem]">
                                                    <p className="text-[1.4rem] text-green-600 px-[1rem] py-[.5rem] bg-green-100 rounded-[.5rem]">Đã thanh toán trước</p>
                                                    <div className="flex items-center gap-[1rem]">
                                                        <button className="text-[1.4rem] px-[1rem] py-[.5rem] rounded-[.5rem] bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">Chi tiết</button>
                                                        <button className="text-[1.4rem] px-[1rem] py-[.5rem] rounded-[.5rem] bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                                            onClick={() => setOpenUpdateStatusOrderDish(item)}
                                                        >Cập nhật</button>
                                                    </div>
                                                </div>
                                            )
                                        ): (
                                            <div className="text-center mt-[2rem]">
                                                <p className="px-[1rem] py-[.5rem] text-gray-500 rounded-[.5rem] bg-green-200">
                                                    Đơn hàng đã hoàn thành
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            {
                openUpdateStatusOrderTableDish && (
                    <div className="fixed inset-0 flex justify-center items-center bg-[#6060606d] z-[950]">
                        <div className="w-auto h-auto p-[2rem] rounded-[.5rem] bg-white">
                            <h4 className="text-[2rem] text-gray-700 font-bold text-center mb-[2rem]">
                                Cập nhật trạng thái
                            </h4>
                            <select className="w-full h-[5rem] border border-gray-400 outline-none px-[1.5rem] rounded-[.5rem]"
                                onChange={(e) => {
                                    setUpdateStatus(e.target.value);
                                }}
                            >
                                <option value="" hidden>Chọn trạng thái</option>
                                {
                                    Object.entries(statusMap).map(([key, value]) => {
                                        return (
                                            <option key={key} value={key} >{value}</option>
                                        )
                                    })
                                }
                            </select>
                            <p className="text-red-500 mt-[2rem]">{errMessage}</p>
                            <div className="flex items-center justify-center gap-[1rem] mt-[.5rem]">
                                <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    onClick={() => {
                                        setErrMessage('');
                                        setOpenUpdateStatusOrderDish(null)
                                    }}
                                >Hủy</button>
                                <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => handleUpdateOrderTableDish(openUpdateStatusOrderTableDish.id, updateStatus)}
                                >Cập nhật</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
  }