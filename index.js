const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {id: 0,
    title: "teste",
    tasks: [],}
]

// middleware global


server.use((req,res, next)=>{
    
    
    console.count("Número de requisições");

    return next();
})

// middleware local
function projectIdExist(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
  
    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }
  
    return next();
  }

//Rota que lista todos projetos e suas tarefas;
server.get('/projects', (req, res) => {
    
    res.json(projects);
});


// A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas
server.post('/projects', (req, res) => {
    const {id} = req.body;
    const {title} = req.body;

    projects.push({id: id, title: title, tasks: []});

    res.json(projects);
});

// A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;
server.post('/projects/:id/tasks', projectIdExist,  (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    //const {tasks} = req.params;
    
    if(projects[id].id == id){
        projects[id].title = title;
        //projects[id].tasks = tasks;
    }

});

// A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
server.put('/projects/:id', projectIdExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    
    if(projects[id].id == id){
        projects[id].title = title;
    }

    res.json(projects);
});

// A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete('/projects/:id', projectIdExist, (req, res) => {
    const {id} = req.params;
    
    const projectIndex = projects.findIndex(p => p.id == id);
    projects.splice(id, 1);

    // if(projects[id].id == id){
    //     projects.splice(id, 1);
    // }

    res.json(projects);
});


server.listen(3000);