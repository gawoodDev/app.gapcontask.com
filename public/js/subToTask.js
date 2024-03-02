const id_page = document.querySelector('div#forIDcheck') // null
let id;
let ref_key;
if (id_page) {
  id = id_page.getAttribute("data-id");
  ref_key = id_page.getAttribute("data-ref-key");
}

console.log(id_page)

let selectewd = [],
  onSelected = false,
  list_id = [],
  a = 0,
  START_X = null,
  isDragging = true;




let headOptions = document.querySelector('.headOptions')
let close_selected = document.querySelector('#close_selected')
let remove_selected = document.querySelector('#remove_selected')
let show_up = document.querySelector('.show_up')
let bottom_options = document.querySelector('.bottom_options')
let englob_popUp = document.querySelector('.englob_popUp')

let modif_elprod = document.querySelector('#modif_elprod')
let delete_prod = document.querySelector('.modeme #delete_prod');
let prod_tools = document.querySelector('#prod_tools');
let modeme = document.querySelector('.modeme')

let select_tasks = document.querySelector('.modeme #select_tasks')
let bottom_modProd = document.querySelector('.bottom_modProd')
let bottom_modProd_input = bottom_modProd.querySelector('input');
let bottom_modProd_button = bottom_modProd.querySelector('button')
let title_prod = document.querySelector('#title_prod');

let section_container = document.querySelector("#affichage");
let form = document.querySelector("form");
let liveId = null;
let cookiesArray = []
let existing = document.querySelector("#existing");
let submitBtn = document.querySelector("#submitBtn");

let deleteBtn = document.querySelector("button#deleteBtn");
let modifBtn = document.querySelector("button#modifBtn");

let pannelAddTask = document.querySelector(".pannelAddTask");
let closePanel = document.querySelector(".closePanel");

let addNewTaskBtn = document.querySelector("#addNewTaskBtn");










englob_popUp.querySelectorAll('button')
  .forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      let ret = this.getAttribute('data-return')

      if (ret == 'false') {
        englob_popUp.classList.remove('active');
      }

      if (ret === "true") {
        alert("Supprimer")
        postToServer("/deleteProd", JSON.stringify({
          id, ref_key
        })).then((res) => {
          if (res.status === 200) {
            let a = document.createElement("a");
            a.href = "/project";
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

  postToServer("/modifProd", JSON.stringify({
    id: Number(id),
    title: bottom_modProd_input.value
  }))
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
    return Number(elem.replace("task_", ""))
  });

  console.log(listToServer, list_id)

  document.querySelectorAll('div.card.added').forEach(item => {
    list_id = list_id.filter((elem) => elem !== item.id);
    show_up.innerHTML = `${list_id.length} tâches sélectionner !`
    item.remove()
  })

  postToServer("/deleteTask", JSON.stringify({
    data: listToServer
  })).then((res) => {
    console.log(res);
  }).catch((e) => { })

})




function setPopUpContent({
  title, body
}) {
  englob_popUp.querySelector(".popUp_modal > div h5").innerHTML = title;
  englob_popUp.querySelector(".popUp_modal > div p").innerHTML = body;
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


function auto_reset() {
  form.title.value = "";
  form.body.value = "";
  form.isdone.checked = false;
  form.title.focus();
}


let onFucusExisting = () => {
  pannelAddTask.classList.add("open");
  console.log(liveId);
}
let FucusNoExisting = () => {
  pannelAddTask.classList.add("open");
  auto_reset();
  console.log(liveId);
}
let onLoseFucusExisting = () => {
  pannelAddTask.classList.remove("open");
  auto_reset()
  liveId = null;
  thisVal = null;
}

let o = 0;

closePanel.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  onLoseFucusExisting();
});

addNewTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  FucusNoExisting();
  liveId = null;
});





class TASK_ITEM {

