import TASK_ITEM from './task_proto.js';
import SELECT_ITEM from './component/select_prod_proto.js';
import moment from './minified/moment.js'
window.addEventListener("DOMContentLoaded", (e) => {

   let section_container = document.querySelector("#affichage");
   const title_section = document.querySelector("#title_section");


   let FOR_PASSED = []
   let FOR_TODAY = []
   let FOR_TOMOROW = []
   let FOR_NEXT = []
   let datas = []

   LOAD_CONTENT();

   async function getDataFromDB(url) {
      let fetched = await fetch(url)
      let datas = await fetched.json();
      return datas;
   }

   async function getData_PROD_FromDB(url) {
      let fetched = await fetch(`/api/tasks`)
      let datas = await fetched.json()
      console.log(datas)
      return datas;
   };

   async function LOAD_CONTENT() {
      try {
         datas = await getData_PROD_FromDB();

         let todayIs = Number(moment().format("YYYYMMDD"))
         let dateObject = moment().toObject()

         console.log(datas)


         datas.forEach((task) => {
            let taskFullDate = Number(moment(task.finish_at).format("YYYYMMDD"));

            let taskObject = moment(task.finish_at).toObject();



            if (taskObject.years === dateObject.years) {

               if (taskObject.months === dateObject.months) {


                  if (taskObject.date === dateObject.date) {
                     FOR_TODAY.push(task)
                  }
                  else if (taskObject.date > dateObject.date) {

                     if (taskObject.date === (dateObject.date + 1)) {
                        FOR_TOMOROW.push(task);
                        return
                     }

                     FOR_NEXT.push(task)
                  }
                  else if (taskObject.date < dateObject.date) {
                     FOR_PASSED.push(task)
                  }

               }
               else if (taskObject.months > dateObject.months) {
                  FOR_NEXT.push(task)
               }
               else if (taskObject.months < dateObject.months) {
                  FOR_PASSED.push(task)
               }

            }
            else if (taskObject.years > dateObject.years) {
               FOR_NEXT.push(task)
            }
            else if (taskObject.years < dateObject.years) {
               FOR_PASSED.push(task)
            }

         });



         console.log("FOR_PASSED", FOR_PASSED, "FOR_NEXT", FOR_NEXT, "FOR_TOMOROW", FOR_TOMOROW, "FOR_TODAY", FOR_TODAY)


         DOM_APPEND(datas);

      }
      catch (e) {
         console.log(e)
      }
   }

   function DOM_APPEND(datas) {
      try {
         section_container.innerHTML = "";
         if (datas.length > 0) {
            for (let data of datas) {
               let task = new TASK_ITEM(data);
               task.appendTo(section_container);
            };

         } else { }
      }
      catch (e) {
         console.log("Erreur ", e)
      }

   }





   try {
      getDataFromDB(`/api/projects`).then(({ datas }) => {
         if (datas.length > 0) {
            let select_box = document.querySelector("form.addTask div#select_box");

            let SLCT = new SELECT_ITEM(datas);

            console.log(select_box)
            SLCT.appendTo(select_box);
            //SLCT.defaultSelected("0B_");
         }
      })
   } catch (e) {
      console.log("Erreur ", err)
   }





   Array.from(document.querySelectorAll("#filterByDate button")).forEach((button) => {
      button.onclick = function (e) {

         let action = Number(button.getAttribute("data-action"))
         title_section.innerText = button.innerText;

         switch (action) {
            case 0:

               DOM_APPEND(datas)
               break
            case 1:

               DOM_APPEND(FOR_PASSED)

               break
            case 2:


               DOM_APPEND(FOR_TODAY)
               break
            case 3:

               DOM_APPEND(FOR_TOMOROW)

               break
            case 4:

               DOM_APPEND(FOR_NEXT)

               break
            case 5:

               DOM_APPEND([])

               break
            case 6:

               DOM_APPEND([])

               break
         }

      }

   })
})












/*

window.addEventListener("DOMContentLoaded", (e)=> {
   
   
let showUpModal = document.querySelector('#showUpModal')
let modal = new UPER({ screen: 'screen', content: 'addTask', type: 'form' });
const pannelAddTask = document.querySelector(".pannelAddTask")

modal.CONTENT_TYPE("form")

modal.SET_CONTENT(pannelAddTask.querySelector("form").innerHTML)
modal.APPEND_TO(document.body)
modal.TRIGER(showUpModal, null);
//pannelAddTask.remove()
   
    
    
    
    
})
*/
