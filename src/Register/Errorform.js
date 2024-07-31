function Errorform(props) {
    function randerError() {
        let {errors} = props;
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key,index) => {
                return (
                    <li key={index}>{errors[key]}</li>
                )
            })
        }
    
    }
    return(
        <div>
            <ul>{randerError()}</ul>
        </div>
    )
    
}
export default Errorform;

