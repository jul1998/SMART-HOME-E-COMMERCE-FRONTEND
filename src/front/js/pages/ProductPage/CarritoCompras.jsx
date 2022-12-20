import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { ProductItem } from "../../component/Productos/ProductItem.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/*import { ProductItem } from "../../component/ProductComp/ProductItem.jsx";*/

function CarritoCompras() {
  const { store, actions } = useContext(Context);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    async function fetch() {
      let response = await actions.carritoCompras(params.theid)
      setCarrito(response);

    }
    fetch();
  }, []);


  let displayCarrito = (carrito && carrito.length > 0) ? carrito.map((carritos, index) => {
    return <ProductItem key={index} product={carritos} />;
  }) : "";

  const agrgarHistorialCompras = async () => {

  }

  const total = async () => {
    let jsonRes = carrito.slice()
    let suma = 0
    let description = ""
    jsonRes.forEach(item => {
      suma = suma + (item.cantidad * item.price)
      description = description + ", " + item.name
    })
    suma = suma.toString()
    let access = await actions.getAccessToken()
    console.log("access token created")
    let response = await actions.createAnOrder("POST", suma, description)
    let link = response["links"][1]["href"]

    let windowRef = window.open(link, '_blank')

    // Check the payment status of the order every 5 seconds until it is completed
    let intervalId = setInterval(async () => {
      let paymentStatus = await actions.checkOrderPayment()
      if (paymentStatus["status"] === 'COMPLETED') {
        // Close the window once the payment is completed
        windowRef.close()
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'Payment completed successfully!',
        })
        clearInterval(intervalId),

      } elseif (paymentStatus["status"] != 'COMPLETED') {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'There was an error processing your payment. Please try again.',
        })
        clearInterval(intervalId)
      }
    }, 5000)
  }


  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">{(carrito && carrito.length > 0) ? displayCarrito : "null"}</div>
        <button type="button" id="comprarCarrito" onClick={total}>Comprar</button>
      </div>
    </div>

  );
}

export { CarritoCompras };
