export const userAdminStore = {
    user: {
        "name": "Julian"
    },
}

export function userAdminActions(getStore, getActions, setStore) {
    let BACKEND_URL = process.env.BACKEND_URL
    return {
        loginAdmin: async (endpoint, method = "GET", data = undefined) => {

            let response = fetch(BACKEND_URL + endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            return response

        }
    }
}