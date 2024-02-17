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

let addNewTaskBtn = document.querySelector("#addNewTaskBtn");

function auto_reset (){
        
    form.title.value = "";
    form.body.value = "";
    try {
        form.select.querySelector(`option[value='0B_']`).selected = true;
    } catch(err) {}

    form.isdone.checked = false;
    form.title.focus()
    
    
}


let  onFucusExisting = (self) => {
    
    pannelAddTask.classList.add("open");
    self.auto_fill()
    console.log(liveId);
}


let  FucusNoExisting = () => {
    pannelAddTask.classList.add("open");
    auto_reset();
    console.log(liveId);
}



let  onLoseFucusExisting = ()=>{
    pannelAddTask.classList.remove("open");
    auto_reset()
    liveId = null;
    
}



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

        this.box = this.CREATE_ELEMENT("div", "card");
        this.box.id = `task_${this.id}`;

        this.div1 = this.CREATE_ELEMENT("div", null, null);
        this.checkbox = this.CREATE_ELEMENT("input", "form-check-input");
        this.checkbox.setAttribute("type", "checkbox");

        if (Number(this.isdone) === 1) {
            //  this.checkbox.setAttribute("checked", "")
            this.checkbox.checked = true;
            //this.box.style.backgroundColor = "#55667720"
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

        this.cardBox.append(this.h5)
        this.cardBox.append(this.div2div)
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
        
        
        form.title.focus()
    }



    handle_click () {

        this.cardBox.addEventListener("click", (e)=> {
            e.preventDefault();
            e.stopImmediatePropagation()
            try {

                let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.id})`);
                //other.querySelector(".actions").classList.remove("open");
                other.classList.remove("focusBox");
                
            } catch (e) {}

            onFucusExisting(this);
            liveId = this.id;
        })

    }




    appendTo (section) {
        section.append(this.box)
    }



};












form.addEventListener("submit", (e)=> {
    e.preventDefault();
   
    // let {title, body, isdone, select} = form
    let title = form.title.value
    let body = form.body.value
    let isdone = form.isdone.checked === true ? 1: 0;
    let select = form.select;
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
        .catch((err)=> {});
        
        let task = new TASK_ITEM({
                title,
                body,
                isdone,
                ref
            });
    
        task.appendTo(document.querySelector("#affichage"));



    }
    
    if ( liveId !== null ) {
        
        modifItem()
        
        
        
    }


});



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
    if(e) {
        e.preventDefault()
    }
    
    let modItem = document.querySelector(`div#task_${liveId}`);

    

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


    alert(form.isdone.checked);


    postToServer("/modifTask", JSON.stringify(data), "POST")
    .then((res)=> {})
    .catch((err)=> {})
}


try {

    document.querySelector("#addNewTaskBtn")
    .addEventListener("click", (e)=> {
        e.preventDefault();
        
        onLoseFucusExisting()
        
    });



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