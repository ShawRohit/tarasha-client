import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Create a CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

export default NotFoundPage;
