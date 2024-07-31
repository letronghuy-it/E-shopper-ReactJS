import { Link } from "react-router-dom";

function MenuAc(){
    return(
        <div className="col-sm-3">
					<div className="left-sidebar">
						<h2>Account</h2>
						<div className="panel-group category-products" id="accordian">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title"><Link to={'/account'}>account</Link></h4>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title"><Link to={'/my-product'}>My product</Link></h4>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title"><Link to={'/create-product'}>Create Product</Link></h4>
								</div>
							</div>
						</div>
					</div>
				</div>
    )
}
export default MenuAc;