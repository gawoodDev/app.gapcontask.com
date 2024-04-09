
import UPER from '../minified/uper.js';

const pannelAddTask = document.querySelector("#pannelAddTask");

const showUpModal = document.querySelector('#addNewTaskBtn');
let englob_popUp = document.querySelector('.englob_popUp')

let modemeItem = document.querySelector('.modeme');
let modal = englob_popUp.querySelector(".popUp_modal");

let modifProd = document.querySelector('#modif_elprod');

let bottom_modProd = document.querySelector('.bottom_modProd');


const balb = new UPER({ screen: ["screen", "englob_popUp"], content: 'popUp_modal', type: 'div' });
const modeme = new UPER({ screen: 'screen', content: 'modeme', type: 'div' });
const updateprod = new UPER({ screen: 'screen', content: 'bottom_modProd', type: 'div' });










balb.CONTENT_TYPE("div")
balb.SET_CONTENT(modal.innerHTML);
balb.APPEND_TO(document.body);
englob_popUp.remove();


modeme.CONTENT_TYPE("div")
modeme.SET_CONTENT(modemeItem.innerHTML);
modeme.APPEND_TO(document.body);
modemeItem.remove();


updateprod.CONTENT_TYPE("div")
updateprod.SET_CONTENT(bottom_modProd.innerHTML);
updateprod.APPEND_TO(document.body);
bottom_modProd.remove();





export {
   balb, modeme, updateprod
}






