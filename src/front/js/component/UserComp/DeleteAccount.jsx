import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

function DeleteUserAccount(){

    const { store, actions } = useContext(Context);
    const currentUserId = localStorage.getItem("user_id")
    const navigate = useNavigate()
   

    async function deleteAccount(){
        let response = await actions.genericFetchProtected(`user/${currentUserId}/delete_account`, "GET")
        console.log(response)
        return navigate("/logout")
    }

    deleteAccount()


    return(
        <div>
            <h1>Delete</h1>
        </div>
    )
}

export {DeleteUserAccount}