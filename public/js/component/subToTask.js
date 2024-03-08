import moment from '../minified/moment.js';

import HOOK from './hooks_proto.js';


let selectDate = document.querySelector("#selectDate");
 
let closePanel = document.querySelector(".closePanel");

let addNewTaskBtn = document.querySelector("#addNewTaskBtn");

let pannelAddTask = document.querySelector(".pannelAddTask");

let deleteItemBtn = document.querySelector('#deleteItemBtn')
let form = document.querySelector("form");

let cards = document.querySelectorAll(".card")





let hooks = new HOOK({
  id: 10,
  self: { body: "Give me one new time up", title: "Hello" },
  form: document.querySelector("form"),
  pannelAddTask
})



console.log(hooks);






form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  if (hooks.isItem === false) return hooks.addItem();
  hooks.modifItem();
});


deleteItemBtn.addEventListener("click", function (e) {
  e.preventDefault
  hooks.deleteItem()
})


closePanel.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  hooks.onLoseFucusExisting();

});

addNewTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  hooks.focusNoExisting();

});

selectDate.addEventListener("change", (e) => {
  e.preventDefault()

  let date = moment(e.target.value, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")

  hooks.data.date = date;

  console.log(hooks);

})

cards.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault()

    let self = {
      id: this.id.replace("task_", ""),
      title: this.querySelector("h3").innerText,
      finish_at: this.getAttribute("data_date"),
      body: this.querySelector("p").innerText
     
    }



    console.log(this.getAttribute("data_date"))



    hooks.isItem = true;
    hooks.setters(self);
    hooks.onFucusExisting();
    hooks.auto_fill();
    
  })
})




























/****

let date_time = null,
  thisVal = null,
  liveId = null;


let HOOK = function ({ id, self, form }) {
  this.liveId = null;
  this.isItem = false;
  this.thisItem = null;

  this.form = document.querySelector("form");
  this.data = {
    date: null,
    id: "",
    title: "",
    body: ""
  }
}


















function postToServer(url, body, method) {

  return fetch(url,
    {
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      },
      method: "POST",
      body: body
    })

}





function updateITEM() {
  this.thisItem.id = this.data.id
  this.thisItem.title = this.data.title
  this.thisItem.body = this.data.body
  this.thisItem.finish_at = this.data.date
}


function POST_SERVER(data) {
  console.log("Envoie au server ...", data)
}


function DELETE_TASK(LIST) {
  POST_SERVER(LIST)
}

function addItem() {

  this.data.title = form.title.value;
  this.data.body = form.body.value;

}

function modifItem() {

  let modItem = document.querySelector(`div#task_${this.liveId}`);

  if (this.isItem) {
    this.data.title = this.form.title.value;
    this.data.body = this.form.body.value;
  }


  this.updateITEM()


  modItem.querySelector("h3").innerText = this.form.title.value;
  modItem.querySelector("p").innerText = this.form.body.value;
  modItem.setAttribute("data_date", this.data.date)
  modItem.querySelector("h5").innerText = moment(this.data.date, "YYYY-MM-DD HH:mm").format("DD MMMM HH:mm");

  this.auto_reset();
}


function onFucusExisting() {
  //$("#deleteItemBtn").show();
  pannelAddTask.classList.add("open");
  //$("#submitBtn").css("width", "60%");
  //$("#submitBtn").text("Enregistrer");
  console.log(this.isItem);

}

function focusNoExisting() {
  //$("#deleteItemBtn").hide();
  //$("#submitBtn").css("width", "100%");
  //$("#submitBtn").text("Create");
  pannelAddTask.classList.add("open");
  console.log(this.isItem);
  this.auto_reset();
}

function onLoseFucusExisting() {
  //$("#deleteItemBtn").fadeOut();
  this.auto_reset()
  this.liveId = null;
  this.thisVal = null;
  this.isItem = false;
  pannelAddTask.classList.remove("open");
}

function auto_reset() {
  this.form.title.value = "";
  this.form.body.value = "";
  this.form.isdone.checked = false;
  this.form.title.focus();
}






function auto_fill() {
  console.log(this.thisItem);

  let modItem = document.querySelector(`div#task_${this.liveId}`);

  let ref = modItem.getAttribute("data-ref");

  this.form.title.value = modItem.querySelector("h3").innerText;

  this.form.body.value = modItem.querySelector("p").innerText;

  this.form.title.focus()
}





function deleteItem() {

  if (this.liveId === null) {
    alert("Veillez selectioner une tache")
    return
  }

  let IDS = [];

  if (this.isItem) {
    IDS.push(this.liveId);
    this.DELETE_TASK(IDS);
    document.querySelector(`div#task_${this.liveId}`).remove();
    this.auto_reset()
  }

}

function setters(self) {
  this.thisItem = self;
  this.liveId = self.id
  this.isItem = true;

  console.log(this)

}























let _proto = HOOK.prototype;

_proto.date = date_time;
_proto.auto_fill = auto_fill;
_proto.auto_reset = auto_reset;

_proto.onLoseFucusExisting = onLoseFucusExisting;
_proto.onFucusExisting = onFucusExisting;
_proto.focusNoExisting = focusNoExisting;

_proto.setters = setters;
_proto.modifItem = modifItem;
_proto.DELETE_TASK = DELETE_TASK;
_proto.addItem = addItem;
_proto.deleteItem = deleteItem;

_proto.updateITEM = updateITEM;


export default HOOK;



****/

