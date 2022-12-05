const { Router } = require("express");
const { buscar } = require("../controlers/buscar");


const router=Router();
router.get('/:coleccion/:termino',buscar)
module.exports=router;
