class TASK_ITEM {
    
    constructor(data){
        this.data = data
        this.title = this.data.title
        this.id = this.data.id
        this.body = this.data.body
        
        this.create_item()
    }
    
    create_item (){
        
        this.box = document.createElement("div");
        this.box.id = this.id
        this.box.classList.add("card")
        this.box.innerHTML = `
            <div class="card-body">
                    <input type="checkbox" class="form-check-input">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.body}</p>
                </div>
        `;
        
        
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

