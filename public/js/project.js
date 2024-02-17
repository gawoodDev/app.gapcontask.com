let section_container = document.querySelector(`#affichage`)
console.log('hhhh')
let form = document.querySelector(`#addProdInp`)

let id  = 0;




class PROD_ITEM {
    
    #isFocus = false;
    
    
    constructor(data){
        this.data = data;
        this.title = this.data.title;
        this.id  = this.data.id;
        this.create_item()
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
        
        this.box = this.CREATE_ELEMENT("div", "card", null);
        this.box.id = `task_${this.id}`;
        this.box.classList.add('card_prod');
        
        this.h5 = this.CREATE_ELEMENT('h5', null, this.title)
        
        this.p = this.CREATE_ELEMENT('p', null, null)
        this.p.innerHTML = `<strong>124</strong><span>En cours</span></p>`;
        
        this.box.append(this.h5)
        this.box.append(this.p)
        
        
    }
    
    
    handle_click (){
        
        this.box.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopImmediatePropagation()
            
            let a = this.CREATE_ELEMENT(`a`, 'text-link', `Democryte`)
            
            a.href = `/project/plan:${this.id}`;
            
            a.click()
            
            return
            postToServer(`/project/id`, JSON.stringify({ id: this.id }), 'POST')
            .then((res)=>{
        
            })
            .catch((err)=>{
        
            })
            
            
            alert(this.id)
        })
    }
    
    
    append_to_section (section){
        section.append(this.box)
    }
    
}

async function getDataFromDB (argument) {
    let fetched = await fetch("/get_project_list")
    let datas = await fetched.json()
    return datas;
}


async function SET_PROD_LIST(){
    let datas  = await getDataFromDB();

    section_container.innerHTML = ``;
    
    for(let data of datas){
       let task = new PROD_ITEM(data);
        task.append_to_section(section_container);
    }
    
    
}

SET_PROD_LIST()






document.querySelector('#add_prod').addEventListener('click', CREATE_NEW_PROD)

async function CREATE_NEW_PROD (e) {
    e.preventDefault();
    
    let value  = form.value;
    let datas = await getDataFromDB();
    let ids = []
    for (let item of datas ){
        ids.push(item.id);
    }
    let sort = ids.sort(function(a, b){
        return b - a;
    })
    
    let highest = sort[0];
    let id = highest + 1;
    
    console.log(datas, ids, sort, highest, id)

    if (value.length >= 1) {
        //datas.push(value);
        postToServer('/addProd', JSON.stringify({title: value, id}), "POST")
        .then((res)=>{
            alert(res)
        })
    }
    
    form.value = '';
    
    SET_PROD_LIST()
};



function postToServer(url, body, method){
    
    return fetch(url, {
        headers : {"Content-type": "application/json;charset=UTF-8" },
        method : "POST",
        body : body
    });

}














