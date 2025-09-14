function productcart({props}) {
    return(
        <div className="productcart">
            <b>{props.name}</b>
            <b>price: ${props.price}</b>
        </div>
    );
}

export default productcart;