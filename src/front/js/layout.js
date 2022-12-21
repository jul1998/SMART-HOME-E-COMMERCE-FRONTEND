import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Signup } from "./pages/UserPages/signup.jsx"; //Component to register user
import { Login } from "./pages/UserPages/Login.jsx";
import { Products } from "./pages/ProductPage/ProductPage.jsx";
import { LoginAdmin } from "./pages/UserAdminPages/LoginAdmin.jsx";
import { SignupAdmin } from "./pages/UserAdminPages/SignupAdmin.jsx";
import { UserProfile } from "./pages/UserPages/UserProfile.jsx";
import { UserSettings } from "./pages/UserPages/UserSettings.jsx";
import { UserPassword } from "./pages/UserPages/UserChangePassword.jsx";
import {DeleteUserAccount} from "./component/UserComp/DeleteAccount.jsx"
import { ProductDetailPage } from "./pages/ProductPage/ProducDetailPage.jsx";
import { LogOut } from "./component/UserComp/LogOut.jsx";
import { ShowProductPageFiltered } from "./pages/ProductPage/ProductPageFiltered.jsx";

import { CarritoCompras } from "./pages/ProductPage/CarritoCompras.jsx";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Products />} path="/products" />
            <Route element={<ShowProductPageFiltered />} path="/products/filtered" />
            <Route element={<LoginAdmin />} path="/LoginAdmin" />
            <Route element={<SignupAdmin />} path="/signupAdmin" />
            <Route element={<SignupAdmin />} path="/signupAdmin" />
            <Route element={<UserProfile />} path="/userProfile/:theid" />
            <Route element={<UserSettings />} path="/userProfile/:theid/settings" />
            <Route element={<UserPassword />} path="/userProfile/:theid/change_password" />
            <Route element={<DeleteUserAccount />} path="/userProfile/:theid/delete_account" />
            <Route element={<ProductDetailPage />} path="/product/:theid/detail_page" />
            <Route element={<CarritoCompras />} path="/user/:theid/carritoCompras"/>
            <Route element={<LogOut />} path="/logout" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
