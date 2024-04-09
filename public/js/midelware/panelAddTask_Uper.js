

import UPER from '../minified/uper.js';

const pannelAddTask = document.querySelector("#pannelAddTask");
const showUpModal = document.querySelector('#addNewTaskBtn');
const modal = new UPER({ screen: ["screen", "pannelAddTaskBox"], content: 'addTask', type: 'form' });


modal.CONTENT_TYPE("form")
modal.SET_CONTENT(pannelAddTask.innerHTML)
modal.APPEND_TO(document.body);
pannelAddTask.remove();



export {
   modal
}
