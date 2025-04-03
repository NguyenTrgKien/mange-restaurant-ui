import { useEffect, useRef, useState } from "react";
import { authPayment, getAllOrderForAdmin, getUserOrderHistory } from "../../../../services/userService";
import moment from 'moment';
import { faCalendarAlt, faCheckCircle, faReceipt, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Order() {
    const [listOrder, setListOrder] = useState([]);
    const [detailOrder, setDetailOrder] = useState(null);
    const [updateStatusOrder, setUpdateStatusOrder] = useState(null);
    const [updateStatus, setUpdateStatus] = useState('');
    const [messageUpdate, setMessageUpdate] = useState('');
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentOrder, setCurrentOrder] = useState('pending');
    const elementOrder = useRef();

    const dataOrder = async() => {
        try{
            const response = await getAllOrderForAdmin();
            console.log(response)
            if(response.errCode === 0) {
                const data = response.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                setListOrder(data);
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

    const handleAuthPayment = async(orderId, status) => {
        if(!status) {
            setMessageUpdate('Vui lòng chọn trạng thái!');
            return;
        }
        try{
            const response = await authPayment({orderId, status});
            console.log(response)
            if(response.errCode === 0) {
                setUpdateStatusOrder(null);
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
        <div className="pt-[2rem] md:pt-[3rem]">
            <div className="w-[16rem] md:w-[18rem] ml-[2rem] sm:ml-[3.5rem] md:ml-[5rem] h-[5rem] flex gap-[1rem] justify-center items-center rounded-[1rem] bg-[#1fc5c5] hover:bg-[#0cb7b7] transition-all duration-[.25s]"
            >
                <span className="text-[#fff] text-[1.5rem] md:text-[1.6rem]">
                    Danh sách đơn hàng
                </span>
            </div>
            <div className="relative flex items-center gap-[2rem] mt-[2rem] pb-[1rem] border-b border-b-gray-300 mx-[5rem]">
                <span
                    className={`cursor-pointer select-none ${currentOrder === 'pending' ? "text-blue-700" : "text-gray-700"} `}
                    ref={elementOrder}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrder('pending')
                    }}
                >
                    Chờ xác nhận
                </span>
                <span className={`cursor-pointer select-none ${currentOrder === 'paid' ? "text-blue-700" : "text-gray-700"} `}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrder('paid');
                    }}
                >
                    Đã thanh toán
                </span>
                <span className={`cursor-pointer select-none ${currentOrder === 'canceled' ? "text-blue-700" : "text-gray-700"} `}
                    onClick={(e) => {
                        handleSetCurrentProgress(e);
                        setCurrentOrder('canceled');
                    }}
                >
                    Đã hủy
                </span>
                <div className={`absolute bottom-0 h-[.2rem] rounded-full bg-blue-500 transition-all duration-[.35s]`} style={{
                    width: currentProgress.offsetWidth,
                    left: currentProgress.offsetLeft
                }}>

                </div>
            </div>
            <div className="mt-[2rem] px-[5rem] hidden lg:block table-order">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-gray-700">Mã đơn</th>
                        <th className="border p-2 text-gray-700">Khách hàng</th>
                        <th className="border p-2 text-gray-700">Ngày đặt</th>
                        <th className="border p-2 text-gray-700">Tổng tiền</th>
                        <th className="border p-2 text-gray-700">Trạng thái</th>
                        <th className="border p-2 text-gray-700">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            listOrder.length > 0 && listOrder.filter(it => {
                                console.log(it)
                                if(currentOrder === 'pending') {
                                    return it.status !== 'PAID' && it.status !== 'CANCELLED';
                                }else if(currentOrder === 'paid') {
                                    return it.status === 'PAID';
                                }else if(currentOrder === 'canceled'){
                                    return it.status === 'CANCELLED';;
                                }
                            }).map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="text-[1.4rem] text-gray-600">{item.id}</td>
                                        <td className="text-[1.4rem] text-gray-600">{item.fullName}</td>
                                        <td className="text-[1.4rem] text-gray-600">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                        <td className="text-[1.4rem] text-gray-600">{Number(item.totalAmount).toLocaleString('vi-VN', {
                                            maximumFractionDigits: 3,
                                            minimumFractionDigits: 3
                                        })}đ</td>
                                        <td className="text-[1.4rem] text-gray-600">
                                            <span className={`px-[1rem] py-[.5rem] rounded-[.5rem] ${item.status === 'PAID' ? "text-green-500" : "text-red-500"}`}>
                                                <p>{
                                                    item.status === 'PENDING' ? 'Chờ xác nhận' :
                                                    item.status === 'CONFIRM' ? 'Đã xác nhận' : 
                                                    item.status === 'PREPARING' ? 'Đang chuẩn bị' :
                                                    item.status === 'READY' ? 'Đã sẵn sàng phục vụ' :
                                                    item.status === 'WAITPAYMENT' ? 'Chờ thanh toán' :
                                                    item.status === 'PAID' ? 'Thanh toán thành công' :
                                                    item.status === 'CANCELLED' ? 'Đã hủy đơn hàng' :
                                                'Đã hủy'}</p>
                                           
                                            </span>
                                        </td>
                                        <td className="text-[1.4rem] text-gray-600">
                                            <div className="flex items-center justify-center gap-[1rem]">
                                                <button className=" px-3 py-1 bg-[#5353ff] text-[#fff] rounded-[.5rem] cursor-pointer hover:bg-[#1e1eff]"
                                                    onClick={() => setDetailOrder(item)}
                                                >
                                                    <FontAwesomeIcon icon={faReceipt} className="text-[1.2rem] pr-2"/>
                                                    Chi tiết
                                                </button>
                                                {
                                                    item.status !== 'PAID' && item.status !== 'CANCELLED' ? (
                                                        <button className="px-3 py-1 bg-green-500 text-white rounded-[.5rem] hover:bg-green-600 cursor-pointer"
                                                            onClick={() => {
                                                                setUpdateStatusOrder(item);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-[1.2rem] pr-2" />
                                                            Cập nhật
                                                        </button>
                                                    ): (
                                                        ''
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={`block lg:hidden mt-[2rem]`}>
                {listOrder.filter(it => {
                    console.log(it)
                    if(currentOrder === 'pending') {
                        return it.status !== 'PAID' && it.status !== 'CANCELLED';
                    }else if(currentOrder === 'paid') {
                        return it.status === 'PAID';
                    }else if(currentOrder === 'canceled'){
                        return it.status === 'CANCELLED';;
                    }
                }).map((item) => (
                <div key={item.id} className={`py-[2rem] px-[2rem] sm:px-[3.5rem] md:px-[5rem] border-b ${item.status === 'PENDING' ? "bg-[#fff0f0]" : "bg-[#f3fff3]"} border-gray-200`}>
                    <p><strong>Mã đơn:</strong> {item.id}</p>
                    <p><strong>Khách hàng:</strong> {item.fullName}</p>
                    <p><strong>Ngày đặt:</strong> {moment(item.createdAt).format('DD/MM/YYYY')}</p>
                    <p><strong>Tổng tiền:</strong> {item.totalAmount}đ</p>
                    <p><strong>Trạng thái:</strong> {
                    item.status === 'PENDING' ? 'Chờ xác nhận' :
                    item.status === 'CONFIRM' ? 'Đã xác nhận' : 
                    item.status === 'PREPARING' ? 'Đang chuẩn bị' :
                    item.status === 'READY' ? 'Đã sẵn sàng phục vụ' :
                    item.status === 'WAITPAYMENT' ? 'Chờ thanh toán' :
                    item.status === 'PAID' ? 'Thanh toán thành công' :
                    item.status === 'CANCELLED' ? 'Đã hủy đơn hàng' :
                    'Đã hủy'}</p>

                    <div className="mt-2 flex gap-2">
                        <button className="px-3 py-1 bg-[#5353ff] text-white rounded-[.5rem]"
                            onClick={() => setDetailOrder(item)}
                        >Chi tiết</button>
                        {item.status === 'PENDING' && (
                            <button className="px-3 py-1 bg-green-500 text-white rounded-[.5rem]"
                                onClick={() => handleAuthPayment(item.id, 'PAID')}
                            >Xác nhận thanh toán</button>
                        )}
                    </div>
            </div>
    ))}
</div>

            {
                detailOrder && (
                    <div className="fixed inset-0 flex justify-center items-center bg-[#6060606d] z-[950]">
                        <div className="w-[90%] md:w-[45rem] p-[2rem] rounded-[1rem] shadow text-center bg-white">
                            <h2 className="text-[2rem] font-bold mb-2 text-green-700">Chi tiết đơn hàng</h2>
                            <p className="mt-[.5rem]"><strong>Mã đơn:</strong> {detailOrder.id}</p>
                            <p className="mt-[.5rem]"><strong>Khách hàng:</strong> {detailOrder.fullName}</p>
                            <p className="mt-[.5rem]"><strong>Tổng tiền:</strong> {Number(detailOrder.totalAmount).toLocaleString('vi-Vn', {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            })} VND</p>
                            {
                                detailOrder.status !== 'CANCELLED' ? (
                                    <p className="mt-[.5rem]"><strong>Phương thức thanh toán:</strong> {detailOrder.paymentMethod === 'HERE' ? "Tại nhà hàng" : "Ví MOMO"}</p>
                                ): (
                                    <div className=""></div>
                                )
                            }
                            <span className="text-start pt-[.8rem] border-t-[.1rem] border-t-[#c8c8c8] block mt-[.8rem]">
                                Danh sách sản phẩm
                            </span>
                            <div className="w-full h-[25rem] mt-[1rem] flex flex-col gap-[1.5rem] overflow-y-scroll removeScrollbar">
                                {
                                    detailOrder.OrderItems.length > 0 && detailOrder.OrderItems.map((it) => {
                                        return (
                                            <div key={it.id} className="flex items-center gap-[1rem]">
                                                <img src={`http://localhost:3000/${it.Food.image}`} alt="img" className="w-[5rem] h-[5rem] object-cover"/>
                                                <div className="flex flex-col items-start">
                                                    <span className="font-bold">{it.Food.dishName}</span>
                                                    <span className="text-[1.2rem]">{it.Food.price}đ</span>
                                                </div>
                                                <span className="ml-auto text-[1.4rem]">Số lượng: {it.quantityOrder}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="mt-4 px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => setDetailOrder(null)}
                            >
                            Đóng
                            </button>
                        </div>
                    </div>
                )
            }
            {
                updateStatusOrder && (
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
                                <option value="PREPARING" >Đang chuẩn bị</option>
                                <option value="READY" >Đã sẵn sàng phục vụ</option>
                                <option value="WAITPAYMENT" >Chờ thanh toán</option>
                                <option value="PAID" >Thanh toán thành công</option>
                                <option value="CANCELLED" >Hủy đơn hàng</option>
                            </select>
                            <p className="text-red-500 mt-[2rem]">{messageUpdate}</p>
                            <div className="flex items-center justify-center gap-[1rem] mt-[.5rem]">
                                <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    onClick={() => {
                                        setMessageUpdate('');
                                        setUpdateStatusOrder(false)
                                    }}
                                >Hủy</button>
                                <button className="px-[1rem] py-[.5rem] rounded-[.5rem] bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => handleAuthPayment(updateStatusOrder.id, updateStatus)}
                                >Cập nhật</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Order;