
import { UsernameValidation, EmailValidation, PassValidation, SEND_TO_SERVER, INTERFER_MSG, REDIRECT } from "./utils.js";



const form = document.querySelector("form");
const display = document.querySelector("div.displayServerMsg");
form.addEventListener("submit", SUBMIT);
function VALIDATION({ username, email, password }) {
   let isUser = UsernameValidation(username);
   let isEmail = EmailValidation(email);
   let isPass = PassValidation(password);
   if (isUser && isPass && isEmail) {
      alert(true);
      return true;
   }
   else {
      alert(false);
      return false;
   }
}
async function SUBMIT(e) {
   e.preventDefault();
   let { username, email, password } = form;
   let body = { username: username.value, password: password.value, email: email.value };
   try {
      if (VALIDATION({ username, email, password }) !== true)
         return false;
      let response = await SEND_TO_SERVER("/api/signup", body);
      let message = await response.json();
      display.innerHTML = message.msg;
      INTERFER_MSG(response.status === 202, display);
      if (response.status === 202) {
         let time = setTimeout(() => {
            REDIRECT();
         }, 1500);
         clearTimeout(time);
      }
      console.log(message, response);
   }
   catch (err) {
      console.error(err);
   }
}
;
export { };
