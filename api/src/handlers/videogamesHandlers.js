const {createGame, getGameById,searchGameByName , getAllGames} = require ("../controllers/gamesControllers")

const getVideogamesHandler = async (req, res) => {
      const { name } = req.query;
    
      try {
        const results = name ? await searchGameByName(name) : await getAllGames();
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
      }
    };
     
const getVideogameinfoHandler =async (req,res) =>{
       const {id} = req.params;
       const source = isNaN(id) ? "bdd" : "api"

       try {
            const gameId = await getGameById(id, source)     
            res.status(200).json(gameId) 
       } catch (error) {
            res.status(400).json({error: error.message})
       }
}; 
       
const postVideogamesHandler = async (req,res) =>{
      const {name,description,platforms,image,releaseDate,rating} = req.body;
      try {
            const newGame = await createGame(name,description,platforms,image,releaseDate,rating);
           res.status(201).json(newGame)
      } catch (error) {
            res.status(400).json({error: error.message})
      }
     
};
module.exports = {
      getVideogameinfoHandler,
      getVideogamesHandler,
      postVideogamesHandler
}     