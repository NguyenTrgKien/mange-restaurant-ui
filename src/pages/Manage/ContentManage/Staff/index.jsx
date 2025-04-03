import { faCheck, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddStaff from "./AddStaff";
import { deleteStaff, getAllStaff, getPositionStaff, getStatusStaff } from "../../../../services/staffService";
import DeleteItem from "../../../../components/DeleteItem";

function Staff() {
  const [showAddStaff, setShowAddStaff] = useState(null);
  // const [message, setMessage] = useState('');
  const [showDelete, setShowDelete] = useState(null);
  const [statusStaff, setStatusStaff] = useState([]);
  const [deleteStaffIsSuccess, setDeleteStaffIsSuccess] = useState(false);
  const [positionStaff, setPositionStaff] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const handleShowAddStaff = (value) => {
    setShowAddStaff(value);
  }

  useEffect(() => {
    const handleGetInfo = async() => {
        try{
            const resStatus = await getStatusStaff();
            const resPositionStaff = await getPositionStaff();
            if(resStatus.errCode === 0 && resPositionStaff.errCode === 0) {
                setStatusStaff(resStatus.message);
                setPositionStaff(resPositionStaff.message);
            }
        }catch(error){
            console.log(error);
        }
    }
    handleGetInfo();
  }, []); 

  const handleGetAllStaff = async() => {
    try{
      const res = await getAllStaff();
      if(res.errCode === 0){
        setStaffs(res.data);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetAllStaff();
  }, []);

  const handleShowDelete = (value) => {
    setShowDelete(value);
  }

  const handleDelete = async(userId) => {
    try{
      const message = await deleteStaff(userId);
      if(message.errCode === 0) {
        setDeleteStaffIsSuccess(true);
        handleShowDelete(null);
        setTimeout(() => {
          setDeleteStaffIsSuccess(false);
        }, 400);
        handleGetAllStaff();
      }
    }catch(error){
      console.log(error);
    }
  }

  return (  
    <div className="w-full h-[100%] py-[1rem]">
      <div className="w-[18rem] ml-[5rem] h-[5rem] mt-[2rem] flex gap-[1rem] justify-center items-center rounded-[1rem] bg-[#1fc5c5] cursor-pointer hover:bg-[#0cb7b7] transition-all duration-[.25s]"
          onClick={()=>handleShowAddStaff('add')}
      >
          <FontAwesomeIcon icon={faPlus} className="text-[#fff]"/>
          <span className="text-[#fff]">
              Thêm nhân viên
          </span>
      </div>
      {
        showAddStaff && (
          <AddStaff statusStaff={statusStaff} positionStaff={positionStaff} showAddStaff={showAddStaff} handleShowAddStaff={handleShowAddStaff} handleGetAllStaff={handleGetAllStaff}/>
        )
      }
      <div className="w-full h-auto mt-[2rem] px-[5rem] hidden lg:block table-manage-table">
        <table className="mt-[2rem] w-full">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Hình ảnh</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
              <th>Ngày bắt đầu</th>
              <th>Lương</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {
              staffs?.length > 0 && staffs.map((staff) => {
                return (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td className="w-[10rem] h-[8rem]">
                      <img src={`http://localhost:3000/${staff.image}`} alt="img" className="w-full h-[8rem] rounded-[.1rem] mx-auto object-cover"/>
                    </td>
                    <td>{staff.fullName}</td>
                    <td>{staff.email}</td>
                    <td>{positionStaff.length > 0 && positionStaff.find((it) => it.id === staff.positionId)?.name || 'Đang tải...'}</td>
                    <td>{statusStaff.length > 0 && statusStaff.find((it) => it.id === staff.statusId)?.statusName || 'Đang tải...'}</td>
                    <td>{staff.startDate}</td>
                    <td>{staff.salary}</td>
                    <td>
                      <div className="flex  justify-center items-center gap-[1rem]">
                        <button className="px-[1rem] flex items-center gap-[.5rem] py-[.8rem] bg-[#e6cd10] text-[#fff] rounded-[.5rem] hover:opacity-[.8]"
                          onClick={() => handleShowAddStaff(staff)}
                        >
                          <FontAwesomeIcon icon={faEdit}/>
                          Edit
                        </button>
                        <button className="px-[1rem] flex items-center gap-[.5rem] py-[.8rem] bg-[red] text-[#fff] rounded-[.5rem] hover:opacity-[.8]"
                          onClick={() => handleShowDelete(staff.userId)}
                        >
                          <FontAwesomeIcon icon={faTrash}/>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className="lg:hidden flex flex-col gap-[1rem] px-[2rem] sm:px-[3.5rem] md:px-[5rem] lg:px-0  mt-[2rem]">
          {
            staffs.length > 0 && staffs.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-[1rem] justify-between py-[2rem] border-b-[.1rem] border-b-[#ccc]">
                  <div>
                    <img src={`http://localhost:3000/${item.image}`} alt="img" className="w-[6rem] h-[6rem]"/>
                  </div>
                  <div className="flex flex-col">
                  <span><strong>Id: </strong> 5</span>
                    <h4 ><strong>Tên: </strong>{item.fullName}</h4>
                    <span><strong>gmail: </strong>{item.email}</span>
                    <span>
                      <strong>Ngày bắt đầu: </strong>{item.startDate}
                    </span>
                    <span><strong>Chức vụ: </strong> {positionStaff.length > 0 && positionStaff.find((it) => it.id === item.positionId)?.name || 'Đang tải...'}</span>
                    <span>
                      <strong>Trạng thái: </strong>{statusStaff.length > 0 && statusStaff.find((it) => it.id === item.statusId)?.statusName || 'Đang tải...'}
                    </span>
                    <span>
                      <strong>Lương: </strong>{item.salary}
                    </span>
                  </div>
                  <div className="flex md:flex-row flex-col justify-center items-center gap-[1rem]">
                      <button className="px-[1rem] flex items-center gap-[.5rem] py-[.8rem] bg-[#e6cd10] text-[#fff] rounded-[.5rem] hover:opacity-[.8]"
                        onClick={() => handleShowAddStaff(item)}
                      >
                        <FontAwesomeIcon icon={faEdit}/>
                        Edit
                      </button>
                      <button className="px-[1rem] flex items-center gap-[.5rem] py-[.8rem] bg-[red] text-[#fff] rounded-[.5rem] hover:opacity-[.8]"
                        onClick={() => handleShowDelete(item.userId)}
                      >
                        <FontAwesomeIcon icon={faTrash}/>
                        Xóa
                      </button>
                    </div>
                </div>

              )
            })
          }
      </div>
      {
        showDelete && (
          <DeleteItem item={showDelete} itemName={'nhân viên'} handleShowDelete={handleShowDelete} handleDelete={handleDelete}/>
        )
      }
      {
        deleteStaffIsSuccess && (
        <div className="fixed flex justify-center items-center inset-0 z-[400] bg-[#50505052]">
            <div className="w-[40rem] h-auto py-[3rem] flex flex-col items-center gap-[1.5rem] bg-[#fff] rounded-[1rem] text-[2rem] font-bold">
                <FontAwesomeIcon icon={faCheck} className="p-[2rem] rounded-[50%] border-[.2rem] text-[#00be00] border-[#00be00]"/>
                Xóa nhân viên thành công!
            </div>
        </div>
        )
      }
    </div>
  );
}

export default Staff;