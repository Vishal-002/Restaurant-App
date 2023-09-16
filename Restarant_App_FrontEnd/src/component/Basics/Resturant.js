import React, { useState, useEffect } from "react";
import "./style.css";
import MenuCard from "./MenuCard";
import AddItem from "../AddProduct/AddItem";

const Resturant = ({ userType }) => {
  const [menuData, setMenuData] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();

      console.log(data); // Log fetched data

      setMenuData(data); // Update menuData state with fetched data
      setFilteredData(data); // Set initial filtered data as all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueList = [...new Set(menuData.map((curElem) => curElem.category))];

  console.log("This is uniquelist");
  console.log(uniqueList);

  const filterItem = (category) => {
    let updatedList;
    if (category === "all") {
      updatedList = menuData;
    } else {
      updatedList = menuData.filter((curElem) => {
        return curElem.category === category;
      });
    }

    setFilteredData(updatedList);
    setShowAddItem(false); // Hide AddItem component when other buttons are clicked
  };

  const handleAddMenuData = () => {
    setShowAddItem(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="btn-group">
          {uniqueList.map((category, index) => (
            <button
              className="btn-group__item"
              key={index}
              onClick={() => filterItem(category)}
            >
              {category}
            </button>
          ))}
          <button className="btn-group__item" onClick={() => filterItem("all")}>
            All
          </button>
          {/* <button className="btn-group__item" onClick={handleAddMenuData}>
            Add Menu Data
          </button> */}
          {userType === "admin" && (
            // Conditionally show based on userType
            <button className="btn-group__item" onClick={handleAddMenuData}>
              Add Menu Data
            </button>
          )}
        </div>
      </nav>

      {showAddItem ? <AddItem /> : <MenuCard menuData={filteredData} />}
    </>
  );
};

export default Resturant;
