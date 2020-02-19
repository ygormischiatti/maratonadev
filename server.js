//Configurando o servidor
const express = require("express")
const server = express()

//Configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

//Configurando a template engine
const nonjucks = require("nunjucks")
nonjucks.configure("./", {
    express: server,
    noCache: true
})

//Lista de doadores: Array
const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Robson Marques",
        blood: "O+"
    },
    {
        name: "Mayk Brito",
        blood: "A-"
    }
]

//Configurar a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})


server.post("/", function(req, res){
    //Obter dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //Coloca valores no array
    donors.push({
        name:name,
        blood: blood
    })

    return res.redirect("/")
})


//Ligar o servidor e permitir o acesso na port 3000
server.listen(3000, function() {
    console.log("Iniciei o servidor.")
})