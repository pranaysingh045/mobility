import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("componentName", {
    header: "Compoent Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("repair_cost", {
    header: "Repair-Cost",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("component_add_date", {
    header: "Component Added on",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("component_update_date", {
    header: "Component Updated on",
    cell: (info) => info.getValue(),
  }),
];


function ComponentRegistration() {
  const [data, setData]=useState([]) 

  const componetBtn="Add Component"
  const formtype="ComponetDetailForm"
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}components`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div>
      <TableComponent data={data} columns={columns} tableTitle="Componet Registration" tblbtn={componetBtn} formtype={formtype}/>
    </div>
  );
}
export default ComponentRegistration