/* --------------------------------------------------------------- */
/* Création de variable / récupération des élements de ma page QUIZZ */
var img = document.getElementById('img'); //l'image du quizz
//console.log(img);

var question = document.getElementById('question'); //L'endroit des questions
//console.log(question)

var inputName = document.getElementById('inputText'); // L'input pour entrer son nom avant de commencer le test
//console.log(inputName);

var divAnswers = document.getElementsByClassName('answers'); // les div contenant mes inputs+label
//console.log(divAnswers)

var suggestionsLabel = document.getElementsByClassName('suggestionsLabel'); // Le label des input du formulaire
//console.log(suggestionsLabel.item(0));

var suggestionsInput = document.getElementsByClassName('suggestionsInput'); // Les inputs radios de mon formulaire
//console.log(suggestionsInput)

var number = document.getElementById('number'); // Le premier chiffre pour les questions (Question n°chiffre/15)
//console.log(number)

var number2 = document.getElementById('number2'); // Le deuxième chiffre pour les questions (Question n°0/chiffre)
//console.log(number2)

var next = document.getElementById('next'); // Bouton suivant
//console.log(next)

var start = document.getElementById('start'); // Bouton commencer la partie
//console.log(start)

var title = document.getElementsByClassName('pageTitleChange'); // Titre de la page (ex: QUIZZ HTML, QUIZZ CSS...etc)
//console.log(title[0])

var paragraphStart = document.getElementById('startParagraph'); // Paragraphe avant le début du test, disparait en cliquant sur commencer
//console.log(paragraphStart)

var submit = document.getElementById('submit'); // Bouton submit du formulaire
//console.log(submit)

/* --------------------------------------------------------------- */

/* Variables qui vont nous être utiles dans les fonctions */

var index = 0; /* Pour se positionner dans l'index de mon array */
number.innerHTML = index; /* J'attribue à l'endroit du numéro de mes questions la variable index */
var score = 0; /* Pour incrémenter le score */
const questionArray = []; // Tableau vide pour copier ma data dedans
const globalData = []; //Tableau vide pour copier la data général de mon fichier JSON

/* --------------------------------------------------------------- */

/* Récupération de la variable passée dans l'URL */

var currentUrl = document.location.href;
//console.log(' URL : \n' + currentUrl);
var currentUrl = currentUrl.replace(/\/$/, ""); //Je supprime le dernier slash de l'url 
lastPieceUrl = currentUrl.substring(currentUrl.lastIndexOf("/") + 1); // je stocke dans lastPieceUrl uniquement la dernière partie de l'URL qui m'intéresse
//console.log('Fin Url : ' + lastPieceUrl)

/* --------------------------------------------------------------- */

/* A l'arrivée sur la page */

function firstPage(){ //Cette fonction va donner un visuel au premier chargement de la page
    if(lastPieceUrl == "quizz.html?random"){
        title[0].innerHTML = "Aléatoire";
        img.src = "assets/img/arrows-pointing-randomly-with-copy-space.jpg";
    }
    if (lastPieceUrl == "quizz.html?html") {
        title[0].innerHTML = "HTML";
        img.src = "assets/img/html.jpg";
    }
    if (lastPieceUrl == "quizz.html?css") {
        title[0].innerHTML = "CSS";
        img.src = "assets/img/css.jpg";
    }
    if (lastPieceUrl == "quizz.html?javascript") {
        title[0].innerHTML = "Javascript";
        img.src = "assets/img/javascript.jpg";
    }

    for(let i = 0; i < divAnswers.length; i++){
        divAnswers[i].style.display = 'none';
    }
    
    next.style.display = "none";

    submit.style.display = "none";
}
window.onload = firstPage(); // j'appelle ma fonction au chargement de la page 

/* --------------------------------------------------------------- */

/* Fonction pour supprimer la première page */

function eraseFirstPage(){ //Cette fonction va enlever le visuel de la première page (fonction au dessus) au clic de "commencer le test"
    
    for(let i = 0; i < divAnswers.length; i++){
        divAnswers[i].style.display = 'block';
    }
    inputName. style.display = "none";
    paragraphStart.style.display = 'none';
    next.style.display = "inline";
    start.style.display = "none";



    displayQuizz(); // Je fais appel à ma fonction displayQuizz au premier clic du bouton commencer 
}

start.addEventListener('click', eraseFirstPage); // Au clic du bouton commencer le test, la "première page" s'efface pour laisser place au test


/* --------------------------------------------------------------- */

/* Fonction qui va générer un tableau aléatoire */

const shuffleArray = (array) =>{
    array.sort((a, b) => 0.5 - Math.random());
}

/* --------------------------------------------------------------- */

/* Appel du fichier JSON  */

const url = 'package.json'; /* Création constante contenant l'url de notre fichier JSON */

