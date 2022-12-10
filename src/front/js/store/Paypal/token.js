import formUrlEncoded from "form-urlencoded"
export const paypalStore = {
    accessToken: {
        "paypalAccessToken": ""
    }
}

export function paypalActions(getStore, getActions, setStore) {
    let PAYPAL_API_TOKEN_URL = process.env.PAYPAL_API_TOKEN_URL

    let obj = {
        'grant_type': 'client_credentials'
    }

    let head = formUrlEncoded(obj)

    let access = {
        Username: process.env.PAYPAL_USERNAME,
        Password: process.env.PAYPAL_PASSWORD
    }

    return {
        getAccessToken: async (method = "POST") => {
            let response = await fetch(PAYPAL_API_TOKEN_URL, {
                method: method,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Basic ' + btoa(access.Username + ':' + access.Password) },
                body: head
            })
            let promise = await response.json()
            const store = getStore()
            setStore({ ...store, tokenPaypal: promise.access_token})
        },


        create_order: async (endpoint, method = "GET", data = undefined) => {
            const store = getStore()
            const storeToken = store.tokenPaypal
            const localStorageToken = localStorage.getItem("token") 
            const carritoCompras = store.carritoCompras
            let body = {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: ""
                    }
                }],
                application_context: {
                    brand_name: "Smart Home Ecommerce",
                    landing_page: "LOGIN",
                    user_actions: "PAY_NOW",
                    return_url: "",
                    cancel_url: ""
                }
            }
            let response = await fetch(PAYPAL_API_TOKEN_URL, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer' + 'A21AAIsEFQol0sX-IPEAIg8LF0A1RjUGw4k_l8cRjzZia4y09QlNyU4Z_WxvsqGU0_c0iJBAMgrcLCE9QvajQ8trzCV_b60IA'},
                body: JSON.stringify()
            })
            let promise = await response.json()
            
            
        }
        
    }   
}