
//import { EmailValidation, PassValidation, SEND_TO_SERVER, INTERFER_MSG } from "./utils.ts";

import { EmailValidation, PassValidation, SEND_TO_SERVER, INTERFER_MSG } from "./utils.ts";




const formulaire: HTMLFormElement = document.querySelector("form");
const displayer = document.querySelector("div.displayServerMsg") as HTMLElement;




formulaire.addEventListener("submit", SUBMIT_LOGIN);





function VALIDATION_LOGIN({ email, password }): boolean {

   let isEmail = EmailValidation(email);
   let isPass = PassValidation(password);

   if (isPass && isEmail) {
      alert(true)
      return true;
   } else {
      alert(false)
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
      if (VALIDATION_LOGIN({ email, password }) !== true) return false;
      let response = await SEND_TO_SERVER(" / loggin", body);

      let message = await response.json();
      displayer.innerHTML = message.msg

      INTERFER_MSG(response.status === 202, displayer);

   } catch (err) {
      console.error(err)
   }
};





















