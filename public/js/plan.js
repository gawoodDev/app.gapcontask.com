import TASK_ITEM from './task_proto.js';
import SELECT_ITEM from './component/select_prod_proto.js';


let section_container = document.querySelector("#affichage");
let select_box = document.querySelector("#select_box");






const id_page = document.querySelector('header').id;


async function getDataFromDB (url) {
    let fetched = await fetch(url)
    let datas = await fetched.json()
    return datas;
}



getDataFromDB(`/plan:${id_page}`).then((datas)=>{
    console.log(datas.service)
    
    if (datas.service.length  > 0) {
        for(let data of datas.service){
        let task = new TASK_ITEM(data);
        task.append_to_section(section_container);
        }
    }
    else{
        alert('Pas de projet pour linstant.')
    }
    
})  



let alter_prod_box = $(`.alter_prod_box`)

$(`#modProd`).on(`click`,()=>{
    
    alter_prod_box.toggleClass(`open`)
    
    
})



document.querySelectorAll(`.alter_prod_box button`).forEach((item)=>{
        
        
        
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            
            let id = e.target.id
            
            
            alert(id)
            
            
            if (id === `deleteProd`) {
                
                postToServer('/deleteProd', JSON.stringify({ id: id_page }))
                .then((res)=>{
                    
                })
                .catch((err)=>{
                    
                })
                
            }
            
            if(id === `modifProd`) {
                postToServer('/modifProd', JSON.stringify({ id: id_page }))
                .then((res)=>{
                    
                })
                .catch((err)=>{
                    
                })
            }
            
            
            
            
        })
        
        
        
    })
    




function postToServer(url, body){
    
    return fetch(url, {
        headers : {"Content-type": "application/json;charset=UTF-8" },
        method : "POST",
        body : body
    })

}







/*


class SELECT_ITEM {
    
    
    constructor(data){
        this.data = data || [];
        
        this.createSelect();
        
        
    }
    
    createElement (type, className, text){
        
        let elem = document.createElement(type);
        
        if (className) {
            elem.classList.add(className)
        }
        
        if (text) {
            elem.innerText = text
        }
        return elem
    }
    
    createSelect(){
        
        this.select = this.createElement(`select`,'form-select')
        
        this.data.forEach((data)=>{
            let option = this.createElement('option', null, data.title );
            option.value = data.ref_ket;
            
            this.select.append(option);
        })
        
        
    }
    
    appendTo(section){
        section.append(this.select);
    }
    
    
}





getDataFromDB(`/get_project_list`).then((datas)=>{
    console.log(datas)
    
    
    if (datas.length  > 0) {
        
        
        let task = new SELECT_ITEM(datas);
        task.appendTo(select_box);
         
    }
    else{
        alert('Pas de projet pour linstant.')
    }
    
})  

*/









