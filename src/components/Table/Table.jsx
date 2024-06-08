import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import classes from "./Table.module.css";
const Table = ({ onDataChanged, columns, data, isEditable }) => {
  return (
    <div className={classes.table}>
      <table>
        <TableHeader columns={columns} />
        <TableContent
          onDataChanged={onDataChanged}
          isEditable={isEditable}
          data={data}
        />
      </table>
    </div>
  );
};

export default Table;
