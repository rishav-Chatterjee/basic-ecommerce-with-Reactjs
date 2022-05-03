import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { useParams } from "react-router";
import { auth, fs } from "../Config/Config";
import { useHistory } from "react-router-dom";

const IndividualProductDetails = () => {
  const history = useHistory();

  // gettin current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();

  console.log(uid);

  const { id } = useParams();
  //get details of particular product by id
  const [productDetail, setproductDetail] = useState("");
  useEffect(() => {
    fs.collection("Products")
      .doc(id)
      .get()
      .then((snapshot) => setproductDetail(snapshot.data()));
  }, []);

  //console.log(productDetail.id);

  const backgroundProductImg = productDetail.url;

  return (
    <>
      <Navbar user={user} />
      <div className="row w-100">
        <div className="col-md-4">
          <div
            style={{ backgroundImage: `url(${backgroundProductImg})` }}
            className="productDetailImg"
          ></div>
        </div>
        <div className="col-md-8 my-5">
          <div className="p-5">
            <div className="mt-5">
              <h3 className="productDtitle">{productDetail.title}</h3>
            </div>
            <div className="py-5">
              <p className="productDdesc">{productDetail.description}</p>
            </div>
            <div className="">
              <span className="productDPrice">${productDetail.price}</span>
            </div>
          </div>
          {/* <div className="row px-5 w-50">
                        <div className="col-md-6">
                            <button type="button" class="btn btn-primary" onClick={handelAddToCart}>Add to Cart</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" class="btn btn-primary" onClick={handelWishlist}>Wishlist</button>
                        </div>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default IndividualProductDetails;
