import React from "react";

function Bloglistcoment(props) {
    let { datadetail, handleReply } = props;

    function formatTime(updatedAt) {
        const time = new Date(updatedAt).toLocaleTimeString();
        return time;
    }

    function formatDate(updatedAt) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(updatedAt).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    function renderData() {
        if (!datadetail || datadetail.length === 0) {
            return <p>No datadetail</p>;
        }

        return datadetail.map((value, index) => {
            const formattedTime = formatTime(value.updated_at);
            const formattedDate = formatDate(value.updated_at);
            if (value.id_comment == 0) {
                return (
                    <React.Fragment key={index}>
                        <li className="media" >
                            <a className="pull-left" href="#">
                                <img width={150} src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt="" />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>{value.name_user}</li>
                                    <li><i className="fa fa-clock-o"></i> {formattedTime}</li>
                                    <li><i className="fa fa-calendar"></i>{formattedDate}</li>
                                </ul>
                                <p>{value.comment}</p>
                                <a className="btn btn-primary" onClick={() => handleReply(value.id)}><i className="fa fa-reply"></i>Reply</a>
                            </div>
                        </li>
                        {
                            datadetail.map((value2, index) => {
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li key={index} index={index} className="media second-media" >
                                            <a className="pull-left" href="#">
                                                <img width={150} src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt="" />
                                            </a>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user"></i>{value2.name_user}</li>
                                                    <li><i className="fa fa-clock-o"></i> {formattedTime}</li>
                                                    <li><i className="fa fa-calendar"></i>{formattedDate}</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <a className="btn btn-primary" onClick={() => handleReply(value.id)}><i className="fa fa-reply"></i>Reply</a>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </React.Fragment>


                )


            }


        });
    }

    return (
        <div className="response-area">
            <h2> {datadetail.length} RESPONSE</h2>
            <ul className="media-list">{renderData()} </ul>

        </div>
    );
}
export default Bloglistcoment;