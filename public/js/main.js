import TASK_ITEM from './task_proto.js';
import SELECT_ITEM from './component/select_prod_proto.js';

let section_container = document.querySelector("#affichage");


async function getData_PROD_FromDB (url) {
    let fetched = await fetch(`/getDatas`)
    let datas = await fetched.json()
    return datas;
}


getData_PROD_FromDB().then((datas)=> {

    if (datas.length > 0) {
        for (let data of datas) {
            let task = new TASK_ITEM(data);
            task.appendTo(section_container);
        };
    } else {}

});




let select_box = document.querySelector("#select_box");

async function getDataFromDB (url) {
    let fetched = await fetch(url)
    let datas = await fetched.json()
    console.log(datas)
    return datas;
}


let datas = getDataFromDB(`/get_project_list`)
    .then((datas)=>{
        
    if (datas.length  > 0) {
        let task = new SELECT_ITEM(datas);
        task.appendTo(select_box);
    }
    
})



window.addEventListener("DOMContentLoaded", (e)=> {
    
    
    
    
})

