import React, { useState } from "react";
import "./AddItem.css";

const AddItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     // Create a FormData object to store the form data
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("name", name);
  //     formData.append("category", category);
  //     formData.append("price", price);
  //     formData.append("description", description);

  //     // Do something with the form data (e.g., send it to an API)
  //       fetch("http://localhost:5000/post");

  //     // Clear the form fields
  //     setImage(null);
  //     setName("");
  //     setCategory("");
  //     setPrice("");
  //     setDescription("");
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);

    try {
      // Send the form data to the API endpoint
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        alert("Form data submitted successfully!");
        // Clear the form fields
        setImage(null);
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
      } else {
        throw new Error("Failed to submit form data.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form data. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // id: 1,
  // image: "images/maggi.jpg",
  // name: "Maggi",
  // category: "breakfast",
  // price: "12 Rs.",
  // description:

  return (
    <div className="add-item-container">
      <h2>Add Menu Item</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image (in .jpg) :</label>
          <input type="file" id="image" onChange={handleImageChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="evening">Evening</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            // style={{ width: "300px", height: "150px", resize: "none" }}
            style={{
              width: "100%",
              height: "150px",
              resize: "none",
              boxSizing: "border-box",
            }}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItem;
