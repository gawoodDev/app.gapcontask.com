import SELECT_ITEM from './component/select_prod_proto.js';
import moment from './minified/moment.js';
import { modal } from './midelware/panelAddTask_Uper.js';
import * as englob from './midelware/modeme_Uper.js';

import HOOK from './component/hooks_proto.js';
import UPER from './minified/uper.js';


const id_page = document.querySelector('div#forIDcheck') // null
const showUpModal = document.querySelector('#addNewTaskBtn')
const pannelAddTask = document.querySelector("#pannelAddTask")
let prod_tools = document.querySelector('#prod_tools');

let select_box = document.querySelector("#select_box");
let headOptions = document.querySelector('.headOptions')
let close_selected = document.querySelector('#close_selected')
let remove_selected = document.querySelector('#remove_selected')
let show_up = document.querySelector('.show_up')
let bottom_options = document.querySelector('.bottom_options')
let englob_popUp = document.querySelector('.englob_popUp')

let modif_elprod = document.querySelector('#modif_elprod');
//let delete_prod = document.querySelector('.modeme #delete_prod');

let modeme = document.querySelector('.modeme');

let select_tasks = document.querySelector('.modeme #select_tasks');
let bottom_modProd = document.querySelector('.bottom_modProd');
let bottom_modProd_input = bottom_modProd.querySelector('input');
let bottom_modProd_button = bottom_modProd.querySelector('button')
let title_prod = document.querySelector('#title_prod');

let section_container = document.querySelector("#affichage");
let form = document.querySelector("form");
let deleteItemBtn = form.querySelector("#deleteItemBtn")

let liveId = null;
let cookiesArray = []
let existing = document.querySelector("#existing");
let submitBtn = document.querySelector("#submitBtn");

let deleteBtn = document.querySelector("button#deleteBtn");
let modifBtn = document.querySelector("button#modifBtn");

let closePanel = document.querySelector(".closePanel");
let addNewTaskBtn = document.querySelector("#addNewTaskBtn");
let selectDate = document.querySelector("#selectDate");
let delete_prod = document.querySelector('.modeme #delete_prod');




let hooks = new HOOK({
   id: 10,
   self: {
      body: "Give me one new time up", title: "Hello"
   },
   form: document.querySelector("form"),
   pannelAddTask
});






let id;
let ref_key;
let selectewd = [];
let onSelected = false
let list_id = [];
let a = 0;
let START_X = null;
let PROJECT_LIST = null;
let isDragging = true;
let thisVal = null;


/*

const modal = new UPER({ screen: 'screen', content: 'addTask', type: 'form' });

modal.CONTENT_TYPE("form")
modal.SET_CONTENT(pannelAddTask.innerHTML)
modal.APPEND_TO(document.body)
pannelAddTask.remove();
modal.TRIGER(showUpModal, null, (e, init) => {
   if (init === 1) {
      hooks.focusNoExisting();
   }
   if (init === 0) {
      hooks.onLoseFucusExisting();
   }
});

*/



//pannelAddTask.remove()

getDataFromDB(`/api/projects`)
   .then(({ datas }) => {
      PROJECT_LIST = datas;
      console.log("Sssss", PROJECT_LIST)

   }).catch((err) => {
      console.error(err)
   });











function NOT_ALLOWED() {
   if (!title_prod) {
      $(delete_prod).hide();
   }
   if (id_page) {
      id = id_page.getAttribute("data-id");
      ref_key = id_page.getAttribute("data-ref-key");
   }
}
NOT_ALLOWED()








modal.TRIGER(showUpModal, null, (e, init) => {
   if (init === 1) {
      hooks.focusNoExisting();
   }
   if (init === 0) {
      hooks.onLoseFucusExisting();
   }
});



englob.balb.TRIGER(delete_prod, null, (e, init, Self) => {
   console.log("Is iterate", e.currentTarget, Self)
   englob.modeme.HIDE();
   setPopUpContent(Self.content, {
      title: 'Supprimer le projet ?',
      body: `Cette action définitive et irréversible
        supprimera le projet  y compris les tâches incluse.`
   })
});


englob.modeme.TRIGER(prod_tools, null, (e, init) => {
   console.log("Is Modeme item")
   englob.balb.HIDE()
});
englob.updateprod.TRIGER(modif_elprod, null, (e, init) => {
   console.log("Is modif_elprod item")
   englob.modeme.HIDE()
   englob.balb.HIDE()
});




englob.balb.content.querySelectorAll('button').forEach((button) => {
   button.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      let result = this.getAttribute('data-return')

      REMOVE_PROJECT(result === "true")

      console.log(result)
   });

});

select_tasks.addEventListener('click', function (event) {
   event.preventDefault()
   modeme.classList.remove('active');
   this.classList.add('active');
   headOptions.classList.add('active');
   bottom_options.classList.add('active');
   onSelected = true;
   isDragging = false;
   bottom_modProd.classList.remove('active');
});


