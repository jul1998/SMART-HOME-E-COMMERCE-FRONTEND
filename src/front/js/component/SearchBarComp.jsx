import { Link, Navigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { ShowProductPageFiltered } from "../pages/ProductPage/ProductPageFiltered.jsx";
import { ProductItem } from "./ProductComp/ProductItem.jsx";

function SearchBar({products}) {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState({
  input: "",
  });


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //Destructurar data de formData
    setSearchInput((prevSearch) => {
      return {
        ...prevSearch, // Traer todo lo que se haya generado por el user
        [name]: value.toLowerCase(),
      };
    });
  };

  const filteredData = products.filter((el) => {
    //if no input the return the original
    if (searchInput.input === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.name.toLowerCase().includes(searchInput.input)
    }
})


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("here")
         
        }}
        className="d-flex"
        role="search"
      >
        <input
          className="form-control me-2"
          type="search"
          name="input"
          placeholder="Search a product"
          aria-label="Search"
          onChange={handleChange}
          value={searchInput.input}
        />
      </form>
      <ul className="text-center">
            {filteredData.map((product) => (
                <div key={product.id}><ProductItem product={product}/></div>
            ))}
        </ul>
    

    </div>
  );
}

export { SearchBar };
