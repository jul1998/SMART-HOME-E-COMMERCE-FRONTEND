import formurlencoded from 
export const paypalStore = {
    accessToken:{
        "paypalAccessToken":""
    }
}

export function paypalActions(getStore, getActions, setStore){
    let PAYPAL_API_TOKEN_URL = process.env.PAYPAL_API_TOKEN_URL
    return {
        getAccessToken: async (merthod="POST") => {
            let response = fetch(PAYPAL_API_TOKEN_URL, {
                method: method,
                headers: {"Content-Type": "application/json"}
                body: JSON.stringify()
            })
        }
    }
}