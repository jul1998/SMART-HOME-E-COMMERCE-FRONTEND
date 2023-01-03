import React, { useState, useContext, useReducer } from "react";
export const productStore = {
    product: {
        "product":"false"
    },
}

export function productActions(getStore, getActions, setStore) {
    let BACKEND_URL = process.env.BACKEND_URL
    return {
        actionsShoppingCartRequest: async(endpoint, method = "POST", data = undefined)=>{
            const localStorageToken = localStorage.getItem("token") //This is the same token store in local Storage
            let response = await fetch(BACKEND_URL + endpoint, {
                method: method,
                body: data ? JSON.stringify(data) : undefined,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Authorization": "Bearer " + localStorageToken
                }
            })

            return response
        }


    }

}