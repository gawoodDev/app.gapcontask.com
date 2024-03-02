
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
    
    
    defaultSelected(txt){
        
        this.select.value = txt;
        this.select.querySelector(`option[value="${txt}"]`).selected = true;
 
        console.log(this.select, txt)
         
        return
        
        
        
        
    }
}; // end 







export default SELECT_ITEM;



