import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../UI/Button"; // Assuming Button is in the right path
import EditItem from "../Item/EditItem";
import DeleteItem from "../Item/DeleteItem";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableContent = ({ onDataChanged, data, isEditable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const toggleDelete = (item) => {
    setIsDeleting((prev) => !prev);
    setCurrentItem(item);
  };
  const toggleModal = (item = null) => {
    setIsModalVisible((prev) => !prev);
    setCurrentItem(item);
  };

  return (
    <>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).map(
              ([key, value], i) => key !== "id" && <td key={i}>{value}</td>
            )}
            {isEditable && (
              <>
                <td>
                  <Button onClick={() => toggleModal(item)}>
                    <EditOutlined />
                  </Button>
                </td>
                <td>
                  <Button onClick={() => toggleDelete(item)}>
                    <DeleteOutlined />
                  </Button>
                </td>
                {isModalVisible && (
                  <Modal onClose={toggleModal}>
                    <EditItem
                      onDataChanged={onDataChanged}
                      itemValue={currentItem}
                    />
                  </Modal>
                )}
                {isDeleting && (
                  <Modal onClose={toggleDelete}>
                    <DeleteItem
                      onClose={toggleDelete}
                      onDataChanged={onDataChanged}
                      itemId={currentItem.id}
                    />
                  </Modal>
                )}
              </>
            )}
          </tr>
        ))}
        {/* <tr>
          <td>
            
          </td>
          
        </tr> */}
      </tbody>
    </>
  );
};

export default TableContent;
