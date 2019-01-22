import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { sortArrayOfObjects } from '../../selectors';
import toastr from 'toastr';

export class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.onDeleteCourse = this.onDeleteCourse.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  onDeleteCourse(course) {
    this.props.actions.deleteCourse(course).then(() => {
      toastr.warning(`Course ${course.title} was deleted!`);
    });
  }

  render() {
    const { courses, ajaxCallsInProgress } = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
        {courses.length > 0 ? (
          <CourseList courses={courses} onDeleteCourse={this.onDeleteCourse} />
        ) : (
          <div style={{ paddingTop: '20px' }}>{ajaxCallsInProgress < 1 && "No courses! Add some by clicking on 'Add Course button'"}</div>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  ajaxCallsInProgress: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let courses = [...state.courses];
  return { courses: sortArrayOfObjects(courses, 'title'), ajaxCallsInProgress: state.ajaxCallsInProgress };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
