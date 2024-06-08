import React, { useState, useEffect } from "react";
import classes from "./ItemForm.module.css";
import useHttp from "../../hooks/use-http";
import { addItem } from "../../api/api";
import Button from "../UI/Button";

import Input from "../UI/Input";
const ItemForm = ({ onAddedItem, onClose }) => {
  const [item, setItem] = useState({});
  const { sendRequest, status, error } = useHttp(addItem);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedItem();
      onClose();
    }
  }, [status, error, onAddedItem]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest(item);
  };

  if (error) {
    return <p>{error}</p>;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Remove any existing peso sign and non-digit characters
    const cleanValue = value.replace(/[₱,]/g, "");
    // Conditionally prepend '₱' to the 'price' and 'cost' values and maintain comma formatting
    let updatedValue;
    if (id === "price" || id === "cost") {
      updatedValue = `₱${cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } else {
      updatedValue = value;
    }
    setItem((prevItem) => ({
      ...prevItem,
      [id]: updatedValue,
    }));
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
        <Input
          id="category"
          label="Category"
          value={item.category}
          onChange={handleInputChange}
          type="text"
        />
        <Input
          id="name"
          label="Item Name"
          value={item.name}
          onChange={handleInputChange}
          required
          type="text"
        />
        <Input
          id="option"
          label="Size"
          value={item.option}
          onChange={handleInputChange}
          type="text"
        />
        <Input
          id="price"
          label="Item Price"
          value={item.price}
          onChange={handleInputChange}
          required
        />
        <Input
          id="cost"
          label="Item Cost"
          value={item.cost}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Amount in stock"
          id="stock"
          value={item.stock}
          onChange={handleInputChange}
          required
          type="number"
        />
      {status === "pending" ? (
        <div className={classes.center}>loading</div>
      ) : (
        <Button type="submit">Add Item</Button>
      )}
    </form>
  );
};

export default ItemForm;
