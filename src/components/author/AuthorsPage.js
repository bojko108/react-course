import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { sortArrayOfObjects } from '../../selectors';
import toastr from 'toastr';

export class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.onDeleteAuthor = this.onDeleteAuthor.bind(this);
  }

  authorRow(author, index) {
    return <div key={index}>{author.id}</div>;
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  onDeleteAuthor(author) {
    this.props.actions.deleteAuthor(author).then(() => {
      toastr.warning(`Author ${author.id} was deleted!`);
    });
  }

  render() {
    const { authors, ajaxCallsInProgress } = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit" value="Add Author" className="btn btn-primary" onClick={this.redirectToAddAuthorPage} />
        {authors.length > 0 ? (
          <AuthorList authors={authors} onDeleteAuthor={this.onDeleteAuthor} />
        ) : (
          <div style={{ paddingTop: '20px' }}>{ajaxCallsInProgress < 1 && "No authors! Add some by clicking on 'Add Author' button"}</div>
        )}
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  ajaxCallsInProgress: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let authors = [...state.authors];
  return { authors: sortArrayOfObjects(authors, 'id'), ajaxCallsInProgress: state.ajaxCallsInProgress };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
