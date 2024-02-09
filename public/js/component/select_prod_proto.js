
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
            elem.innerText = text;
        }
        return elem;
    }
    
    createSelect(){
        this.select = this.createElement(`select`,'form-select')
        this.select.setAttribute(`name`,`select`)
        this.data.forEach((data)=>{
            let option = this.createElement('option', null, data.title );
            option.value = data.ref_key;
            this.select.append(option);
        });
    }
    
    appendTo(section){
        section.append(this.select);
    }
}; // end 


let select_box = document.querySelector("#select_box");

async function getDataFromDB (url) {
    let fetched = await fetch(url)
    let datas = await fetched.json()
    return datas;
}

getDataFromDB(`/get_project_list`).then((datas)=>{
    
    if (datas.length  > 0) {
        let task = new SELECT_ITEM(datas);
        task.appendTo(select_box);
    }
    else{
        alert('pppppPas de projet pour linstant.');
    }
})  

export default SELECT_ITEM;



