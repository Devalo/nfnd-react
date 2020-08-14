import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Notification = ({ message }) => {
  if (message === null || message.length === 0) return null;

  return (
    <div className="error">
      <Alert variant={message[1]}>
        <Alert.Heading>
          {message[0]}
        </Alert.Heading>
      </Alert>
    </div>
  );
};

export default Notification;