import React from "react";

const MenuCard = ({ menuData }) => {
  function orderNow() {
    console.log("Order Now");
    alert("Your Order has been placed");
  }

  return (
    <>
      {/* <button onClick={fetchData}>Fetch Data</button> */}
      <section className="main-card--cointainer">
        {menuData.map((curElem) => (
          <div className="card-container" key={curElem.id}>
            <div className="card">
              <div className="card-body">
                {/* <span className="card-number card-circle subtle">
                  {curElem.id}
                </span> */}
                <span
                  className="card-author subtle"
                  style={{ color: "blueviolet" }}
                >
                  {curElem.category}
                </span>
                <h2 className="card-title">{curElem.name}</h2>
                <span className="card-description subtle">
                  {curElem.description}
                </span>
                <div className="card-read">Read</div>
              </div>
              <img
                src={`data:image/jpg;base64, ${curElem.image}`}
                alt="images"
                className="card-media"
              />
              <span className="card-tag subtle" onClick={orderNow}>
                Order Now
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MenuCard;
