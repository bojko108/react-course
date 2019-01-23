import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const AuthorListRow = ({ author, coursesCount, onDeleteAuthor }) => {
  const wrapperClass = coursesCount > 0 ? 'btn-link button-link disabled' : 'btn-link button-link';

  return (
    <tr>
      <td>
        <span
          className={wrapperClass}
          onClick={() => {
            onDeleteAuthor(author);
          }}
        >
          Delete
        </span>
      </td>
      <td>{author.firstName + ' ' + author.lastName}</td>
      <td>{coursesCount}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  coursesCount: PropTypes.number.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    coursesCount: state.courses.filter(c => c.authorId === ownProps.author.id).length
  };
};

export default connect(mapStateToProps)(AuthorListRow);
