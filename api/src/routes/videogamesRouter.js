const {Router} = require ("express")

const {getVideogameinfoHandler,
      getVideogamesHandler,
      postVideogamesHandler} 
      = require("../handlers/videogamesHandlers")

const videogamesRouter = Router();


videogamesRouter.get("/", getVideogamesHandler );

videogamesRouter.get("/:id", getVideogameinfoHandler);

videogamesRouter.post("/", postVideogamesHandler);




module.exports = videogamesRouter