/***

let hooks = new HOOK({
   id: 10,
   self: {
      body: "Give me one new time up", title: "Hello"
   },
   form: document.querySelector("form"),
   pannelAddTask
})

***

console.log(hooks);


englob_popUp.querySelectorAll('button').forEach((button) => {
   button.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      let ret = this.getAttribute('data-return')

      if (ret == 'false') {
         englob_popUp.classList.remove('active');
      }

      if (ret === "true") {

         postToServer("/api/deleteProd", JSON.stringify({
            id, ref_key
         }), "DELETE").then((res) => {
            if (res.status === 200) {
               let a = document.createElement("a");
               a.href = "/api/project";
               a.click();
            }
         })
      }

      console.log(ret)
   });

});



englob_popUp.querySelector('.popUp_modal').addEventListener('click', (event) => {
   event.preventDefault()
   event.stopPropagation()
   console.log('Stop')

});



englob_popUp.addEventListener('click', (event) => {
   event.preventDefault()
   event.stopPropagation()

   englob_popUp.classList.remove('active');
   console.log('Close')

});



prod_tools.addEventListener('click', (event) => {
   event.preventDefault()
   modeme.classList.toggle('active');
});



select_tasks.addEventListener('click', function (event) {
   event.preventDefault()
   modeme.classList.remove('active');
   this.classList.add('active');
   headOptions.classList.add('active');
   bottom_options.classList.add('active');
   onSelected = true;
   isDragging = false;
   bottom_modProd.classList.remove('active');
});



close_selected.addEventListener('click', function (event) {
   event.preventDefault()
   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');

   onSelected = false;
   isDragging = true;
   list_id = []
   document.querySelectorAll('.card.added').forEach(item => {
      item.classList.remove("added");
      item.setAttribute('state',
         "0");
   });

   show_up.innerHTML = ` 0 tâches sélectionner`
});



modif_elprod.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   bottom_modProd.classList.add('active');
   bottom_modProd_input.focus();
   bottom_modProd_input.value = title_prod.innerText;

});



delete_prod.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   bottom_modProd.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   englob_popUp.classList.add('active')

   setPopUpContent({
      title: 'Supprimer le projet ?',
      body: `Cette action définitive et irréversible
        supprimera le projet ${title_prod.innerText} y compris les tâches incluse.`
   })


});



bottom_modProd_button.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   bottom_modProd.classList.remove('active');
   bottom_modProd_input.blur();
   title_prod.innerText = bottom_modProd_input.value

   postToServer("/api/modifProd", JSON.stringify({
      id: Number(id),
      title: bottom_modProd_input.value
   }), "PUT")
      .then((rem) => {
         bottom_modProd.classList.remove('active');
      })
   bottom_modProd_input.value = '';

});



remove_selected.addEventListener('click', (event) => {
   console.log(onSelected);
   isDragging = false;

   event.preventDefault()
   let listToServer = list_id.map((elem) => {
      return elem.replace("task_",
         "")
   });

   console.log(listToServer, list_id)

   document.querySelectorAll('div.card.added').forEach(item => {
      list_id = list_id.filter((elem) => elem !== item.id);
      show_up.innerHTML = `${list_id.length} tâches sélectionner !`
      item.remove()
   })

   hooks.DELETE_TASK(listToServer)


})



*/




function REMOVE_PROJECT(res) {
   if (!res) {
      englob_popUp.classList.remove('active');
   } else {

      postToServer("/api/deleteProd", JSON.stringify({
         id, ref_key
      }), "DELETE").then((res) => {
         if (res.status !== 200) return
         let a = document.createElement("a");
         a.href = "/api/project";
         a.click();
      }).catch((err) => {
         console.log(err);
      });
   }
}


function setPopUpContent(self, { title, body }) {
   self.querySelector("#deleterTitle").innerHTML = title;
   self.querySelector("#deleterContent").innerHTML = body;
}


function On_Click(e, self) {

   e.preventDefault();
   self.classList.toggle('added');
   if (self.classList.contains('added')) {

      self.setAttribute('state', 3)
      list_id = list_id
         .filter((item) => item !== self.id);
      list_id.push(self.id)

   } else {
      self.setAttribute('state', 0);

      list_id = list_id
         .filter((item) => item !== self.id);
   }

   show_up.innerHTML = `${list_id.length} tâches sélectionner !`
}









/**
state : {type : Number} 4 etats possible
  0 : la tache a ete enregistre dans la base de donner
  1 : une tache deja enregistre dans la base de donner mais qui a éte modifier
  2: Une nouvelle tache pas encore enregistre dans la base de donner cote Server
  3 : Cette tache va etre suprimer dans la base de donneés
**/

class TASK_ITEM {

