const formEl = document.getElementById("form");
const inputEl = document.getElementById('input');
let page = 1;
const results = document.getElementById("results")
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
const buttonEl = document.getElementById("button");
buttonEl.style.display = "none"


formEl.addEventListener('submit', (event) => {
event.preventDefault();
page = 1;
results.innerHTML = "";
fetchImages();
buttonEl.style.display = "block"
})

buttonEl.addEventListener('click', (event) => {
event.preventDefault();
page++
fetchImages();
})

async function fetchImages() {
const inputData = inputEl.value

const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

if(!inputData.trim().length) {
    alert("please add search tern")
    return; //exit from the function
}

const response = await fetch(url)
const data = await response.json();

for(let item of data.results){
const cardEl = document.createElement('div');
cardEl.classList.add('card');

const imageEl = document.createElement('img');
imageEl.classList.add('image');
imageEl.setAttribute('src', item.urls.regular);

const aEl = document.createElement('a');
aEl.classList.add('description');
aEl.innerText = item.alt_description;
aEl.setAttribute("href", item.links.html);
aEl.setAttribute("target", "_blank");


cardEl.append(imageEl);
cardEl.append(aEl);
results.append(cardEl);


}

}