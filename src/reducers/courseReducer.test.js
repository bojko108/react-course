import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';
import * as types from '../actions/actionTypes';

describe('Course Reducer tests', () => {
  const initialState = [{ id: 'A', title: 'A' }, { id: 'B', title: 'B' }, { id: 'C', title: 'C' }];

  it(`should add course when passed ${types.CREATE_COURSE_SUCCESS}`, () => {
    const newCourse = { title: 'D' };
    const action = actions.createCourseSuccess(newCourse);
    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(initialState.length + 1);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
    expect(newState[3].title).toEqual('D');
  });

  it(`should update course when passed ${types.UPDATE_COURSE_SUCCESS}`, () => {
    const course = { id: 'B', title: 'New Title' };
    const action = actions.updateCourseSuccess(course);
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id === course.id);
    const untouchedCourse = newState.find(a => a.id === 'A');

    expect(updatedCourse.title).toEqual('New Title');
    expect(untouchedCourse.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });

  it(`should load courses when passed ${types.LOAD_COURSES_SUCCESS}`, () => {
    const action = actions.loadCoursesSuccess(initialState);
    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(initialState.length);
    expect(newState[0].id).toEqual('A');
    expect(newState[1].id).toEqual('B');
    expect(newState[2].id).toEqual('C');
  });
});
