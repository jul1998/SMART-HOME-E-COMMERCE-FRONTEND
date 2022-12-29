import React, { useState, useContext, useReducer } from "react";
export const productStore = {
    product: {
        "product":"false"
    },
}

export function productActions(getStore, getActions, setStore) {
    let BACKEND_URL = process.env.BACKEND_URL
    return {
        addToShoppingCartRequest: ()=>{
            console.log("here")
        }
    }

}