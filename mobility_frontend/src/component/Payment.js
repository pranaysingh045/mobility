import {React, useEffect, useState} from "react";
import TableComponent from "./TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("vechical", {
    header: "Vechial",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("payment_method", {
    header: "Payment Method",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total_cost", {
    header: "Total Cost",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("payment_issued_date", {
    header: "Payment Date",
    cell: (info) => info.getValue(),
  })
];




const Payment=()=> {
  const [data, setData]=useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}payment`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    }
  
    useEffect(()=>{
      fetchData()
    },[])

  const paymentBtn='Add Payment'
  const paymentType='PaymentDetailForm'
  return (
    <div>
      <TableComponent data={data} columns={columns} tableTitle="Payment" tblbtn={paymentBtn} formtype={paymentType}/>
    </div>
  );
}
export default Payment