  isMoving = true;
  #isFocus = false;
  START_X = null
  /*
    state : {type : Number} 4 etats possible
        0 : la tache a ete enregistre dans la base de donner
        1 : une tache deja enregistre dans la base de donner mais qui a éte modifier
        2: Une nouvelle tache pas encore enregistre dans la base de donner cote Server
        3 : Cette tache va etre suprimer dans la base de donneés
*/
  constructor(data) {
    this.data = data;
    this.title = this.data.title;
    this.id = this.data.id;
    this.body = this.data.body;
    this.isdone = this.data.isdone;
    this.ref = this.data.ref;
    this.state = data.state;
    /////////////////////
    this.create_item()
    this.handle_click()
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
    this.box.id = `task_${this.id}`;
    this.box.setAttribute("state", this.state)
    this.box.setAttribute("data-ref", this.ref)
    this.div1 = this.CREATE_ELEMENT("div", null, null);
    this.checkbox = this.CREATE_ELEMENT("input", "form-check-input");
    this.checkbox.setAttribute("type", "checkbox");

    if (Number(this.isdone) === 1) {
      this.checkbox.checked = true;
    }

    this.div1.append(this.checkbox)
    this.cardBox = this.CREATE_ELEMENT("div", "card-body");
    this.div2div = this.CREATE_ELEMENT("div", null, null)
    this.div2div.innerHTML = `
        <p>10:00 PM </p>
        &nbsp; • &nbsp;
        <span> Repeat </span>
        `;
    this.p = this.CREATE_ELEMENT("p", "card-text", this.body);
    this.h5 = this.CREATE_ELEMENT("h5", "card-title", this.title);

    this.cardBox.append(this.h5);
    this.cardBox.append(this.div2div);
    this.cardBox.append(this.p);

    this.div3 = this.CREATE_ELEMENT("div", null);

    this.prodGP = this.CREATE_ELEMENT("div", "prodGP");
    this.prodGP.innerHTML = "Home"
    this.dropDown = this.CREATE_ELEMENT("button", null);
    this.dropDown.id = "dropDown";
    this.dropDown.innerHTML = "__"
    this.dropDown.id = "dropDown";

    this.div3.append(this.prodGP);
    this.div3.append(this.dropDown);

    this.box.append(this.div1)
    this.box.append(this.cardBox)
    this.box.append(this.div3)
  }



  handle_click() {
    this.cardBox.addEventListener("click", this.onClicked.bind(this));
  }

  onClicked(e) {
    if (onSelected) {
      On_Click(e, this.box);
      return
    }
    e.preventDefault();
    e.stopImmediatePropagation()
    try {
      let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.id})`);
      other.classList.remove("focusBox");
    } catch (e) { }
    liveId = this.id;
    onFucusExisting();
    auto_fill(this)
  }

  appendTo(section) {
    section.append(this.box)
  }
};


let thisVal = null;


form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (liveId === null) return addItem();
  modifItem();
});



function modifItem() {
  
  let modItem = document.querySelector(`div#task_${liveId}`);
  let data = {
    id: liveId, title: form.title.value, body: form.body.value, isdone: form.isdone.checked, ref: form.select.value, state: Number(modItem.getAttribute("state"))
  }

  modItem.querySelector("h5").innerText = form.title.value;
  modItem.querySelector("p.card-text").innerText = form.body.value;
  modItem.querySelector("input").checked = form.isdone.checked;

  if (data.state !== 2) {
    modItem.setAttribute("state", "1");
    data.state = 1;
  }

  if (thisVal !== null) {
    thisVal.title = form.title.value;
    thisVal.body = form.body.value;
    thisVal.isdone = form.isdone.checked;
    thisVal.ref = form.select.value;
    thisVal.state = data.state;
  }


  postToServer("/modifTask", JSON.stringify(data), "POST")
    .then((res) => {
      if (res.status !== 200) return;

    }).catch((err) => { console.log(err) })
  auto_reset();
}




document.querySelector("#addNewTaskBtn")
  .addEventListener("click",
    (e) => {
      e.preventDefault();
      onLoseFucusExisting()
    }); document.querySelector("#addNewTaskBtn")
      .addEventListener("click",
        (e) => {
          e.preventDefault();
          onLoseFucusExisting()
        }); function auto_fill(sel) {
          thisVal = sel;
          console.log(thisVal);
          let modItem = document.querySelector(`div#task_${liveId}`);
          let ref = modItem.getAttribute("data-ref");
          form.title.value = modItem.querySelector("h5").innerText;
          form.body.value = modItem.querySelector("p.card-text").innerText;
          form.isdone.checked = modItem.querySelector("input").checked;

          try {
            form.select.querySelector(`option[value="${thisVal.ref}"]`).selected = true;
          } catch (err) { console.log(err) }

          form.title.focus()
        }

function deleteItem(e) {
  e.preventDefault()

  document.querySelector(`div#task_${liveId}`).remove();
  postToServer("deleteTask",
    JSON.stringify({
      id: liveId
    }),
    "POST")
    .then((res) => { })
    .catch((err) => { })
}

