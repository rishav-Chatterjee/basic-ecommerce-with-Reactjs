import React, { useState, useEffect } from 'react'
import { auth, fs } from '../Config/Config'
import { Modal } from "./Modal";

export const CartSummary = () => {

    // show modal state
    const [showModal, setShowModal]=useState(false);

    // trigger modal
    const triggerModal=()=>{
        setShowModal(true);
    }

    // hide modal
    const hideModal=()=>{
        setShowModal(false);
    }

    // state of cart products
    const [cartProducts, setCartProducts] = useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                })
            }
            else {
                console.log('user is not signed in to retrieve cart');
            }
        })
    }, [])

    //console.log(cartProducts);

    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct => {
        return cartProduct.qty;
    })

    // console.log(qty);

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;

    const totalQty = qty.reduce(reducerOfQty, 0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0);

    return (
        <>
            <div className="card w-100">
                <h4 className="card-header bg-primary text-white">Card Summary</h4>
                <div className="card-body">
                    <p className="card-title">Number of Products:<span className="totalNo px-2">{totalQty}</span></p>
                    <p className="card-title">Total Price to Pay:<span className="totalNo px-2">{totalPrice}</span></p>
                    <button type="button" className="btn btn-primary" onClick={() => triggerModal()}>Pay Now</button >
                </div>
            </div>

            {showModal === true && (
                <Modal TotalPrice={totalPrice} totalQty={totalQty}
                    hideModal={hideModal}
                />
            )}

        </>


    )
}
