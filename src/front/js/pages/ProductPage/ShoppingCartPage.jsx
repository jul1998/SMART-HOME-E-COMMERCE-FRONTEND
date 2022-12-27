import React, {useState} from 'react';
import ShoppingCart from '../../component/ProductComp/ShoppingCartComp.jsx';

function ShoppingCartPage() {
    const [items, setItems] = useState([
      { id: 1, name: 'Apple', price: 0.5, quantity: 10 },
      { id: 2, name: 'Banana', price: 0.25, quantity: 5 }
    ]);
  
    function addItem(item) {
      setItems([...items, item]);
    }
  
    function removeItem(id) {
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
    return(
        <ShoppingCart items={items} total={10} />
    )
}

export {ShoppingCartPage}