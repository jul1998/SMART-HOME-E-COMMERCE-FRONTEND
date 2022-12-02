import React, { useState, useContext, useEffect } from "react";
import "../../../styles/userProfile.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

function UserPassword() {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

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

  console.log(formData)
  
  function checkPassword(){
    const {newPassword, confirmPassword} = formData
    if (newPassword === confirmPassword && newPassword.length>3 && confirmPassword.length>3){
        return true
    }else{
        return false
    }
  }


  async function handleChangeUserInfo(event) {
    event.preventDefault();
    if (!checkPassword()){
        return console.log("Password is empty or less than 3 chars")
    }

    const {newPassword, confirmPassword} = formData

    let bodyObj = {
        password: newPassword
    };
    
    let response = await actions.genericFetchProtected(
      `user/${params.theid}/change_password`,
      "PUT",
      bodyObj
    );
    let jsonRes = await response.json();
    console.log(jsonRes)

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Great!",
        text: `${jsonRes.message}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
    
  }


  return (
    <div className="userSettings-main">
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
          <Link className="nav-link" to={`/userProfile/${params.theid}/settings`}>Change personal info</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/userProfile/${params.theid}/change_password`}>Change password</Link>
          </li>
          <li className="nav-item ">
            <a className="nav-link ">Delete account</a>
          </li>
        </ul>
      </nav>
      <h2>In this section, you can change your password</h2>
      <form onSubmit={handleChangeUserInfo}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
          Enter new password
          </label>
          <input
            onChange={handleChange}
            name="newPassword"
            type="password"
            className="form-control"
            id="newPasswordInput"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Confirm new password
          </label>
          <input
          onChange={handleChange}
            name="confirmPassword"
            type="password"
            className="form-control"
            id="confirmPasswordInput"
          />
          {!checkPassword()?<small>Password is empty or less than 3 chars</small>:null}
        </div>
        <button type="submit" className="btn btn-primary">
          Change my information
        </button>
      </form>
    </div>
  );
}

export { UserPassword };
