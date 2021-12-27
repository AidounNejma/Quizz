

/* Je voulais teste ça pour enregistrer mes data dans le local storage */

  /* Initialisation de mon tableau "game" */
  if(localStorage.getItem('game') == null){ // si mon tableau n'existe pas
    localStorage.setItem('game', '[]'); // alors je le créé

    let myArray = JSON.parse(localStorage.getItem('game'));
    /* Enregistrement du Nom du joueur dans le local storage*/
    myArray.push(newName); // j'ajoute à ma variable myArray la valeur du premier input (nom du joueur)
    localStorage.setItem('game', JSON.stringify(myArray)); // Je le mets dans le local storage 'game' sous forme de string
        
    /* Permet d'enregistrer le score du joueur dans le local storage */
    myArray.push(score);
    localStorage.setItem('game', JSON.stringify(myArray));
}
else{
    myArray = JSON.parse(localStorage.getItem('game'));
    let numberArray = myArray.filter(item => typeof item === 'number');// je filtre le tableau pour ne récupérer que les nombres
    let minValue = Math.min(...numberArray); // je stocke dans une variable le nombre le plus petit
    if(score >= minValue){
        
        //Enregistrement du Nom du joueur dans le local storage
        myArray.push(newName); // j'ajoute à ma variable myArray la valeur du premier input (nom du joueur)
        localStorage.setItem('game', JSON.stringify(myArray)); // Je le mets dans le local storage 'game' sous forme de string
                
        //Permet d'enregistrer le score du joueur dans le local storage 
        myArray.push(score);
        localStorage.setItem('game', JSON.stringify(myArray));
    }
    else{
        //return
    }
} 
