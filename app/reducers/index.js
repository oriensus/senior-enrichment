/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'

const SHOW_ALL_CAMPUS = 'SHOW_ALL_CAMPUS'
const SHOW_ALL_STUDENTS = 'SHOW_ALL_STUDENTS'

const initialState = {
  campuses: [],
  students: []
}

export const showAllCampus = function(campuses){
  return {
    type: SHOW_ALL_CAMPUS,
    campuses: campuses
  }
}

export const showAllStudents = function(students){
  return {
    type: SHOW_ALL_STUDENTS,
    students: students
  }
}

export const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_ALL_CAMPUS':
        return Object.assign({}, state, {campuses: action.campuses});
    case 'SHOW_ALL_STUDENTS':
        return Object.assign({}, state, {students: action.students});
    default: return state
  }
};

export default rootReducer
