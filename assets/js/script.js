/* Création de variable / récupération des élements de ma page HTML */
let img = document.getElementById('img');
//console.log(img);

let question = document.getElementById('question');
//console.log(question)

let suggestionsLabel = document.getElementsByClassName('suggestionsLabel');
//console.log(suggestionsLabel.item(0));

let suggestionsInput = document.getElementsByClassName('suggestionsInput');
console.log(suggestionsInput)

let number = document.getElementById('number');
//console.log(number)

let next = document.getElementById('next');
//console.log(next)

/* Appel du fichier JSON */
fetch('package.json')
                .then(res => res.json())
                .then(data => {
                    console.log(data.HTML)
                    next.addEventListener('click', changeQuestion(data.HTML));
                })
                .catch(err => console.error(err));




/* Fonction de generation des question */
function changeQuestion(data){
    for(let i = 0; i < 10; i++){
        for(let m = 0; m < 10; m++){
            number.innerHTML = data[m].id;
            question.innerHTML = data[m].question;
            img.src = data[m].image;
        }
        
        for(let n = 0; n < 10; n++){
            suggestionsLabel.item(i).innerHTML = data[n].propositions[i];
            suggestionsInput[i].value = data[n].propositions[n];
        }
    }
    
}

