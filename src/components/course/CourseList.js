import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({ courses, onDeleteCourse }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseListRow key={course.id} course={course} onDeleteCourse={onDeleteCourse} />
        ))}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteCourse: PropTypes.func.isRequired
};

export default CourseList;
