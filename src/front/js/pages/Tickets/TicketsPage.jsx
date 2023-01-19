import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/tickets.css"

function DisplayTickets(){
    const { store, actions } = useContext(Context);
    const [tickets,setTickets] = useState([])
    const userId = localStorage.getItem("user_id")
    console.log(userId)
    useEffect(()=>{
        async function fetchData(){
            let response = await actions.genericFetchProtected(`user/${userId}/display_ticket_information`)
            let jsonResponse = await response.json()
            setTickets(jsonResponse)
        }
        fetchData()
    }, [])

    console.log(tickets)

    function displayAllTickets(){
        return tickets.map(ticket =>{
            return(
                <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Ticket #{ticket.id}</h5>
      <small>{ticket.date.substring(0,16)}</small>
    </div>
    <p class="mb-1">{ticket.description.length<30?ticket.description:ticket.description.slice(0,20) + "..."}</p>
    <small>Click in ticket to see more info</small>
  </a>
</div>
            )
        })
    }

    return(
        <div className="container">
            <div className="tickets--body">
                <h1>Your tickets</h1>
                {tickets.length>0? displayAllTickets(): <h2>No tickets yet</h2>}
            </div>
        </div>
        
    )
}

export default DisplayTickets 