import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ShoppingCart = ({ items, total, onCheckout, onRemove }) => {

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
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product_name}</td>
              <td>{item.product_price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button onClick={()=>onRemove(item.id)} variant="danger" size="sm">
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary">
        Checkout
      </Button>
    </div>
  );
};

export default ShoppingCart;
