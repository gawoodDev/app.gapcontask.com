
import { EmailValidation, PassValidation, SEND_TO_SERVER, INTERFER_MSG } from "./utils.js";


const formulaire = document.querySelector("form");
const displayer = document.querySelector("div.displayServerMsg");
formulaire.addEventListener("submit", SUBMIT_LOGIN);

function VALIDATION_LOGIN({ email, password }) {
   let isEmail = EmailValidation(email);
   let isPass = PassValidation(password);
   if (isEmail) {
      alert(true);
      return true;
   }
   else {
      alert(false);
      return false;
   }
}
async function SUBMIT_LOGIN(e) {
   e.preventDefault();
   let { username, email, password } = formulaire;
   let body = {
      password: password.value, email: email.value
   };
   try {
      if (VALIDATION_LOGIN({ email, password }) !== true)
         return false;
         
      formulaire.submit()
         
       /*
      let response = await SEND_TO_SERVER(" / loggin", body);
      let message = await response.json();
      displayer.innerHTML = message.msg;
      INTERFER_MSG(response.status === 202, displayer);
      */
      
   }
   catch (err) {
      console.error(err);
   }
}
;
