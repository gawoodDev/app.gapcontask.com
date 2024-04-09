

async function getIssuesList(url) {
   let response = await fetch("/admin/api/errors");
   let datas = response.json();
   return datas
}

async function SetContentList() {
   try {
      let datas = await getIssuesList();
      if(datas.length < 1) return true
      for (let item of datas) {
         MakeComponent(item)
      }
   } catch (err) {

   }
}

function MakeComponent(error) {
   let box = document.createElement("div");
   box.classList.add("box_item_error");
   box.innerHTML = `
      <div class="error_type">
         <div>${error.type}</div>
            <div>main.js - 67:89</div>
      </div>
      <div class="error_message">
         <h5>${error.message}</h5>
                </div>
      <div class="error_path">
         <p>/app/routes/taskRoutes.js</p>
      </div>
      `;
   document.querySelector("section.box").append(box);

}

SetContentList()























