import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ShoppingCart = ({ items, total, onRemove, onRemoveAPI, removeAllItems }) => {

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items)? items.map((item, index) => (
            <tr key={index}>
              <td>{item.product_name}</td>
              <td>{item.product_price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button 
                onClick={()=>{
                  onRemove(item.id)
                  onRemoveAPI(item.productId)
                }} 
                variant="danger" 
                size="sm">
                  Remove
                </Button>
              </td>
              
            </tr>
            
            
          )):alert("You need to relogin")}
          <tr>
            <td colSpan={2}>Total</td>
            <td>{total}</td>
            <td> {items.length>0?<Button 
                onClick={()=>{
                  removeAllItems()
                  
                }} 
                variant="danger" 
                size="sm">
                  Remove all items
                </Button>:null}  </td>
            
          </tr>

        </tbody>
      </Table>
    </div>
  );
};

export default ShoppingCart;
