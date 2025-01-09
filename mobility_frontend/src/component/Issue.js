import {React, useState, useEffect} from "react";
import TableComponent from "./TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("component_name", {
    header: "Component",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("vechical_name", {
    header: "Vechical",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("labour_cost", {
    header: "Labour Cost",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("created_on", {
    header: "Created On",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("labour_name", {
    header: "Labour Name",
    cell: (info) => info.getValue(),
  }),
];


const Issue=()=> {
    const [data, setData]=useState([]) 
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}issues`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    useEffect(()=>{
      fetchData()
    },[])
  const issueBtn = 'Add Issue'
  const issueType='IssueDetailForm'
  return (
    <div>
      <TableComponent data={data} columns={columns} tableTitle="Issues" tblbtn={issueBtn} formtype={issueType} />
    </div>
  );
}

export default Issue;
