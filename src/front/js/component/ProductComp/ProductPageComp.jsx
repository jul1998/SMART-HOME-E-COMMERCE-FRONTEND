import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../../styles/products.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";


function ProductDetailPageComp({ product, description, questions }) {
  const { store, actions } = useContext(Context);
  const [itempQuantity, setItempQuantity] = useState(0);
  const [questionText, setQuestionText]= useState({
    question:""
  })

  

  function handleChangeInText(event) {
    const {name,value}= event.target
    setQuestionText(prevQuestionText => {
        return {
            ...prevQuestionText,
            [name]: value
        }
    })
}

  let floatProduct = parseFloat(product.price)//Converts price into number

  //Esto le da formato a cualquier interger para aparecer como moneda
  const priceDisplay = floatProduct.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  function incrementQuantity() {
    setItempQuantity((prevQuant) => prevQuant + 1);
  }

  function reduceQuantity() {
    if (itempQuantity <= 1) {
      setItempQuantity(0);
    } else {
      setItempQuantity((prevQuant) => prevQuant - 1);
    }
  }

  function sendQuestion (e){
    e.preventDefault()
    console.log("Here")
    const {question} = questionText
    let response = actions.genericFetchProtected(`product/<product_id>/user/<user_id>/questions`)

  }

  let displayDescription = description.map(item=>{
    return (<li key={item.id} className="list-group-item"><span>{item.description}</span></li>)
  })

  let displayQuestions = questions.map((item, index)=>{
    return (
      <div  >
        <ul>
        <p>Posted at: <small>{item.posted_at} --- </small>  Posted by {item.author} </p>
        <p><small>Question #{index+1}</small></p> 
          <li key={item.id} className="list-group-item"><span>{item.descripcion}</span></li>
        </ul> 
      </div>
      
      )
  })

  console.log(questionText)
  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-5 col-md-6 my-5">
            <img
              src={product.img?product.img:"https://images.unsplash.com/photo-1633078654544-61b3455b9161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8NDA0JTIwZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"}
              className="img-fluid"
              alt="image"
            />
          </div>
          <div  className="col-sm-5 col-md-6 my-5">
            <h1>{product.name}</h1>
            <p className="col-md-4">Reviews</p>

            <h2 className="col-md-4">{priceDisplay}</h2>
            <div className="row">
            <div style={{border: '1px solid gray'}}>

          </div>
              <div className="col-sm-6 col-md-5 col-lg-6">Quantity</div>

              {/* This line forces columns to break*/}
              <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0"></div>

              <div className="col-sm-6 col-md-5 col-lg-6">
                <div className="qty mt-2">
                  <span onClick={reduceQuantity} className="minus bg-dark">
                    -
                  </span>
                  <input
                    className="count--input"
                    type="number"
                    class="count"
                    name="qty"
                    value={itempQuantity}
                  />
                  <span onClick={incrementQuantity} className="plus bg-dark">
                    +
                  </span>
                </div>
              </div>
              <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">
                <button class="button-64" role="button">
                  <span class="text">Add to cart</span>
                </button>
              </div>

              <div class="row my-5">
                <div class="col-sm-6 col-md-5 col-lg-6">
                  {/* This line displays code quantity*/}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-5 col-lg-6">
              {/* This line displays code below img*/}
              <h2>Preguntas del producto</h2>
              <div className="product--questions--list">
                {displayQuestions}
              </div>
                <div>
                <h2>Postea alguna pregunta</h2>
              
              <form onSubmit={sendQuestion}>
                <textarea className="product--textarea" value={questionText.question}  onChange={handleChangeInText} placeholder="Enter a question..." name="question" id="" cols="30" rows="10">

                </textarea>
                <button type="submit" className="button-4" role="button">Post question</button>
              </form>
                </div>

  
          </div>
          <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">
            <ul  className="list-group list-group-flush">
            {displayDescription}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetailPageComp };
