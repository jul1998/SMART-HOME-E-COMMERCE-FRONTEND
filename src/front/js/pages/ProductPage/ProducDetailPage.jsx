import React, { useState, useContext, useEffect } from "react";
import { ProductDetailPageComp } from "../../component/ProductComp/ProductPageComp.jsx"; 
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


function ProductDetailPage() {
  const { store, actions } = useContext(Context);
  const [product, setProduct] = useState([]);
  
    
  const params = useParams();
  console.log(params)

  useEffect(()=>{
    async function fetch() {
        let response = await actions.genericFetch(
          `product/${params.theid}/product_info`
        );
        let jsonRes = await response.json()
        setProduct(jsonRes)
      }
      fetch();
  },[])


  return (
    <div>
        <ProductDetailPageComp product={product}/>
    </div>
  )
}

export {ProductDetailPage}