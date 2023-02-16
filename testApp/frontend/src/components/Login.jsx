import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //ibarron barron-42
  fetchCredentials(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch("http://localhost:8000/login/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          this.props.onCredentialRetrieval("Token " + data.token);
        } else {
          alert("Invalid username or password");
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const credentials = this.fetchCredentials(
      this.state.username,
      this.state.password
    );
    if (credentials) {
      this.props.onCredentialRetrieval(credentials);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Container className="justify-content-md-center">
        <h2>
          Welcome to NY City Council Complaints Page. Please login to see your
          district's information.
        </h2>
        <Form onSubmit={this.handleSubmit} method="post">
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
