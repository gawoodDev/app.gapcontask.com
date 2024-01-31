class TASK_ITEM {
    
    constructor(data){
        this.data = data
        this.title = this.data.title
        this.id = this.data.id
        this.body = this.data.body
        this.isdone = this.data.isdone
        this.create_item()
    }
    
    create_item (){
        
        this.box = document.createElement("div");
        this.box.id = this.id
        this.box.classList.add("card")
        
        this.cardBox = document.createElement("div");
        this.cardBox.classList.add("card-body");
        
        this.checkbox = document.createElement("input");
        this.checkbox.classList.add("form-check-input");
        
        this.checkbox.setAttribute("type", "checkbox")
        
        if (Number(this.isdone) === 1) {
          //  this.checkbox.setAttribute("checked", "")
            this.checkbox.checked = true;
            
            
            this.box.style.backgroundColor = "#55667720"
        }
        
                
        this.p = document.createElement("p");
        this.p.classList.add("card-text");
        this.p.innerText = this.body;
        
                
        this.h5 = document.createElement("h5");
        this.h5.classList.add("card-title");
        this.h5.innerText = this.title;
        
        this.cardBox.append(this.checkbox);
        this.cardBox.append(this.h5);
        this.cardBox.append(this.p);
        
        
        this.box.append(this.cardBox)
        
        
        
    }
    
    
    
    handle_state(){
        
        
    }
    
    
    onclicked (){
        
        
    }
    
    
    append_to_section (section){
        section.append(this.box)
    }
    
    
    
}








async function getDataFromDB (argument) {
    let fetched = await fetch("/getdatas")
    let datas = await fetched.json()
    return datas;
}



getDataFromDB().then((datas)=>{
    alert(datas["0"].id)
    
    for(let data of datas){
        let task = new TASK_ITEM(data)
        task.append_to_section(document.querySelector("#afficher"))
    }
    
})






let form = document.querySelector("form");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    
    let title = form.title.value
    let body = form.body.value
    let isdone = form.isdone.checked === true ? 1 : 0;
    alert(isdone)
    
    
    postToServer("/addTask", JSON.stringify({title, body, isdone}), "POST")
    .then((res)=>{
        if ( res.status === 200) {
            alert("Sended ...")
        }
    })
    .catch((err)=>{
        alert(err)
    })
    
    
    
    let task = new TASK_ITEM({title, body, isdone})
    task.append_to_section(document.querySelector("#afficher"))
    
})



function postToServer(url, body, method){
    
    return fetch(url, {
        headers : {"Content-type": "application/json;charset=UTF-8" },
        method : "POST",
        body : body
    })

}




