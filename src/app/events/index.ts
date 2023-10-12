import initFacultyEvents from '../modules/Faculty/faculty.event';
import initStudentEvents from '../modules/Student/student.event';

const subscribeToEvents = () => {
  initStudentEvents();
  initFacultyEvents();
};

export default subscribeToEvents;
