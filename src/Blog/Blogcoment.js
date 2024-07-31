import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Blogcoment(props) {
    const [comment, setComment] = useState('');

    let { getCmt, idReply } = props;

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isLoggedIn = localStorage.getItem('isLoggedIn');
        var userData = localStorage.getItem("accessToken");
        if (userData) {
            userData = JSON.parse(userData)
        }
        if (!isLoggedIn) {
            alert("Yêu cầu login mới được bình luận");
        } else if (comment === "") {
            alert("Nhập nội dung bình luận");
        } else {
            let accessToken = userData.token;
            let url = 'http://localhost/laravel8/laravel8/public/api/blog/comment/' + props.idBlog;

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            if (comment) {
                const formData = new FormData();
                formData.append('id_blog', props.idBlog);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', idReply ? idReply : 0);
                formData.append('comment', comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);

                axios.post(url, formData, config)
                    .then((res) => {
                        console.log(res);
                        if (res && res.data) {
                            getCmt(res.data.data);
                        } else {
                            console.log("Không có dữ liệu ");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <div className="text-area">
            <form onSubmit={handleSubmit}>
                <div className="blank-arrow">
                    <label>My Name</label>
                </div>
                <span>*</span>
                <textarea
                    name="message"
                    rows="11"
                    value={comment}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">Post Comment</button>
            </form>
        </div>
    );
}

export default Blogcoment;
