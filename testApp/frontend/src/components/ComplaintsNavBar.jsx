import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const complaintsNavBar = ({
  totalComplaintsInDistrict,
  openComplaintsInDistrict,
  closedComplaintsInDistrict,
  topComplaintType,
}) => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>NY City Council Complains Page</Navbar.Brand>
        <Nav className="flex-grow-1 justify-content-evenly">
          <Nav.Item>
            <Nav.Link>Total Complaints: {totalComplaintsInDistrict}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Open Complaints: {openComplaintsInDistrict}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Closed Complaints: {closedComplaintsInDistrict}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Top Complaint Type: {topComplaintType}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default complaintsNavBar;
