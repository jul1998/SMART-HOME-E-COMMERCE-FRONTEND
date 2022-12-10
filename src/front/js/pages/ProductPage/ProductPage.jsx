import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { ProductItem } from "../../component/ProductItem.jsx";

function Products() {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetch("products_list");
      console.log(response)
      let jsonResponse = await response.json();
      console.log(jsonResponse)
      setProducts(jsonResponse);
      
    }

    fetch();
  }, []);

  const displayProducts = products.map((product, index) => {
    return <ProductItem key={index} product={product} />;
  });

  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-12 col-md-4">{displayProducts}</div>
        </div>
      </div>
    </div>
  );
}

export { Products };
