import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

function LogOut(){
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(()=>{ // An useEffect was used to avoid an infinite loop
        async function logout(){
            let response = await actions.logoutFetch()
            console.log(await response.json())
            
        }
        logout()
    },[])

    function redirectToHome(){
        return navigate("/")
    }

    

    return(
        <div>
            <h1>Log Out</h1>
            {redirectToHome()}

        </div>

    )
}

export {LogOut}