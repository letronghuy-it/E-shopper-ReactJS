import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewHobby } from "../actions/hobby";


function Cart() {
    const [dataCart, setDatacart] = useState([]);
    const dispatch = useDispatch();
    const  hobbylist = useSelector(state => state.hobby.tongQTY)
    console.log(hobbylist);
    // const { getQty } = useContext(CartContext);
    var cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart)
    }
    var total = Object.values(cart).reduce((sum, value) => sum + value, 0);
    // getQty(total)
    const action = addNewHobby(total)
    dispatch(action);

    useEffect(() => {
        axios.post('http://localhost/laravel8/laravel8/public/api/product/cart', cart)
            .then((res) => {
                if (res && res.data) {
                    setDatacart(res.data.data)
                } else {
                    console.log('Không có Data');

                }
            })
            .catch((errors) => {
                console.log(errors);
            })

    }, [])

    const updateDatacart = (Datacart) => {
        const cart = Datacart.reduce((value, index) => {
            value[index.id] = index.qty
            return value;
        }, {});
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    const handelIncrese = (i) => {
        const Qtyup = [...dataCart];
        Qtyup[i].qty += 1;
        setDatacart(Qtyup);
        updateDatacart(Qtyup)
    };

    const handelDecrese = (i) => {
        const Qtydown = [...dataCart];
        if (Qtydown[i].qty > 1) {
            Qtydown[i].qty -= 1;
        } else {
            Qtydown.splice(i, 1);
        }
        setDatacart(Qtydown);
        updateDatacart(Qtydown)


    };


    const handleDeleteItem = (i) => {
        const deleteItem = [...dataCart];
        deleteItem.splice(i, 1);
        setDatacart(deleteItem);
        updateDatacart(deleteItem)
    };
    function renderdatacart() {
        if (dataCart.length > 0) {
            return dataCart.map((value, index) => {
                let imageProduct = value.image;
                let arrayproduct = JSON.parse(imageProduct)
                let image1 = arrayproduct[0]
                return (
                    <tr>
                        <td className="cart_product">
                            <a href="">
                                <img
                                    width="110px"
                                    height="110px"
                                    src={'http://localhost/laravel8/laravel8/public/upload/product/' + value.id_user + "/" + image1}
                                    alt=""
                                />
                            </a>
                        </td>
                        <td className="cart_description">
                            <h4>
                                <a href="">{value.name}</a>
                            </h4>
                            <p>Web ID: {value.web_id}</p>
                        </td>
                        <td className="cart_price">
                            <p>{value.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" onClick={() => handelIncrese(index)}>
                                    {" "}
                                    +{" "}
                                </a>
                                <input
                                    className="cart_quantity_input"
                                    type="text"
                                    name="quantity"
                                    value={value.qty}
                                    autoComplete="off"
                                    size={2}
                                />
                                <a className="cart_quantity_down" onClick={() => handelDecrese(index)}>
                                    {" "}
                                    -{" "}
                                </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">{value.price * value.qty} VND</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" onClick={() => handleDeleteItem(index)}>
                                <i className="fa fa-times" />
                            </a>
                        </td>
                    </tr>
                )
            })
        } else {
            <p>No Data</p>
        }

    }
    const calculateTotal = () => {
        if (dataCart.length > 0) {
            const total = dataCart.reduce((ac, cur) => {
                return ac + (cur.price * cur.qty);
            }, 0);
            return total;
        }
        return 0;
    }
    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td />
                                </tr>
                            </thead>
                            {/* xxxxxx */}
                            <tbody>
                                {
                                    renderdatacart()
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>{" "}
            {/*/#cart_items*/}
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>
                            Choose if you have a discount code or reward points you want to use or
                            would like to estimate your delivery cost.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">
                                    Get Quotes
                                </a>
                                <a className="btn btn-default check_out" href="">
                                    Continue
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>

                                    <li>
                                        Cart Sub Total <span>$1</span>
                                    </li>

                                    <li>
                                        Eco Tax <span>$2</span>
                                    </li>
                                    <li>
                                        Shipping Cost <span>Free</span>
                                    </li>
                                    <li>
                                        Total <span className="Totalz">{calculateTotal()} VND</span>
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">
                                    Update
                                </a>
                                <a className="btn btn-default check_out" href="">
                                    Check Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/#do_action*/}
        </>



    )
}
export default Cart;