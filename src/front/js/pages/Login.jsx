import React, { useState, useContext } from "react";
import "../../styles/login.css";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

function Login() {
  const { store, actions } = useContext(Context);

  //let response = actions.login()
  //let res1 = store.user
  //console.log(res1)

  const [formData, setFormData] = useState({
    password:"",
    email: "",
}
)


function handleChange(event){
console.log("handle func")
const {name,value}= event.target //Destructurar data de formData
setFormData(prevFormData =>{
    return{
        ...prevFormData, // Traer todo lo que se haya generado por el user
        [name]: value 
        
    }
})
}

console.log(formData)

async function login (event){
    event.preventDefault()
    const {password, email} = formData

    let bodyObj = {
        password: password,
        email:email
    }

    let loginResponse = await actions.login("login","POST",bodyObj) //Get two variables: 1.response, 2.responseJson
    let jsonRes = await loginResponse.responseJson // Here we access to the property responseJson from object response
    //that contains token, msg. email from user
    

    if (loginResponse.response.ok){ 
        Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: `${jsonRes.message}`,
          })
        createProtectedRoute()
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${jsonRes.message}`,
          })
    }
}

async function createProtectedRoute(){
  let response = await actions.genericFetchProtected("helloprotected")
  console.log(await response.json())
  
}



  return (
    <div className="signup-container">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Login</h3>
                <p>Fill in the data below.</p>
                <form onSubmit={login} className="requires-validation" >
                  
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
                      Login
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

export { Login };
