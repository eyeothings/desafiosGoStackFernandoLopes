const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body 
  const repository = {
  id: uuid(),
  title,
  url, 
  techs,
  likes: 0,
   }
   
   repositories.push(repository);
   return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params; 
  const {title, url, techs} = request.body; 
  const findRepositoryIndex = repositories.findIndex(repository =>
  repository.id === id
  );

  if(findRepositoryIndex === -1 ) {
    return response.status(400).json({error: "repository doesn't exist"});
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
     };

     repositories[findRepositoryIndex] = repository
     return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  // armazenar a informação enviada pelo usuário
  const {id} = request.params; 
  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );
 
   if(findRepositoryIndex >= 0 ) {
     repositories.splice(findRepositoryIndex, 1);
   }
   else {
     return response.status(400).json({error: "repository doesn't exist"});
   }
  return response.status(204).send(); 
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params 
  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id)
    if(findRepositoryIndex === -1 ) {
      return response.status(400).json({error: "repository doesn't exist"});
    }
    repositories[findRepositoryIndex].likes++
    return response.json(repositories[findRepositoryIndex])
});

module.exports = app; 
