const https = require('https');

const fs = require('fs');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const pokemonMap = alphabet.reduce((result, letter) => {
    return { ...result, [letter]: [] };
}, {});

const MAX_POKEMONS = 964;

https.get(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}`, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        const results = JSON.parse(data).results;
        results.forEach(pokemon => {
            const { name } = pokemon;

            if (typeof name === 'string') {
                pokemonMap[name[0]].push(name);
            }
        });
        
       fs.writeFile('pokemon-names.json', JSON.stringify(pokemonMap), console.log);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
