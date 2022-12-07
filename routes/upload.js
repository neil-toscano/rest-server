const {check}=require('express-validator');
const {Router}=require('express');

const { ValidadCampos } = require('../middelwares/validad-campos');
const { cargaArchivo, ActualiImg, mostrarImagen, ActualiImgCloudy } = require('../controlers/uploads');
const { coleccionPermi } = require('../helpers/db-validators');
const { ValidarArchivo } = require('../middelwares/validarArchivo');
const router=Router();
router.post('/',ValidarArchivo,cargaArchivo);
router.put('/:coleccion/:id',[
    ValidarArchivo,
    check('id','El id debe ser mongo').isMongoId(),
    //check('archivo').custom((data)=>verificarArchivo(data)),
    check('coleccion').custom((c)=>coleccionPermi(c,['usuario','productos'])),
    ValidadCampos
],ActualiImgCloudy);
router.get('/:coleccion/:id',[
check('id','El id debe ser de mongo').isMongoId(),
check('coleccion').custom(c=>coleccionPermi(c,['usuario','productos'])),
ValidadCampos
],mostrarImagen)

module.exports=router;
