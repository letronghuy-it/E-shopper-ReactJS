import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Blogcoment from "../Blog/Blogcoment";
import Bloglistcoment from "../Blog/Bloglistcoment";
import Blograte from "../Blog/Blograte";
import StarRatings from "react-star-ratings";

function Blogdetail() {

    let params = useParams();

    const [data, setData] = useState('');
    const [comment, setComment] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [idRely, setIdReply] = useState('');
    const getDataBlograte = () => {
        axios.get('http://localhost/laravel8/laravel8/public/api/blog/rate/' + params.id)
            .then((res) => {
                if (res && res.data) {
                    const ratings = Object.values(res.data.data);
                    if (ratings && ratings.length > 0) {
                        const totalRatings = ratings.reduce((total, rating) => total + rating.rate, 0);
                        const average = totalRatings / ratings.length;
                        setAverageRating(average);
                    }
                } else {
                    console.log("Không có dữ liệu");
                }
            })
            .catch(error => console.log(error));
    };


    const DataBlogdetail = () => {
        axios.get('http://localhost/laravel8/laravel8/public/api/blog/detail/' + params.id)
            .then((res) => {
                if (res && res.data) {
                    setData(res.data.data)
                    setComment(res.data.data.comment)

                } else {
                    console.log("Không có dữ liệu ");
                }
            })
            .catch(error => console.log(error))
    };
    useEffect(() => {
        DataBlogdetail();
        getDataBlograte();
    }, [params.id]);
    // Hàm Xử Lý lấy id của user
    const handleReply = (id_user) => {
        setIdReply(id_user);
    }
    // Xử Lý Bình Luận Không Load Trang
    const getCmt = (data) => {
        let arr1 = [data];
        const connectdata = comment.concat(arr1);
        setComment(connectdata);
    };
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">

                <h2 className="title text-center">Latest From our Blog</h2>
                {
                    <div className="single-blog-post">
                        <h3>{data.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> xx</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <StarRatings
                                rating={averageRating}
                                starRatedColor="orange"
                                numberOfStars={6}
                                name='averageRating'
                            />
                        </div>
                        <a href="">
                            <img src={"http://localhost/laravel8/laravel8/public/upload/blog/image/" + data.image} alt="" />
                        </a>
                        <p>
                            {data.content}
                        </p>
                        <br />
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="#">Pre</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>

            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <div className="socials-share">
                        <a href=""><img src="/images/blog/socials.png" alt="" /></a>
                    </div>
                    <li>
                        <Blograte idBlograte={params.id} />
                    </li>
                    <li className="color">(6 votes)</li>
                </ul>
                <StarRatings
                    rating={averageRating}
                    starRatedColor="orange"
                    numberOfStars={6}
                    name='averageRating'
                />
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href="">Pink <span>/</span></a></li>
                    <li><a className="color" href="">T-Shirt <span>/</span></a></li>
                    <li><a className="color" href="">Girls</a></li>
                </ul>
            </div>

            <div className="socials-share">
                <a href=""><img src={"http://localhost/laravel8/laravel8/public/upload/blog/image/" + data.image} alt="" /></a>
            </div>

            <div className="media commnets">
                <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{data.title}</h4>
                    <p>{data.content}</p>
                    <div className="blog-socials">
                        <ul>
                            <li><a href=""><i className="fa fa-facebook"></i></a></li>
                            <li><a href=""><i className="fa fa-twitter"></i></a></li>
                            <li><a href=""><i className="fa fa-dribbble"></i></a></li>
                            <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                        </ul>
                        <a className="btn btn-primary" href="">Other Posts</a>
                    </div>
                </div>
            </div>
            <Bloglistcoment datadetail={comment} handleReply={handleReply} />
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <Blogcoment getCmt={getCmt} idBlog={params.id} idReply={idRely} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blogdetail;