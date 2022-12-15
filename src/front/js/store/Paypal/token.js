import formUrlEncoded from "form-urlencoded"
export const paypalStore = {
    accessToken: {
        "paypalAccessToken": ""
    }
}

export function paypalActions(getStore, getActions, setStore) {
    let PAYPAL_API_TOKEN_URL = process.env.PAYPAL_API_TOKEN_URL
    let PAYPAL_API_PURCHASE_URL = process.env.PAYPAL_API_PURCHASE_URL

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
            setStore({ ...store, tokenPaypal: promise.access_token })
            localStorage.setItem("paypalToken", promise.access_token)
        },


        createAnOrder: async (method, amount, description) => {
            let store = getStore()
            let token = store.tokenPaypal
            let localStoragePaypalToken = localStorage.getItem("paypalToken")
            let response = await fetch(PAYPAL_API_PURCHASE_URL, {
                method: method,
                headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + localStoragePaypalToken, 'Connection': 'keep-alive' },
                body: JSON.stringify({
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "items": [
                                {
                                    "name": "Tech Product",
                                    "description": description,
                                    "quantity": "1",
                                    "unit_amount": {
                                        "currency_code": "USD",
                                        "value": amount
                                    }
                                }
                            ],
                            "amount": {
                                "currency_code": "USD",
                                "value": amount,
                                "breakdown": {
                                    "item_total": {
                                        "currency_code": "USD",
                                        "value": amount
                                    }
                                }
                            }
                        }
                    ],
                    "application_context": {
                        "return_url": "https://example.com/return",
                        "cancel_url": "https://example.com/cancel"
                    }
                })
            })
            let promise = await response.json()
            console.log(promise)
            localStorage.setItem("purchaseId", promise.id)
            return promise
        },


        checkOrderPayment: async (method = "POST") => {
            let store = getStore()
            let token = store.tokenPaypal
            let localStoragePaypalToken = localStorage.getItem("paypalToken")
            let purchaseId= localStorage.getItem("purchaseId")
            let url = PAYPAL_API_PURCHASE_URL + "/" + purchaseId + "/capture"
            let response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + localStoragePaypalToken, 'Connection': 'keep-alive' },
                
            })
            let promise = await response.json()
            console.log(promise)
            return promise
        },

        


    }
}