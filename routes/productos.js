const {check}=require('express-validator');
const {Router}=require('express');

const { ValidadCampos } = require('../middelwares/validad-campos');
const validarJwt = require('../middelwares/validarjwt');
const { crearProducto, obtenProduc, obtenerProductos, actualizarProduc, borrarProduct } = require('../controlers/producto');
const { existeProductoId, existeCategoriaId } = require('../helpers/db-validators');

const router=Router();
//obtener todas las categorias-publico
router.get('/',

obtenerProductos);

//obtener una categoria por id-publico
router.get('/:id',[
    check('id',"no es un id mongo").isMongoId(),
    check('id').custom((id)=>existeProductoId(id)),
    ValidadCampos

],obtenProduc);

//Crear una nueva categoria-privado
router.post('/',[
    validarJwt,
    check('nombre','el nombre es obligatorio').notEmpty(),
    //check('categoria',"no es un mongo id ").custom((existeCategoriaId))
    check('categoria').custom(existeCategoriaId),
    ValidadCampos
],crearProducto);
//actualizar catego
router.put('/:id',[
    validarJwt,
    check('nombre','el nombre es obligatorio').notEmpty(),
    check('id','no es un id mongo').isMongoId(),
    check('id').custom((id)=>existeProductoId(id)),
    ValidadCampos
],actualizarProduc);
////borrar producto solo - Admin
router.delete('/:id',[
    validarJwt,
    check('id','no es un id mongo').isMongoId(),
    check('id').custom((id)=>existeProductoId(id)),
    ValidadCampos
],borrarProduct)
module.exports=router;
