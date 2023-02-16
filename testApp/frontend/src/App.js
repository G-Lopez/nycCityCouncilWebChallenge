import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';


class App extends Component {
  state = {
    loginToken: '',
    complaintsInDistrict: [{}],
    openComplaintsInDistrict: 0,
    closedComplaintsInDistrict: 0,
    topComplaintInDistrict: '',
  }

  setCredentials = (credentials) => {
    this.setState({loginToken: credentials})
    console.log(credentials)
    this.fetchComplaintData()
  }

  render() {
    if (!this.state.loginToken) {
      return <Login onCredentialRetrieval={this.setCredentials}></Login>
    }
    else{ 
      if (!this.state.complaintsInDistrict) {
        return <div />
      }
  
      return (
        <div className="App">
          <Dashboard 
            fieldNames={Object.keys(this.state.complaintsInDistrict[0])} 
            records={this.state.complaintsInDistrict}
            totalComplaintsInDistrict={this.state.complaintsInDistrict.length}
            openComplaintsInDistrict={this.state.openComplaintsInDistrict}
            closedComplaintsInDistrict={this.state.closedComplaintsInDistrict}
            topComplaintType={this.state.topComplaintInDistrict}
          ></Dashboard>
        </div>
      );
    }
  }
  
  fetchComplaintData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': this.state.loginToken }
    }
   Promise.all([
      fetch("http://localhost:8000/api/complaints/", requestOptions),
      fetch("http://localhost:8000/api/complaints/openCases/", requestOptions),
      fetch("http://localhost:8000/api/complaints/closedCases/", requestOptions),
      fetch("http://localhost:8000/api/complaints/topComplaints/", requestOptions)
    ]).then(responses => {
      responses[0].json().then(data => this.setState({complaintsInDistrict: data}))
      responses[1].json().then(data => this.setState({openComplaintsInDistrict: data}))
      responses[2].json().then(data => this.setState({closedComplaintsInDistrict: data}))
      responses[3].json().then(data => this.setState({topComplaintInDistrict: data}))

    })
  }
  }

export default App;