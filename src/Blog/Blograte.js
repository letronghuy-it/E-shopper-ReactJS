import axios from "axios";
import { useState } from "react";
import StarRatings from "react-star-ratings";

function Blograte(props) {
    const [rating, setRating] = useState(0);
    const [errors, setError] = useState({});
    function changeRating(newRating, name) {

        var userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData)
        }
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            alert("Yêu cầu login mới được bình luận");
        } else {
            let accessToken = userData.token;
            let url = 'http://localhost/laravel8/laravel8/public/api/blog/rate/' + props.idBlograte;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            setRating(newRating);
           
            if (newRating !== 0) {
                const formData = new FormData();
                formData.append('blog_id',props.idBlograte);
                formData.append('user_id',userData.Auth.id);
                formData.append('rate',newRating);
           
                axios.post(url, formData, config)
                    .then((res) => {
                        console.log(res);
                        if (res.data.errors) {
                            setError(res.data.errors)
                        } else {
                            console.log("Đánh giá thành công");
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    return (
        <StarRatings
            rating={rating}
            starRatedColor="orange"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
        />
    );
}
export default Blograte;