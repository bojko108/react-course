import React, { PropTypes } from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors, onDeleteAuthor }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>Courses</th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => (
          <AuthorListRow key={author.id} author={author} onDeleteAuthor={onDeleteAuthor} />
        ))}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;
