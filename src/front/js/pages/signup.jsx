import React, {useState, useContext} from "react";
import "../../styles/signup.css";
import Swal from 'sweetalert2'
import {Context} from "../store/appContext"


function Signup() {

const {store, actions} = useContext(Context)

const [formData, setFormData] = useState({
        fullname: "",
        password:"",
        confirmPassword:"", 
        email: "",
        userType:"", 
        newsLetter:"",
        phone:"",
        address:""
    }
    )


  function handleChange(event){
    console.log("handle func")
    const {name,value,type,checked}= event.target //Destructurar data de formData
    setFormData(prevFormData =>{
        return{
            ...prevFormData, // Traer todo lo que se haya generado por el user
            [name]: type==="checkbox"? checked: value // Si el type del input es checkbox, retorne un boolean,
            // de lo contrario, retorne el valor digitado por user
        }
    })
}

    console.log(formData)

    async function signup (){
        const {fullname, password, email, phone, address} = formData
        console.log(fullname)

        let bodyObj = {
            name: fullname,
            password: password,
            email:email,
            phone:phone,
            address:address
        }

        let response = await actions.genericFetch("signup","POST",bodyObj) //Get response status prop
        let jsonResponse = await response.json() // Get msg from backend endpoint

        if (response.ok){ 
            Swal.fire({
                icon: 'success',
                title: 'Great!',
                text: `${jsonResponse.mensaje}`,
              })
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${jsonResponse.mensaje}`,
              })
        }
    }

    function checkPasswordFunc(){
        console.log("Password check")
        if(formData.password === formData.confirmPassword && formData.password.length > 3) {
            return true
        } else {
            return false
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        if (checkPasswordFunc()){
            signup()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password does not match or is less than 3 chars ',
              })
        }
    }


  return (
    <div className="signup-container">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Register Today</h3>
                <p>Fill in the data below.</p>
                <form onSubmit={handleSubmit} className="requires-validation" >
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="fullname"
                      onChange={handleChange}
                      placeholder="Full Name"
                      value={formData.fullname}
                      required
                    />
                    <div className="valid-feedback">Username field is valid!</div>
                    <div className="invalid-feedback">
                      Username field cannot be blank!
                    </div>
                  </div>

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
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      placeholder="Phone"
                      value={formData.phone}

                      required
                    />
                    
                    <small style={{color:"white"}}>Format: 123-456-7890</small>
                    <div className="valid-feedback">Email field is valid!</div>
                    <div className="invalid-feedback">
                      Email field cannot be blank!
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      onChange={handleChange}
                      placeholder="Address"
                      value={formData.address}
                      required
                    />

                  </div>

                  <div className="col-md-12">
                    <select className="form-select mt-3" 
                    required
                    onChange={handleChange}
                    name="userType"
                    value={formData.userType}>
                      <option selected disabled value="">
                        User Type
                      </option>
                      <option value="admin">Admin</option>
                      <option value="client">Client</option>
                    </select>
                    <div className="valid-feedback">You selected a position!</div>
                    <div className="invalid-feedback">
                      Please select a type
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

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                      required
                    />
                    {checkPasswordFunc()?
                     null
                     :<ul style={{color:"red"}}>
                        <li>Password does not match</li>
                        <li>Password is less than 3 chars</li>
                        </ul>}
                    <div className="valid-feedback">Password does not match</div>
                    <div className="invalid-feedback">
                      Password field cannot be blank!
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      name="newsLetter"
                      onChange={handleChange}
                      
                    />
                    <label className="form-check-label">
                      I want to receive newsletters from this website
                    </label>

                    <div className="invalid-feedback">
                      Please confirm that the entered data are all correct!
                    </div>
                    
                  </div>

                  <div className="form-button mt-3">
                    <button id="submit" type="submit" className="btn btn-primary">
                      Register
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

export { Signup };
