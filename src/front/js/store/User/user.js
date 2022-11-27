import React, { useState, useContext } from "react";



export const userStore={
    user:{
        "isLogOut":"false"
    },
}

export function userActions(getStore, getActions, setStore){
    let BACKEND_URL = process.env.BACKEND_URL
    return{
        login: async (endpoint, method="GET", data=undefined)=>{
            const store = getStore()
            let response = await fetch(BACKEND_URL+endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            let responseJson = await response.json()
            localStorage.setItem("token", responseJson.token)
            setStore({...store,token:responseJson.token})
            return {response,responseJson}
        },
        genericFetchProtected: async (endpoint, method = "GET", data = undefined) => {
            const store = getStore()
            const storeToken = store.token
            let BACKEND_URL = process.env.BACKEND_URL
            let response = await fetch(BACKEND_URL+endpoint,{
                method: method,
                body: data?JSON.stringify(data):undefined,
                headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": "Bearer " + storeToken
                    }
            })
            
            return response
        },
        logoutFetch: async ()=>{
            const store = getStore()
            let response = await getActions().genericFetchProtected("logout")
            localStorage.setItem("token", "")
            setStore({...store,token:""})
            return response

        },
        isLogOut: ()=>{
            const [isLogOut, setLogOut]= useState(false)
            return(isLogOut)
        }

    }
}