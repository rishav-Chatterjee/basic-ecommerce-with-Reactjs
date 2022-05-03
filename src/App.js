import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { NotFound } from "./Components/NotFound";
import { AddProducts } from "./Components/AddProducts";
import { Cart } from "./Components/Cart";
import IndividualProductDetails from "./Components/IndividualProductDetails";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/addproduct" component={AddProducts} />
        <Route path="/usercart" component={Cart} />
        <Route path="/product/:id" component={IndividualProductDetails} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
