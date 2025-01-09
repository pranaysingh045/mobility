import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("vehicle_name", {
    header: "Vehicle Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("vehicle_owner", {
    header: "Vehicle Owner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("issue_details", {
    header: "Issue Details",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("repair_estimated_time", {
    header: "Repair Estimated Time",
    cell: (info) => info.getValue(),
  })
];
const Vehicle = () => {
  const [data, setData]=useState([])
  const vichelBtn="Add Vechical"
  const formtype="VichecalDetailsForm"

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}vechical`);
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
        <TableComponent data={data} columns={columns} tableTitle="Vehicle" tblbtn={vichelBtn} formtype={formtype}/>
      </div>
    );
  }


export default Vehicle;
