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
        console.log(data)
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
        this.box.id = `prod_${this.id}`;
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
            
            alert(this.id)
            let a = this.CREATE_ELEMENT(`a`, 'text-link', `Democryte`);
            
            
            a.href = `/project/plan`;
            document.cookie = `p_d=${this.data.ref_key}${this.id}`;
            
            
            a.click()
            
            return
            postToServer(`/project/id`, JSON.stringify({ id: this.id }), 'POST')
            .then((res)=>{
        
            })
            .catch((err)=>{
        
            })
            
            
            
        })
    }
    
    
    append_to_section (section){
        section.append(this.box)
    }
    
}

async function getDataFromDB () {
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


function getHighestID () {
    
    return  Array.from(document.querySelectorAll(".card_prod"))
    .map((item)=>{
        if(!item.id) return undefined
        return Number(item.id.split("_")[1]);
    })
    .filter((item)=> item !== undefined)
    .sort((a, b)=>{
        return b - a
    })[0];
    
}



document.querySelector('#add_prod').addEventListener('click', CREATE_NEW_PROD)

async function CREATE_NEW_PROD (e) {
    e.preventDefault();
    
    let title = form.value;
    let highest = getHighestID();
    let id = highest + 1;
    
    console.log(highest, id)

    if (title.length >= 1) {
        //datas.push(value);
        postToServer('/addProd', JSON.stringify({title, id}), "POST")
        .then((res)=>{
            alert(res)
        })
        
        let task = new PROD_ITEM({title, id});
        task.append_to_section(section_container);
    }
    
    form.value = '';
    
    //SET_PROD_LIST()
};



function postToServer(url, body, method){
    
    return fetch(url, {
        headers : {"Content-type": "application/json;charset=UTF-8" },
        method : "POST",
        body : body
    });

}














