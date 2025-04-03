import { useEffect, useRef, useState } from "react";
import { authPayment, getUserOrderTableHistory } from "../../../../services/userService";
import moment from "moment";
import { updateStatusOrderTable } from "../../../../services/tableService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faUtensils } from "@fortawesome/free-solid-svg-icons";

function OrderTable({titleAdd, login}) {
    const [listDataOrdertable, setListDataOrderTable] = useState([]);
    const [openUpdateOrdertable, setOpenUpdateOrdertable] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [currentOrderTable, setCurrentOrderTable] = useState('current');
    const elementOrder = useRef();
    const [currentProgress, setCurrentProgress] = useState(0);

    const fetchOrderTable = async() => {
        try{
            const response = await getUserOrderTableHistory(login.id);
            if(response.errCode === 0) {
                const dataSorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setListDataOrderTable(dataSorted);
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchOrderTable();
    }, []);

    useEffect(() => {
        if(elementOrder.current) {
            setCurrentProgress(elementOrder.current);
        }
    }, []);

    const handleUpdateOrderTable = async(orderTableId, status) => {
        if(!status) {
            setErrMessage('Vui long chọn trạng thái!');
            return;
        }
        try{
            const response = await updateStatusOrderTable({orderTableId, status});
            if(response.errCode === 0) {
                setOpenUpdateOrdertable(null);
                fetchOrderTable();
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
                    className={`cursor-pointer select-none ${currentOrderTable === 'current' ? "text-blue-700" : "text-gray-700"} `}
                    ref={elementOrder}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrderTable('current')
                    }}
                >
                    Đơn đặt bàn hiện tại
                </span>
                <span className={`cursor-pointer select-none ${currentOrderTable === 'completed' ? "text-blue-700" : "text-gray-700"} `}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrderTable('completed')
                    }}
                >
                    Đơn đã hoàn thành
                </span>
                <div className={`absolute bottom-0 h-[.2rem] rounded-full bg-blue-500 transition-all duration-[.35s]`} style={{
                    width: currentProgress.offsetWidth,
                    left: currentProgress.offsetLeft
                }}>

                </div>
            </div>
            <div className="mt-[2rem] px-[5rem] hidden lg:block">
                <div className="grid grid-cols-4 gap-[1rem]">
                    {
                        listDataOrdertable.length > 0 && listDataOrdertable.filter(it => {
                            if(currentOrderTable === 'current'){
                                return it.status !== 'COMPLETED'
                            }
                            return it.status === 'COMPLETED';
                        }).map((item) => {
                        console.log(item)
                            return (
                                <div key={item.id} className="w-full h-auto shadow-xl rounded-[.5rem] shadow-gray-300">
                                    <div className={`w-full h-auto ${item.status === 'COMPLETED' ? "bg-gray-300" : "bg-green-200"} p-[1rem] rounded-tl-[.5rem] rounded-tr-[.5rem]`}>
                                        <h5 className={`${item.status === 'COMPLETED' ? "text-gray-400" : "text-gray-700"} text-center font-bold text-[1.8rem]`}>{item.Table.tableName}</h5>
                                    </div>
                                    <div className={`w-full h-auto bg-white p-[1rem] ${item.status === 'COMPLETED' ? "text-gray-400" : "text-gray-700"}`}>
                                        <div className="mb-[.5rem]">
                                            <span className="text-[1.2rem]">Khách hàng:</span>
                                            <h5>
                                                Nguyễn Trung Kiên
                                            </h5>
                                        </div>
                                        <div className="mb-[.5rem]">
                                            <span className="text-[1.2rem]">Số khách:</span>
                                            <p>
                                                {item.numberGuests} người
                                            </p>
                                        </div>
                                        <div className="mb-[.5rem]">
                                            <span className="text-[1.2rem]">Ngày đặt:</span>
                                            <p>
                                                {moment(item.createdAt).format('DD/MM/YYYY')} 
                                            </p>
                                        </div>
                                    </div>
                                    {
                                        item.status !== 'COMPLETED' ? (
                                            <div className="w-full h-auto flex items-center justify-between p-[1rem] border-t border-t-gray-300 bg-gray-50">
                                                <span className="text-[1.4rem]">
                                                    <span className={`${item.status === 'PAID' ? "text-green-500" : "text-amber-600"}`}>
                                                        {item.status === 'PENDING' ? 'Chờ xác nhận' : item.status === 'CONFIRM' ? 'Đã xác nhận' : item.status === 'CHECKED_IN' ? 'Khách đã đến' : item.status === 'COMPLETED' ? 'Bàn đã dùng xong' : item.status === 'NO_SHOW' ? 'Khách không đến' : 'Đã hủy'}
                                                    </span>
                                                </span>
                                                <span className="text-[1.4rem] px-[1rem] py-[.5rem] bg-blue-500 text-white rounded-[.5rem] hover:bg-blue-600 cursor-pointer"
                                                    onClick={() => {
                                                        setOpenUpdateOrdertable(item);
                                                    }}
                                                >Cập nhật</span>
                                            </div>
                                        ) : (
                                            <div className="text-[1.4rem] flex items-center justify-center gap-[.5rem] p-[1rem] border-t border-t-gray-300 text-gray-400">
                                                <span className="w-[2.5rem] h-[2.5rem] border rounded-full border-green-500 flex items-center justify-center text-green-500">
                                                    <FontAwesomeIcon icon={faCheck}/>
                                                </span>
                                                Đơn đặt bàn này đã hoàn thành
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
            openUpdateOrdertable && (
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
                            <option value="PENDING" >Chờ xác nhận</option>
                            <option value="CONFIRM" >Đã xác nhận</option>
                            <option value="CHECKED_IN" >Khách đã đến</option>
                            <option value="COMPLETED" >Bàn đã dùng xong</option>
                            <option value="NO_SHOW" >Khách không đến</option>
                            <option value="CANCELLED" >Hủy đơn hàng</option>
                        </select>
                        <p className="text-red-500 mt-[2rem]">{errMessage}</p>
                        <div className="flex items-center justify-center gap-[1rem] mt-[.5rem]">
                            <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-gray-200 text-gray-700 hover:bg-gray-300"
                                onClick={() => {
                                    setErrMessage('');
                                    setOpenUpdateOrdertable(null)
                                }}
                            >Hủy</button>
                            <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => handleUpdateOrderTable(openUpdateOrdertable.id, updateStatus)}
                            >Cập nhật</button>
                        </div>
                    </div>
                 </div>
            )
            }
        </div>
    );
}

export default OrderTable;