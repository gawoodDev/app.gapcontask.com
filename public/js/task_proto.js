const id_page = document.querySelector('header').id;



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

function auto_reset (){
        
    form.title.value = "";
      
    form.body.value = "";
    try {
        form.select.querySelector(`option[value='0B_']`).selected = true;
    } catch(err) {}

    form.isdone.checked = false;
    form.title.focus()
    
    
}


let  onFucusExisting = () => {
    
    pannelAddTask.classList.add("open");
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
    alert("focus lost")
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



let o = 0

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
        this.state = data.state || 0 //(this.isdone === 0 || this.isdone === 1 ? 0 : 2);
        this.create_item()
        //this.create_actionable()
        //this.handle_click()
        
        this.HANDLE_EVENT()


    }
      
  
      
  
    HANDLE_EVENT(){
      
      this.box.addEventListener("touchstart", this.touchStart.bind(this) );
      this.box.addEventListener("touchmove", this.touchMove.bind(this) );
      this.box.addEventListener("touchend", this.touchEnd.bind(this) );
      
      
    }
  
  
    touchStart (e){
        //if (!this.isMoving) return
        this.isMoving = true;
        let itemClick = e.target.classList.contains("INP");
        let touch = e.touches[0]
        let rect = this.box.getBoundingClientRect();    
        this.START_X =  (touch.clientX - rect.x) + this.box.offsetLeft;
        
    } 

  
    touchMove (e){
      
       e.preventDefault();
       e.stopPropagation();
       
        let touch = e.touches[0];
        let tr = touch.clientX;
        
        this.box.style.transform = `translateX(${ tr - this.START_X }px)`;
  
        if (tr > this.START_X) {
         // this.under_.style.backgroundColor = `green`;
        }
        if (tr < this.START_X) {
         // this.under_.style.backgroundColor = `red`;
        }
    }
  
  
    touchEnd (e){
      
        // if (!this.isMoving) return
        
        let rect = this.box.getBoundingClientRect()
        let right = window.innerWidth - rect.right;
       
        if (right >= 170 ) {
          // left
          
          let rest = -window.innerWidth - 5;
          //this.box.style.opacity = '0';
          this.box.style.transform = `translateX(${ rest }px)`;

          
          setTimeout(() => {
            this.box.style.transition = `all .5s ease`;
            
            this.box.style.height = `0px`;
            this.box.style.margin = `0px`;
            
          }, 210);
            
          setTimeout(() => {
            this.box.remove()
          }, 1790);
          
        }
        
        
        else if (rect.x >= 170 ) {
          // Right 
       
          let rest =  window.innerWidth + 5 ;
          this.box.style.transform = `translateX(${ rest }px)`;
          
          
          
          
          setTimeout(() => {
            this.box.style.transition = `all .5s ease`;
            this.box.style.height = `0px`;
            this.box.style.margin = `0px`;
          }, 780);
          
          setTimeout(() => {
            this.box.remove()     
          }, 1720);
          
          console.log("Right", rest)
        }
        else {
          this.box.style.transform = `translateX(${ 0 }px)`;
          this.box.style.transition = `all .2s ease`;
        }
        
  
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
        this.box.setAttribute("state", this.state)
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
        if (true) {
            
        }

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

        this.cardBox.addEventListener("click",  this.onClicked.bind(this));

    }
    
    onClicked (e){
       
            e.preventDefault();
            e.stopImmediatePropagation()
            try {

                let other = this.box.parentElement.querySelector(`.card.focusBox:not(#task_${this.id})`);
                //other.querySelector(".actions").classList.remove("open");
                other.classList.remove("focusBox");
                
            } catch (e) {}

            
            
            liveId = this.id;
            
            onFucusExisting();
            
            this.auto_fill()
            
            if(liveId !== this.id) return
            
            
            form.addEventListener("submit", this.formSubmit.bind(this), {once: true});
            
            
               
               
    }

    formSubmit (e) {
      e.preventDefault();
                
      
      this.modifItem()
               
    }


    appendTo (section) {
        section.append(this.box)
    }

    
    modifItem() {
        
        alert(this.id)
    
        let modItem = document.querySelector(`div#task_${this.id}`);
    
        let data = {
            id: liveId,
            title: form.title.value,
            body: form.body.value,
            isdone: form.isdone.checked,
            ref: form.select.value,
            state : Number(modItem.getAttribute("state"))
        }

            
            this.title = form.title.value,
            this.body =  form.body.value,
            this.isdone =   form.isdone.checked,
            this.ref =   form.select.value,
            this.state  =   this.state !== 2 ? 1 : 2;


        
        
        
    
        modItem.querySelector("h5").innerText = form.title.value;
        modItem.querySelector("p").innerText = form.body.value;
        modItem.querySelector("input").checked = form.isdone.checked;
        
        
        
        if(data.state !== 2){
            modItem.setAttribute("state", "1");
            data.state = 1;
        }
        
        
        //modItem.querySelector("select").value = data.;
    
        //setCookies(data)
        
        // form.removeEventListener("submit", this.formSubmit.bind(this));
        
        
        
        postToServer("/modifTask", JSON.stringify(data), "POST")
        .then((res)=> {
          if(res.status !== 200) return;
          alert("modifier avec success")
        })
        .catch((err)=> {})
    }
    
    
    // class end


};













