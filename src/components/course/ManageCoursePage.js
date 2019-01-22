import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { formatAuthors, getCourseById } from '../../selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course && this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  isTimeStamp(time) {
    return RegExp(/^(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/).test(time);
  }

  isValid() {
    let errors = {};

    const { title, authorId, category, length } = this.state.course;

    if (title.length == 0) {
      errors.title = 'You must specify a title.';
    } else {
      if (title.length < 5) {
        errors.title = 'Title must be at least 5 characters.';
      }
    }
    if (authorId.length == 0) {
      errors.authorId = 'You must specify an author.';
    }
    if (category.length == 0) {
      errors.category = 'You must specify a category.';
    }
    if (length.length == 0) {
      errors.length = "You must specify course's length";
    } else {
      if (this.isTimeStamp(length) == false) {
        errors.length = "You must enter course's length in format hh:mm";
      }
    }

    this.setState({ errors: errors });

    return Object.keys(errors).length === 0;
  }

  saveCourse(event) {
    event.preventDefault();

    if (this.isValid() === false) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions
      .saveCourse(this.state.course)
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
    toastr.success('Course saved!');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  // ownProps - holds some route relating properties
  const courseId = ownProps.params.id;
  let course = getCourseById(state.courses, courseId);

  return {
    course: course,
    authors: formatAuthors(state.authors)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
