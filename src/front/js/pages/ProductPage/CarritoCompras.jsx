import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { ProductItem } from "../../component/Productos/ProductItem.jsx";
import { useParams } from "react-router-dom";
import { userActions } from "../../store/User/user";
/*import { ProductItem } from "../../component/ProductComp/ProductItem.jsx";*/

function CarritoCompras() {
  const { store, actions } = useContext(Context);
  const [carrito, setCarrito] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function fetch() {
      let response = await actions.carritoCompras(params.theid)
      console.log(response);
      setCarrito(response);

    }
    fetch();
  }, []);


  let displayCarrito = (carrito && carrito.length > 0) ? carrito.map((carritos, index) => {
    return <ProductItem key={index} product={carritos} />;
  }) : "";


  const total = async () => {
    let jsonRes = carrito.slice()
    console.log(jsonRes)
    let suma = 0
    let description = ""
    jsonRes.forEach(item => {
      suma = suma + (item.cantidad * item.price)
      description = description + ", " + item.name
    })
    suma = suma.toString()
    console.log(suma)
    let access = await actions.getAccessToken()
    console.log("access token created")
    let response = await actions.createAnOrder("POST", suma, description)
    let link = response["links"][1]["href"]
    console.log(link)
    return link
  }

  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">{(carrito && carrito.length > 0) ? displayCarrito : "null"}</div>
        <button type="button" onClick={total} LinkTo={total} >Comprar</button>
      </div>
    </div>

  );
}

export { CarritoCompras };
