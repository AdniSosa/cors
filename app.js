const express = require('express'),
axios = require('axios'),
cors = require('cors');

const app = express();
const PORT = 3000;
const url = 'https://rickandmortyapi.com/api/character';

app.use(cors());

app.get('/characters', async (req, res) => {
    let characters = [];
    
    try {
        const response = await axios.get(url);
        const dataCharacters = response.data;
        const results = dataCharacters.results;
            //console.log(dataCharacters)

        for (const character of results) {
            const {id, name, status, species, gender, origin:  { name: originName }, image} = character;
            characters.push({id, name, status, species, gender, originName , image});
        }
            //console.log(characters)
        res.json(characters);
             
    } catch (error) {
            res.status(404).json({error: 'No se han podido cargar los personajes'})
    }
})

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;  //Nombre de la busqueda   
        
    let characterSearch = [];

    try {
        const response = await axios.get(`${url}/?name=${characterName}`);
        const dataCharacters = response.data.results;
            //console.log(dataCharacters)

        for (const character of dataCharacters) {
            const {id, name, status, species, gender, origin:  { name: originName }, image} = character;
            characterSearch.push({id, name, status, species, gender, originName , image});
        }
                
            res.json(characterSearch);
    } catch (error) {
        res.status(404).json({error: 'Personaje no encontrado'})
    }
        

})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})