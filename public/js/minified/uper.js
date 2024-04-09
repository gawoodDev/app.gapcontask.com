function UPER({ screen, content, type }) {
   this.screen = document.createElement('div');
   type = type || "div";

   if (screen && typeof screen === "string") {
      this.screen.classList = screen;
   } else if (screen && screen.length) {
      for (let Class of screen) {
         this.screen.classList.add(Class);
      }

   }


   this.content = this.CONTENT_TYPE(type)
   this.content.classList = content;
   this.screen.append(this.content)
}

function SET_CONTENT_VALUE(value) {
   if (typeof value === 'string') {
      this.content.innerHTML = value
   } else {
      console.log(typeof value)
      this.content.append(value)
   }
}


function ADD_TO(container) {
   container.prepend(this.screen);
}


function SHOW() {
   this.screen.classList.add('show');
   this.content.classList.add('show');
}


function HIDE() {
   this.screen.classList.remove('show');
   this.content.classList.remove('show');
}


function TRIGER(showUp, close = null, callBack) {
   if (showUp && typeof showUp === 'object') {
      showUp.onclick = (event) => {
         event.preventDefault();
         this.SHOW();
         callBack(event, 1, this)
      }
   }
   if (close && typeof close === 'object') {
      close.onclick = (event) => {
         event.preventDefault();
         this.HIDE();
         callBack(event, 0, this)
      }
   }

   this.screen.onclick = (event) => {
      event.preventDefault();
      this.HIDE()
      callBack(event, 0, this)
   }
   this.content.onclick = (event) => {
      event.stopPropagation();
   }
}

function CONTENT_TYPE(type) {
   return document.createElement(type);
}




let _prototype = UPER.prototype;
_prototype.SET_CONTENT = SET_CONTENT_VALUE;
_prototype.APPEND_TO = ADD_TO;
_prototype.SHOW = SHOW;
_prototype.HIDE = HIDE;
_prototype.TRIGER = TRIGER;
_prototype.CONTENT_TYPE = CONTENT_TYPE;


export default UPER;






