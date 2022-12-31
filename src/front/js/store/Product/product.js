import React, { useState, useContext, useReducer } from "react";
export const productStore = {
    product: {
        "product":"false"
    },
}

export function productActions(getStore, getActions, setStore) {
    let BACKEND_URL = process.env.BACKEND_URL
    return {
        addToShoppingCartRequest: async(endpoint, method = "POST", data = undefined)=>{
            console.log("here")
            let response = fetch(BACKEND_URL + endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            return response
        }


    }

}