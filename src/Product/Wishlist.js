import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Wishlist() {
    const [dataWish, setDataWish] = useState([]);
    var wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
        wishlist = JSON.parse(wishlist);
    } else {
        wishlist = [];
    }
    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/public/api/product/wishlist', wishlist)
            .then((res) => {
                if (res && res.data) {
                    setDataWish(res.data.data)
                } else {
                    console.log('Không có Data');
                }

            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    //Tạo 1 mảng mới từ datawish
    //Lọc các sản phẩm yêu thích từ datawwish
    let wishlistProduct = dataWish.filter(dataWish => wishlist.includes(dataWish.id))

    const handleRemove = (id) => {
        // Tạo một bản sao của mảng wishlistProduct
        let newWishlistProduct = [...wishlistProduct];

        // Tìm vị trí của sản phẩm cần xóa trong mảng
        let index = newWishlistProduct.findIndex(product => product.id === id);

        // Nếu tìm thấy sản phẩm trong mảng, xóa nó
        if (index !== -1) {
            newWishlistProduct.splice(index, 1);
        }

        // Cập nhật mảng wishlistProduct và lưu vào local storage
        setDataWish(newWishlistProduct);
        localStorage.setItem('wishlist', JSON.stringify(newWishlistProduct.map(product => product.id)));
    }
    const renderDatahome = (id) => {
        if (wishlistProduct.length > 0) {
            return wishlistProduct.map((value, key) => {
                let imageProduct = value.image;
                let arrproduct = JSON.parse(imageProduct);
                let image1 = arrproduct[0]
                return (
                    <div className="col-sm-4" key={key}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + value.id_user + "/" + image1} alt="" />
                                    <h2>{value.price}</h2>
                                    <p>{value.name}</p>
                                    <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Remove</a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{value.price}</h2>
                                        <p>{value.name}</p>
                                        <a onClick={() => handleRemove(value.id)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Remove</a>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><Link to={'/product-details/' + value.id} href="#"><i className="fa fa-plus-square"></i>Read More</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            <p>
                No Data wedsite !
            </p>
        }


    }
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                            <h2>Category</h2>
                            <div className="panel-group category-products" id="accordian">
                                {/*category-productsr*/}
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a
                                                data-toggle="collapse"
                                                data-parent="#accordian"
                                                href="#sportswear"
                                            >
                                                <span className="badge pull-right">
                                                    <i className="fa fa-plus" />
                                                </span>
                                                Sportswear
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="sportswear" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li>
                                                    <a href="#">Nike </a>
                                                </li>
                                                <li>
                                                    <a href="#">Under Armour </a>
                                                </li>
                                                <li>
                                                    <a href="#">Adidas </a>
                                                </li>
                                                <li>
                                                    <a href="#">Puma</a>
                                                </li>
                                                <li>
                                                    <a href="#">ASICS </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a
                                                data-toggle="collapse"
                                                data-parent="#accordian"
                                                href="#mens"
                                            >
                                                <span className="badge pull-right">
                                                    <i className="fa fa-plus" />
                                                </span>
                                                Mens
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="mens" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li>
                                                    <a href="#">Fendi</a>
                                                </li>
                                                <li>
                                                    <a href="#">Guess</a>
                                                </li>
                                                <li>
                                                    <a href="#">Valentino</a>
                                                </li>
                                                <li>
                                                    <a href="#">Dior</a>
                                                </li>
                                                <li>
                                                    <a href="#">Versace</a>
                                                </li>
                                                <li>
                                                    <a href="#">Armani</a>
                                                </li>
                                                <li>
                                                    <a href="#">Prada</a>
                                                </li>
                                                <li>
                                                    <a href="#">Dolce and Gabbana</a>
                                                </li>
                                                <li>
                                                    <a href="#">Chanel</a>
                                                </li>
                                                <li>
                                                    <a href="#">Gucci</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a
                                                data-toggle="collapse"
                                                data-parent="#accordian"
                                                href="#womens"
                                            >
                                                <span className="badge pull-right">
                                                    <i className="fa fa-plus" />
                                                </span>
                                                Womens
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="womens" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li>
                                                    <a href="#">Fendi</a>
                                                </li>
                                                <li>
                                                    <a href="#">Guess</a>
                                                </li>
                                                <li>
                                                    <a href="#">Valentino</a>
                                                </li>
                                                <li>
                                                    <a href="#">Dior</a>
                                                </li>
                                                <li>
                                                    <a href="#">Versace</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Kids</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Fashion</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Households</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Interiors</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Clothing</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Bags</a>
                                        </h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a href="#">Shoes</a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            {/*/category-products*/}
                            <div className="brands_products">
                                {/*brands_products*/}
                                <h2>Brands</h2>
                                <div className="brands-name">
                                    <ul className="nav nav-pills nav-stacked">
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(50)</span>Acne
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(56)</span>Grüne Erde
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(27)</span>Albiro
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(32)</span>Ronhill
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(5)</span>Oddmolly
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(9)</span>Boudestijn
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <span className="pull-right">(4)</span>Rösch creative
                                                culture
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*/brands_products*/}
                            <div className="price-range">
                                {/*price-range*/}
                                <h2>Price Range</h2>
                                <div className="well text-center">
                                    <div className="slider slider-horizontal" style={{ width: 182 }}>
                                        <div className="slider-track">
                                            <div
                                                className="slider-selection"
                                                style={{ left: "41.6667%", width: "33.3333%" }}
                                            />
                                            <div
                                                className="slider-handle round left-round"
                                                style={{ left: "41.6667%" }}
                                            />
                                            <div
                                                className="slider-handle round"
                                                style={{ left: "75%" }}
                                            />
                                        </div>
                                        <div
                                            className="tooltip top"
                                            style={{ top: "-30px", left: "73.1667px" }}
                                        >
                                            <div className="tooltip-arrow" />
                                            <div className="tooltip-inner">250 : 450</div>
                                        </div>
                                        <input
                                            type="text"
                                            className="span2"
                                            defaultValue=""
                                            data-slider-min={0}
                                            data-slider-max={600}
                                            data-slider-step={5}
                                            data-slider-value="[250,450]"
                                            id="sl2"
                                            style={{}}
                                        />
                                    </div>
                                    <br />
                                    <b className="pull-left">$ 0</b>{" "}
                                    <b className="pull-right">$ 600</b>
                                </div>
                            </div>
                            {/*/price-range*/}
                            <div className="shipping text-center">
                                {/*shipping*/}
                                <img src="images/home/shipping.jpg" alt="" />
                            </div>
                            {/*/shipping*/}
                        </div>
                    </div>
                    <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            {/*features_items*/}
                            <h2 className="title text-center">Wish List</h2>

                            {renderDatahome()}
                        </div>
                        {/*features_items*/}
                        <div className="category-tab">
                            {/*category-tab*/}
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a href="#tshirt" data-toggle="tab">
                                            T-Shirt
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#blazers" data-toggle="tab">
                                            Blazers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#sunglass" data-toggle="tab">
                                            Sunglass
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#kids" data-toggle="tab">
                                            Kids
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#poloshirt" data-toggle="tab">
                                            Polo shirt
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active in" id="tshirt">
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$57</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="blazers">
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="sunglass">
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="kids">
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="poloshirt">
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/category-tab*/}
                        <div className="recommended_items">
                            {/*recommended_items*/}
                            <h2 className="title text-center">recommended items</h2>
                            <div
                                id="recommended-item-carousel"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="item next left">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item active left">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend3.jpg" alt="" />
                                                        <h2>$58</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    className="left recommended-item-control"
                                    href="#recommended-item-carousel"
                                    data-slide="prev"
                                >
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a
                                    className="right recommended-item-control"
                                    href="#recommended-item-carousel"
                                    data-slide="next"
                                >
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                        {/*/recommended_items*/}
                    </div>
                </div>
            </div>
        </section>

    );
}
export default Wishlist;