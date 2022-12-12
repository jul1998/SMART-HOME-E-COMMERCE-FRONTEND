import React, { useState, useContext } from "react";
import "../../../styles/loginAdmin.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";

function LoginAdmin() {
  const { store, actions } = useContext(Context);

  //let response = actions.login()
  //let res1 = store.user
  //console.log(res1)

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  }
  )

  function handleChange(event) {
    console.log("handle func")
    const { name, value } = event.target //Destructurar data de formData
    setFormData(prevFormData => {
      return {
        ...prevFormData, // Traer todo lo que se haya generado por el user
        [name]: value
      }
    })
  }

  console.log(formData)

  async function loginAdmin(event) {
    event.preventDefault()
    const { password, email } = formData

    let bodyObj = {
      password: password,
      email: email
    }

    let response = await actions.loginAdmin("loginAdmin", "POST", bodyObj) //Get response status prop
    let jsonResponse = await response.json() // Get msg from backend endpoint
    console.log(jsonResponse)

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: `${jsonResponse.message}`,
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${jsonResponse.message}`,
      })
    }
  }



  return (
    <div className="signupAdmin-container">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Login Admin</h3>
                <p>Fill in the data below.</p>
                <form onSubmit={loginAdmin} className="requires-validation" >

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="E-mail Address"
                      value={formData.email}

                      required
                    />
                    <div className="valid-feedback">Email field is valid!</div>
                    <div className="invalid-feedback">
                      Email field cannot be blank!
                    </div>
                  </div>


                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                    <div className="valid-feedback">Password field is valid!</div>
                    <div className="invalid-feedback">
                      Password field cannot be blank!
                    </div>
                  </div>


                  <div className="form-button mt-3">
                    <button id="submit" type="submit" className="btn btn-primary">
                      Login Admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginAdmin };
