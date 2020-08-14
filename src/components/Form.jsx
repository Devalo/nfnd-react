import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../static/styles/formStyles.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Notification from './Notification';

import {
  formatPhoneNumber, validateEmail, checkAreaCode, postConfig,
} from './helpers';

const LOCAL_SERVER = 'http://localhost:3001/';
const NETTBUREAU_URL = 'https://heksemel.no/case/submit.php';

const InfoForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [notification, setNotification] = useState([]);

  const onSubmit = (data, e) => {
    // Formatere telefonnummer i korrekt format
    const formattedPhone = formatPhoneNumber(data.phone);

    // Opprette objekt som sendes til server
    const messageObj = {
      name: data.name,
      email: data.email,
      phone: formattedPhone,
      areacode: data.areacode,
      comment: data.comment,
      applicant: 'Stephan Bakkelund Valois',
    };

    // Sende post-req til server med skjemaets innhold
    axios
      // .post(NETTBUREAU_URL, messageObj, postConfig)
      .post(LOCAL_SERVER, messageObj)
      .then(() => {
        setNotification(['Beskjeden ble postet', 'success']);
        setTimeout(() => { setNotification([]); }, 2000);
        e.target.reset();
      })
      .catch((err) => {
        if (err.response !== undefined) {
          const errorMsg = err.response.data.error;
          setNotification([`Noe gikk galt: ${errorMsg}`, 'danger']);
        } else {
          setNotification(['Noe gikk galt: Ingen kontakt med serveren', 'danger']);
        }
        setTimeout(() => { setNotification([]); }, 2000);
      });
  };

  return (
    <>
      <Notification message={notification} />
      <h2 className="form-header">Skjema av Stephan Bakkelund Valois</h2>
      <div className="form-container">
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="main-form">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Navn:
              </Form.Label>
              <Col sm={10} >
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="fullt navn..."
                  ref={register({ required: true })}
                />
                <div className="errors">
                  {errors.name && errors.name.required !== true && 'Du må skrive inn navnet ditt'}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                E-post:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  name="email"
                  ref={register({ required: true, validate: validateEmail })}
                  placeholder="navn@domene.no"
                />
                <div className="errors">
                  {errors.email && errors.email.type === 'validate' && 'Eposten er i feil format'}
                  {errors.email && errors.email.type === 'required' && 'Du må skrive inn din epost'}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Telefon:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="phone"
                  name="phone"
                  ref={register({
                    required: true, minLength: 8, maxLength: 8, pattern: /^\d+$/,
                  })}
                  placeholder="XXX XX XXX"
                />
                <div className="errors">
                  {errors.phone && errors.phone.type === 'minLength' && 'Telefonnummeret må være 8 siffer'}
                  {errors.phone && errors.phone.type === 'maxLength' && 'Telefonnummeret må være 8 siffer'}
                  {errors.phone && errors.phone.type === 'required' && 'Du må skrive inn ditt telefonnummer'}
                  {errors.phone && errors.phone.type === 'pattern' && 'Kan kun bestå av siffer'}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Postnummer:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="areacode"
                  name="areacode"
                  placeholder="1234"
                  ref={register({ required: true, validate: checkAreaCode })}
                />
                <div className="errors">
                  {errors.areacode && errors.areacode.type === 'validate' && 'Postnummeret må være 4 siffer'}
                  {errors.areacode && errors.areacode.type === 'required' && 'Du må skrive inn ditt postnummer'}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Kommentar:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="comment"
                  name="comment"
                  as="textarea"
                  rows="6"
                  placeholder="Skriv inn din kommentar..."
                  ref={register({ required: true, maxLength: 700, minLength: 3 })}
                />
                <div className="errors">
                  {errors.comment && errors.comment.type === 'maxLength' && 'Kommentaren må være under 700 karakterer'}
                  {errors.comment && errors.comment.type === 'minLength' && 'Kommentaren må være over 3 karakterer'}
                  {errors.comment && errors.comment.type === 'required' && 'Du må skrive inn en kommentar'}
                </div>
              </Col>
            </Form.Group>
          </div>
          <Button type="submit">Send inn!</Button>
        </Form>
      </div>
    </>
  );
};

export default InfoForm;
