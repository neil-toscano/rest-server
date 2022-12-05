const {check}=require('express-validator');
const {Router}=require('express');
const { usuarioGet, usuarioPut, usuarioDelete, usuarioPost } = require('../controlers/usuarios');
const { ValidadCampos } = require('../middelwares/validad-campos');
const { Role } = require('../models/rol');
const { esRoleValido, ValidarEmail, existeUsuarioId } = require('../helpers/db-validators');
const validarJwt = require('../middelwares/validarjwt');
const { esAdminRole, tieneRole } = require('../middelwares/validar-roles');
const router=Router();

router.get('/',usuarioGet);
router.put('/:id/:ip',[
    check('id',"no es un ID valido").isMongoId(),
    check('id').custom((id)=>existeUsuarioId(id)),
    check('rol').custom((rol)=>esRoleValido(rol)),
    ValidadCampos
],usuarioPut);
router.delete('/:id',[
    validarJwt,
    //esAdminRole,
    tieneRole('Admin_Rol','User_Rol'),
    check('id',"no ed un id valido").isMongoId(),
    check('id').custom(existeUsuarioId),
    ValidadCampos
],usuarioDelete);
router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom((correo)=>ValidarEmail(correo)),
    check('nombre','El nombre es obligatorio y debe tener una long mayor a 5').isLength({min:3}),
    check('password','La contrasena es obligatorio >=8').isLength({min:8}),
    check('rol').custom((rol)=>esRoleValido(rol)),
    ValidadCampos
    

],usuarioPost);

module.exports=router;
