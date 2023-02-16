import React from "react";
import Table from "react-bootstrap/Table";

const ComplaintsTable = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.fieldNames.map((fieldName) => {
            return <td key={fieldName}>{fieldName}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.records.map((record, index) => {
          return (
            <tr key={index}>
              {props.fieldNames.map((fieldName) => {
                return <td key={fieldName}>{record[fieldName]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ComplaintsTable;
