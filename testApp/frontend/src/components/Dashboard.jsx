import React from "react";
import ComplaintsTable from "./ComplaintTable";
import ComplaintsNavBar from "./ComplaintsNavBar";

const Dashboard = ({
  fieldNames,
  records,
  totalComplaintsInDistrict,
  openComplaintsInDistrict,
  closedComplaintsInDistrict,
  topComplaintType,
}) => {
  return (
    <div>
      <ComplaintsNavBar
        totalComplaintsInDistrict={totalComplaintsInDistrict}
        openComplaintsInDistrict={openComplaintsInDistrict}
        closedComplaintsInDistrict={closedComplaintsInDistrict}
        topComplaintType={topComplaintType}
      ></ComplaintsNavBar>
      <ComplaintsTable
        fieldNames={fieldNames}
        records={records}
      ></ComplaintsTable>
    </div>
  );
};

export default Dashboard;
