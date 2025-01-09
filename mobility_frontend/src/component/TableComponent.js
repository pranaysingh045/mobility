import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";


const TableComponent = ({ data = [], columns = [], tableTitle = "", tblbtn="", formtype="" }) => {
  const navigate = useNavigate();
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleNavigate = (value) => {
    // Navigate to the appropriate form based on formType
    console.log('qwqw12',value)
    switch (value) {
      
      case "ComponetDetailForm":
        navigate("/component-details-form");
        break;
      case "IssueDetailForm":
        navigate("/issue-details-form");
        break;
      case "PaymentDetailForm":
        navigate("/payment-form");
        break;
      case "VichecalDetailsForm":
          navigate("/vichel-form");
          break;
      default:
        navigate("/form");
      console.log('thisis form type',value)
    }
  };


  return (
    <div className="container mt-4">
    <h2 className="mb-4 d-flex align-items-center justify-content-between">
      <span>{tableTitle}</span>
      <span
        className="btn btn-secondary"
        // to="/form"
        onClick={()=>handleNavigate(formtype)}
      >
        {tblbtn}
      </span>
    </h2>
      <div className="table-responsive">
        {data.length === 0 ? ( 
          <div className="alert alert-info">No data available to display.</div>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
