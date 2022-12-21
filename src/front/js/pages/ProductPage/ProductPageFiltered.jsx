import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { SearchBar } from "../../component/SearchBarComp.jsx";


function ShowProductPageFiltered(){
    const { store, actions } = useContext(Context);
    const [products, setProducts] = useState([]);
    

  

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetch("products_list");
      console.log(response);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      setProducts(jsonResponse);
    }

    fetch();
  }, []);

   
    return(
        <div>
        <SearchBar products ={products}/>
        <footer>
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
        </footer>
        </div>

    )
}

export {ShowProductPageFiltered}