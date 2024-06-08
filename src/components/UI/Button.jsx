import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, type, onClick, children }) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
