/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'

const SHOW_ALL_CAMPUS = 'SHOW_ALL_CAMPUS'
const SHOW_ALL_STUDENTS = 'SHOW_ALL_STUDENTS'
const SHOW_STUDENTS_BY_CAMPUS = 'SHOW_STUDENTS_BY_CAMPUS'
const SHOW_CAMPUS_STUDENTS = 'SHOW_CAMPUS_STUDENTS'

const initialState = {
  campuses: [],
  students: [],
  campusStudents: []
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

export const showCampusStudents = function(campusStudents){
  return {
    type: SHOW_CAMPUS_STUDENTS,
    campusStudents
  }
}

export const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_ALL_CAMPUS':
        return Object.assign({}, state, {campuses: action.campuses});
    case 'SHOW_ALL_STUDENTS':
        return Object.assign({}, state, {students: action.students});
    case 'SHOW_CAMPUS_STUDENTS':
        return Object.assign({}, state, {campusStudents: action.campusStudents});
    default: return state
  }
};

export default rootReducer
