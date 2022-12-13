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
    let jsonRes = carrito
    console.log(jsonRes)
    const suma = 0
    jsonRes.forEach(item => {
      suma = suma + (item.cantidad * item.costoUnitario)
    })
    suma = suma.toString()
    console.log(suma)
    let access = await actions.getAccessToken()
    console.log("access token created")
    let linc = await actions.createAnOrder(suma)
    console.log(linc)
    return (suma)
  }

  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">{(carrito && carrito.length > 0) ? displayCarrito : "null"}</div>
        <div>{}</div>
      </div>
    </div>

  );
}

export { CarritoCompras };
