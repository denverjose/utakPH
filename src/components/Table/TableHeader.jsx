import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key}>{col.title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
