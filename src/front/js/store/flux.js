import { userStore, userActions } from "./User/user";
import { userAdminStore, userAdminActions } from "./User/userAdmin";
import { paypalActions, paypalStore } from "./Paypal/token";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			...userStore,
			...userAdminStore,
			...paypalStore
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			...userActions(getStore, getActions, setStore),
			...userAdminActions(getStore, getActions, setStore),
			...paypalActions(getStore, getActions, setStore),
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			genericFetch: async (endpoint, method = "GET", data = undefined) => {
					console.log(endpoint, data)
				let BACKEND_URL = process.env.BACKEND_URL
				let response = await fetch(BACKEND_URL + endpoint, {
					method: method,
					body: data ? JSON.stringify(data) : undefined,
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}

				})

				return response
			},
			showToken: () => {
				let storageToken =localStorage.getItem("token")
				if (storageToken) {
				  return true;
				} else if(storageToken === ""){
					return false
				} else{
				  return false;
				}
			  }


		}
	};
};

export default getState;
