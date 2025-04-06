import { useState } from "react";

function SupperAdmin() {
    const [urlImg, setUrlImg] = useState('');
    const [valueAdmin, setValueAdmin] = useState({
        email: '',
        password: '',
        role: 'Admin',
        image: '',
        fullName: '',
    });

    const handleChangeAdmin = ({target}) => {
        const {name, value} = target;
        console.log(name, value)
        if(name === 'image'){
            console.log(target.files[0]);
            const url = URL.createObjectURL(target.files[0]);
            console.log(url);
            setUrlImg(url);
            setValueAdmin(prev => ({
                ...prev,
                [name]: target.files[0]
            }))
        }else{
            setValueAdmin(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(valueAdmin).forEach(([key, value]) => (
            formData.append(key, value)
        ))
        try {
            
            const response = await fetch("https://quanlynhahang.onrender.com/api/v1/create-admin", {
                method: "POST",
                body: formData,
                credentials: 'include'
            });
    
            const result = await response.json();
            if(result.errCode === 0) {
                console.log("Tạo admin thành công:", result);
            }
        } catch (error) {
            console.error("Lỗi khi tạo admin:", error);
        }
    }

    return (  
        <div className="w-full h-[100vh] bg-[#ffffff] p-[4rem]">
            <div className="text-[3rem] font-bold text-[red] mb-[2rem]">
                Supper Admin
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-[2rem]">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="w-[40rem] h-[5rem] border-[.1rem] pl-[1.6rem] rounded-[.5rem]" value={valueAdmin.email} placeholder="Input Email..."
                        onChange={(e) => handleChangeAdmin(e)}
                    />
                </div>
                <div className="flex flex-col mb-[2rem]">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" className="w-[40rem] h-[5rem] border-[.1rem] pl-[1.6rem] rounded-[.5rem]" value={valueAdmin.password} placeholder="Input password..."
                        onChange={(e) => handleChangeAdmin(e)}
                    />
                </div>
                <div className="flex flex-col mb-[2rem]">
                    <label htmlFor="fullName">fullName</label>
                    <input type="fullName" name="fullName" className="w-[40rem] h-[5rem] border-[.1rem] pl-[1.6rem] rounded-[.5rem]" value={valueAdmin.fullName} placeholder="Input fullname..."
                        onChange={(e) => handleChangeAdmin(e)}
                    />
                </div>
                <div className="flex items-center gap-[4rem]">
                    <div className="mb-[2rem] rounded-[.5rem] border-[.1rem] w-[20rem] h-[5rem] flex justify-center items-center bg-[#ddd]">
                        <label htmlFor="image">image</label>
                        <input type="file" name="image" id="image" className="w-[40rem] h-[5rem] border-[.1rem] pl-[1.6rem] rounded-[.5rem]" placeholder="Input Email..." hidden
                            onChange={(e) => handleChangeAdmin(e)}
                        />
                    </div>
                    <img
                        src={urlImg}
                        alt="img admin"
                        className="w-[10rem] h-[10rem] border-[.1rem]"
                    />

                </div>
                <button className="px-[6rem] mt-[2rem] py-[1rem] bg-[red] text-[#fff] rounded-[1rem] cursor-pointer" type="submit">
                    Tạo
                </button>
            </form>
        </div>
    );
}

export default SupperAdmin;