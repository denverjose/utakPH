import React from "react";
import classes from "./Input.module.css";

const Input = ({
  type,
  label,
  id,
  value = "",
  onChange,
  required = false,
}) => {
  return (
    <div className={classes.input_field}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>

    </div>
  );
};

export default Input;
