import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../../styles/comments.css";
import { Context } from "../../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "../ShoppingCartCompIcon.jsx";

export default function HelpfulButton(){
    const [usefulCount, setUsefulCount] = useState(0);

    const handleClick = () => {
      setUsefulCount(usefulCount + 1);
    };
    
    return(
        <div className="comment-helful-btn">
      <button  onClick={handleClick}>
        {usefulCount} 
      </button>
      <p>people found this comment useful</p>
    </div>
        
    )
}