import React, {useState,useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../styles/userProfile.css";

function AccordionComp(){
    const { store, actions } = useContext(Context);
    const [ticketData, setTicketData] = useState({
        text:""
    })

    const userId = localStorage.getItem("user_id");


    function handleChange(event){
        const {name,value}= event.target //Destructurar data de formData
        setTicketData(prevTicketData =>{
            return{
                ...prevTicketData, // Traer todo lo que se haya generado por el user
                [name]: value 
                
            }
        })
        }


    async function sendTicket(e){
        e.preventDefault()
        let bodyObj = {
            description: ticketData.text,
            user_id:userId
        }

        let response = await actions.genericFetchProtected("create_ticket", "POST", bodyObj)
        let jsonRes = await response.json()
        if (response.ok){
            Swal.fire({
                icon: 'success',
                title: 'Great!',
                text: `${jsonRes.message}`,
              })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${jsonRes.message}`,
                  })
            }
        }


    return(
        <div className="container">
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Send a TT with your issue
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div className="form--tt">
            <form onSubmit={sendTicket}>
                <div class="mb-3">
                <label for="form-email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="form-email" placeholder="name@example.com"/>
                <label for="form-username" class="form-label">Your name</label>
                <input type="text" class="form-control" id="form-username" placeholder="Your name here..."/>
                </div>
                <div class="mb-3">
                <label for="ticketText" class="form-label">My issue is...</label>
                <textarea value={ticketData.text} required onChange={handleChange} name="text" class="form-control" id="ticketText" rows="3"></textarea>
                <button type="submit" class="btn btn-success mt-2">Send ticket</button>
                </div>
            </form>
           
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
    </div>
    )
   
}

export default AccordionComp