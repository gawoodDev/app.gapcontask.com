import TASK_ITEM from './task_proto.js';
import SELECT_ITEM from './component/select_prod_proto.js';

const id_page = document.querySelector('div#forIDcheck') // null

let section_container = document.querySelector("#affichage");

let select_box = document.querySelector("#select_box");

let oli = null;
async function getData_PROD_FromDB(url) {
    let fetched = await fetch(url);
    let datas = await fetched.json();
    return datas;
}


if (id_page.getAttribute("data-id")) {

    let id = id_page.getAttribute("data-id")

    console.log("unique_prod_datas", id);


    getData_PROD_FromDB(`/unique_prod_datas:${id}`).then((datas) => {

        document.querySelector("#title_prod").innerText = datas.title;

        if (datas.service.length > 0) {
            for (let data of datas.service) {
                let task = new TASK_ITEM(data);
                task.appendTo(section_container);
            }
        }

        getDataFromDB(`/get_project_list`)
        .then((selectes)=> {

            if (selectes.length > 0) {
                let SLCT = new SELECT_ITEM(selectes);
                SLCT.appendTo(select_box);
                SLCT.defaultSelected(datas.ref_key);
            }

        })

    })

}




async function getDataFromDB (url) {
    let fetched = await fetch(url)
    let datas = await fetched.json()
    console.log(datas)
    return datas;
}







function postToServer(url, body) {
    return fetch(url, {
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        method: "POST",
        body: body
    });
}








/***

document.addEventListener("scroll", (e)=>{
isDragging = false;
});
document.addEventListener("scrollend", (e)=>{
isDragging = true;
console.log(isDragging)
});
document.addEventListener("scroll", (e)=>{
e.preventDefault()
Moving = false;
isLeft = false;
isDragging = false;
this.style.transform = `translateX(${ 0 }px)`;
});


**/












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