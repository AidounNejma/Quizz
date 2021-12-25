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

/* --------------------------------------------------------------- */

/* Fonction qui va faire un tableau aléatoire */
const shuffleArray = (array) =>{
    array.sort((a, b) => 0.5 - Math.random());
}

/* --------------------------------------------------------------- */

/* Fonction pour afficher tout ça */
const displayQuizz = async(data)=>{
    var arrayCopied = await copyArray(data);
    console.log(arrayCopied)
    displayQuestion(arrayCopied);
    //console.log(myData)
}

const copyArray = async(data)=>{
    var myData = await getData(data);
    const promises = [];
    promises.push(myData);
    return promises[0];
}

/* --------------------------------------------------------------- */

/* Fonction qui va afficher les questions */
const displayQuestion = (data) =>{
    eraseFirstPage();

    let numberIncrement = 1; /* Numéro des questions */
    number.innerHTML = numberIncrement;/* On l'attribut à l'endroit du numéro des questions  */
    numberIncrement =+ 1; /* pour incrémenter */
    
    const questionsHTMLString = data.map(questions =>{
        question.innerHTML = questions.question;
        img.src = questions.image;
        for(let n = 0; n < 4; n++){
        suggestionsLabel[n].innerHTML = questions.propositions[n];
        suggestionsInput[n].value = questions.propositions[n];
    }
    })
    
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