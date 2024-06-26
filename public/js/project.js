let section_container = document.querySelector(`#affichage`)
console.log('hhhh')
let form = document.querySelector(`#addProdInp`)

let id = 0;


class PROD_ITEM {

   #isFocus = false;

   constructor(data) {

      this.data = data;
      this.title = this.data.title;
      this.id = this.data.project_id ? this.data.project_id : this.data.id;
      this.ref_key = this.data.ref_key;

      this.create_item()
      this.handle_click()
      console.log(data, this)
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

   create_item() {



      this.box = this.CREATE_ELEMENT("div", "card_prod", null);
      this.box.id = `prod_${this.id}`;

      this.h5 = this.CREATE_ELEMENT('h5', null, this.title)
      this.p = this.CREATE_ELEMENT('p', null, null)
      this.p.innerHTML = `<strong>124</strong><span>En cours</span></p>`;
      this.box.append(this.h5)
      this.box.append(this.p)
   }

   handle_click() {

      this.box.addEventListener("click", (e) => {
         e.preventDefault();
         e.stopImmediatePropagation()
         let a = this.CREATE_ELEMENT(`a`, 'text-link', `Democryte`);
         a.href = `/app/project/plan:${this.id}?ref=${this.ref_key}`;


         document.cookie = `p_d=${this.data.ref_key}${this.id}`;
         a.click()
      })
   }

   append_to_section(section) {
      section.append(this.box)
   }

}

async function getDataFromDB() {
   let fetched = await fetch(`/api/projects`)
   let datas = await fetched.json()
   return datas;
}

async function SET_PROD_LIST() {
   let { datas } = await getDataFromDB();
   section_container.innerHTML = ``;
   for (let data of datas) {
      let task = new PROD_ITEM(data);
      task.append_to_section(section_container);
   }
}



SET_PROD_LIST()

document.querySelector('#add_prod').addEventListener('click', CREATE_NEW_PROD)

async function CREATE_NEW_PROD(e) {
   e.preventDefault();

   let title = form.value;

   if (title.length >= 1) {
      postToServer('/api/addProd', JSON.stringify({
         title
      }), "POST")
         .then((res) => {
            if (res.status === 200) return res.json()
         }).then((data) => {


         })
         .catch((err) => console.log(err))
   }

   form.value = '';

   SET_PROD_LIST()
};

function postToServer(url, body, method = "POST") {

   return fetch(url, {
      headers: {
         "Content-type": "application/json;charset=UTF-8"
      },
      method: method,
      body: body
   });

}

try {

   document.querySelector("#addNewTaskBtn").hide()

} catch (e) {
   console.log(e)
}