const getData = async() => { //Fonction asyncrone pour récupérer les données de mon JSON
    const response = await fetch(url); // fetch de mon url
    const data = await response.json(); // Je récupère la reponse de ma promesse et je la mets au format JSON
    
    //conditions pour récupérer les datas qui m'intéresse selon le clic de la page précédente
    if (lastPieceUrl == "quizz.html?random") { //Je récupère toute la data
        //console.log(data)
        globalData = data.HTML.concat(data.CSS, data.Javascript);// J'utilise la fonction concat pour concaténer les valeurs des 3 tableaux dans un seul
        //console.log(globalData)
        shuffleArray(globalData); //je shuffle mon array en faisant appel à la fonction que j'ai créé au dessus
        return globalData; // je retourne ma data
    }
    
    if (lastPieceUrl == "quizz.html?html") {// Je récupère le HTML
        //console.log(data.HTML)
        shuffleArray(data.HTML);
        return data.HTML;
    }
    
    if (lastPieceUrl == "quizz.html?css") { // Je récupère le CSS
        //console.log(data.CSS)
        shuffleArray(data.CSS);
        return data.CSS;
    }

    if (lastPieceUrl == "quizz.html?javascript") { // Je récupère le Javascript
        //console.log(data.Javascript)
        shuffleArray(data.Javascript);
        return data.Javascript;
    }
}
window.onload = getData(); // J'appelle ma fonction au chargement de la page 

/* --------------------------------------------------------------- */

/* Copie de l'array */

const copyArray = async(data)=>{
    const myData = await getData(data);
    //console.log(myData)
    questionArray.push(...myData); //Je stocke dans mon array vide (questionArray) => myData qui contient mes données du fichier JSON
    return questionArray; //Je retourne questionArray
    //console.log(questionArray);
}

window.onload = copyArray(); // J'appelle ma fonction au chargement de la page 
//console.log(questionArray);

/* --------------------------------------------------------------- */

/* Fonction pour afficher tout ça */

function displayQuizz(){
    
    if(index <= questionArray.length){ /* Si l'index est inf ou égal à la longueur de mon array alors */
        index++; // J'incrémente mon index
        displayQuestion();
        //storeAnswers()
        //recordScore()
    }
    if(index > questionArray.length){ /* Si l'index est sup à la longueur de mon array alors */
        //finalSubmit()
    }

}

next.addEventListener('click', displayQuizz); // fonction displayQuizz qui se déclenche à chaque clic

/* --------------------------------------------------------------- */

/* Fonction qui va afficher les questions */


function displayQuestion(){
    console.log(questionArray);
    /* Incrémenter le nombre de questions */
    number.innerHTML = index; // J'attribue à l'endroit du numéro des questions mon index
    number2.innerHTML = questionArray.length; // J'attribue la taille de l'array (15)

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
    
    if(questionArray[index].reponse == suggestionsInput[index].checked.value){ // Si la réponse stockée dans mon questionArray (la bonne réponse) est égale à la valeur de l'input radio qui est cochée alors:
        score++; // J'incrémente de 1
    } else { //Sinon
        score + 0; // J'ajoute 0
    } 
}

/* --------------------------------------------------------------- */

/* Fonction pour enregistrer les données dans le local Storage du navigateur */

/* initialisation de mon tableau "game" */
if(localStorage.getItem('game') == null){ // si mon tableau n'existe pas
    localStorage.setItem('game', '[]'); // alors je le créé
}

let myArray = JSON.parse(localStorage.getItem('game')); // Je stocke dans une variable les données entrées dans le local storage 'game'
//console.log(myArray)

function storeData(){

    /* Enregistrement du Nom du joueur */
    let newName = inputText.value; // variable contenant la valeur du premier input (nom du joueur)
    myArray.push(newName); // j'ajoute à ma variable myArray la valeur du premier input (nom du joueur)
    localStorage.setItem('game', JSON.stringify(myArray)); // Je le mets dans le local storage 'game'

    /* Enregistrement des réponses */
    let newAnswer = suggestionsInput[index].checked.value;
    myArray.push(newAnswer);
    localStorage.setItem('game', JSON.stringify(myArray));

}

/* --------------------------------------------------------------- */

/* Fonction qui s'enclenche lors du dernier submit*/

function finalSubmit(){
    
    /* Permet d'enregistrer le score du joueur dans le local storage */
    let newScore = score;
    myArray.push(newScore);
    localStorage.setItem('score', JSON.stringify(myArray));

    /* Redirection vers la page resultats */
    document.location.href="results.html";

}
/* --------------------------------------------------------------- */

/* Affichage des résultats */

/* Fonction qui va comparer les resultats du local storage à mes données du fichier JSON */

function compareDatas(){

}