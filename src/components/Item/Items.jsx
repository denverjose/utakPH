import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import useTable from "../../hooks/use-table";
import TableFooter from "../Table/TableFooter";
import classes from "./Items.module.css";

const Items = ({ onDataChanged, columns, items }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("rowsPerPage") || "5"
  );

  useEffect(() => {
    localStorage.setItem("rowsPerPage", rowsPerPage);
  }, [rowsPerPage]);

  const { slice, range } = useTable(items, page, rowsPerPage);

  const handlePageSizeChange = (e) => {
    console.log(e.target.value);
    setRowsPerPage(e.target.value);
  };
  return (
    <>
      <Table
        onDataChanged={onDataChanged}
        isEditable
        columns={columns}
        data={slice}
      />
      <div className={classes.pagination}>
        <div className={classes.select_group}>
          <label htmlFor="select">Rows per page: </label>
          <select value={rowsPerPage} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
};

export default Items;
