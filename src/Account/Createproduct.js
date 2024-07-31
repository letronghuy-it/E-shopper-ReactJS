import axios from "axios";
import { useEffect, useState } from "react";
import Errorform from "../Register/Errorform";

function CreateProduct() {
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [errors, setError] = useState({});
    const [getFile, setIFile] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        price: 0,
        category: 0,
        brand: 0,
        sale: "",
        status: '1',
        number: "",
        company: "",
        detail: "",
    });

    const handelInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({
            ...state, [nameInput]: valueInput
        }));
    };

    const handelFile = (e) => {
        const file = e.target.files;
        setIFile(file);
    };

    const DataCategory = () => {
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
            .then((res) => {
                if (res && res.data) {
                    setDataCategory(res.data.category);
                    setDataBrand(res.data.brand);
                } else {
                    console.log("Không có Data");
                }
            });
    };

    useEffect(() => {
        DataCategory();
    }, []);

    const handelSubmit = (e) => {
        e.preventDefault();
        let getData = localStorage.getItem("accessToken");
        if (getData) {
            getData = JSON.parse(getData);
        }
        let accessToken = getData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/add';
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        let flag = true;
        let submitError = {};

        if (inputs.name === "") {
            submitError.name = "Vui lòng nhập name";
            flag = false;

        }
        if (inputs.price === 0) {
            submitError.price = "Vui lòng chọn giá";
            flag = false;
        }
        if (inputs.category === 0) {
            submitError.category = "Vui Lòng chọn Category";
            flag = false;
        }
        if (inputs.brand === 0) {
            submitError.brand = "Vui lòng chọn Brand";
            flag = false;
        }
        if (inputs.company === "") {
            submitError.company = "Vui lòng nhập profile Company";
            flag = false;
        }
        if (getFile === "") {
            submitError.getFile = "Vui lòng Chọn Hình ảnh";
            flag = false;
        } else {
            Object.keys(getFile).map((key, index) => {
                let getsize = getFile[key]['size'];
                if (getsize > 1024 * 1024) {
                    alert("File Quá Lớn Vui Lòng chọn file khác");
                    flag = false;
                }
            });
        }

        if (flag) {
            setError("");
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('price', inputs.price);
            formData.append('category', inputs.category);
            formData.append('brand', inputs.brand);
            formData.append('company', inputs.company);
            formData.append('detail', inputs.detail ? inputs.detail:0);
            formData.append('status', inputs.status);
            formData.append('sale', inputs.sale);

            Object.keys(getFile).map((item, i) => {
                formData.append("file[]", getFile[item]);
            });

            axios.post(url, formData, config)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res);
                    } else {
                        console.log("Không có dữ liệu ");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setError(submitError);
        }

    };

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update User</h2>
                <div className="signup-form" onSubmit={handelSubmit}>
                    <h2>Create Product!</h2>
                    <form encType="multipart/form-data" >
                        <input type="text" placeholder="Name" name="name" onChange={handelInput} />
                        <Errorform errors={{ name: errors && errors.name ? errors.name : '' }} />
                        <input type="number" placeholder="Price" name="price" onChange={handelInput} />
                        <Errorform errors={{ name: errors && errors.price ? errors.price : '' }} />

                        <select name="category" onChange={handelInput}>
                            <option value={0}>Please choose category</option>
                            {dataCategory.map((value, key) => (
                                <option key={key} value={value.id}> 
                                    {value.category}
                                </option>
                            ))}
                        </select>
                        <Errorform errors={{ name: errors && errors.category ? errors.category : '' }} />

                        <select name="brand" onChange={handelInput}>
                            <option value={0}>Please choose brand</option>
                            {dataBrand.map((value, key) => (
                                <option key={key} value={value.id} >
                                    {value.brand}
                                </option>
                           
                            ))}
                        </select>
                        <Errorform errors={{ name: errors && errors.brand ? errors.brand : '' }} />

                        <select name="status" value={inputs.status} onChange={handelInput}>
                            <option value="0">New</option>
                            <option value="1">Sale</option>
                        </select>

                        {inputs.status === '1' && (
                            <input
                                type="number"
                                placeholder="Sale Price"
                                name="sale"
                                onChange={handelInput}
                            />
                        )}
                        <input type="text" placeholder="Company profile" name="company" onChange={handelInput} />
                        <Errorform errors={{ name: errors && errors.company ? errors.company : '' }} />

                        <label htmlFor="file">Select files:</label>
                        <input type="file" name="file" multiple onChange={handelFile} />
                        <br />
                        <Errorform errors={{ name: errors && errors.getFile ? errors.getFile : '' }} />
                        <textarea cols={3} rows={3} placeholder="Detail" name="detail" onChange={handelInput}>
                        </textarea>
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateProduct;
