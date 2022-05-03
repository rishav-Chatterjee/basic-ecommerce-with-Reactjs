import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { auth, fs } from '../Config/Config'


export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {

    const handleCartProductIncrease = () => {
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease = () => {
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(() => {
                    console.log('successfully deleted');
                })
            }
        })
    }

    const cartProductImg = cartProduct.url;

    return (
        <div className="row">
            <div className="col-md-6">
                <ul className="list-unstyled">
                    <li className="media cartMedia">
                        <div style={{backgroundImage: `url(${cartProductImg})`}} className="cartProductImg"></div>
                        <div className="media-body px-3">
                            <h5 className="cartTitle">{cartProduct.title}</h5>
                            <p className="cartDesc">{cartProduct.description}</p>
                            <p className="cartPrice">{cartProduct.price}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-md-2">
                <span className="p-5">
                    $ {cartProduct.TotalProductPrice}
                </span>
            </div>
            <div className="col-md-2">
            <p className="cartPrice">{cartProduct.qty}</p>
            </div>
            <div className="col-md-2">
                <span className="p-3" onClick={handleCartProductIncrease}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></span>
                <span className="p-3" onClick={handleCartProductDecrease}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></span>
                <span className="p-3" onClick={handleCartProductDelete}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></span>
            </div>
        </div>
    )
}