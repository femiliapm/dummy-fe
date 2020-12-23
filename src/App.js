import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      firstName: "",
      lastName: "",
      nik: "",
      kodePerson: ""
    }

    this.personChange = this.personChange.bind(this)
  }

  componentDidMount() {
    this.findPerson();
  }

  findPerson() {
    axios.get('http://localhost:8080/person/get-all')
      .then((response) => {
        console.log(response);
        this.setState({
          persons: response.data
        })
      })
  }

  submitPerson = () => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nik: this.state.nik,
      kodePerson: this.state.kodePerson
    }

    console.log(person)

    axios.post('http://localhost:8080/person/post-person-status', person)
      .then((response) => {
        console.log(response);
      })
  }

  personChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { firstName, lastName, nik, kodePerson } = this.state;

    return (
      <div className="App">
        <header>
          Form Person
        </header><br></br>
        <div className="container">
          <form>
            <div className="form-group">
              <input className="col-sm-10" name="id" id="id" hidden="true"></input>
            </div>
            <div className="form-group">
              <label className="col-sm-2">First Name</label>
              <input className="col-sm-10" type="text" name="firstName"
                id="firstName" value={firstName} onChange={this.personChange}></input>
            </div>
            <div className="form-group">
              <label className="col-sm-2">Last Name</label>
              <input className="col-sm-10" type="text" name="lastName"
                id="lastName" value={lastName} onChange={this.personChange}></input>
            </div>
            <div className="form-group">
              <label className="col-sm-2">NIK</label>
              <input className="col-sm-10" type="text" name="nik"
                id="nik" value={nik} onChange={this.personChange}></input>
            </div>
            <div className="form-group">
              <label className="col-sm-2">Kode Person</label>
              <input className="col-sm-10" type="text" name="kodePerson"
                id="kodePerson" value={kodePerson} onChange={this.personChange}></input>
            </div>
            <button id="btn-save" className="btn btn-primary"
              onClick={this.submitPerson}>Simpan</button>
          </form>
        </div><br></br>

        <div className="container">
          <table className="table" id="table-person">
            <thead>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>NIK</th>
                <th>Kode Person</th>
              </tr>
            </thead>
            <tbody id="body-person">
              {this.state.persons.map((people, index) => {
                return (
                  <tr key={people.id}>
                    <td>{people.id}</td>
                    <td>{people.firstName}</td>
                    <td>{people.lastName}</td>
                    <td>{people.nik}</td>
                    <td>{people.kodePerson}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div><br />
      </div>
    );
  }
}