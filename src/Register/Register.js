import axios from "axios";
import { useState } from "react";
import Errorform from "./Errorform";
import { useNavigate } from "react-router-dom";

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		level: 0
	})
	const [errors, setError] = useState({});
	const [getFile, setIFile] = useState("");
	const [avataFile, setAvataFile] = useState("");

	const handelInput = (e) => {
		const nameInput = e.target.name;
		const valueInput = e.target.value;
		setInputs(state => ({
			...state,
			[nameInput]: valueInput
		}))
	}

	const handelFile = (e) => {
		const file = e.target.files;
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

	const handelSubmit = (e) => {
		e.preventDefault();
		let errorSubmit = {};
		let flag = true;
		if (inputs.name === "") {
			errorSubmit.name = "Vui Lòng Nhập Name";
			flag = false;
		}

		if (inputs.email === "") {
			errorSubmit.email = "Vui lòng nhập email";
			flag = false;
		} else if (!isEmail(inputs.email)) {
			errorSubmit.email = "Không Đúng định dạng Email"
			flag = false;
		}

		if (inputs.password === "") {
			errorSubmit.password = "Vui lòng nhập password";
			flag = false;
		}
		if (inputs.phone === "") {
			errorSubmit.phone = "Vui lòng nhập phone";
			flag = false;
		}
		if (inputs.address === "") {
			errorSubmit.address = "Vui lòng nhập address";
			flag = false;
		}

		if (getFile === "") {
			errorSubmit.avata = "Vui lòng nhập Avatar";
			alert('Vui lòng nhập Avatar');
			flag = false;
		} else {
			let getsize = getFile.size;
			if (getsize > 1024 * 1024) {
				errorSubmit.avata = "File Quá Lớn Vui Lòng chọn file khác";
				flag = false;
			}
		}
		if (flag) {
			setError("");
			const formData = new FormData();
			formData.append("name", inputs.name);
			formData.append("email", inputs.email);
			formData.append("password", inputs.password);
			formData.append("phone", inputs.phone);
			formData.append("address", inputs.address);
			formData.append("avatar", avataFile);
			formData.append("level", inputs.level);
			axios.post("http://localhost/laravel8/laravel8/public/api/register", formData)
				.then((res) => {
					if(res.data.errors){
						setError(res.data.errors)
					}else{
						
						alert("Đã Đăng Kí Thành công");
						navigate('/login');
					}

				})
				.catch(error => console.log(error))
			
		} else {
			setError(errorSubmit)
		}


	}
	return (
		<div className="col-sm-9">
			<div class="signup-form">
				<h2>New User Signup!</h2>
				<form enctype="multipart/form-data" onSubmit={handelSubmit} >
					<input type="text" placeholder="Name" 			value={inputs.name} 	name="name"  	onChange={handelInput} />
					<Errorform errors={{ Name: errors.name }} />
					<input type="email" placeholder="Email" 		value={inputs.email} 	name="email" 	onChange={handelInput} />
					<Errorform errors={{ Name: errors.email }} />
					<input type="password" placeholder="Password"	 value={inputs.password}name="password" onChange={handelInput} />
					<Errorform errors={{ Name: errors.password }} />
					<input type="text" placeholder="Phone" 			value={inputs.phone} 	name="phone" 	onChange={handelInput} />
					<Errorform errors={{ Name: errors.phone }} />
					<input type="text" placeholder="Address" 		value={inputs.address} name="address" onChange={handelInput} />
					<Errorform errors={{ Name: errors.address }} />
					<label> Choose File Avatar</label>
					<input type="file" name="avatar" onChange={handelFile} />
					<Errorform errors={{ Name: errors.avatar }} />
					<button type="submit" class="btn btn-default">Signup</button>
				</form>
			</div>
		</div>
	)
}
export default Register;
