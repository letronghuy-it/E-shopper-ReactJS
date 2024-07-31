import axios from "axios";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import Errorform from "../Register/Errorform";

function Editproduct(props) {
    let params = useParams();
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataid_user, setDataid_user] = useState([]);
    const [getFile, setIFile] = useState("");
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        category: 0,
        brand: 0,
        company: "",
        detail: "",
        image: "",
        sale: "",
        status: '1',
    });
    const [errors, setErrors] = useState({});
    const [avatarCheckBox, setAvatarCheckBox] = useState([]);

    const handelInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setProduct(state => ({ ...state, [nameInput]: valueInput }))
    }
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
    const Dataproducted = () => {
        let userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData);
        }
        let accessToken = userData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/' + params.id;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        axios.get(url, config)
            .then((res) => {
                if (res && res.data) {
                    setDataid_user(res.data.data.id_user)
                    setProduct({
                        name: res.data.data.name,
                        price: res.data.data.price,
                        category: res.data.data.id_category,
                        brand: res.data.data.id_brand,
                        company: res.data.data.company_profile,
                        detail: res.data.data.detail,
                        status: res.data.data.status,
                        image: res.data.data.image,
                        sale: res.data.data.sale
                    });


                } else {
                    console.log("Không có Data");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleCheckboxChange = (e, image) => {
        let newAvatarCheckBox;
        if (e.target.checked) {
            if (avatarCheckBox.length < 3) {
                newAvatarCheckBox = [...avatarCheckBox, image];
            } else {
                alert("Bạn chỉ có thể chọn tối đa 3 hình ảnh.");
                e.target.checked = false;
            }
        } else {
            newAvatarCheckBox = avatarCheckBox.filter(item => item !== image);
        }
        setAvatarCheckBox(newAvatarCheckBox);
    }

    function renderimage() {
        if ((product.image).length > 0) {
            return (product.image).map((img, index) => {
                return (
                    <li key={index}>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, img)} />
                        <img width={150} src={"http://localhost/laravel8/laravel8/public/upload/product/" + dataid_user + "/" + img} alt="" />
                    </li>
                    )
            })
        }
    }
    const handelFile = (e) => {
        const file = e.target.files;
        setIFile(file);
    };
    useEffect(() => {
        DataCategory();
        Dataproducted();
        
    }, [params.id])

    const handelSubmit = (e) => {
        e.preventDefault();
        let getData = localStorage.getItem("accessToken");
        if (getData) {
            getData = JSON.parse(getData);
        }

        let accessToken = getData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/update/' + params.id;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        let errorsubmit = {};
        let flag = true;
        if (product.name === "") {
            errorsubmit.name = "Vui lòng không để trống name!";
            flag = false;
        }
        if (product.price === "") {
            errorsubmit.price = "Vui lòng không để trống price !";
            flag = false;
        }
        if (product.category === "0") {
            errorsubmit.category = "Vui lòng Chọn category !";
            flag = false;
        }
        if (product.brand === "0") {
            errorsubmit.brand = "Vui lòng Chọn brand !";
            flag = false;
        }
        if (product.company === "") {
            errorsubmit.company = "Vui lòng nhập profile Company";
            flag = false;
        }
        if (getFile === "") {
            errorsubmit.getFile = "Vui lòng Chọn Hình ảnh";
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
            setErrors("");
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('brand', product.brand);
            formData.append('company', product.company);
            formData.append('detail', product.detail ? product.detail : "");
            formData.append('status', product.status);
            formData.append('sale', product.sale ? product.sale: 0);
            Object.keys(getFile).map((item, i) => {
                formData.append("file[]", getFile[item]);
            });
            Object.keys(avatarCheckBox).map((item, i) => {
                formData.append("avatarCheckBox[]", avatarCheckBox[item]);
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
            setErrors(errorsubmit);
        }

    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update User</h2>
                <div className="signup-form" >
                    <h2>Update Product!</h2>
                    <form encType="multipart/form-data" onSubmit={handelSubmit} >
                        <input type="text" placeholder="Name" value={product.name} onChange={handelInput} name="name" />
                        <Errorform errors={{ name: errors && errors.name ? errors.name : '' }} />
                        <input type="number" placeholder="Price" name="price" value={product.price} onChange={handelInput} />
                        <Errorform errors={{ name: errors && errors.price ? errors.price : '' }} />

                        <select name="category" onChange={handelInput} value={product.category} >
                            <option value={0}>Please choose category</option>
                            {dataCategory.map((value, key) => (
                                <option key={key} value={value.id}>
                                    {value.category}
                                </option>
                            ))}
                        </select>
                        <Errorform errors={{ name: errors && errors.category ? errors.category : '' }} />
                        <select name="brand" onChange={handelInput} value={product.brand} >
                            <option value={0}>Please choose brand</option>
                            {dataBrand.map((value, key) => (
                                <option key={key} value={value.id} >
                                    {value.brand}
                                </option>

                            ))}
                        </select>
                        <Errorform errors={{ name: errors && errors.brand ? errors.brand : '' }} />
                        <select name="status" onChange={handelInput} value={product.status} >
                            <option value="0">New</option>
                            <option value="1">Sale</option>
                        </select>

                        {product.status === '1' && (
                            <input onChange={handelInput}
                                 value={product.sale}
                                type="number"
                                placeholder="Sale Price"
                                name="sale"

                            />
                        )}
                        <input type="text" placeholder="Company profile" name="company" onChange={handelInput} value={product.company} />
                        <Errorform errors={{ name: errors && errors.company ? errors.company : '' }} />
                        <label htmlFor="file">Select files:</label>
                        <input type="file" name="file" multiple onChange={handelFile} />
                        <Errorform errors={{ name: errors && errors.getFile ? errors.getFile : '' }} />

                        <ul style={{ display: 'flex', marginRight: '20px' }} >
                            {renderimage()}
                        </ul>

                        <br />
                        <textarea cols={3} rows={3} placeholder="Detail" name="detail" onChange={handelInput} value={product.detail} >
                        </textarea>
                        <button type="submit" className="btn btn-default">update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Editproduct;