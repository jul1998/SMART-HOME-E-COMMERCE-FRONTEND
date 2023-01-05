import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "./ShoppingCartCompIcon.jsx";

export default function CommentSection(){
    return(
        <h1>Comments</h1>
    )
}