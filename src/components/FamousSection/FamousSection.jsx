import React, { useEffect, useState } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);


  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
  

  axios({
    method: "GET",
    url: '/api/people',
  })
  .then((response) => {
    console.log("Famous peeps data: ", response.data)
    // ! Set setPeopleArray to contain response data
    setPeopleArray(response.data)

  })
  .catch((error) => {
    console.error("Something happened on GET request to /api/people ", error)
  })
}
// ! useEffect takes 2 arguments: a callback function and an optional array
useEffect(
  () => {
    fetchPeople();
  },
  []
)


  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database

    axios({
      method: "POST",
      url: "/api/people",
      data: {
        name: famousPersonName,
        role: famousPersonRole
      }
    })
    .then((response) => {
      // Reset names
      setPersonName("")
      setPersonRole("")
      // Refetch
      fetchPeople()

    })
    .catch((error) => {
      console.error("Something happened on POST request to /api/people: ", error)
    })
  }


    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" value={famousPersonName} onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" value={famousPersonRole} onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {famousPeopleArray.map((peeps) => {
            return (
              <li key={peeps.id}>{peeps.name} plays a role as {peeps.role}</li>
            )
          })}
        </ul>
      </section>
    );
}

export default FamousSection;
