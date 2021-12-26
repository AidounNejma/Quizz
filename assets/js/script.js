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

let number2 = document.getElementById('number2');
//console.log(number2)

let next = document.getElementById('next');
//console.log(next)

let start = document.getElementById('start');
//console.log(start)

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

function firstPage(){ //Cette fonction va donner un visuel au premier chargement de la page
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
        suggestionsInput[i].style.display = 'none';
    }

    next.style.display = "none";

    submit.style.display = "none";
}
window.onload = firstPage(); // j'appelle ma fonction au chargement de la page 

/* --------------------------------------------------------------- */

/* Fonction pour supprimer la première page */

function eraseFirstPage(){ //Cette fonction va enlever le visuel de la premier page (fonction au dessus) au clic de "commencer le test"
    for(let i = 0; i < suggestionsInput.length; i++){
        suggestionsInput[i].style.display = 'inline';
    }
    
    paragraphStart.style.display = 'none';
    next.style.display = "inline";
    start.style.display = "none";
    displayQuizz()
}

start.addEventListener('click', eraseFirstPage);


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
    
    //conditions pour récupérer les datas qui nous intéresse selon le clic de la page précédente
    if (lastPieceUrl == "quizz.html?random") { //On récupère toute la data (ne fonctionne pas encore)
        //console.log(data);
        shuffleArray(data); //je shuffle mon array en faisant appel à la fonction que j'ai créé au dessus
        return data; // je retourne ma data
    }
    
    if (lastPieceUrl == "quizz.html?html") {// On récupère le HTML
        //console.log(data.HTML)
        shuffleArray(data.HTML);
        return data.HTML;
    }
    
    if (lastPieceUrl == "quizz.html?css") { // On récupère le CSS
        //console.log(data.CSS)
        shuffleArray(data.CSS);
        return data.CSS;
    }

    if (lastPieceUrl == "quizz.html?javascript") { // On récupère le Javascript
        //console.log(data.Javascript)
        shuffleArray(data.Javascript);
        return data.Javascript;
    }
}
window.onload = getData(); // j'appelle ma fonction au chargement de la page 
/* --------------------------------------------------------------- */

/* Copie de l'array */

const copyArray = async(data)=>{
    const myData = await getData(data);
    //console.log(myData)
    questionArray.push(...myData); //Je stocke dans mon array vide (questionArray) => myData qui contient mes données du fichier JSON
    return questionArray; //Je retourne questionArray
    //console.log(questionArray);
}

window.onload = copyArray(); // j'appelle ma fonction au chargement de la page 
//console.log(questionArray);

/* --------------------------------------------------------------- */

/* Fonction pour afficher tout ça */
function displayQuizz(){
    
    if(index <= questionArray.length){ /* Si l'index est inf ou égal à la longueur de mon array alors */
        displayQuestion();
        //storeAnswers()
        //recordScore()
    }
    if(index > questionArray.length){ /* Si l'index est sup à la longueur de mon array alors */
        //finalSubmit()
    }

}

next.addEventListener('click', displayQuizz);

/* --------------------------------------------------------------- */

/* Fonction qui va afficher les questions */
number.innerHTML = index;

function displayQuestion(){
    console.log(questionArray);
    /* Incrémenter le nombre de questions */
    index++;
    number.innerHTML = index;
    number2.innerHTML = questionArray.length;

    /* Affectation des valeurs de l'array à mes variables HTML */
    question.innerHTML = questionArray[index].question;
    img.src = questionArray[index].image;

    for(let n = 0; n < 4; n++){
        suggestionsLabel[n].innerHTML = questionArray[index].propositions[n];
        suggestionsLabel[n].setAttribute("for", questionArray[index].propositions[n]);
        suggestionsInput[n].setAttribute("value", questionArray[index].propositions[n]);
        suggestionsInput[n].setAttribute("id", questionArray[index].propositions[n]);
    }
}

/* --------------------------------------------------------------- */

/* Pour incrémenter le score à chaque bonne réponse */
function recordScore(){
    
    if(questionArray[index].réponse == suggestionsInput[index].checked.value){ // Si la réponse stockée dans mon questionArray (la bonne réponse) est égale à la valeur de l'input radio qui est coché alors:
        score++; // on incrémente de 1
    } else { //sinon
        score + 0; // on ajoute 0
    } 
}

/* --------------------------------------------------------------- */

/* Fonction pour enregistrer les réponses dans le local Storage du navigateur */

function storeAnswers(){
    
    if(localStorage.getItem('answers') == null && localStorage.getItem('score') == null){
        localStorage.setItem('answers', '[]');
        localStorage.setItem('score', '[]');
    }

    let new_value = suggestionsInput[index].checked.value;
    let old_value = JSON.parse(localStorage.getItem('answers'));
    old_value.push(new_value);

    localStorage.setItem('answers', JSON.stringify(old_value));

}

/* --------------------------------------------------------------- */

/* Fonction qui s'enclenche lors du dernier submit*/

function finalSubmit(){
    
    /* Permet d'enregistrer le score du joueur dans le local storage */
    let newScore = score;
    let oldScore = JSON.parse(localStorage.getItem('score'));
    oldScore.push(newScore);

    localStorage.setItem('score', JSON.stringify(oldScore));
}