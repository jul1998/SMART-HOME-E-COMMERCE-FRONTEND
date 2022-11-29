import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import { ProductItem } from "../component/ProductItem.jsx";

function Products() {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetch("products_list");
      let jsonResponse = await response.json();
      setProducts(jsonResponse);
    }

    fetch();
  }, []);

  const displayProducts = products.map((product, index) => {
    return <ProductItem key={index} product={product} />;
  });

  return (
    <div>
      <div class="container text-center">
        <div class="row">
          <div class="col">{displayProducts}</div>
        </div>
      </div>
      
    </div>
    
  );
}

export { Products };
