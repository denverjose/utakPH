import React, { useEffect } from "react";
import classes from "./TableFooter.module.css";
import Button from "../UI/Button";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  // Render null if there is only one page
  if (range.length <= 1) {
    return null;
  }

  return (
    <div className={classes.tableFooter}>
      {range.map((el, index) => (
        <Button
          key={index}
          className={`${classes.button} ${page === el && classes.activeButton}`}
          onClick={() => setPage(el)}
        >
          {el}
        </Button>
      ))}
    </div>
  );
};

export default TableFooter;
