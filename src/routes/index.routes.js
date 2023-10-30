const express = require("express");
const router = express.Router();



// Controllers
const { renderIndex, renderAbout, renderHome, renderpedir,renderruta_de_redireccion, renderInfo,renderdatos } = require("../controllers/index.controller");
const {guardarDtos } = require("../controllers/Dtos.controller")


router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/home", renderHome);
router.get("/pedir", renderpedir);
router.get("/Info", renderInfo);
router.get("/datos", renderdatos);
router.post("/Dtos", guardarDtos);
router.get("/Dtos", guardarDtos);
router.get("/ruta_de_redireccion", renderruta_de_redireccion);

module.exports = router;
