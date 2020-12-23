import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      id: "",
      firstName: "",
      lastName: "",
      nik: "",
      kodePerson: "",
      button: "simpan"
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

    if (this.state.button === "simpan") {
      axios.post('http://localhost:8080/person/post-person-status', person)
        .then((response) => {
          console.log(response);
        })
    } else {
      this.editPerson(this.state.id)
    }
  }

  getEditPerson = (id) => {
    axios.get('http://localhost:8080/person/by-id/' + id)
      .then((res) => {
        console.log(res);
        this.setState({
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          nik: res.data.nik,
          kodePerson: res.data.kodePerson,
          button: "update"
        })
      })
  }

  editPerson = (id) => {
    const person = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nik: this.state.nik,
      kodePerson: this.state.kodePerson
    }

    axios.put('http://localhost:8080/person/update-person/' + id, person)
      .then((response) => {
        console.log(response);
      })
  }

  delete = (id) => {
    axios.delete('http://localhost:8080/person/delete/' + id).then
      (() => {
        window.location.reload()
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
              onClick={this.submitPerson}>{this.state.button}</button>
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
                <th>Action</th>
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
                    <td>
                      <button className="btn btn-warning mr-2" id="btn-edit" onClick={() => this.getEditPerson(people.id)}>Edit</button>
                      <button className="btn btn-danger" id="btn-delete" onClick={() => this.delete(people.id)}>Delete</button>
                    </td>
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