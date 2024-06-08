import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains(classes.modal_overlay)) {
      onClose();
    }
  };

  return (
    <div className={classes.modal_overlay} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        <div className={classes.modal_content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
