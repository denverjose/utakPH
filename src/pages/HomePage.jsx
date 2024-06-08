import React, { useState, useEffect, useCallback, useMemo } from "react";
import Modal from "../components/Modal/Modal";
import Button from "../components/UI/Button";
import ItemForm from "../components/Item/ItemForm";
import Items from "../components/Item/Items";
import useHttp from "../hooks/use-http";
import { getItems } from "../api/api";
import { PlusCircleFilled } from "@ant-design/icons";
const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const { sendRequest, status, data } = useHttp(getItems, true);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const addedItemHandler = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (status === "completed" && data && Object.keys(data).length > 0) {
      const desiredOrder = [
        "id",
        "category",
        "name",
        "option",
        "price",
        "cost",
        "stock",
      ];

      // Convert data object into an array of objects
      const dataArray = Object.keys(data).map((key) => ({
        id: key, // Assuming each item has a unique identifier
        ...data[key],
      }));

      // Sort the array of objects based on the desired order
      const sortedItems = dataArray.map((item) => {
        const sortedItem = {};
        desiredOrder.forEach((key) => {
          sortedItem[key] = item[key] !== undefined ? item[key] : ""; // Assign empty string if the key doesn't exist
        });
        return sortedItem;
      });
      setItems(sortedItems);
    }
  }, [status]);

  const columns = useMemo(() => {
    if (items.length === 0) return [];
    const keys = Object.keys(items[0]).filter((key) => key !== "id");
    return keys.map((key) => ({
      key: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
    }));
  }, [items]);

  let posts;
  if (status === "pending") {
    posts = <div className="centered">Loading...</div>;
  } else if (status === "completed" && items.length > 0) {
    posts = (
      <Items onDataChanged={addedItemHandler} items={items} columns={columns} />
    );
  } else if (status === "completed" && items.length === 0) {
    posts = <p className="centered">No items were added yet!</p>;
  }

  return (
    <>
      <Button onClick={toggleModal}>
        Add Item <PlusCircleFilled />
      </Button>
      {posts}
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          <ItemForm onClose={toggleModal} onAddedItem={addedItemHandler} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
