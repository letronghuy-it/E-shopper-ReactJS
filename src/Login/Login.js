import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Errorform from "../Register/Errorform";
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [errors, setError] = useState({});
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({
            ...state,
            [nameInput]: valueInput
        }))
    }

    const isEmail = (email) => {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    function DisplayErrors({ errors }) {
        return (
            <div>
                {Object.entries(errors).map(([key, value]) => (
                    <Errorform key={key} errors={{ [key]: value }} />
                ))}
            </div>
        );
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
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
        if (flag) {
            setError("");
            const data = {
                email:    inputs.email,
                password: inputs.password,
                level: 0
            }

            axios.post("http://localhost/laravel8/laravel8/public/api/login",data)
                .then((res) => {
                    if (res.data.errors) {
                        setError(res.data.errors)
                        setError({ email: 'Email không đúng', password: 'Mật khẩu không đúng' });
                    } else {
                        // console.log(res)
                        localStorage.setItem('isLoggedIn', true);
                        var dataObject = {
                            token: res.data.token,
                            Auth: res.data.Auth
                        };
                        var jsonData = JSON.stringify(dataObject);
                        localStorage.setItem("accessToken",jsonData);

                        navigate('/');
                    }
                })
                .catch(error => {
             
                    console.log(error);
                })
        } else {
            setError(errorSubmit)
        }
    }
    return (
        <div className="col-sm-9">
            <div className="signup-form">
                <h2>User Login!</h2>
                <DisplayErrors errors={errors} />
                <form onSubmit={handleSubmit} >
                    <input type="email" placeholder="Email" value={inputs.email} name="email" onChange={handleInput} />
                    <Errorform errors={{ email: errors.email }} />
                    <input type="password" placeholder="Password" value={inputs.password} name="password" onChange={handleInput} />
                    <Errorform errors={{ password: errors.password }} />
                    <button type="submit" className="btn btn-default">Login</button>

                </form>
                <h5><Link  to={'/register'}>Register</Link></h5>
            </div>
        </div>
    )
}
export default Login;