   isMoving = true;
   #isFocus = false;
   START_X = null;
   constructor(data) {
      this.data = data;
      this.title = this.data.title;
      this.task_id = this.data.task_id === null ? this.data.id : this.data.task_id;
      this.body = this.data.body;
      this.isdone = this.data.isdone;
      this.ref = this.data.ref;
      this.state = data.state;
      this.finish_at = moment(this.data.finish_at).format("YYYY-MM-DDTHH:mm");
      /////////////////////
      this.create_item();
      this.handle_click();
   }

   CREATE_ELEMENT(type, className, text) {
      let elem = document.createElement(type);
      if (className) {
         elem.classList.add(className)
      }
      if (text) {
         elem.innerText = text
      }
      return elem
   }

   create_item() {



      this.box = this.CREATE_ELEMENT("div", "card");
      this.box.id = `task_${this.task_id}`;
      this.box.setAttribute("state", this.state)
      this.box.setAttribute("data-ref", this.ref)
      this.box.setAttribute("data-date", this.finish_at)



      this.div1 = this.CREATE_ELEMENT("div", null, null);
      this.checkbox = this.CREATE_ELEMENT("input", "form-check-input");
      this.checkbox.setAttribute("type", "checkbox");

      if (Number(this.isdone) === 1) {
         this.checkbox.checked = true;
      }

      this.div1.append(this.checkbox)
      this.cardBox = this.CREATE_ELEMENT("div", "card-body");
      this.div2div = this.CREATE_ELEMENT("div", null, null);
      this.div2div.innerHTML = `
        <p class="date_time" > ${moment(this.data.finish_at, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY")} </p>
        &nbsp; • &nbsp;
        <span> Repeat </span>
        `;
      this.p = this.CREATE_ELEMENT("p", "card-text", this.body);
      this.h5 = this.CREATE_ELEMENT("h5", "card-title", this.title);

      this.cardBox.append(this.h5);
      this.cardBox.append(this.div2div);
      this.cardBox.append(this.p);

      this.div3 = this.CREATE_ELEMENT("div", null);


      let title_ref, ownerProject;

      if (PROJECT_LIST) {
         ownerProject = PROJECT_LIST.find((prod) => prod.ref_key == this.ref);
      }

      if (!ownerProject) {
         title_ref = "Default";
      } else {
         title_ref = ownerProject.title.toLowerCase().slice(0, 6) + "...";
      }


      this.prodGP = this.CREATE_ELEMENT("div", "prodGP");
      this.prodGP.innerHTML = title_ref;
      this.dropDown = this.CREATE_ELEMENT("button", "depli");
      this.dropDown.id = "dropDown";

      let i = document.createElement("i")
      i.innerHTML = `__`;
      this.dropDown.append(i)
      this.dropDown.id = "dropDown";

      this.div3.append(this.prodGP);
      this.div3.append(this.dropDown);

      this.box.append(this.div1);
      this.box.append(this.cardBox);
      this.box.append(this.div3);
   }

   handle_click() {
      this.cardBox.addEventListener("click", this.onClicked.bind(this));
      this.checkbox.addEventListener("change", this.onCHANGE.bind(this));
      this.dropDown.addEventListener("click", this.unbind.bind(this));
   }

   unbind(e) {
      this.box.classList.toggle("drop")
   }

   onClicked(e) {
      if (onSelected) {
         On_Click(e, this.box);
         return
      }

      e.preventDefault();
      e.stopImmediatePropagation()

      try {
         let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.task_id})`);
         other.classList.remove("focusBox");
      } catch (e) { }

      hooks.setters(this);
      hooks.onFucusExisting(modal);
      hooks.auto_fill();
   }

   onCHANGE(e) {
      liveId = this.task_id;

      let data = {
         id: this.task_id,
         isdone: e.currentTarget.checked,
         ref: this.ref
      }

      postToServer("/api/doneTask", JSON.stringify(data), "POST")
         .then((res) => {
            if (res.status !== 200) return;

         }).catch((err) => {
            console.log(err)
         })

      console.log(this)


   }

   appendTo(section) {
      section.append(this.box)
   }
};






























addNewTaskBtn.addEventListener("click", function (e) {
   e.preventDefault();
   e.stopImmediatePropagation();
   hooks.focusNoExisting();
   //liveId = null;
});



form.addEventListener("submit", function (e) {
   e.preventDefault();
   if (hooks.liveId === null) {
      hooks.setTask(TASK_ITEM)
      return hooks.addItem();
   }
   hooks.modifItem();
});



deleteItemBtn.addEventListener("click", function (e) {
   e.preventDefault();

   hooks.deleteItem()

});



selectDate.addEventListener("change", (e) => {
   e.preventDefault();
   let date = moment(e.target.value, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");

   hooks.data.date = date;
   console.log(hooks);

})




async function getDataFromDB(url) {
   let fetched = await fetch(url)
   let datas = await fetched.json()
   console.log(datas)
   return datas;
}


function postToServer(url, body, method = "POST") {

   return fetch(url,
      {
         headers: {
            "Content-type": "application/json;charset=UTF-8"
         },
         method,
         body: body
      })

}



export default TASK_ITEM;








