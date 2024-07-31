import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Myproduct() {
    const [data, setData] = useState([]);
    const [edit,setedit] =useState([]);

    const handleidproduct = (id_product) => {
        let userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData);
        }
        let accessToken = userData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/delete/' + id_product;
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
                    setData(res.data.data)
                } else {
                    console.log("Không có Data");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const renderMyproduct = () => {
        let userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData);
        }
        let accessToken = userData.token;
        let url = 'http://localhost/laravel8/laravel8/public/api/user/my-product';
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
                    setData(res.data.data)
                } else {
                    console.log("Không có Data");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        renderMyproduct();
    }, []);
    function renderData() {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((key, index) => {
                let imageProduct = data[key].image;
                // console.log(imageProduct);
                let arrproduct = JSON.parse(imageProduct);
                // console.log(arrproduct);
                let image1 = arrproduct[0]
                // console.log(image1);
                let quantity = 1;
                let totalPrice = data[key].price * quantity;
                
                
                return (
                    <tr >
                        <td className="cart_product">
                            <a href="">
                                {
                                    <img style={{width:'100px' , height:'100px'}} src={"http://localhost/laravel8/laravel8/public/upload/product/" + data[key].id_user + "/" + image1} alt="" />
                                }
                            </a>
                        </td>
                        <td className="cart_description">
                            <h4><a >{data[key].name}</a></h4>
                            <p>Web ID: {data[key].id}</p>
                        </td>
                        <td className="cart_price">
                            <p>{data[key].price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" href=""> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2" />
                                <a className="cart_quantity_down" href=""> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">{totalPrice}</p>
                        </td>
                        <td className="cart_delete" style={{width:'auto' , height:'auto', paddingTop:'30px'}}>
                            <a className="cart_quantity_delete" onClick={() => handleidproduct(data[key].id)}><i className="fa fa-times"></i></a>
                        </td>
                        <td className="cart_edit">
                            <Link  to={'/edit-product/' +data[key]['id']} className="cart_quantity_edit"><i className="fa fa-edit"  style={{ fontSize: '30px' }}></i></Link>
                        </td>
                    </tr>
                )

            });
        }
    }


    return (
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description"></td>
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default Myproduct;