function addItem() {

  let title = form.title.value;
  let body = form.body.value
  let isdone = form.isdone.checked === true ? 1 : 0;
  let select = form.select;
  let ref = select.value;
  let state = 2;
  let currentID = getHighestID() + 1;
  let task = new TASK_ITEM({ title, body, isdone, ref, id: currentID, state });

  task.appendTo(document.querySelector("#affichage"));

  let obj = { title, body, isdone, ref, id: currentID, state };


  postToServer("/addTask",
    JSON.stringify({
      title, body, isdone, ref
    }),
    "POST")
    .then((res) => {
      if (res.status !== 200) return

    })
    .catch((err) => { });
  auto_reset()

}




function getCookies(name) {
  let cookies = document.cookie.split("; ");
  let values = cookies.find((c) => c.startsWith(name));
  let splited = values.split("=");
  let val = JSON.parse(splited[1]);
  return val
}




function setCookies(data) {

  if (liveId === null) {
    cookiesArray.push(data);
    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("Not from db , added", liveId, data, document.cookie)
    return
  }

  let val = getCookies("values");
  let lastValue = val.find((item) => item.id === liveId);


  if (lastValue === undefined || data.state === 1) {
    cookiesArray.push(data);
    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("Its from db, added", liveId, data, document.cookie)
    return
  }


  console.log("il existe deja", lastValue)
  if (lastValue && data.state === 2 && liveId !== null) {

    console.log("Not added to db, from front Before", lastValue)
    let keys = Object.entries(lastValue)
    for (let array of keys) {
      let key = array[0];
      let val = array[1];
      lastValue[key] = data[key];
      if (lastValue[key] !== data[key]) {
        lastValue[key] = data[key];
      }
    }

    cookiesArray = cookiesArray.filter((item) => item.id !== lastValue.id)
    cookiesArray.push(lastValue);

    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("After", lastValue);
  }
}

