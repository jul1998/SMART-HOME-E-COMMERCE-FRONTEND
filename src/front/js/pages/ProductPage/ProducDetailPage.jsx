import React, { useState, useContext, useEffect } from "react";
import { ProductDetailPageComp } from "../../component/ProductComp/ProductPageComp.jsx"; 
import CommentSection from "../../component/ProductComp/CommentsComp.jsx";
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


function ProductDetailPage() {
  const { store, actions } = useContext(Context);
  const [product, setProduct] = useState([]);
  const [description, setDescription] = useState([]);
  const [questions, setQuestions] = useState([]);

  
    
  const params = useParams();
  const userId = localStorage.getItem("user_id")

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

  useEffect(()=>{
    async function fetch() {
      let response = await actions.genericFetch(
        `product/${params.theid}/questions`
      );
      let jsonRes = await response.json()
      setQuestions(jsonRes)
    }
    fetch();
  },[])

  useEffect(()=>{
    async function fetch() {
      let response = await actions.genericFetch(
        `product/${params.theid}/add_description`
      );
      let jsonRes = await response.json()
      setDescription(jsonRes)
    }
    fetch();
  },[])


  return (
    <div>
        <ProductDetailPageComp product={product} description={description} questions={questions}/>
        <CommentSection/>
    </div>
  )
}

export {ProductDetailPage}