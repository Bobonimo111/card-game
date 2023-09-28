const express = require("express");
const app = express();
const port = 8080;


const connetion = require("./model/connection")

const cardRouter = require("./router/card")

app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas devem ser criadas depois das configurações globais
app.use('/card', cardRouter);


connetion.authenticate().then(() => {
    console.log("sucesso")
}).catch(() => {
    console.log("falha")
})

app.get("/", (req, res) => {
    res.redirect("/home");
})
app.get("/home", (req, res) => {
    res.render("index")
})
//enviar imagem 
app.get("/image/:imageName", (req, res) => {
    let image = req.params.imageName;
    res.sendFile("/uploads/" + image);
})

app.listen(port, (error) => {
    if (error) {
        console.log("aplicação falhou ao iniciar")
    } else {
        console.log("aplicação está online")
    }
})



