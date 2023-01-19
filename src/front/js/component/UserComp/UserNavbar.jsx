import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/userProfile.css";
import AccordionComp from "./AccordionComp.jsx";

function UserPageNavbar(){
    return(
        <div className="container mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Open user tools</button>
                </li>
            </ul>
            <div className="offcanvas offcanvas-start dark-offcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <p>Here are different tools you can use to get help.</p>
                    <AccordionComp/>
                </div>
            </div>
        </div>
    )
}

export default UserPageNavbar