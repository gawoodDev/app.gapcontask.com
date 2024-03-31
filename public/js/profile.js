import UPER from './minified/uper.js';

let showUpModal = document.querySelector('#showUpModal')
let modal = new UPER({ screen: 'screen', content: 'updateProfil' });



modal.SET_CONTENT(`
    <div>
        <h3>Modifier le profil</h3>
    </div>
    <form id="updateProfilForm" class="" action="/updateuser" method="POST" enctype="multipart/form-data" accept-charset="utf-8">
        <div class="profilArea">
            <img id="profilChoosed" src=" ">
        </div>
		<input style="display: none" type="file"  name="photo" multiple accept=".jpg, .png, .jpeg, .svg"  id="photo">

        <button type="button" id="clickAddPhoto">
            <i>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z"></path>
                <path d="M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                <path d="M28 26h-24v-4l7-12 8 10h2l7-6z"></path>
                </svg>
            </i>
            <small> <b>+</b>  Choisir une photo de profil </small>
        </button>
        <div id="newUsernameBox">
            <label for="">Modifier le nom :</label>
            <input type="text" name="username" placeholder="Username " required id="usernameField">
        </div>
        <button type="submit" > Envoyer </button>
    </form>
    
`);
modal.APPEND_TO(document.body)
modal.TRIGER(showUpModal, null);



function START(e) {

	let photoField = document.querySelector('#photo'),
		clickAddPhoto = document.querySelector('#clickAddPhoto');


	clickAddPhoto.addEventListener('click', function (e) {
		e.preventDefault();
		photoField.click()
		console.log("clicked")
	})


	photoField.addEventListener('change', function (e) {
		e.preventDefault();

		let profil = document.querySelector('#profilChoosed'),
			file = e.target.files[0],
			url = null,
			reader = new FileReader()

		reader.onerror = (err) => {
			console.log(err)
		}

		reader.onload = (e) => {
			url = url === null ? e.target.result : url;
		}

		reader.onloadend = function () {
			profil.src = url;
			url = null;
		}

		reader.readAsDataURL(file)

	})

}


START()

try{

document.querySelector("#addNewTaskBtn").hide()

} catch(e){
   console.log(e)
}

