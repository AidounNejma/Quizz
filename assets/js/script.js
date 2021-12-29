/* --------------------------------------------------------------- */

/* Création de variable / récupération des élements de ma page QUIZZ */

var img = document.getElementById('img'); //l'image du quizz
//console.log(img);

var numberQuestion = document.getElementsByClassName('numberQuestion');
//console.log(numberQuestion);

var question = document.getElementById('question'); //L'endroit des questions
//console.log(question)

var form = document.getElementById('form'); // Je récupère mon formulaire
//console.log(form)

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

var finish = document.getElementById('finish'); // Bouton qui fera office de submit du formulaire pour éviter de refresh la page au submit
//console.log(finish)

var mainContent = document.getElementsByClassName('fakeClass');
//console.log(mainContent[0]);

var displayScoresData = document.getElementById('displayScores');
//console.log(displayScoresData);
/* --------------------------------------------------------------- */

/* Variables qui vont nous être utiles dans les fonctions */

var index = 0; /* Pour se positionner dans l'index de mon array */
number.innerHTML = index; /* J'attribue à l'endroit du numéro de mes questions la variable index */
var score = 0; /* Pour incrémenter le score */
const questionArray = []; // Tableau vide pour copier ma data globale dedans
var globalData = []; //Tableau vide pour copier la data aleatoire de mon fichier JSON
var newName; //va me permettre de stocker le nom du joueur
var valueInput = []; // va me permettre de stocker la valeur des inputs que j'ai sélectionné à chaque fois 
var lastValueInput; // va me permettre de stocker la dernière valeur de l'array valueInput
var arrayNameScore = [];
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
    
    finish.style.display = "none";
    next.style.display = "none";

    sortLocalStorageData();
}
//window.onload = firstPage(); // j'appelle ma fonction au chargement de la page 

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


    newName = inputName.value// j'attribue à ma variable newName la valeur de l'inputName qui contient le nom du joueur
    //console.log(newName);
    displayQuestion(); // Je fais appel à ma fonction displayQuizz au premier clic du bouton commencer 

    displayScoresData.style.display = "none"; // au clic, la div contenant le top 5 des scores disparait
}

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

/* --------------------------------------------------------------- */

/* Copie de l'array */

const copyArray = async(data)=>{
    const myData = await getData(data);
    // console.log(myData)
    questionArray.push(...myData.slice(0, 10)); //Je stocke dans mon array vide (questionArray) => myData qui contient mes données du fichier JSON
    //console.log(questionArray);
    return questionArray; //Je retourne questionArray

}

/* --------------------------------------------------------------- */

/* Fonction pour afficher tout ça */

function displayQuizz(){

    // step 1 : je récupère la réponse de l'utilisateur pour la question en cours dans mon array valueInput
    for(let m = 0; m < suggestionsInput.length; m++){ // boucle pour tous les inputs radio
        if (suggestionsInput[m].type === 'radio' && suggestionsInput[m].checked) {// si l'input est de type radio et qu'il est coché alors
            valueInput.push(suggestionsInput[m].value); //je push la value courante dans mon array value 
            //console.log("array valueInput : " + valueInput)
        }
    }

    /* Récupération de la dernière valeur de mon array value input */
    lastValueInput = valueInput[valueInput.length -1];
    //console.log(lastValueInput);

    recordScore(index); //appel de ma fonction score pour incrémenter

    index++; // J'incrémente mon index
    
    // step 4 : je vérifie si le quizz est terminé
    // step 5.a : si le quizz n'est pas terminé, j'affiche la question suivante
    if(index < questionArray.length){ /* Si l'index est inf ou égal à la longueur de mon array alors */
        
            if(suggestionsInput[0].checked || suggestionsInput[1].checked || suggestionsInput[2].checked || suggestionsInput[3].checked){ // désolé, décidément je n'aime pas les boucles
                displayQuestion(); // j'affiche mes questions
            }else{
                alert('Vous devez renseigner un champs !'); 
            } 
    }
     // step 5.b : si le quizz est terminé, j'affiche le score
    if(index >= questionArray.length){ /* Si l'index est sup à la longueur de mon array alors */
        
        next.style.display = "none";
        finish.style.display = "inline";
    }


}


/* --------------------------------------------------------------- */

/* Fonction qui va afficher les questions */


