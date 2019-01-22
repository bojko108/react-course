import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const courses = [
  {
    id: 'react-flux-building-applications',
    title: 'Building Applications in React and Flux',
    watchHref: 'http://www.pluralsight.com/courses/react-flux-building-applications',
    authorId: 'cory-house',
    length: '5:08',
    category: 'JavaScript'
  },
  {
    id: 'clean-code',
    title: 'Clean Code: Writing Code for Humans',
    watchHref: 'http://www.pluralsight.com/courses/writing-clean-code-humans',
    authorId: 'cory-house',
    length: '3:10',
    category: 'Software Practices'
  },
  {
    id: 'architecture',
    title: 'Architecting Applications for the Real World',
    watchHref: 'http://www.pluralsight.com/courses/architecting-applications-dotnet',
    authorId: 'cory-house',
    length: '2:52',
    category: 'Software Architecture'
  },
  {
    id: 'career-reboot-for-developer-mind',
    title: 'Becoming an Outlier: Reprogramming the Developer Mind',
    watchHref: 'http://www.pluralsight.com/courses/career-reboot-for-developer-mind',
    authorId: 'cory-house',
    length: '2:30',
    category: 'Career'
  },
  {
    id: 'web-components-shadow-dom',
    title: 'Web Component Fundamentals',
    watchHref: 'http://www.pluralsight.com/courses/web-components-shadow-dom',
    authorId: 'cory-house',
    length: '5:10',
    category: 'HTML5'
  }
];

describe('Course Actions tests', () => {
  describe('Create course success action', () => {
    it(`should create a ${types.CREATE_COURSE_SUCCESS} action`, () => {
      const course = courses[0];
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });
  describe('Load courses success action', () => {
    it(`should create a ${types.LOAD_COURSES_SUCCESS} action`, () => {
      const expectedAction = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: courses
      };

      const action = courseActions.loadCoursesSuccess(courses);

      expect(action).toEqual(expectedAction);
    });
  });
  describe('Update course success action', () => {
    it(`should create a ${types.UPDATE_COURSE_SUCCESS} action`, () => {
      const course = courses[0];
      const expectedAction = {
        type: types.UPDATE_COURSE_SUCCESS,
        course: course
      };

      const action = courseActions.updateCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  //                                                                    call done() when async calls are complete
  it(`should create ${types.BEGIN_AJAX_CALL} and ${types.LOAD_COURSES_SUCCESS} when loading courses`, done => {
    // Here's an example call to nock
    // nock('http://example.com)
    //    .get('/authors')
    //    .reply(200,{ body: { authors: [{ id: 1, firstName: 'A', lastName: 'B' }, ...] } })

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_COURSES_SUCCESS, body: { courses: [{ id: 'clean-code', title: 'Clean Cоde' }] } }
    ];

    const store = mockStore({ courses: [] }, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });

  it(`should create ${types.BEGIN_AJAX_CALL} and ${types.CREATE_COURSE_SUCCESS} when creating a new course`, done => {
    let course = {
      title: 'New Title',
      authorId: 'new-author',
      length: '10',
      category: 'JavaScript'
    };

    const expectedActions = [{ type: types.BEGIN_AJAX_CALL }, { type: types.CREATE_COURSE_SUCCESS, body: { course: course } }];

    const store = mockStore({ courses: courses }, expectedActions);
    store.dispatch(courseActions.saveCourse(course)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.CREATE_COURSE_SUCCESS);
      done();
    });
  });

  it(`should create ${types.BEGIN_AJAX_CALL} and ${types.UPDATE_COURSE_SUCCESS} when updating a course`, done => {
    let course = courses[0];
    course.title = 'New Title';

    const expectedActions = [{ type: types.BEGIN_AJAX_CALL }, { type: types.UPDATE_COURSE_SUCCESS, body: { course: course } }];

    const store = mockStore({ courses: courses }, expectedActions);
    store.dispatch(courseActions.saveCourse(course)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.UPDATE_COURSE_SUCCESS);
      done();
    });
  });
});
