import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const Blog = () => {
    const [data, setData] = useState([]);
    const [averageRatings, setAverageRatings] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost/laravel8/laravel8/public/api/blog?page=`+ currentPage);
            setData(result.data);
            result.data.blog.data.forEach(blog => getDataBlograte(blog.id));
        };
        fetchData();
    }, [currentPage]);

    const getDataBlograte = (id) => {
        axios.get('http://localhost/laravel8/laravel8/public/api/blog/rate/' + id)
            .then((res) => {
                if (res && res.data) {
                    const ratings = Object.values(res.data.data);
                    if (ratings && ratings.length > 0) {
                        const totalRatings = ratings.reduce((total, rating) => total + rating.rate, 0);
                        const average = totalRatings / ratings.length;
                        setAverageRatings(prevRatings => ({ ...prevRatings, [id]: average }));
                    }
                } else {
                    console.log("Không có dữ liệu");
                }
            })
            .catch(error => console.log(error));
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'next') {
            setCurrentPage(prevPage => prevPage + 1);
        } else {
            setCurrentPage(Number(e.target.id));
        }
    }

    function renderData() {
        if (Object.keys(data).length > 0) {
            return data.blog.data.map((value, key) => (
                <div className="single-blog-post" key={key}>
                    <h3>{value.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> Mac Doe</li>
                            <li><i className="fa fa-clock-o"></i> {value.created_at}</li>
                            <li><i className="fa fa-calendar"></i> {value.updated_at}</li>
                        </ul>
                        <StarRatings
                            rating={averageRatings[value.id] || 0}
                            starRatedColor="orange"
                            numberOfStars={6}
                            name='averageRating'
                        />
                    </div>
                    <a href="">
                        <img src={"http://localhost/laravel8/laravel8/public/upload/blog/image/" + value.image} alt="" />
                    </a>
                    <p>{value.description}</p>

                    <Link className="btn btn-primary" to={'/blog/detail/' + value.id}>
                        Read More
                    </Link>
                </div>
            ));
        }
        return null;
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
                <div className="pagination-area">
                    <ul className="pagination">
                        <li><a  id="1" onClick={handleClick} className={currentPage === 1 ? 'active' : ''}>1</a></li>
                        <li><a  id="2" onClick={handleClick} className={currentPage === 2 ? 'active' : ''}>2</a></li>
                        <li><a  id="3" onClick={handleClick} className={currentPage === 3 ? 'active' : ''}>3</a></li>
                        <li><a  id="next" onClick={handleClick}><i className="fa fa-angle-double-right"></i></a></li>

                        {/* Add more page numbers as needed */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Blog;
