    const express = require('express'),
    axios = require('axios'),
    cors = require('cors'),
    app = express(),
    PORT = 3000;

    let characters = [];

    app.use(cors());

    app.get('/characters', async (req, res) => {
        const url = 'https://rickandmortyapi.com/api/character';
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
            res.status(404).json({error: 'Página no encontrada'})
        }
    })

    app.get('/characters/:name', async (req, res) => {
        const characterName = req.params.name;  //Nombre de la busqueda   
        const characterFilter = characters.filter(character => character.name.split(" ")[0].toLowerCase() === characterName.toLowerCase()); //Obtengo el primer nombre de cada personaje para compararlo con el nombre de la busqueda

        if(characterFilter.length === 0) {
            res.status(404).json({mensaje: 'Este personaje no ha sido encontrado'})
        } else {
            const characterId = characterFilter[0].id; //Lo saco del array y obtengo ID
            //console.log(characterId)
        
            const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`

            try {
                const response = await axios.get(urlCharacter);
                const dataCharacter = response.data;
                
                const { id, name, status, species, gender, origin:  { name: originName }, image } = dataCharacter;
                
                res.json({id, name, status, species, gender, originName , image});
            } catch (error) {
                res.status(404).json({error: 'Página no encontrada'})
            }
        }

    })

    app.listen(PORT, () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
    })