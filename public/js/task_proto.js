const id_page = document.querySelector('header').id;

let section_container = document.querySelector("#affichage");
let form = document.querySelector("form");
let liveId;
let existing = document.querySelector("#existing");
let submitBtn = document.querySelector("#submitBtn");

let deleteBtn = document.querySelector("button#deleteBtn");
let modifBtn = document.querySelector("button#modifBtn");

let pannelAddTask = document.querySelector(".pannelAddTask");
let closePanel = document.querySelector(".closePanel");


closePanel.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    pannelAddTask.classList.remove("open");
    liveId = null;

});


class TASK_ITEM {


    #isFocus = false;


    constructor(data) {
        this.data = data;
        this.title = this.data.title;
        this.id = this.data.id;
        this.body = this.data.body;
        this.isdone = this.data.isdone;
        this.ref = this.data.ref;

        this.create_item()
        //this.create_actionable()
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


    create_item () {


        let g = `
        <div class="card">
        <div>
        <input type="checkbox" class="form-check-input">
        </div>

        <div class="card-body">
        <h5 class="card-title">Titre de cette tâche ... </h5>
        <div>
        <p>10:00 PM </p>  &nbsp; • &nbsp;
        <span> Repeat </span>
        </div>
        <p class="card-text">Description de la tache de sang pour vous offrir ou pas demain mais vous avez besoin.  </p>
        </div>

        <div>
        <div>Home</div>
        <button type="button"> __ </button>
        </div>

        </div>`;




        this.box = this.CREATE_ELEMENT("div", "card");
        this.box.id = `task_${this.id}`;
        this.cardBox = this.CREATE_ELEMENT("div", "card-body");

        this.checkbox = this.CREATE_ELEMENT("input", "form-check-input");
        this.checkbox.setAttribute("type", "checkbox");

        if (Number(this.isdone) === 1) {
            //  this.checkbox.setAttribute("checked", "")
            this.checkbox.checked = true;
            //this.box.style.backgroundColor = "#55667720"
        }


        this.p = this.CREATE_ELEMENT("p", "card-text", this.body);
        this.h5 = this.CREATE_ELEMENT("h5", "card-title", this.title);

        this.cardBox.append(this.checkbox);
        this.cardBox.append(this.h5);
        this.cardBox.append(this.p);


        this.box.append(this.cardBox)

    }


    auto_fill() {

        form.title.value = this.title;
        form.body.value = this.body;
        try {
            form.select.querySelector(`option[value='${this.ref}']`).selected = true;
        } catch(err) {}


        if (Number(this.isdone) === 1) {
            form.isdone.checked = true;

        } else {
            form.isdone.checked = false;
        }
    }



    handle_click () {

        this.box.addEventListener("click", (e)=> {
            e.preventDefault();
            e.stopImmediatePropagation()
            try {

                let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.id})`);
                //other.querySelector(".actions").classList.remove("open");
                other.classList.remove("focusBox");

            } catch (e) {}

            this.add_focus()
        })

    }

    add_focus () {

        this.box.classList.toggle("focusBox");
        this.#isFocus = this.box.classList.contains("focusBox");

        liveId = this.id;

        if (this.#isFocus || true) {
            pannelAddTask.classList.add("open");


        } else {
            pannelAddTask.classList.remove("open");
            liveId = null
        }

        console.log(liveId);

        this.auto_fill()

        existing.style.display = "flex";
        submitBtn.style.display = "none"
        // console.log(document.querySelector(`#task_${this.id}`).clientTop)

    }



    append_to_section (section) {
        section.append(this.box)
    }



};











deleteBtn.addEventListener("click", deleteItem);
modifBtn.addEventListener("click", modifItem);


form.addEventListener("submit", (e)=> {
    e.preventDefault();


    let title = form.title.value
    let body = form.body.value
    let isdone = form.isdone.checked === true ? 1: 0;

    let select = form.select


    console.log(select.value)


    let ref = select.value;




    if (liveId === null) {
        postToServer("/addTask", JSON.stringify({
            title, body, isdone, ref
        }), "POST")
        .then((res)=> {
            if (res.status === 200) {
                alert("Added ...")
            }
        })
        .catch((err)=> {})

    } else {
        postToServer("/modifTask", JSON.stringify({
            title, body, isdone, ref
        }), "POST")
        .then((res)=> {
            if (res.status === 200) {
                alert("Modified ...")
            }
        })
        .catch((err)=> {})
    }


    let task = new TASK_ITEM({
        title,
        body,
        isdone,
        ref
    })
    task.appendTo(document.querySelector("#afficher"));

})



function deleteItem(e) {
    e.preventDefault()

    document.querySelector(`div#task_${liveId}`).remove();
    postToServer("deleteTask", JSON.stringify({
        id: liveId
    }), "POST")
    .then((res)=> {})
    .catch((err)=> {})
}

function modifItem(e) {
    e.preventDefault()

    let modItem = document.querySelector(`div#task_${liveId}`);

    alert(form.isdone.checked);

    let data = {
        id: liveId,
        title: form.title.value,
        body: form.body.value,
        isdone: form.isdone.checked,
        ref: form.select.value
    }


    modItem.querySelector("h5").innerText = form.title.value;
    modItem.querySelector("p").innerText = form.body.value;
    modItem.querySelector("input").checked = form.isdone.checked;
    //modItem.querySelector("select").value = data.;





    postToServer("/modifTask", JSON.stringify(data), "POST")
    .then((res)=> {})
    .catch((err)=> {})
}


try {

    document.querySelector("#addNewTaskBtn")
    .addEventListener("click", (e)=> {
        e.preventDefault();


        pannelAddTask.classList.toggle("open");

        form.title.value = "";
        form.body.value = "";
        form.isdone.checked = false;

        try {
            document.querySelector(`.card.focusBox`).classList.remove("focusBox");
        } catch(error) {}


        liveId = null;


        existing.style.display = "none";
        submitBtn.style.display = "block";
    })



} catch (e) {}



function postToServer(url, body, method) {

    return fetch(url, {
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        method: "POST",
        body: body
    })

}





export default TASK_ITEM;