function displayQuestion(){
    //console.log(questionArray);
    /* Incrémenter le nombre de questions */
    number.innerHTML = index; // J'attribue à l'endroit du numéro des questions mon index
    number2.innerHTML = 10; // J'attribue 10 à la longueur de mon test 

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
function recordScore(index){
    // step 2 : je vérifie si la réponse est correcte pour la question en cours
    if(questionArray[index].reponse == lastValueInput){// Si la réponse stockée dans mon questionArray (la bonne réponse) est égale à la valeur de l'input radio qui est cochée alors:
        // step 3 : j'enregistre le score de la question en cours
        score ++ ; // J'incrémente mon score de 1
    } else { //Sinon
        score + 0; // J'ajoute 0
    } 
    // console.log("score : " + score);
    // console.log("valeur de l'input : " + lastValueInput);
    // console.log("reponse :" + questionArray[index].reponse);
    return score;
}

/* --------------------------------------------------------------- */

/* Fonction pour enregistrer les données dans le local Storage du navigateur */

function storeData(){
    
     /* Initialisation de mon tableau "game" */
    if(localStorage.getItem('name') == null && localStorage.getItem('score') == null){ // si mes tableaux nom et score n'existent pas
        
        localStorage.setItem('name', '[]'); // alors je le créé
        localStorage.setItem('score', '[]'); // alors je le créé
    } 
        let nameArray = JSON.parse(localStorage.getItem('name'));// je récupère au format de tableau mes array
        let scoreArray = JSON.parse(localStorage.getItem('score'));
        //console.log(scoreArray);

        recordDataForLocalStorage(nameArray, scoreArray); // je push ma data dans le local storage
    
}

/* --------------------------------------------------------------- */

/* Push les datas dans le local storage */
function recordDataForLocalStorage(array1, array2){
    //Enregistrement du Nom du joueur dans le local storage
    array1.push(newName); // j'ajoute à ma variable myArray la valeur du premier input (nom du joueur)
    localStorage.setItem('name', JSON.stringify(array1)); // Je le mets dans le local storage 'game' sous forme de string
                    
    //Permet d'enregistrer le score du joueur dans le local storage 
    array2.push(score);
    localStorage.setItem('score', JSON.stringify(array2));
}

/* --------------------------------------------------------------- */

/* Filtrer array s'il a atteint la taille max de 10 */
function sortLocalStorageData(){
    
    if(localStorage.getItem('name') == null && localStorage.getItem('score') == null){ 
        
        dontDislayScores();

    }
    else{

        /* Récupération de mes variables pour accéder au localStorage */
        let nameArray = JSON.parse(localStorage.getItem('name'));
        let scoreArray = JSON.parse(localStorage.getItem('score'));
        
        for (let objectIndex = 0; objectIndex < nameArray.length; objectIndex++) {//boucle pour créer des objets en fonction de ce qu'il y a dans mon localstorage
            nameScore = {
                name: nameArray[objectIndex],// j'ajoute dans mon item name: tous les items du tableau nameArray
                score: scoreArray[objectIndex] // j'ajoute à score tous les items de mon tableau scoreArray
            };
            arrayNameScore.push(nameScore);
            
        }
        /* fonction de tri pour comparer que les scores */
        arrayNameScore.sort(function(a, b) { 
            return b.score - a.score  ||  a.name.localeCompare(b.name);
        });
        
        var sliced = arrayNameScore.slice(0,5);
        //console.log(sliced);
        
        displayScores(sliced); //appel de ma fonction pour display les meilleurs scores
    }
}
/* --------------------------------------------------------------- */
/* Affichage des scores */
function displayScores(array){
    for (let index = 0; index < array.length; index++) { //boucle pour passer dans tout mon array
        let paragraph = document.createElement('p'); // création de balises p

        paragraph.innerHTML += array[index].name + " : " + array[index].score;// dans chaque innerHtml de mes paragraphes, je leur mets les données de mon array

        displayScoresData.appendChild(paragraph);// je mets chaque p dans ma div
    }
}

function dontDislayScores(){
    let paragraph2 = document.createElement('p');// je créé un élément p

    paragraph2.innerHTML += "Aucun score n'est enregistré dans la base de données.";
    
    displayScoresData.appendChild(paragraph2);// je mets mon paragraphe dans ma div
}
/* --------------------------------------------------------------- */

/* Affichage des résultats */

/* Fonction qui va afficher mes résultats */
const showMyResults = (index) => {
    
    title[0].innerHTML = "Résultats du "; // dans mon titre je mets "Résultats du"
    numberQuestion[0].innerHTML = "Note : " + score + "/10";
    mainContent[0].classList.toggle('content'); //on modifie la class de la div en 'content' pour qu'elle soit centrée
    
    index = 0; // j'initialise mon index à 0

    questionArray.forEach(data => {

        /* Création de mes éléments HTML */
        let resultsDiv = document.createElement('div'); // div qui va contenir tous nos éléments
        resultsDiv.className = "resultsDiv";

        let resultsNumber = document.createElement('p'); //on créé un élément p pour contenir nos number
        resultsNumber.className = "number";

        let resultsImage = document.createElement('img'); //on créé un élément img pour contenir nos images
        resultsImage.className = "resultsImg";
        
        let resultsPropositions;

        let resultsQuestion = document.createElement('h4'); // on créé un élément h4 pour contenir les questions
        resultsQuestion.className = "resultsQuestion";

        let containerUl = document.createElement('ul'); // on créé un élément ul pour contenir nos li
        containerUl.className = "containerUl";

        let resultsAnecdote = document.createElement('p'); //on créé un élément p pour contenir l'anecdote/l'explication de la réponse du quizz
        resultsAnecdote.className = "resultsAnecdote";
        
    

        for(let i = 0; i < data.propositions.length; i++){ // boucle for pour aller dans la longueur de mon tableau data.propositions
            
            resultsPropositions = document.createElement('li'); // on créé un élément li qui va contenir les propositions
            resultsPropositions.className = "resultsPropositions";
            
            if(valueInput[index] == data.reponse){
                resultsPropositions.classList.add("green");
            }
            else{
                resultsPropositions.classList.add("red");
            }
                
            resultsPropositions.innerHTML += data.propositions[i];
            
            console.log(valueInput[index]);
            console.log(data.reponse);

            
            //console.log(resultsPropositions);
            containerUl.appendChild(resultsPropositions);// dans mon ul j'ajoute les éléments li qui va contenir mes li
            
        } 
        
        
        
        index++; // j'incrémente mon index de 1 à chaque affichage de question
        resultsNumber.innerHTML = "Question n°" + index; // j'ajoute le numéro de la question
        resultsImage.src = data.imgAnswer; // dans la source de ma balise img je mets le lien vers mon image
        resultsQuestion.innerHTML = data.question; // dans mon h4 je mets ma question
        resultsAnecdote.innerHTML = data.anecdote; // dans mon paragraphe je mets l'anecdote liée à la question
        

        mainContent[0].appendChild(resultsDiv);// dans ma div mainContent, j'ajoute la div qui va contenir chaque question
        resultsDiv.appendChild(resultsNumber); // dans ma div content j'ajoute le numéro des questions
        resultsDiv.appendChild(resultsImage); // dans ma div content j'ajoute l'élément img qui va contenir l'image
        resultsDiv.appendChild(resultsQuestion); // dans ma div content j'ajoute l'élément h4 qui va contenir la question
        resultsDiv.appendChild(containerUl); // dans ma div content j'ajoute l'élément ul qui va contenir mon ul
        resultsDiv.appendChild(resultsAnecdote);// dans ma div content j'ajoute l'élément p qui va contenir mon anecdote

        
        });
        
    //})

}

/* --------------------------------------------------------------- */

/* Fonction qui va supprimer l'affichage du quizz */
function eraseMyQuizz(){

    img.style.display = "none";
    question.style.display = "none";
    form.style.display = "none";
}

/* --------------------------------------------------------------- */

/* Fonction qui s'enclenche lors du dernier submit*/

function finalSubmit(index){

    storeData();// au dernier submit => Je stocke ma data dans le local storage
    eraseMyQuizz(); // appel de ma fonction qui va supprimer l'affichage du quizz
    showMyResults(index); // appel de ma fonction qui va afficher mes quizz

}

/* J'ai regroupé tous mes addEventListeners au même endroit et par ordre chronologique */
window.addEventListener('load', async function () { 
    await firstPage();
    await copyArray();
    start.addEventListener('click', eraseFirstPage); // Au clic du bouton commencer le test, la "première page" s'efface pour laisser place au test
    next.addEventListener('click', displayQuizz); // fonction displayQuizz qui se déclenche à chaque clic
    finish.addEventListener('click', finalSubmit); // fonction finalSubmit qui se déclenchera au clic
});