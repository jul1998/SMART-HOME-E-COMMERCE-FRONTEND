import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchInput, setSearchInput] = useState({
    input: "",
  });

  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];

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
  console.log(searchInput.input);

  const filteredData = countries.filter((el) => {
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
        }}
        className="d-flex"
        role="search"
      >
        <input
          className="form-control me-2"
          type="search"
          name="input"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange}
          value={searchInput.input}
        />
      </form>

      {<ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
        }
    </div>
  );
}

export { SearchBar };
