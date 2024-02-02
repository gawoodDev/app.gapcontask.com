let section_container = document.querySelector("#afficher");
let form = document.querySelector("form");
let liveId;
let existing = document.querySelector("#existing");
let submitBtn = document.querySelector("#submitBtn");
let deleteBtn = document.querySelector("button#deleteBtn");
let modifBtn = document.querySelector("button#modifBtn");
let pannel_form = document.querySelector(".pannel_form");
        
class TASK_ITEM {
    
    
    #isFocus = false;
    
    
    constructor(data){
        this.data = data;
        this.title = this.data.title;
        this.id = this.data.id;
        this.body = this.data.body;
        this.isdone = this.data.isdone;
        this.create_item()
        //this.create_actionable()
        this.handle_click()
        
        
    }
    
    
    
    CREATE_ELEMENT(type, className, text){
        let elem = document.createElement(type);
        if (className) {
            elem.classList.add(className)
        }
        
        if (text) {
            elem.innerText = text
        }
        return elem
    }
    
    
    create_item (){
        
        this.box = this.CREATE_ELEMENT("div", "card")
        this.box.id = `task_${this.id}`;
        this.cardBox = this.CREATE_ELEMENT("div", "card-body")
        
        
        
        this.checkbox = this.CREATE_ELEMENT("input", "form-check-input")
        this.checkbox.setAttribute("type", "checkbox")
        
        if (Number(this.isdone) === 1) {
          //  this.checkbox.setAttribute("checked", "")
            this.checkbox.checked = true;
            //this.box.style.backgroundColor = "#55667720"
        }
        
                
        this.p = this.CREATE_ELEMENT("p", "card-text", this.body )
        
        
                
        this.h5 = this.CREATE_ELEMENT("h5", "card-title", this.title)
        
        
        
        this.cardBox.append(this.checkbox);
        this.cardBox.append(this.h5);
        this.cardBox.append(this.p);
        
        
        this.box.append(this.cardBox)
        
        
        
    }
    
    
    
    handle_state(){
        
        
        
    }
    
    auto_fill(){
        
        form.title.value = this.title;
        form.body.value = this.body;
        if (Number(this.isdone) === 1) {
          //  this.checkbox.setAttribute("checked", "")
            form.isdone.checked = true;
            //this.box.style.backgroundColor = "#55667720"
        }else{
          //  this.checkbox.setAttribute("checked", "")
            form.isdone.checked = false;
            //this.box.style.backgroundColor = "#55667720"
        }
        
    }
    
    handle_click (){
        
        this.box.addEventListener("click", (e)=>{
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
    
    add_focus (){
        
        this.box.classList.toggle("focusBox");
        this.#isFocus = this.box.classList.contains("focusBox");
        
        liveId = this.id;
        
        if(this.#isFocus){
            pannel_form.classList.add("open");
            section_container.style.paddingBottom = `${window.innerHeight / 2}px`;
            
        }else{
            pannel_form.classList.remove("open");
            liveId = null
            
            
        }
        
        console.log(liveId);
        
        this.auto_fill()
        
        existing.style.display = "flex";
        submitBtn.style.display = "none"
        // console.log(document.querySelector(`#task_${this.id}`).clientTop)
        
    }
    
    
    
    
    
    
    
    
    append_to_section (section){
        section.append(this.box)
    }
    
    
    
    
    
    /*
    
    create_actionable(){
        this.actionsBox = this.CREATE_ELEMENT("div", "actions" )
        this.deleteBtn = this.CREATE_ELEMENT("button", "", "Del" )
        this.modifBtn = this.CREATE_ELEMENT("button", "", "Modif" )
        
        this.actionsBox.append(this.modifBtn); 
        this.actionsBox.append(this.deleteBtn); 
        
        //this.box.append(this.actionsBox)
    }
    
    make_actionable(){
        
        //this.box.append(this.actionsBox)
        /*
        if(this.#isFocus){
            this.actionsBox.classList.add("open")
        }else{
            this.actionsBox.classList.remove("open")
        }
        *
        
    }
    */
    
}

document.querySelector("#addNewTaskBtn")
.addEventListener("click", (e)=>{
    e.preventDefault();
    
    pannel_form.classList.add("open");
    
    form.title.value = ""
    form.body.value = ""
    form.isdone.checked = false;
    
    try {
        document.querySelector(`.card.focusBox`).classList.remove("focusBox");
    } catch(error){}
    
    
    liveId = null;
    
    
    existing.style.display = "none";
    submitBtn.style.display = "block";
})




async function getDataFromDB (argument) {
    let fetched = await fetch("/getdatas")
    let datas = await fetched.json()
    return datas;
}



getDataFromDB().then((datas)=>{
    for(let data of datas){
        let task = new TASK_ITEM(data);
        task.append_to_section(section_container);
    }
    
})







form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    
    let title = form.title.value
    let body = form.body.value
    let isdone = form.isdone.checked === true ? 1 : 0;
    alert(isdone)
    
    
    if (liveId === null) {
        postToServer("/addTask", JSON.stringify({title, body, isdone}), "POST")
        .then((res)=>{
            if ( res.status === 200) {
                alert("Added ...")
            }
        })
        .catch((err)=>{
            
        })
        
    }else{
        postToServer("/modifTask", JSON.stringify({title, body, isdone}), "POST")
        .then((res)=>{
            if ( res.status === 200) {
                alert("Modified ...")
            }
        })
        .catch((err)=>{
            
        })
    }
    
    
    let task = new TASK_ITEM({title, body, isdone})
    task.append_to_section(document.querySelector("#afficher"));
    
})




deleteBtn.addEventListener("click", deleteItem );
modifBtn.addEventListener("click", modifItem );


function deleteItem(e){
    e.preventDefault()
    
    document.querySelector(`div#task_${liveId}`).remove();
    postToServer("deleteTask", JSON.stringify({id : liveId}), "POST")
    .then((res)=>{
        
    })
    .catch((err)=>{
        
    })
}

function modifItem(e){
    e.preventDefault()
    
    let modItem = document.querySelector(`div#task_${liveId}`);
    
    alert(form.isdone.checked);
    
    let data = {
        id: liveId,
        title: form.title.value,
        body: form.body.value,
        isdone: form.isdone.checked
    }
    
    
    modItem.querySelector("h5").innerText = form.title.value;
    modItem.querySelector("p").innerText = form.body.value;
    modItem.querySelector("input").checked = form.isdone.checked;
    
    
    
    
    
    postToServer("modifTask", JSON.stringify(data), "POST")
    .then((res)=>{
        
    })
    .catch((err)=>{
        
    })
}



function postToServer(url, body, method){
    
    return fetch(url, {
        headers : {"Content-type": "application/json;charset=UTF-8" },
        method : "POST",
        body : body
    })

}




