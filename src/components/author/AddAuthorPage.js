import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class AddAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: { firstName: '', lastName: '' },
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({ author: author });
  }

  isValid() {
    let errors = {};

    const { firstName, lastName } = this.state.author;

    if (firstName.length == 0) {
      errors.firstName = 'You must specify first name for the author.';
    } else {
      if (firstName.length < 3) {
        errors.firstName = 'First Name must be at least 3 characters.';
      }
    }
    if (lastName.length == 0) {
      errors.lastName = 'You must specify last name for the author.';
    } else {
      if (lastName.length < 3) {
        errors.lastName = 'Last Name must be at least 3 characters.';
      }
    }

    this.setState({ errors: errors });

    return Object.keys(errors).length === 0;
  }

  addAuthor(event) {
    event.preventDefault();

    if (this.isValid() === false) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions
      .addAuthor(this.state.author)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Author saved!');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.updateAuthorState}
        onSave={this.addAuthor}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

AddAuthorPage.propTypes = {
  actions: PropTypes.object.isRequired
};

AddAuthorPage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAuthorPage);
