import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { deleteItem } from "../../api/api";
import Button from "../UI/Button";
import classes from "./DeleteItem.module.css";

const DeleteItem = ({ itemId, onClose, onDataChanged }) => {
  const { sendRequest, status, error } = useHttp(deleteItem);
  useEffect(() => {
    if (status === "completed" && !error) {
      onDataChanged(); // Call the callback function when data is successfully updated
    }
  }, [status, error, onDataChanged]);
  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      itemID: itemId,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && <div>loading</div>}
      <span>Are you sure you want to delete this item?</span>
      <div className={classes.buttonContainer}>
        <Button type="submit">Delete</Button>
        <Button type="reset" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DeleteItem;
