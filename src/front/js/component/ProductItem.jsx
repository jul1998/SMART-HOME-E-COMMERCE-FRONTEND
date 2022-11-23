import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";

function ProductItem({product}) {
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

  console.log(products);

  return (
    <div>
    
        <div class="col">
            <div className="card h-100">
              <img src="..." className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a short card.</p>
              </div>
            </div>
          </div>
        

      
    </div>
  );
}

export { ProductItem };
