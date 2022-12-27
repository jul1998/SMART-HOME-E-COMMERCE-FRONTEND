import React, {useEffect, useState, useContext} from 'react';
import ShoppingCart from '../../component/ProductComp/ShoppingCartComp.jsx';
import { Context } from "../../store/appContext";


function ShoppingCartPage() {
    const { store, actions } = useContext(Context);
    const userId = localStorage.getItem("user_id")
    console.log(userId)

    const [items, setItems] = useState([
      { id: 1, name: 'Apple', price: 0.5, quantity: 10 },
      { id: 2, name: 'Banana', price: 0.25, quantity: 5 }
    ]);
  
    function addItem(item) {
      setItems([...items, item]);
    }
  
    function removeItem(id) {
        console.log(items)
      setItems(items.filter(item => item.id !== id));
    }
  
    function updateQuantity(id, quantity) {
      setItems(
        items.map(item => {
          if (item.id === id) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    }

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
          return priceDisplay
    }

    return(
        <ShoppingCart items={items} total={displayTotal()} onRemove={removeItem} />
    )
}

export {ShoppingCartPage}