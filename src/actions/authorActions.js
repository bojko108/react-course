import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(author) {
  return { type: types.DELETE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return authorApi
      .getAllAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addAuthor(author) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return authorApi
      .saveAuthor(author)
      .then(savedAuthor => {
        dispatch(createAuthorSuccess(savedAuthor));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return authorApi
      .deleteAuthor(author)
      .then(() => {
        dispatch(deleteAuthorSuccess(author));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
