/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './static/styles/App.css';
import Form from './components/Form';

const App = () => (
  <div className="App">
    <section className="container form">
      <div className="col-md-12">
        <Form />
      </div>
    </section>
  </div>
);

export default App;
