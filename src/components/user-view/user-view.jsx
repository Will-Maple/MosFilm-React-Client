import { useEffect, useState } from 'react';
import { Form, Button, Card } from "react-bootstrap";
import { useParams, Link } from "react-router";
import './user-view.scss';

export const UserView = ({ movies, user }) => {

  return (
    <>
      <div>
        User: {user.Username} --- Email: {user.Email} --- Birthday: {user.Birthday}
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </>
  );
};