function updateIfChanged(elem, value){
    
    
    
}




form.addEventListener("submit", (e)=> {
    e.preventDefault();
   
    if (liveId === null) {
        addItem()
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


/*function modifItem(e) {6
    
    if(e) {
        e.preventDefault()
    }
    
    let modItem = document.querySelector(`div#task_${liveId}`);

    

    let data = {
        id: liveId,
        title: form.title.value,
        body: form.body.value,
        isdone: form.isdone.checked,
        ref: form.select.value,
        state : Number(modItem.getAttribute("state"))
    }


    modItem.querySelector("h5").innerText = form.title.value;
    modItem.querySelector("p").innerText = form.body.value;
    modItem.querySelector("input").checked = form.isdone.checked;
    
    if(data.state !== 2){
        modItem.setAttribute("state", "1");
        data.state = 1;
    }
    
    
    //modItem.querySelector("select").value = data.;

    setCookies(data)
    
    return 
    
    postToServer("/modifTask", JSON.stringify(data), "POST")
    .then((res)=> {})
    .catch((err)=> {})
}*/


function addItem(){
        
    let title = form.title.value
    let body = form.body.value
    let isdone = form.isdone.checked === true ? 1: 0;
    let select = form.select;
    let ref = select.value;
    let state = 2;
    
    let currentID = getHighestID() + 1;
    
    let task = new TASK_ITEM({
        title, body,  isdone,  ref,
        id : currentID, state });
        
    task.appendTo(document.querySelector("#affichage"));
    
    
    
    let obj = {title, body, isdone, ref, id: currentID, state};
    // setCookies(obj);
    
      
    postToServer("/addTask", JSON.stringify({
            title, body, isdone, ref
        }), "POST")
    .then((res)=> {
        if (res.status !== 200) return
            alert("Added ...")
          
        })
    .catch((err)=> {});
    
    
         
        
        
}




function getCookies (name){
    let cookies = document.cookie.split("; ");
    let values = cookies.find((c)=> c.startsWith(name));
    let splited = values.split("=");
    let val = JSON.parse(splited[1]);
    console.log("Splited",values, splited, val)
    return val
}
function setCookies(data){
    
    if(liveId === null) {
        cookiesArray.push(data);
        document.cookie = `values=${JSON.stringify(cookiesArray)}`;
        console.log("Not from db , added",liveId, data, document.cookie)
         return
    }
    
    let val = getCookies("values");
    let lastValue = val.find((item)=> item.id === liveId);
    
    
    if(lastValue === undefined || data.state === 1){
        cookiesArray.push(data);
        document.cookie = `values=${JSON.stringify(cookiesArray)}`;
        console.log("Its from db, added",liveId, data, document.cookie)
        return
    }
    
    
    
    
    console.log("il existe deja",lastValue)
    if(lastValue && data.state === 2 && liveId !== null) {
        
        console.log("Not added to db, from front Before",lastValue)
        
        let keys = Object.entries(lastValue)
        
        for(let array of keys){
            
            let key = array[0];
            let val = array[1];
            
            
            lastValue[key] = data[key];
            if(lastValue[key] !== data[key]){
                lastValue[key] = data[key];
            }
            
        }
        
        cookiesArray = cookiesArray.filter((item)=> item.id !== lastValue.id)
        cookiesArray.push(lastValue);
        
        document.cookie = `values=${JSON.stringify(cookiesArray)}`;
        console.log("After", lastValue)
        
    }
        
    
}
function getHighestID () {
    
    return  Array.from(document.querySelectorAll(".card"))
    .map((item)=>{
        if(!item.id) return undefined
        return Number(item.id.split("_")[1]);
    })
    .filter((item)=> item !== undefined)
    .sort((a, b)=>{
        return b - a
    })[0];
    
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