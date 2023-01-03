import React, {useEffect, useState, useContext} from 'react';
import ShoppingCart from '../../component/ProductComp/ShoppingCartComp.jsx';
import { Context } from "../../store/appContext";
import PaypalIntegration from '../../component/Paypal/PaypalIntegrationComp.jsx';


function ShoppingCartPage() {
    const { store, actions } = useContext(Context);
    const userId = localStorage.getItem("user_id")


    const [items, setItems] = useState([]);
  
    function addItem(item) {
      setItems([...items, item]);
    }
  
    function removeItem(id) {
        console.log(items)
      setItems(items.filter(item => item.id !== id)
      );
      removeItemAPIRequest(id)
    }

    async function removeItemAPIRequest(product_id){
      let bodyObj = {
        "product_id": product_id
      }
      let response = await actions.actionsShoppingCartRequest(`delete/user/${userId}/shopping_cart`, "DELETE", bodyObj)
      let jsonRes = await response.json()
    };

    const removeAllItemsFromCart = async()=>{
      let response = await actions.actionsShoppingCartRequest(`user/${userId}/find_product_in_cart`, "GET", )
      let product = await response.json()
      let bodyObj = {
        "product_id": product.productId
      }
      let responseDelete = await actions.actionsShoppingCartRequest(`delete/user/${userId}/all_shopping_cart`, "DELETE", bodyObj)
      console.log( await responseDelete.json())
      setItems([])
      window.location.reload(false)
    }
    console.log(items)
    

    useEffect(()=>{
        async function fetch() {
            let response = await actions.genericFetchProtected(
              `user/${userId}/view_cart`
            );
            let jsonRes = await response.json()
              setItems(jsonRes)
          }
          fetch();
    },[])

    function displayTotal(){
        const total =Array.isArray(items)? 
        items.reduce((acc, item) => acc + item.product_price * item.quantity, 0):0
    
        const newTotal = parseFloat(total)
        const priceDisplay = newTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
          return {priceDisplay, total}
    }


    return(
      <>
        <ShoppingCart items={items} total={displayTotal().priceDisplay} onRemove={removeItem} onRemoveAPI={removeItemAPIRequest} removeAllItems={removeAllItemsFromCart} />
        <PaypalIntegration price={displayTotal().total} products={items}/>
      </>

    )
}

export {ShoppingCartPage}