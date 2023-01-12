import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../../styles/comments.css";
import { Context } from "../../../store/appContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";


export default function DisplayTextArea(){
    const { store, actions } = useContext(Context);
    const [commentText, setCommentText] = useState({
        text:""
    })
    const params = useParams();
    const userId = localStorage.getItem("user_id")

    function handleChange(event){
        const {name,value}= event.target //Destructurar data de formData
        setCommentText(prevText =>{
            return{
                ...prevText, // Traer todo lo que se haya generado por el user
                [name]: value 
                
            }
        })
        }

    async function postComment(event){
        event.preventDefault()
        let bodyObj ={
            comment:commentText.text
        }

        let response = await actions.genericFetchProtected(`product/${params.theid}/user/${userId}/post_comment`,
        "Post",
        bodyObj)
        
        let jsonResponse = await response.json()
        if (response.ok){
            Swal.fire({
                icon: "success",
                title: "Great!",
                text: `${jsonResponse.message}`,
              });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${jsonResponse.message}`,
              });
        }
    }

    
        
    return(
        <div>
            <form onSubmit={postComment}>
            <textarea onChange={handleChange} name="text" placeholder="Leave a comment..." className="comment-text-area"></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
        </div>
    )


}