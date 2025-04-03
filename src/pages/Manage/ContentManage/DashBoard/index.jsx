import { faCartPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonthlyRevenue } from "../../../../services/monthlyRevenue";
import { useEffect, useMemo, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Line, Doughnut, Bar } from "react-chartjs-2";
  
  // 🟢 Đăng ký các thành phần của Chart.js
  ChartJS.register(
    LineElement,
    BarElement, // Đường trong biểu đồ Line
    PointElement, // Điểm trong biểu đồ Line
    ArcElement, // Thành phần của biểu đồ Doughnut
    CategoryScale, // Thang đo trên trục X
    LinearScale, // Thang đo trên trục Y
    Title,
    Tooltip,
    Legend
  );
  

function DashBoard() {
    const [listMonthlyRevenue, setListMonthlyRevenue] = useState([]);
    const [numCustomer, setNumCustomer] = useState(0);
    const [numOrder, setNumOrder] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await getMonthlyRevenue();
                if(response.errCode === 0) {
                    setListMonthlyRevenue(response.data.revenueData);   
                    setNumCustomer(response.data.numCustomer);
                    setNumOrder(response.data.numOrder);
                }
                console.log(response.data.revenueData);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleTotalRevenue = useMemo(() => {
        return listMonthlyRevenue.reduce((acc, curr) => {
            return acc + Number(curr.revenue); 
        }, 0);
    }, [listMonthlyRevenue]);

    return (  
        <div className="w-full pt-[3rem] px-[2rem] md:px-[5rem] pb-[4rem]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[2rem]">
                <div className="w-full h-[15rem] p-[2rem] flex flex-col justify-center items-start rounded-[1rem] shadow-2xl">
                    <span className="mb-[1rem] ">
                        Hóa đơn
                    </span>
                    <div className="flex items-center gap-[1rem]">
                        <span className="w-[5rem] h-[5rem] flex justify-center items-center rounded-[50%] border-[.1rem] border-[#22b9cd]">
                            <FontAwesomeIcon icon={faCartPlus} className="text-[#22b9cd]"/>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[1.8rem] font-bold">{numOrder}</span>
                            <span className="text-[1.4rem]">
                                %
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[15rem] p-[2rem] flex flex-col justify-center items-start rounded-[1rem] shadow-2xl">
                    <span className="mb-[1rem] ">
                        Doanh thu
                    </span>
                    <div className="flex items-center gap-[1rem]">
                        <span className="w-[5rem] h-[5rem] text-[2rem] flex justify-center items-center font-bold rounded-[50%] border-[.1rem] border-[#15d818] text-[#15d818]">
                            $
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[1.8rem] font-bold">{handleTotalRevenue.toLocaleString('vi-VN', {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            })}đ</span>
                            <span className="text-[1.4rem]">
                                %
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[15rem] p-[2rem] flex flex-col justify-center items-start rounded-[1rem] shadow-2xl">
                    <span className="mb-[1rem] ">
                        Khách hàng
                    </span>
                    <div className="flex items-center gap-[1rem]">
                        <span className="w-[5rem] h-[5rem] text-[2rem] flex justify-center items-center font-bold rounded-[50%] border-[.1rem] border-[#edb313]">
                            <FontAwesomeIcon icon={faUsers} className="text-[#edb313]"/>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[1.8rem] font-bold">{numCustomer}</span>
                            <span className="text-[1.4rem]">
                                %
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[40rem] mt-[4rem]">
                {
                    listMonthlyRevenue.length > 0 && (
                        <div className="w-full h-full">
                            <Line
                                data={{
                                    labels: listMonthlyRevenue.map((it) => it.day),
                                    datasets: [
                                        {
                                            label: 'Revenue',
                                            data: listMonthlyRevenue.map((item) => item.revenue),
                                            backgroundColor: ['#e67e22'],
                                            borderColor:'#3498db',
                                            tension: 0.4,
                                        }
                                        
                                    ]
                                }}
                                options={{
                                    scales: {
                                        x: { type: 'category' },  // Đảm bảo sử dụng 'category' ở trục x
                                        y: { beginAtZero: true }
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default DashBoard;