import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { editItem } from "../../api/api";
import classes from "./ItemForm.module.css";
import Input from "../UI/Input";

const EditItem = ({ itemValue, onDataChanged }) => {
  const [item, setItem] = useState(itemValue); // State to store the id
  const { sendRequest, status, error } = useHttp(editItem);

  useEffect(() => {
    if (status === "completed" && !error) {
      onDataChanged();
    }
  }, [status, error, onDataChanged]);

  if (error) {
    return <p>{error}</p>;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      item,
      itemID: item.id,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        id="category"
        label="Category"
        value={item.category}
        onChange={(e) => setItem({ ...item, category: e.target.value })}
        type="text"
      />
      <Input
        id="name"
        label="Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        type="text"
      />
      <Input
        id="option"
        label="Size"
        value={item.option}
        onChange={(e) => setItem({ ...item, option: e.target.value })}
        type="text"
      />
      <Input
        id="price"
        label="Price"
        value={item.price}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
        type="text"
      />
      <Input
        id="cost"
        label="Cost"
        value={item.cost}
        onChange={(e) => setItem({ ...item, cost: e.target.value })}
        type="text"
      />
      <Input
        id="stock"
        label="Amount in Stock"
        value={item.stock}
        onChange={(e) => setItem({ ...item, stock: e.target.value })}
        type="text"
      />
      {status === "pending" ? (
        <div>loading</div>
      ) : (
        <Button type="submit">Update Item</Button>
      )}
    </form>
  );
};

export default EditItem;
