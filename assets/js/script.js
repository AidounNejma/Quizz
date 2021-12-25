/* --------------------------------------------------------------- */
/* Création de variable / récupération des élements de ma page QUIZZ */
let img = document.getElementById('img');
//console.log(img);

let question = document.getElementById('question');
//console.log(question)

let suggestionsLabel = document.getElementsByClassName('suggestionsLabel');
//console.log(suggestionsLabel.item(0));

let suggestionsInput = document.getElementsByClassName('suggestionsInput');
//console.log(suggestionsInput)

let number = document.getElementById('number');
//console.log(number)

let next = document.getElementById('next');
//console.log(next)

let title = document.getElementsByClassName('pageTitleChange');
//console.log(title[0])

let paragraphStart = document.getElementById('startParagraph');
//console.log(paragraphStart)

let submit = document.getElementById('submit');
//console.log(submit)
/* --------------------------------------------------------------- */

/* Variables qui vont nous être utiles dans les fonctions */
var index = 0; /* Pour se positionner dans l'index de mon array */
let score = 0; /* Pour incrémenter le score */
let numberIncrement = 0;  // Numéro des questions 
var questionArray = []; // Tableau vide pour copier ma data dedans

/* --------------------------------------------------------------- */

/* Récupération de la variable passée dans l'URL */

var currentUrl = document.location.href;
//console.log(' URL : \n' + currentUrl);
var currentUrl = currentUrl.replace(/\/$/, ""); //Je supprimer le dernier slash de l'url 
lastPieceUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1); // on stocke dans lastPieceUrl uniquement la dernière partie de l'URL qui nous intéresse
//console.log('Fin Url : ' + lastPieceUrl)

/* --------------------------------------------------------------- */

/* A l'arrivée sur la page */

function firstPage(){
    if(lastPieceUrl == "quizz.html?random"){
        title[0].innerHTML = "Aléatoire";
    }
    if (lastPieceUrl == "quizz.html?html") {
        title[0].innerHTML = "HTML";
    }
    if (lastPieceUrl == "quizz.html?css") {
        title[0].innerHTML = "CSS";
    }
    if (lastPieceUrl == "quizz.html?javascript") {
        title[0].innerHTML = "Javascript";
    }

    for(let i = 0; i < suggestionsInput.length; i++){
        suggestionsInput[i].style.display = 'none'
    }

    submit.style.display = "none";
}

function eraseFirstPage(){
    for(let i = 0; i < suggestionsInput.length; i++){
        suggestionsInput[i].style.display = 'inline';
    }
    next.innerHTML = "Suivant";
    paragraphStart.style.display = 'none';
}

window.onload = firstPage();

/* --------------------------------------------------------------- */

/* Fonction qui va faire un tableau aléatoire */
const shuffleArray = (array) =>{
    array.sort((a, b) => 0.5 - Math.random());
}

/* --------------------------------------------------------------- */

/* Appel du fichier JSON  */
const url = 'package.json'; /* Création constante contenant l'url de notre fichier JSON */

const getData = async() => { //Fonction asyncrone pour récupérer les données de mon JSON
    const response = await fetch(url); // fetch de mon url
    const data = await response.json(); // je récupère la reponse de ma promesse et je la mets au format JSONs
    
    if (lastPieceUrl == "quizz.html?random") { //conditions pour récupérer les datas qui nous intéresse selon le clic de la page précédente
        //console.log(data);
        shuffleArray(data);
        return data;
    }
    
    if (lastPieceUrl == "quizz.html?html") {
        //console.log(data.HTML)
        shuffleArray(data.HTML);
        return data.HTML;
    }
    
    if (lastPieceUrl == "quizz.html?css") {
        //console.log(data.CSS)
        shuffleArray(data.CSS);
        return data.CSS;
    }

    if (lastPieceUrl == "quizz.html?javascript") {
        //console.log(data.Javascript)
        shuffleArray(data.Javascript);
        return data.Javascript;
    }
}
window.onload = getData();
/* --------------------------------------------------------------- */

/* Copie de l'array */

const copyArray = async(data)=>{
    const myData = await getData(data);
    //console.log(myData)
    questionArray.push(...myData);
    return questionArray;

    //console.log(questionArray);
}

window.onload = copyArray(); // j'appelle ma fonction au chargement de la page 
console.log(questionArray);

/* --------------------------------------------------------------- */

/* Fonction pour afficher tout ça */
function displayQuizz(){
    displayQuestion();
}

/* --------------------------------------------------------------- */

/* Fonction qui va afficher les questions */
function displayQuestion(){
    console.log(questionArray);
    number.innerHTML = index;
    if(index < questionArray.length){
        index++;
        question.innerHTML = questionArray[index].question;
        img.src = questionArray[index].image;
        for(let n = 0; n < 4; n++){
        suggestionsLabel[n].innerHTML = questionArray[index].propositions[n];
        suggestionsLabel[n].setAttribute("for", questionArray[index].propositions[n]);
        suggestionsInput[n].setAttribute("value", questionArray[index].propositions[n]);
        suggestionsInput[n].setAttribute("id", questionArray[index].propositions[n]);
        }
    }
    
}

next.addEventListener('click', displayQuizz);

/* --------------------------------------------------------------- */


/* Fonction pour enregistrer les données dans le local Storage du navigateur */

/* function storeAnswers(i){
    if(localStorage.getItem('answers') == null){
        localStorage.setItem('answers', '[]');
    }

    let new_value = suggestionsInput[i].value;
    let old_value = JSON.parse(localStorage.getItem('answers'));
    old_value.push(new_value);

    localStorage.setItem('answers', JSON.stringify(old_value));
}

    if(data[i].réponse == suggestionsInput[i].value){
    
    } else {

    } 
 */
/* --------------------------------------------------------------- */