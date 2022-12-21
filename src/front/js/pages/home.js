import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Products } from "/src/front/js/pages/ProductPage/ProductPage.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (


		<div className="text-center mt-5">
			<Products/>
			
		</div>
	);

};


