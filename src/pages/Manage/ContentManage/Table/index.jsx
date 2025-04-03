import { faCheck, faCheckCircle, faClock, faPlus, faSearch, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAllTable, updateTable } from "../../../../services/tableService";

function Table() {
    const [listTable, setListTable] = useState([]);
    const [searchTable, setSearchTable] = useState('');

    const getTable = async() => {
        try{
            const message = await getAllTable();
            if(message.errCode === 0) {
                setListTable(message.message);
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getTable();
    }, []);

    const handleUpdateTable = async(id, status) => {
        try{
            const update = {
                tableId: id,
                status
            }
            const message = await updateTable(update);
            console.log(message);
            if(message.errCode === 0) {
                getTable();
            }

        }catch(error) {
            console.log(error);
        }
    }

    return (  
        <div className="w-full h-auto sm:px-[3.5rem] md:px-[5rem] pt-[3rem]">
            <div className="flex items-center justify-between">
                <div className="w-[16rem]  h-[4.8rem] md:h-[5rem] flex gap-[1rem] justify-center items-center rounded-[1rem] bg-[#1fc5c5] cursor-pointer hover:bg-[#0cb7b7] transition-all duration-[.25s]"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-[#fff]"/>
                    <span className="text-[#fff]">
                        Thêm bàn
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        className="w-[16rem] sm:w-[22rem] md:w-[28rem] h-[4.8rem] md:h-[5rem] px-[1rem] pr-[3rem] border border-gray-400 rounded-[0.75rem] focus:outline-none focus:ring-2 focus:ring-[#1fc5c5] transition-all"
                        value={searchTable}
                        placeholder="Tìm kiếm theo tên bàn..."
                        onChange={(e) => setSearchTable(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                </div>
                
            </div>
            <div className="hidden md:block mt-[2rem]">
                <div className="grid grid-cols-4 gap-[2rem]">
                    {
                        listTable.length > 0 && listTable.filter(it => it.tableName.toLowerCase().includes(searchTable.toLowerCase())).map((item) => {
                            return (
                                <div key={item.id} className={`w-full h-[15rem] p-[1rem] rounded-[.5rem] border-[.3rem] ${item.status === 'Còn trống' ? "border-green-200 bg-green-100" : item.status === 'Đã được đặt' ? "border-amber-200 bg-yellow-100" : "border-red-200 bg-red-100"}`}>
                                    <h3 className={`text-[2.4rem] ${item.status === 'Còn trống' ? "text-green-700" : item.status === 'Đã được đặt' ? "text-yellow-600" : "text-red-600"}`}>
                                        {item.tableName}
                                    </h3>
                                    <div className={`flex items-center gap-[.4rem] ${item.status === 'Còn trống' ? "text-green-700" : item.status === 'Đã được đặt' ? "text-yellow-600" : "text-red-600"}`}>
                                        {
                                            item.status === 'Còn trống' ? (
                                                <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-[2rem]"/>
                                                </span>
                                            ) : item.status === 'Đã được đặt' ? (
                                                <FontAwesomeIcon icon={faClock}/>
                                            ) : (
                                                <FontAwesomeIcon icon={faUtensils}/>
                                            )
                                        }
                                        {item.status}
                                    </div>
                                    <div className={`flex items-center gap-[.6rem] pt-[1.5rem] mt-[1.5rem] border-t ${item.status === 'Còn trống' ? "border-t-green-500" : item.status === 'Đã được đặt' ? "border-t-yellow-500" : "border-t-red-500"}`}>
                                        <button className={`px-[.6rem] py-[.5rem] ${item.status === 'Còn trống' ? "bg-green-500 text-white" : "bg-white text-green-600"} rounded-full border border-green-500 text-[1.2rem] `}
                                             onClick={() => handleUpdateTable(item.id, 'Còn trống')}
                                        >Còn trống</button>
                                        <button className={`px-[.6rem] py-[.5rem] ${item.status === 'Đã được đặt' ? "bg-yellow-500 text-white" : "bg-white text-yellow-700"}  rounded-full border border-yellow-500 text-[1.2rem] `}
                                            onClick={() => handleUpdateTable(item.id, 'Đã được đặt')}
                                        >Đã được đặt</button>
                                        <button className={`px-[.6rem] py-[.5rem] ${item.status === 'Đang sử dụng' ? "bg-red-500 text-white" : "bg-white text-red-700"}  rounded-full border border-red-500 text-[1.2rem] `}
                                            onClick={() => handleUpdateTable(item.id, 'Đang sử dụng')}
                                        >Đang dùng</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên bàn</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listTable.length > 0 && listTable.map((table) => {
                                return (
                                    <tr key={table.id} className={`${table.status === 'Còn trống' ? "bg-[#efffef]" : table.status === "Đã được đặt" ? "bg-[#fcffe0]" : "bg-[#ffeeee]"}`}>
                                        <td>{table.id}</td>
                                        <td>Bàn {table.tableName}</td>
                                        <td>{table.status}</td>
                                        <td>
                                            <div className="flex items-center gap-[1rem] justify-center">
                                                <button className="px-[2rem] py-[1rem] bg-[#5cda49] text-[#fff] rounded-[.5rem]"
                                                    onClick={() => handleUpdateTable(table.id, 'Còn trống')}
                                                >Còn trống</button>
                                                <button className="px-[2rem] py-[1rem] bg-[#db3c3c] text-[#fff] rounded-[.5rem]"
                                                    onClick={() => handleUpdateTable(table.id, 'Đang sử dụng')}
                                                >Đang sử dụng</button>
                                                <button className="px-[2rem] py-[1rem] bg-[#eabe30] text-[#fff] rounded-[.5rem]"
                                                    onClick={() => handleUpdateTable(table.id, 'Đã được đặt')}
                                                >Đã đặt trước</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
            </div>

            <div className="md:hidden mt-[2rem] ">
                {
                    listTable.length > 0 && listTable.map((item) => {
                        return ( // className={`${table.status === 'Còn trống' ? "bg-[#efffef]" : table.status === "Đã được đặt" ? "bg-[#fcffe0]" : "bg-[#ffeeee]"}`}
                            <div key={item.id} className={`flex items-center justify-between py-[2rem] border-b-[.1rem] border-b-[#ccc] ${item.status === 'Còn trống' ? "bg-[#efffef]" : item.status === "Đã được đặt" ? "bg-[#fcffe0]" : "bg-[#ffeeee]"} px-[2rem]`}>
                                <div className="flex flex-col w-[50%]">
                                    <span><strong>STT: </strong>1</span>
                                    <span><strong>Tên bàn: </strong> Bàn 01</span>
                                    <span><strong>Trạng thái: </strong>Còn trống</span>
                                </div>
                                <div className="w-[50%] flex flex-col items-end gap-[.5rem]">
                                    <button className="px-[1rem] py-[.5rem] md:px-[2rem] md:py-[1rem] bg-[#5cda49] text-[#fff] rounded-[.5rem]"
                                        onClick={() => handleUpdateTable(table.id, 'Còn trống')}
                                    >Còn trống</button>
                                    <button className="px-[1rem] py-[.5rem] md:px-[2rem] md:py-[1rem] bg-[#db3c3c] text-[#fff] rounded-[.5rem]"
                                        onClick={() => handleUpdateTable(table.id, 'Đang sử dụng')}
                                    >Đang sử dụng</button>
                                    <button className="px-[1rem] py-[.5rem] md:px-[2rem] md:py-[1rem] bg-[#eabe30] text-[#fff] rounded-[.5rem]"
                                        onClick={() => handleUpdateTable(table.id, 'Đã được đặt')}
                                    >Đã đặt trước</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Table;