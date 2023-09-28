const express = require("express");
const router = express.Router();
const cardModel = require("../model/cardModel");

const multer = require("multer");
//const upload = multer({ dest: 'public/uploads/' })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    }, filename: (req, file, cb) => {

        const nomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        cb(null, `${nomeArquivo}.${file.originalname.split(".")[file.originalname.split(".").length - 1]}`)
    }
})
const upload = multer({ storage: storage });


//aq são mostrados os cards
router.get("/", (req, res) => {
    res.send("essa é a principal pagina de cards")
})

//aq são cadastrados os cards
router.get("/create", (req, res) => {
    res.render("card/cardCreate");
})


//dar um jeito de armazenar e usar a imagem
router.post("/new", upload.single("image"), (req, res) => {
    let { name, type, description, attack, defense } = req.body;
    let image = req.file.filename;
    cardModel.create({
        name: name,
        type: type,
        description: description,
        attack: attack,
        defense: defense,
        image: image
    }).then(() => {
        console.log("card armazenado");
        res.redirect("cardCollection")
    }).catch((value) => {
        console.log("falha ao salvar item \n" + value);
        res.redirect("new");
    })
})

router.get("/cardCollection", (req, res) => {
    cardModel.findAll().then((values) => {
        res.render("card/cardCollection", { cards: values });
    })
})

module.exports = router;    