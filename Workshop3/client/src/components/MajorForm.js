import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MajorForm = () => {
  const [majors, setMajors] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/majors')
      .then(response => {
        setMajors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the majors!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/majors', form)
      .then(response => {
        setMajors([...majors, response.data]);
        setForm({ name: '', code: '', description: '' });
      })
      .catch(error => {
        console.error('There was an error creating the major!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Add Major</button>
      </form>
      <h2>Majors</h2>
      <ul>
        {majors.map(major => (
          <li key={major._id}>{major.name} - {major.code}</li>
        ))}
      </ul>
    </div>
  );
};

export default MajorForm;
