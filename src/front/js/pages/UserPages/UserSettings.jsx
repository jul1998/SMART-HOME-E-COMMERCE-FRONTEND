import React, { useState, useContext, useEffect } from "react";
import "../../../styles/userProfile.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

function UserSettings() {
  const { store, actions } = useContext(Context);
  const [userInfoSettings, setUserInfoSettings] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: "",
    img: "",
  });

  const params = useParams();

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetchProtected(
        `user/${params.theid}`
      );
      let jsonRes = await response.json();
      setUserInfoSettings(jsonRes);
    }
    fetch();
  }, []);

  function handleChange(event) {
    console.log("handle func");
    const { name, value, type, checked } = event.target; //Destructurar data de formData
    setFormData((prevFormData) => {
      return {
        ...prevFormData, // Traer todo lo que se haya generado por el user
        [name]: type === "checkbox" ? checked : value, // Si el type del input es checkbox, retorne un boolean,
        // de lo contrario, retorne el valor digitado por user
      };
    });
  }

  async function handleChangeUserInfo(event) {
    event.preventDefault();
    const { fullname, email, phone, address, img } = formData;

    let bodyObj = {
      //If any from entry is empty, it will send the current user data to backend, else
      //it will update whatever user send to change related to personal info
      name: fullname.length > 0 ? fullname : userInfoSettings.name,
      email: email.length > 0 ? email : userInfoSettings.email,
      phone: phone.length > 0 ? phone : userInfoSettings.phone,
      address: address.length > 0 ? address : userInfoSettings.address,
      img: img.length > 0 ? img : userInfoSettings.img_profile,
    };

    //console.log(bodyObj)
    let response = await actions.genericFetchProtected(
      `user/${params.theid}/settings`,
      "PUT",
      bodyObj
    );
    let jsonRes = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Great!",
        text: `${jsonRes.msg}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
  }

  console.log(userInfoSettings);

  return (
    <div className="userSettings-main">
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
          <Link className="nav-link" to={`/userProfile/${params.theid}/settings`}><button type="button" class="btn btn-dark">Change personal info</button></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/userProfile/${params.theid}/change_password`}><button type="button" class="btn btn-dark">Change password</button></Link>
          </li>
          <li className="nav-item ">
            <Link to={`/userProfile/${params.theid}/delete_account`} className="nav-link"><button type="button" class="btn btn-danger">Delete account</button></Link>

          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li>
        </ul>
      </nav>
      <h2>In this section, you can change your personal information</h2>
      <form onSubmit={handleChangeUserInfo}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            onChange={handleChange}
            name="fullname"
            type="text"
            className="form-control"
            id="exampleInputName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress" className="form-label">
            Address
          </label>
          <input
            onChange={handleChange}
            name="address"
            type="text"
            className="form-control"
            id="exampleInputAddress"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone" className="form-label">
            Phone number
          </label>
          <input
            onChange={handleChange}
            name="phone"
            type="tel"
            className="form-control"
            id="exampleInputPhone"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputImg" className="form-label">
            Profile image
          </label>
          <input
            onChange={handleChange}
            name="img"
            type="text"
            className="form-control"
            id="exampleInputImg"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change my information
        </button>
      </form>
    </div>
  );
}

export { UserSettings };
