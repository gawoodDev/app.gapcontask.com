const formulaire: HTMLFormElement = document.querySelector("form");


function REG_EPX(params: string): any | any[] {
   switch (params) {
      case "username":
         return new RegExp(`^[a-zA-Z0-9]*$`);
         break
      case "email":
         return new RegExp(`^[a-zA-Z0-9]*[@]{1}[a-zA-Z]*[.]{1}[a-zA-Z]{2,3}$`);
         break
      case "password":
         return new RegExp(`[a-zA-Z0-9@#$_&-+()*"':;!?]`);
         break
      default:
         return new RegExp(`^[a-zA-Z0-9]*$`);
   }
}



function UsernameValidation(username): boolean {
   let msg: string = "";
   if (username.value.length < 8) {
      msg = "Username doit être supérieur à 8 caractères!";
   }
   else if (!Validate("username")) {
      msg = "Username ne doit pas contenir des caractères spéciaux!";
   } else {
      msg = "Username Valide !"
      MSG_APPEND(username, msg, true)
      return true
   }
   MSG_APPEND(username, msg, false)
   console.log(msg, username)
   return false

}
function EmailValidation(email): boolean {
   let msg = "";
   if (!Validate("email")) {
      msg = "Veiller inséré un email valide !";
   } else {
      msg = "Email valide !";
      MSG_APPEND(email, msg, true)
      return true;
   }

   MSG_APPEND(email, msg, false)
   return false;
}

function PassValidation(password): boolean {
   let msg: string = ""
   if (!(password.value.length > 8)) {
      msg = "Password doit contenir plus de 8 caractères!";
   } else if (!/[0-9]/.test(password.value)) {
      msg = "Password doit contenir au moins un chiffre!";
   }
   else if (!/[@#$_&-+()*"':;!?%]/.test(password.value)) {
      msg = "Password doit contenir au moins un de ces caractères spéciaux (@#$_&-+()*':;!?%) !";
   }
   else if (!Validate("password")) {
      msg = "Username ne doit pas contenir des caractères spéciaux!";
   } else {
      msg = "Password Valide !"
      MSG_APPEND(password, msg, true)
      return true
   }
   MSG_APPEND(password, msg, false);
   return false
}

function MSG_APPEND(input, msg, isOk): void {
   let span = input.nextElementSibling as HTMLElement;
   span.innerText = msg;
   INTERFER_MSG(isOk, span)
}


function INTERFER_MSG(isTrue: boolean, element: HTMLElement) {
   if (isTrue) {
      element.classList.remove("error")
      element.classList.add("success")

   } else {
      element.classList.remove("success")
      element.classList.add("error")
   }
}




function Validate(key) {
   let element = formulaire[key] as HTMLInputElement;
   let value = element.value;
   console.log(key, value);
   return REG_EPX(key).test(value);
}



function REDIRECT() {
   let a = document.createElement("a");
   a.href = "/loggin";
   a.click()
}


function SEND_TO_SERVER(url, body) {
   body = JSON.stringify(body);
   return fetch(url, {
      headers: {
         "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      body: body
   });
}




export {
   REG_EPX, MSG_APPEND, REDIRECT,
   UsernameValidation, PassValidation, EmailValidation, SEND_TO_SERVER,
   INTERFER_MSG
}




















