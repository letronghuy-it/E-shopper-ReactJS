import { useEffect, useState } from "react";
import Errorform from "../Register/Errorform";
import axios from "axios";


function Account() {
    const [errors, setErrors] = useState();
    const [users, setUsers] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
    })
    const [getFile, setIFile] = useState("");
    const [avataFile, setAvataFile] = useState("");


    useEffect(() => {
        let userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData);
            setUsers({
                name: userData.Auth.name,
                email: userData.Auth.email,
                phone: userData.Auth.phone,
                address: userData.Auth.address,
                avatar: userData.Auth.avatar,
            });
        }
    }, [])

    const handelInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setUsers(state => ({
            ...state,
            [nameInput]: valueInput
        }))
    }
    const handelFile = (e) => {
        const file = e.target.files;
        console.log(file);
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvataFile(e.target.result);
            setIFile(file[0])
        };
        reader.readAsDataURL(file[0])

    }
    const isEmail = (email) => {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData);
        }
        let accessToken = userData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/update/' + userData.Auth.id;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        let flag = true;
        let errorSubmit = {};
        if (users.name === "") {
            errorSubmit.name = "Vui lòng nhập name";
            flag = false;
        }
        if (users.email === "") {
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        } else if (!isEmail(users.email)) {
            errorSubmit.email = "Email không đúng định dạng"
            flag = false;
        }
        if (users.phone === "") {
            errorSubmit.phone = "Vui lòng nhập phone";
            flag = false;
        }
        if (users.address === "") {
            errorSubmit.address = "Vui lòng không để trống Adress";
            flag = false;
        }
        if (users.avatar === "") {
            errorSubmit.avatar = "Vui lòng Chọn Avata";
            flag = false;
            alert("Vui Lòng chọn Avata");
        } else {
            let getsize = getFile.size;
            if (getsize > 1024 * 1024) {
                errorSubmit.avata = "File Quá Lớn Vui Lòng chọn file khác";
                flag = false;
            }
        }
        if (flag) {

            setErrors("")
            const formData = new FormData();
            formData.append('name', users.name)
            formData.append('email', users.email)
            formData.append('phone', users.phone)
            formData.append('password', users.password ? users.password : "")
            formData.append('address', users.address)
            formData.append('avatar', users.avatar)
            axios.post(url, formData, config)
                .then((res) => {
                    if (res & res.data) {
                        console.log(res);
                    } else {
                        console.log("Không có dữ liệu ");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                alert("Cập nhật thông tin thành công !")
        }
        else {
            setErrors(errorSubmit);
        }

    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">
                    <h2>New User Signup!</h2>
                    <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                        <input type="text" placeholder="username" name="name" value={users.name} onChange={handelInput} />
                        <Errorform errors={{ name: errors && errors.name ? errors.name : '' }} />
                        <input type="email" placeholder="abc@gamil.com" name="email" value={users.email} onChange={handelInput} />
                        <Errorform errors={{ email: errors && errors.email ? errors.email : '' }} />
                        <input type="text" placeholder="+84 (190000)" name="phone" value={users.phone} onChange={handelInput} />
                        <Errorform errors={{ phone: errors && errors.phone ? errors.phone : '' }} />
                        <input type="password" placeholder="******" name="password" onChange={handelInput} />
                        <input type="text" placeholder="Da Nang City" name="address" value={users.address} onChange={handelInput} />
                        <Errorform errors={{ address: errors && errors.address ? errors.address : '' }} />
                        <label> Choose File Avatar</label>
                        <input type="file" name="avatar" onChange={handelFile} />
                        <Errorform errors={{ avatar: errors && errors.avatar ? errors.avatar : '' }} />
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Account;