import moment from '../minified/moment.js';





let HOOK = function ({
   id, self, form, pannelAddTask
}) {
   this.liveId = null;
   this.isItem = false;
   this.box = null;
   this.thisItem = self;
   this.pannelAddTask = pannelAddTask;
   this.form = document.querySelector("form");
   this.data = {
      date: null,
      id: null,
      title: "",
      body: ""
   }
}







function postToServer(url, body, method = "POST") {

   return fetch(url,
      {
         headers: {
            "Content-type": "application/json;charset=UTF-8"

         },
         method: method,
         body: JSON.stringify(body)
      })

}



function updateITEM() {
   this.thisItem.id = this.data.id;
   this.thisItem.ref = this.data.ref
   this.thisItem.title = this.data.title + "me?"
   this.thisItem.body = this.data.body
   this.thisItem.isdone = this.data.isdone ? 1 : 0;
   this.thisItem.finish_at = this.data.date || moment().format("YYYY-MM-DD HH:mm")
}

function POST_SERVER(data) {
   console.log("Envoie au server ...", data)
}

function DELETE_TASK(LIST) {
   if (LIST.length > 0) {

      postToServer("/api/deleteTask", { data: LIST }, "DELETE")
         .then((res) => {
            if (res.status !== 200) return
         })
         .catch((err) => {
            console.error(err)
         })
   }

}

function setTask(TASK_ITEM) {
   this.TASK_ITEM = TASK_ITEM;
}

function addItem() {


   let date = this.data.date === null ? moment().format("YYYY-MM-DD HH:mm") : this.data.date;

   this.data.title = this.form.title.value;
   this.data.body = this.form.body.value;
   if (this.form.select) {
      this.data.ref = this.form.select.value;
   }
   this.data.isdone = this.form.isdone.checked
   this.data.finish_at = date;
   this.data.timer = moment().format("YYYY-MM-DDTHH:mm:ss:SSS[Z]")



   postToServer("/api/addTask", this.data, "POST")
      .then((res) => {
         if (res.status !== 200) return
         return res.json();
      }).then((data) => {
         let _task = new this.TASK_ITEM({
            task_id: data.task_id, ...this.data
         });
         _task.appendTo(document.querySelector("#affichage"));
         this.auto_reset()
      })
      .catch((err) => {
         console.error(err)
      })

}

function modifItem() {

   let modItem = document.querySelector(`div#task_${this.liveId}`);

   if (this.isItem) {
      let date = this.data.date === null ? moment().format("YYYY-MM-DD HH:mm") : this.data.date;

      this.data.title = this.form.title.value;
      this.data.body = this.form.body.value;
      this.data.ref = this.form.select.value
      this.data.isdone = this.form.isdone.checked
      this.data.finish_at = date;
   }



   this.updateITEM()

   postToServer("/api/modifTask", this.data, "PUT")
      .then((res) => {
         if (res.status !== 200) return;

         modItem.querySelector("h5.card-title").innerText = this.data.title
         modItem.querySelector("p.card-text").innerText = this.data.body;
         modItem.querySelector("p.date_time").setAttribute("data_date", this.data.date)
         modItem.querySelector("p.date_time").innerText = moment(this.data.finish_at, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY");
         modItem.querySelector("input").checked = this.data.isdone;

         this.auto_reset();

      }).catch((err) => {
         console.error(err);
      })

   this.data.date = null;


}

function deleteItem() {

   if (this.isItem === true) {
      if (!this.liveId) return
      postToServer("/api/deleteTask", { id: this.liveId }, "DELETE")
         .then((res) => {
            if (res.status !== 200) return
            document.querySelector(`div#task_${this.liveId}`).remove();
            this.auto_reset()
            this.reset_data_prop();
         })
         .catch((err) => {
            console.error(err)
         })

   } else {
      alert("Veillez selectioner une tache")
   }

}

function onFucusExisting(Elem) {
   Elem.SHOW();
   /*
   $("#deleteItemBtn").show();
   document.querySelector("div.pannelAddTask").classList.add("show");
   document.querySelector("form.addTask").classList.add("show");*/
   $("#submitBtn").css("width",
      "60%");
   $("#submitBtn").text("Enregistrer");

}

function focusNoExisting() {
   $("#deleteItemBtn").hide();
   $("#submitBtn").css("width",
      "100%");
   $("#submitBtn").text("Create");
   //this.pannelAddTask.classList.add("open");
   this.auto_reset();
}

function onLoseFucusExisting() {
   $("#deleteItemBtn").fadeOut();
   this.auto_reset();
   this.liveId = null;
   this.isItem = false;
   //this.pannelAddTask.classList.remove("open");
}

function auto_reset() {
   this.form.title.value = "";
   this.form.body.value = "";
   this.form.selectDate.value = "";
   this.form.isdone.checked = false;
   this.form.title.focus();
   this.data.date = null;

}

function reset_data_prop() {
   this.data.id = null;
   this.data.title = "";
   this.data.body = "";
   this.data.date = null //moment().format("YYYY-MM-DD HH:mm")
   this.thisItem.id = null;
   this.thisItem.title = "";
   this.thisItem.body = ""
   this.thisItem.finish_at = "" // moment().format("YYYY-MM-DD HH:mm")

}

function auto_fill() {
   let modItem = document.querySelector(`div#task_${this.liveId}`);
   let ref = modItem.getAttribute("data-ref");
   this.form.title.value = modItem.querySelector("h5.card-title").innerText;
   this.form.isdone.checked = modItem.querySelector("input.form-check-input").checked;

   this.form.selectDate.value = moment().format("YYYY-MM-DDTHH:mm") // modItem.querySelector("input#selectDate").value 

   this.form.body.value = modItem.querySelector("p.card-text").innerText;
   this.form.selectDate.value = moment(modItem.getAttribute("data-date"),
      "YYYY-MM-DDTHH:mm:ss.SSS").format("YYYY-MM-DDTHH:mm");
   this.form.title.focus();

   try {
      this.form.select.querySelector(`option[value="${this.data.ref}"]`).selected = true;
   } catch (e) { }
}

function setters(self) {
   this.thisItem = self;
   this.data = self.data;
   this.data.date = moment(this.data.finish_at, "YYYY-MM-DD HH:mm.SSSZ").isValid() ? moment(this.data.finish_at).format("YYYY-MM-DDTHH:mm") : null;
   this.liveId = self.task_id;
   this.isItem = true;
   console.log(this);
}








let _proto = HOOK.prototype;

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
_proto.reset_data_prop = reset_data_prop;
_proto.reset_data_prop = reset_data_prop
_proto.setTask = setTask;



export default HOOK;





/*
let card = document.querySelector(".card");
let clone = card.cloneNode(true);
let ids = Array.from(document.querySelectorAll(".card")).map((item)=> Number(item.id.replace("task_", ""))).sort((a, b)=> b - a);


let date = this.data.date === null ? moment().format("YYYY-MM-DD HH:mm"): this.data.date;


clone.querySelector("h5.card-title").innerText = this.data.title;
clone.querySelector("p.card-text").innerText = this.data.body;
clone.querySelector("p.date_time").setAttribute("data_date", date);
clone.querySelector("p.date_time").innerText = moment(date, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY");
clone.id = "task_" + (ids[0] + 1);

document.querySelector(".container")
.append(clone);
console.log(ids)

this.auto_reset()
*/