





englob_popUp.querySelectorAll('button').forEach((button) => {
   button.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      let ret = this.getAttribute('data-return')

      if (ret == 'false') {
         englob_popUp.classList.remove('active');
      }

      if (ret === "true") {

         postToServer("/api/deleteProd", JSON.stringify({
            id, ref_key
         }), "DELETE").then((res) => {
            if (res.status === 200) {
               let a = document.createElement("a");
               a.href = "/api/project";
               a.click();
            }
         })
      }

      console.log(ret)
   });

});
select_tasks.addEventListener('click', function (event) {
   event.preventDefault()
   modeme.classList.remove('active');
   this.classList.add('active');
   headOptions.classList.add('active');
   bottom_options.classList.add('active');
   onSelected = true;
   isDragging = false;
   bottom_modProd.classList.remove('active');
});


/*
englob_popUp.querySelector('.popUp_modal').addEventListener('click', (event) => {
   event.preventDefault()
   event.stopPropagation()
   console.log('Stop')

});


englob_popUp.addEventListener('click', (event) => {
   event.preventDefault()
   event.stopPropagation()

   englob_popUp.classList.remove('active');
   console.log('Close')

});


prod_tools.addEventListener('click', (event) => {
   event.preventDefault()
   modeme.classList.toggle('active');
});

modif_elprod.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   bottom_modProd.classList.add('active');
   bottom_modProd_input.focus();
   bottom_modProd_input.value = title_prod.innerText;

});




*/





close_selected.addEventListener('click', function (event) {
   event.preventDefault()
   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');

   onSelected = false;
   isDragging = true;
   list_id = []
   document.querySelectorAll('.card.added').forEach(item => {
      item.classList.remove("added");
      item.setAttribute('state',
         "0");
   });

   show_up.innerHTML = ` 0 tâches sélectionner`
});






delete_prod.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   bottom_modProd.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   englob_popUp.classList.add('active')

   setPopUpContent({
      title: 'Supprimer le projet ?',
      body: `Cette action définitive et irréversible
        supprimera le projet ${title_prod.innerText} y compris les tâches incluse.`
   })


});



bottom_modProd_button.addEventListener('click', function (event) {
   event.preventDefault();

   select_tasks.classList.remove('active');
   headOptions.classList.remove('active');
   bottom_options.classList.remove('active');
   modeme.classList.remove('active');

   onSelected = false;
   isDragging = false;
   list_id = [];

   bottom_modProd.classList.remove('active');
   bottom_modProd_input.blur();
   title_prod.innerText = bottom_modProd_input.value

   postToServer("/api/modifProd", JSON.stringify({
      id: Number(id),
      title: bottom_modProd_input.value
   }), "PUT")
      .then((rem) => {
         bottom_modProd.classList.remove('active');
      })
   bottom_modProd_input.value = '';

});



remove_selected.addEventListener('click', (event) => {
   console.log(onSelected);
   isDragging = false;

   event.preventDefault()
   let listToServer = list_id.map((elem) => {
      return elem.replace("task_",
         "")
   });

   console.log(listToServer, list_id)

   document.querySelectorAll('div.card.added').forEach(item => {
      list_id = list_id.filter((elem) => elem !== item.id);
      show_up.innerHTML = `${list_id.length} tâches sélectionner !`
      item.remove()
   })

   hooks.DELETE_TASK(listToServer)


})

