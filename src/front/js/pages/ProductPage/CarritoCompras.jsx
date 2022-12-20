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



  let card = (url) => {
    console.log("ejecutando card")
    return (
      <div
        onClick={() => window.open(url, '_blank')}
      >
        <span>Some content here</span>
      </div>
    )
  }

  let linkPaypal = (link)=>{
    let element = document.createElement("a")
    let p = document.getElementById("comprarCarrito")
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
    

  }
  const confirm = async () => {
    let response = await actions.checkOrderPayment()
    console.log(response["status"])
  }

  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">{(carrito && carrito.length > 0) ? displayCarrito : "null"}</div>
        <button type="button" id="comprarCarrito" onClick={total}>Comprar</button>
        <button type="button" onClick={confirm} >confirmar</button>
      </div>
    </div>

  );
}

export { CarritoCompras };