function getHighestID() {

  return Array.from(document.querySelectorAll(".card"))
    .map((item) => {
      if (!item.id) return undefined
      return Number(item.id.split("_")[1]);
    })
    .filter((item) => item !== undefined)
    .sort((a, b) => {
      return b - a
    })[0];

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





export default TASK_ITEM;










/*


const id_page = document.querySelector('div#forIDcheck') // null
let id;
let ref_key;
if (id_page) {
  id = id_page.getAttribute("data-id");
  ref_key = id_page.getAttribute("data-ref-key");
}

console.log(id_page)

let selectewd = [],
  onSelected = false,
  list_id = [],
  a = 0,
  START_X = null,
  isDragging = true;




let headOptions = document.querySelector('.headOptions')
let close_selected = document.querySelector('#close_selected')
let remove_selected = document.querySelector('#remove_selected')
let show_up = document.querySelector('.show_up')
let bottom_options = document.querySelector('.bottom_options')
let englob_popUp = document.querySelector('.englob_popUp')

let modif_elprod = document.querySelector('#modif_elprod')
let delete_prod = document.querySelector('.modeme #delete_prod');
let prod_tools = document.querySelector('#prod_tools');
let modeme = document.querySelector('.modeme')

let select_tasks = document.querySelector('.modeme #select_tasks')
let bottom_modProd = document.querySelector('.bottom_modProd')
let bottom_modProd_input = bottom_modProd.querySelector('input');
let bottom_modProd_button = bottom_modProd.querySelector('button')
let title_prod = document.querySelector('#title_prod');

let section_container = document.querySelector("#affichage");
let form = document.querySelector("form");
let liveId = null;
let cookiesArray = []
let existing = document.querySelector("#existing");
let submitBtn = document.querySelector("#submitBtn");

let deleteBtn = document.querySelector("button#deleteBtn");
let modifBtn = document.querySelector("button#modifBtn");

let pannelAddTask = document.querySelector(".pannelAddTask");
let closePanel = document.querySelector(".closePanel");

let addNewTaskBtn = document.querySelector("#addNewTaskBtn");










englob_popUp.querySelectorAll('button')
  .forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      let ret = this.getAttribute('data-return')

      if (ret == 'false') {
        englob_popUp.classList.remove('active');
      }

      if (ret === "true") {
        alert("Supprimer")
        postToServer("/deleteProd", JSON.stringify({
          id, ref_key
        })).then((res) => {
          if (res.status === 200) {
            let a = document.createElement("a");
            a.href = "/project";
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

  postToServer("/modifProd", JSON.stringify({
    id: Number(id),
    title: bottom_modProd_input.value
  }))
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
    return Number(elem.replace("task_", ""))
  });

  console.log(listToServer, list_id)

  document.querySelectorAll('div.card.added').forEach(item => {
    list_id = list_id.filter((elem) => elem !== item.id);
    show_up.innerHTML = `${list_id.length} tâches sélectionner !`
    item.remove()
  })

  postToServer("/deleteTask", JSON.stringify({
    data: listToServer
  })).then((res) => {
    console.log(res);
  }).catch((e) => { })

})




function setPopUpContent({
  title, body
}) {
  englob_popUp.querySelector(".popUp_modal > div h5").innerHTML = title;
  englob_popUp.querySelector(".popUp_modal > div p").innerHTML = body;
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


function auto_reset() {
  form.title.value = "";
  form.body.value = "";
  form.isdone.checked = false;
  form.title.focus();
}


let onFucusExisting = () => {
  pannelAddTask.classList.add("open");
  console.log(liveId);
}
let FucusNoExisting = () => {
  pannelAddTask.classList.add("open");
  auto_reset();
  console.log(liveId);
}
let onLoseFucusExisting = () => {
  pannelAddTask.classList.remove("open");
  auto_reset()
  liveId = null;
  thisVal = null;
}

let o = 0;

closePanel.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  onLoseFucusExisting();
});

addNewTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  FucusNoExisting();
  liveId = null;
});




document.querySelector("#addNewTaskBtn")
    .addEventListener("click",
      (e) => {
        e.preventDefault();
        onLoseFucusExisting()
      });

class TASK_ITEM {

  isMoving = true;
  #isFocus = false;
  START_X = null
  /*
    state : {type : Number} 4 etats possible
        0 : la tache a ete enregistre dans la base de donner
        1 : une tache deja enregistre dans la base de donner mais qui a éte modifier
        2: Une nouvelle tache pas encore enregistre dans la base de donner cote Server
        3 : Cette tache va etre suprimer dans la base de donneés

constructor(data) {
  this.data = data;
  this.title = this.data.title;
  this.id = this.data.id;
  this.body = this.data.body;
  this.isdone = this.data.isdone;
  this.ref = this.data.ref;
  this.state = data.state;
  /////////////////////
  this.create_item()
  this.handle_click()
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
  this.box.id = `task_${this.id}`;
  this.box.setAttribute("state", this.state)
  this.box.setAttribute("data-ref", this.ref)
  this.div1 = this.CREATE_ELEMENT("div", null, null);
  this.checkbox = this.CREATE_ELEMENT("input", "form-check-input");
  this.checkbox.setAttribute("type", "checkbox");

  if (Number(this.isdone) === 1) {
    this.checkbox.checked = true;
  }

  this.div1.append(this.checkbox)
  this.cardBox = this.CREATE_ELEMENT("div", "card-body");
  this.div2div = this.CREATE_ELEMENT("div", null, null)
  this.div2div.innerHTML = `
        <p>10:00 PM </p>
        &nbsp; • &nbsp;
        <span> Repeat </span>
        `;
  this.p = this.CREATE_ELEMENT("p", "card-text", this.body);
  this.h5 = this.CREATE_ELEMENT("h5", "card-title", this.title);

  this.cardBox.append(this.h5);
  this.cardBox.append(this.div2div);
  this.cardBox.append(this.p);

  this.div3 = this.CREATE_ELEMENT("div", null);

  this.prodGP = this.CREATE_ELEMENT("div", "prodGP");
  this.prodGP.innerHTML = "Home"
  this.dropDown = this.CREATE_ELEMENT("button", null);
  this.dropDown.id = "dropDown";
  this.dropDown.innerHTML = "__"
  this.dropDown.id = "dropDown";

  this.div3.append(this.prodGP);
  this.div3.append(this.dropDown);

  this.box.append(this.div1)
  this.box.append(this.cardBox)
  this.box.append(this.div3)
}



handle_click() {
  this.cardBox.addEventListener("click", this.onClicked.bind(this));
}

onClicked(e) {
  if (onSelected) {
    On_Click(e, this.box);
    return
  }
  e.preventDefault();
  e.stopImmediatePropagation()
  try {
    let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.id})`);
    other.classList.remove("focusBox");
  } catch (e) { }
  liveId = this.id;
  onFucusExisting();
  auto_fill(this)
}

appendTo(section) {
  section.append(this.box)
}

};


let thisVal = null;


document.querySelector("#addNewTaskBtn")
  .addEventListener("click",
    (e) => {
      e.preventDefault();
      onLoseFucusExisting()
      ss
    });

document.querySelector("#addNewTaskBtn")
  .addEventListener("click",
    (e) => {
      e.preventDefault();
      onLoseFucusExisting()
    });    .addEventListener("click",
      (e) => {
        e.preventDefault();
        onLoseFucusExisting()
      }); form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (liveId === null) return addItem();
        modifItem();
      });

function modifItem() {
  let modItem = document.querySelector(`div#task_${liveId}`);
  let data = {
    id: liveId, title: form.title.value, body: form.body.value, isdone: form.isdone.checked, ref: form.select.value, state: Number(modItem.getAttribute("state"))
  }

  modItem.querySelector("h5").innerText = form.title.value;
  modItem.querySelector("p.card-text").innerText = form.body.value;
  modItem.querySelector("input").checked = form.isdone.checked;

  if (data.state !== 2) {
    modItem.setAttribute("state", "1");
    data.state = 1;
  }

  if (thisVal !== null) {
    thisVal.title = form.title.value;
    thisVal.body = form.body.value;
    thisVal.isdone = form.isdone.checked;
    thisVal.ref = form.select.value;
    thisVal.state = data.state;
  }


  postToServer("/modifTask", JSON.stringify(data), "POST")
    .then((res) => {
      if (res.status !== 200) return;

    }).catch((err) => { console.log(err) })
  auto_reset();
}

document.querySelector("#addNewTaskBtn")
  .addEventListener("click",
    (e) => {
      e.preventDefault();
      onLoseFucusExisting()
    }); document.querySelector("#addNewTaskBtn")
      .addEventListener("click",
        (e) => {
          e.preventDefault();
          onLoseFucusExisting()
        }); function auto_fill(sel) {
          thisVal = sel;
          console.log(thisVal);
          let modItem = document.querySelector(`div#task_${liveId}`);
          let ref = modItem.getAttribute("data-ref");
          form.title.value = modItem.querySelector("h5").innerText;
          form.body.value = modItem.querySelector("p.card-text").innerText;
          form.isdone.checked = modItem.querySelector("input").checked;

          try {
            form.select.querySelector(`option[value="${thisVal.ref}"]`).selected = true;
          } catch (err) { console.log(err) }

          form.title.focus()
        }

function deleteItem(e) {
  e.preventDefault()

  document.querySelector(`div#task_${liveId}`).remove();
  postToServer("deleteTask",
    JSON.stringify({
      id: liveId
    }),
    "POST")
    .then((res) => { })
    .catch((err) => { })
}

function addItem() {

  let title = form.title.value
  let body = form.body.value
  let isdone = form.isdone.checked === true ? 1 : 0;
  let select = form.select;
  let ref = select.value;
  let state = 2;
  let currentID = getHighestID() + 1;
  let task = new TASK_ITEM({ title, body, isdone, ref, id: currentID, state });

  task.appendTo(document.querySelector("#affichage"));

  let obj = { title, body, isdone, ref, id: currentID, state };


  postToServer("/addTask",
    JSON.stringify({
      title, body, isdone, ref
    }),
    "POST")
    .then((res) => {
      if (res.status !== 200) return

    })
    .catch((err) => { });
  auto_reset()

}

function getCookies(name) {
  let cookies = document.cookie.split("; ");
  let values = cookies.find((c) => c.startsWith(name));
  let splited = values.split("=");
  let val = JSON.parse(splited[1]);
  return val
}

function setCookies(data) {

  if (liveId === null) {
    cookiesArray.push(data);
    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("Not from db , added", liveId, data, document.cookie)
    return
  }

  let val = getCookies("values");
  let lastValue = val.find((item) => item.id === liveId);


  if (lastValue === undefined || data.state === 1) {
    cookiesArray.push(data);
    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("Its from db, added", liveId, data, document.cookie)
    return
  }


  console.log("il existe deja", lastValue)
  if (lastValue && data.state === 2 && liveId !== null) {

    console.log("Not added to db, from front Before", lastValue)
    let keys = Object.entries(lastValue)
    for (let array of keys) {
      let key = array[0];
      let val = array[1];
      lastValue[key] = data[key];
      if (lastValue[key] !== data[key]) {
        lastValue[key] = data[key];
      }
    }

    cookiesArray = cookiesArray.filter((item) => item.id !== lastValue.id)
    cookiesArray.push(lastValue);

    document.cookie = `values=${JSON.stringify(cookiesArray)}`;
    console.log("After", lastValue);
  }
}

function getHighestID() {

  return Array.from(document.querySelectorAll(".card"))
    .map((item) => {
      if (!item.id) return undefined
      return Number(item.id.split("_")[1]);
    })
    .filter((item) => item !== undefined)
    .sort((a, b) => {
      return b - a
    })[0];

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




try {


} catch (e) { }

export default TASK_ITEM;


** */
