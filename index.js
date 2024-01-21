const express = require('express');
const app = express();
const port = 3000;

const dataEn = require('./data-en');
const dataEs = require('./data-es');

app.get('/', (req, res) => {
    res.send('Funcionando');
});

let number;

//Funciones
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getQuoteId(data, id, res) {
    const quote = data.find(element => element.id === id);

    if (quote) {
        res.send(quote); // Enviar el objeto encontrado como respuesta
    } else {
        res.status(404).send('Quote not found'); // Enviar un mensaje de error si el ID no se encuentra
    }
}

function getRandomNoRepeat(data, res){ 
    const numRandom = getRandom(0, data.length - 1); //generamos un número aleatorio entre las frases existentes
    //console.log(`El valor de number es: ${number}`);
    //console.log(`El número random es: ${numRandom}`);
    if(numRandom === number){ //Si el número aleatorio es igual que el number (Número que iterará). Como de primeras será falso porque su valor es undefined
        //console.log('Hola'); //Al coincidir ambos números, es decir, que la siguiente frase aleatoria sea la misma que teníamos mostrando.
        if(numRandom === 0){  //Si el valor es 0, se le asignará uno más para que no sea repetido.
            res.send(data[numRandom + 1]);
        } else if(numRandom === data.length - 1){ //Si el valor es el último de la lista, se le quitará un valor para que no se repita.
            res.send(data[numRandom - 1]);
        } else{ //Si es cualquier otro número diferente a 0 o el número final, se le puede aumentar un dígito para que no se repita
            res.send(data[numRandom + 1]);
        }
    } else{ //Esto hará que ese número iterario se le asigna el mismo valor que tiene el número aleatorio.
        number = numRandom;
        res.send(data[numRandom]); //Mostramos los datos del número aleatorio.
    }
}

function language(lang, res, value, id){
    if(value === 0){
        if(lang === 'en'){
            res.send(dataEn);
        } else if(lang === 'es'){
            res.send(dataEs);
        } else{
            res.send('Error, please select a valid language');
        }
    } else if(value === 1){
        if(lang === 'en'){
            res.send(dataEn[0]);
        } else if(lang === 'es'){
            res.send(dataEs[0]);
        } else{
            res.send('Error, please select a valid language');
        }
    } else if(value === 2){
        if(lang === 'en'){
            getRandomNoRepeat(dataEn, res);
        } else if(lang === 'es'){
            getRandomNoRepeat(dataEs, res);
        } else{
            res.send('Error, please select a valid language');
        }
    } else if(value === 3){
        if(lang === 'en'){
            getQuoteId(dataEn, id, res);
        } else if(lang === 'es'){
            getQuoteId(dataEs, id, res);
        } else{
            res.send('Error, please select a valid language');
        }
    } else{
        res.send('Error, define el value válido');
    }
}

app.get('/quotes/:lang', (req, res) => {
    language(req.params.lang, res, 0);
});

app.get('/quotes/:lang/day', (req, res) =>{
    language(req.params.lang, res, 1);
});

app.get('/quotes/:lang/random', (req, res) =>{
    language(req.params.lang, res, 2);
});

app.get('/quotes/:lang/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    language(req.params.lang, res, 3, id);

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})