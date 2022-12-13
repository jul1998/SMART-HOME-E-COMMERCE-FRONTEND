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
        },


        createAnOrder: async (method = "POST") => {
            const store = getStore()
            let response = await fetch(PAYPAL_API_PURCHASE_URL, {
                method: method,
                /*'Authorization': 'Bearer ' + store.tokenPaypal*/
                headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + store.tokenPaypal },
                body: JSON.stringify({
                    "intent": "CAPTURE",
                    "application_context": {
                        "return_url": "https://example.com",
                        "cancel_url": "https://example.com"
                    },
                    "purchase_units": [
                        {
                            "reference_id": "test",
                            "amount": {
                                "currency_code": "USD",
                                "value": "100.00"
                            }
                        }
                    ]
                })
            })
            let promise = await response.json()
            console.log(promise)
        }

    }
}