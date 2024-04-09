const incrementor = document.querySelector("#incrementor");
let i = 0;
function INCREMENT(e) {
    i++;
    incrementor.querySelector("span").innerText = i.toString();
}
incrementor.addEventListener("click", INCREMENT);
