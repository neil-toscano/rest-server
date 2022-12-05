const {check}=require('express-validator');
const {Router}=require('express');

const { ValidadCampos } = require('../middelwares/validad-campos');
const validarJwt = require('../middelwares/validarjwt');
const { crearCAtegoria, obtenerCategorias, obtenCate, actualizarCatego, borrarCate } = require('../controlers/categoria');
const { existeCategoriaId } = require('../helpers/db-validators');
const router=Router();
//obtener todas las categorias-publico
router.get('/',obtenerCategorias);

//obtener una categoria por id-publico
router.get('/:id',[
    check('id',"no es un id mongo").isMongoId(),
    check('id').custom((id)=>existeCategoriaId(id)),
    ValidadCampos

],obtenCate);

//Crear una nueva categoria-privado
router.post('/',[
    validarJwt,
    check('nombre','el nombre es obligatorio').notEmpty(),
    ValidadCampos
],crearCAtegoria);
//actualizar catego
router.put('/:id',[
    validarJwt,
    check('nombre','el nombre es obligatorio').notEmpty(),
    check('id','no es un id mongo').isMongoId(),
    check('id').custom((id)=>existeCategoriaId(id)),
    ValidadCampos
],actualizarCatego);
//borrar catego solo - Admin
router.delete('/:id',[
    validarJwt,
    check('id','no es un id mongo').isMongoId(),
    check('id').custom((id)=>existeCategoriaId(id)),
    ValidadCampos
],borrarCate)
module.exports=router;
